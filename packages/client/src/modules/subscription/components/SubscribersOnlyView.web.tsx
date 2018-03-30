import React from 'react';
import { PageLayout } from '../../common/components/web';

import { SubscribersOnlyProps } from '../types';

// TODO fix ts-lint error
// tslint:disable-next-line:variable-name
const SubscribersOnlyView = ({ loading, number }: SubscribersOnlyProps) => {
  return (
    <PageLayout>
      <h1>Private</h1>
      <p>Your magic number is {loading ? 'loading...' : number}.</p>
    </PageLayout>
  );
};

export default SubscribersOnlyView;
