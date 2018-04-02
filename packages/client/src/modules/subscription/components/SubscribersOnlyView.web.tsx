import React from 'react';
import { PageLayout } from '../../common/components/web';

import { SubscribersOnlyProps } from '../types';

const SubscribersOnlyView = ({ loading, randomNumber }: SubscribersOnlyProps) => {
  return (
    <PageLayout>
      <h1>Private</h1>
      <p>Your magic number is {loading ? 'loading...' : randomNumber}.</p>
    </PageLayout>
  );
};

export default SubscribersOnlyView;
