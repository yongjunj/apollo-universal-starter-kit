import React from 'react';
import { compose } from 'react-apollo';
import { StripeProvider } from 'react-stripe-elements';

import SubscriptionView from '../components/SubscriptionView.web';

import { withSubscribing } from '../graphql';

import settings from '../../../../../../settings';

// react-stripe-elements will not render on the server.
class Subscription extends React.Component {
  public render() {
    return (
      <div>
        {__CLIENT__ ? (
          <StripeProvider apiKey={settings.subscription.stripePublishableKey}>
            <SubscriptionView {...this.props} />
          </StripeProvider>
        ) : (
          <SubscriptionView {...this.props} />
        )}
      </div>
    );
  }
}

const SubscriptionViewWithApollo = compose(withSubscribing)(Subscription);

export default SubscriptionViewWithApollo;
