import { graphql, OptionProps } from 'react-apollo';

import SUBSCRIBE from './Subscribe.graphql';
import SUBSCRIPTION_QUERY from './SubscriptionQuery.graphql';
import CARD_INFO from './CardInfoQuery.graphql';
import NUMBER_QUERY from './SubscribersOnlyNumberQuery.graphql';
import CANCEL from './CancelSubscription.graphql';

import { SubscriptionOperation, CardOptions, SubscriptionsOnlyResult, SubscriptionQueryResult } from '../types';
import { Error } from '../../../../../common/types';

const withSubscribing = (Component: any) =>
  graphql(SUBSCRIBE, {
    props: ({ ownProps: { history, navigation }, mutate }: OptionProps<any, SubscriptionOperation>) => ({
      subscribe: async ({ token, expiryMonth, expiryYear, last4, brand }: CardOptions) => {
        try {
          const { data: { subscribe } }: any = await mutate({
            variables: { input: { token, expiryMonth, expiryYear, last4, brand } },
            update: (store, { data }: any) => {
              const subscriptionData: any = store.readQuery({ query: SUBSCRIPTION_QUERY });
              subscriptionData.subscription = data.subscribe;
              store.writeQuery({ query: SUBSCRIPTION_QUERY, data: subscriptionData });
            },
            refetchQueries: [{ query: CARD_INFO }]
          });

          if (subscribe.errors) {
            return { errors: subscribe.errors };
          }

          if (history) {
            history.push('/subscribers-only');
          }
          if (navigation) {
            navigation.goBack();
          }

          return subscribe;
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.log(e.graphQLErrors);
        }
      }
    })
  })(Component);

const withSubscribersOnly = (Component: any) =>
  graphql(NUMBER_QUERY, {
    options: { fetchPolicy: 'network-only' },
    props({ data: { loading, subscribersOnlyNumber } }: OptionProps<any, SubscriptionsOnlyResult>) {
      return { loading, number: subscribersOnlyNumber && subscribersOnlyNumber.number };
    }
  })(Component);

const withSubscription = (Component: any) =>
  graphql(SUBSCRIPTION_QUERY, {
    // i'm not sure why but this query causes SSR to hang. it seems to have
    // to do with the fact that this query exists in other places in the tree.
    // possibly having to do with the query name, as if you duplicate the query
    // file and change the query name to `SubscriptionDataTwo`, then it works.
    // skipping for now on server.
    skip: __SERVER__,
    props({ data: { loading, subscription } }: OptionProps<any, SubscriptionQueryResult>) {
      return {
        loading,
        active: subscription && subscription.active
      };
    }
  })(Component);

const withSubscriptionCanceling = (Component: any) =>
  graphql(CANCEL, {
    props: ({ mutate }: OptionProps<any, SubscriptionOperation>) => ({
      cancel: async () => {
        try {
          const { data: { cancel } }: any = await mutate({
            update: (store, { data }: any) => {
              const subscriptionData: any = store.readQuery({ query: SUBSCRIPTION_QUERY });
              subscriptionData.subscription = data.cancel;
              store.writeQuery({ query: SUBSCRIPTION_QUERY, data: subscriptionData });
            },
            refetchQueries: [{ query: CARD_INFO }]
          });

          if (cancel.errors) {
            return { errors: cancel.errors.map((e: Error) => e.message).join('\n') };
          }

          return true;
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.log(e.graphQLErrors);
        }
      }
    })
  })(Component);

export { withSubscribing, withSubscribersOnly };
export { withSubscription, withSubscriptionCanceling };
