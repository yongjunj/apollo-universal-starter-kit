import React from 'react';
import Helmet from 'react-helmet';
import { Elements } from 'react-stripe-elements';
import { LayoutCenter } from '../../common/components';
import { PageLayout } from '../../common/components/web';

import SubscriptionCardForm from './SubscriptionCardForm.web';
import settings from '../../../../../../settings';
import { UpdateCardProps, UpdateCardFn, CardOptions } from '../types';
import { Error } from '../../../../../common/types';

export default class UpdateCardView extends React.Component<UpdateCardProps, any> {
  public onSubmit = (updateCard: UpdateCardFn) => async (values: CardOptions) => {
    const result: any = await updateCard(values);

    if (result.errors) {
      const submitError: any = {
        _error: 'Update failed!'
      };
      result.errors.map((error: Error) => (submitError[error.field] = error.message));
      throw submitError;
    }
  };

  public render() {
    const { updateCard } = this.props;

    const renderMetaData = () => (
      <Helmet
        title={`${settings.app.name} - Update Card`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - Update card page`
          }
        ]}
      />
    );

    return (
      <PageLayout>
        {renderMetaData()}
        <LayoutCenter>
          <h1 className="text-center">Update card!</h1>
          <Elements>
            <SubscriptionCardForm onSubmit={this.onSubmit(updateCard)} action="Update Card" />
          </Elements>
        </LayoutCenter>
      </PageLayout>
    );
  }
}
