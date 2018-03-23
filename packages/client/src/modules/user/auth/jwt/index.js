import { ApolloLink, Observable } from 'apollo-link';
import React from 'react';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import { LayoutCenter } from '../../../common/components';

import Feature from '../connector';

import REFRESH_TOKENS_MUTATION from './graphql/RefreshTokens.graphql';
import CURRENT_USER_QUERY from '../../graphql/CurrentUserQuery.graphql';

import modules from '../../..';

const setJWTContext = operation => {
  const accessToken = window.localStorage.getItem('accessToken');
  operation.setContext({
    credentials: 'same-origin',
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : null
    }
  });
};

const isTokenRefreshNeeded = (operation, result) => {
  let needRefresh = false;
  const refreshToken = window.localStorage.getItem('refreshToken');
  if (refreshToken && operation.operationName !== 'refreshTokens') {
    if (result.errors) {
      for (const error of result.errors) {
        if (error.message && error.message.indexOf('Not Authenticated') >= 0) {
          needRefresh = true;
          break;
        }
      }
    } else if (operation.operationName === 'currentUser' && result.data.currentUser === null) {
      // We have refresh token here, and empty current user received as a network request result,
      // it means we need to refresh tokens
      needRefresh = true;
    }
  }
  return needRefresh;
};

let apolloClient;

const JWTLink = new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    if (['login', 'refreshTokens'].indexOf(operation.operationName) < 0) {
      setJWTContext(operation);
    }
    let sub, retrySub;
    try {
      sub = forward(operation).subscribe({
        next: result => {
          if (operation.operationName === 'login') {
            const { data: { login: { tokens: { accessToken, refreshToken } } } } = result;
            window.localStorage.setItem('accessToken', accessToken);
            window.localStorage.setItem('refreshToken', refreshToken);
            observer.next(result);
            observer.complete();
          } else if (isTokenRefreshNeeded(operation, result)) {
            (async () => {
              try {
                const { data: { refreshTokens: { accessToken, refreshToken } } } = await apolloClient.mutate({
                  mutation: REFRESH_TOKENS_MUTATION,
                  variables: { refreshToken: window.localStorage.getItem('refreshToken') }
                });
                window.localStorage.setItem('accessToken', accessToken);
                window.localStorage.setItem('refreshToken', refreshToken);
                // Retry current operation
                setJWTContext(operation);
                retrySub = forward(operation).subscribe(observer);
              } catch (e) {
                // We have received error during refresh - drop tokens and return original request result
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('refreshToken');
                observer.next(result);
                observer.complete();
              }
            })();
          } else {
            observer.next(result);
            observer.complete();
          }
        },
        error: observer.error.bind(observer),
        complete: () => {}
      });
    } catch (e) {
      observer.error(e);
    }

    return () => {
      if (sub) sub.unsubscribe();
      if (retrySub) retrySub.unsubscribe();
    };
  });
});

// TODO: shouldn't be needed at all when React Apollo will allow rendering
// all queries as loading: true during SSR
class DataRootComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { ready: false };
  }

  async componentDidMount() {
    const { client } = this.props;
    apolloClient = client;
    const refreshToken = window.localStorage.getItem('refreshToken');
    if (refreshToken) {
      let result;
      try {
        result = client.readQuery({ query: CURRENT_USER_QUERY });
      } catch (e) {
        // We have no current user in the cache, we need to load it to properly draw UI
      }
      if (!result || !result.currentUser) {
        // If we don't have current user but have refresh token, this means our Apollo Cache
        // might be invalid: we received this Apollo Cache from server in __APOLLO_STATE__
        // as generated during server-sider rendering. Server had no idea about our client-side
        // access token and refresh token. In this case we need to trigger our JWT link
        // by sending network request
        const { data: { currentUser } } = await client.query({
          query: CURRENT_USER_QUERY,
          fetchPolicy: 'network-only'
        });
        if (currentUser) {
          // If we have received current user, then we had invalid Apollo Cache previously
          // and we should discard it
          await client.cache.reset();
          await client.writeQuery({ query: CURRENT_USER_QUERY, data: { currentUser } });
          await client.cache.writeData({ data: modules.resolvers.defaults });
        }
      }
    }
    this.setState({ ready: true });
  }

  render() {
    return this.state.ready ? (
      this.props.children
    ) : (
      <LayoutCenter>
        <div className="text-center">App is loading...</div>
      </LayoutCenter>
    );
  }
}

DataRootComponent.propTypes = {
  client: PropTypes.object,
  children: PropTypes.node
};

export default new Feature({
  dataRootComponent: withApollo(DataRootComponent),
  link: JWTLink
});