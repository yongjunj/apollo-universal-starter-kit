import React from 'react';
import { compose } from 'react-apollo';

import SubscribersOnlyView from '../components/SubscribersOnlyView.web';
import { SubscribersOnlyProps } from '../types';
import { withSubscribersOnly } from '../graphql';

// TODO Fix ts-lint error
// tslint:disable-next-line:variable-name
const SubscribersOnly = ({ loading, number }: SubscribersOnlyProps) => (
  <SubscribersOnlyView loading={loading} number={number} />
);

const SubscribersOnlyWithApollo = compose(withSubscribersOnly)(SubscribersOnly);

export default SubscribersOnlyWithApollo;
