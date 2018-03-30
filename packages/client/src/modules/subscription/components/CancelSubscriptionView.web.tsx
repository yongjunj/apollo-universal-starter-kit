import React from 'react';
import { Button, Alert, CardGroup, CardTitle, CardText } from '../../common/components/web';

import { CancelSubscriptionViewState, SubscriptionNavigationProps } from '../types';

export default class CancelSubscriptionView extends React.Component<
  SubscriptionNavigationProps,
  CancelSubscriptionViewState
> {
  constructor(props: SubscriptionNavigationProps) {
    super(props);
    this.state = {
      cancelling: false,
      errors: null
    };
  }

  public onClick = async () => {
    this.setState({ cancelling: true });
    const { errors }: any = await this.props.cancel();
    if (errors) {
      this.setState({
        cancelling: false,
        errors
      });
    }
  };

  public render() {
    const { loading, active } = this.props;
    const { errors } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <CardGroup>
        <CardTitle>Subscription</CardTitle>
        <CardText>
          {active && (
            <Button color="danger" onClick={this.onClick} disabled={this.state.cancelling}>
              Cancel Subscription
            </Button>
          )}
          {!active && <span>You do not have a subscription.</span>}
          {errors && <Alert color="error">{errors}</Alert>}
        </CardText>
      </CardGroup>
    );
  }
}
