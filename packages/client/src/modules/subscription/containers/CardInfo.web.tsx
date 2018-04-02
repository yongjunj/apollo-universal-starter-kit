import React from 'react';

import CardInfoView from '../components/CardInfoView.web';

import { withCardInfo } from '../graphql';
import { CardInfoProps } from '../types';

const CardInfo = ({ loading, expiryMonth, expiryYear, last4, brand }: CardInfoProps) => {
  return (
    <CardInfoView loading={loading} expiryMonth={expiryMonth} expiryYear={expiryYear} last4={last4} brand={brand} />
  );
};

const CardInfoWithApollo = withCardInfo(CardInfo);

export default CardInfoWithApollo;
