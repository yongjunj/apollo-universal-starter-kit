import React from 'react';
import { compose } from 'react-apollo';

import CancelSubscriptionView from '../components/CancelSubscriptionView.web';

import { withSubscription, withSubscriptionCanceling } from '../graphql';
import { CancelSubscriptionProps } from '../types';

const CancelSubscription = ({ loading, active, cancel }: CancelSubscriptionProps) => {
  return <CancelSubscriptionView loading={__SERVER__ ? true : loading} active={active} cancel={cancel} />;
};

const CancelSubscriptionWithApollo = withSubscriptionCanceling(withSubscription(CancelSubscription, __SERVER__));

export default CancelSubscriptionWithApollo;
