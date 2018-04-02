import React from 'react';
import { StripeProvider } from 'react-stripe-elements';

import UpdateCardView from '../components/UpdateCardView.web';

import { UpdateCardProps } from '../types';

import { withCardUpdating } from '../graphql';

import settings from '../../../../../../settings';

// react-stripe-elements will not render on the server.
class UpdateCard extends React.Component<UpdateCardProps, any> {
  public render() {
    return (
      <div>
        {__CLIENT__ ? (
          <StripeProvider apiKey={settings.subscription.stripePublishableKey}>
            <UpdateCardView {...this.props} />
          </StripeProvider>
        ) : (
          <UpdateCardView {...this.props} />
        )}
      </div>
    );
  }
}

const UpdateCardWithApollo = withCardUpdating(UpdateCard);

export default UpdateCardWithApollo;
