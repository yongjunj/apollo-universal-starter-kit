import React from 'react';
import Helmet from 'react-helmet';
import { Elements } from 'react-stripe-elements';

import { LayoutCenter, clientOnly } from '../../common/components';
import { PageLayout } from '../../common/components/web';
import SubscriptionCardForm from './SubscriptionCardForm.web';
import settings from '../../../../../../settings';

import { SubscriptionProps, CardOptions, UpdateCardFn as SubscribeFn } from '../types';
import { Error } from '../../../../../common/types';

const ElementsClientOnly = clientOnly(Elements);

export default class SubscriptionView extends React.Component<SubscriptionProps, any> {
  public onSubmit = (subscribe: SubscribeFn) => async (values: CardOptions) => {
    const result: any = await subscribe(values);

    if (result && result.errors) {
      const submitError = {
        _error: 'Transaction failed!'
      };
      result.errors.map((error: Error) => (submitError[error.field] = error.message));
      throw submitError;
    }
  };

  public render() {
    const { subscribe } = this.props;

    const renderMetaData = () => (
      <Helmet
        title={`${settings.app.name} - Subscription`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - Subscription page`
          }
        ]}
      />
    );

    return (
      <PageLayout>
        {renderMetaData()}
        <LayoutCenter>
          <h1 className="text-center">Subscription!</h1>
          <ElementsClientOnly>
            <SubscriptionCardForm onSubmit={this.onSubmit(subscribe)} action="Subscribe" />
          </ElementsClientOnly>
        </LayoutCenter>
      </PageLayout>
    );
  }
}
