import React from 'react';

import SubscribersOnlyView from '../components/SubscribersOnlyView.web';
import { SubscribersOnlyProps } from '../types';
import { withSubscribersOnly } from '../graphql';

const SubscribersOnly = ({ loading, randomNumber }: SubscribersOnlyProps) => (
  <SubscribersOnlyView loading={loading} randomNumber={randomNumber} />
);

const SubscribersOnlyWithApollo = withSubscribersOnly(SubscribersOnly);

export default SubscribersOnlyWithApollo;
