import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { withSubscription } from '../graphql';
import { SubscriptionNavigationProps } from '../types';

import { AuthNav, AuthRoute } from '../../user/containers/Auth';

const SubscriberNav = ({ loading, active, children, ...rest }: SubscriptionNavigationProps) => {
  return <AuthNav {...rest}>{loading || !active ? null : children}</AuthNav>;
};

const SubscriberNavWithApollo = compose(withSubscription)(SubscriberNav);

const SubscribeRedirect = () => <Redirect to="/subscription" />;
const LoadingComponent = () => <div>Loading...</div>;

const SubscriberRoute = ({ loading, active, component, ...rest }: SubscriptionNavigationProps) => {
  return (
    <AuthRoute component={loading ? LoadingComponent : !loading && active ? component : SubscribeRedirect} {...rest} />
  );
};

const SubscriberRouteWithApollo: any = withSubscription(SubscriberRoute);

export { SubscriberNavWithApollo as SubscriberNav };
export { SubscriberRouteWithApollo as SubscriberRoute };
