import React from 'react';
import { graphql, compose } from 'react-apollo';

import CardInfoView from '../components/CardInfoView';

import { withCardInfo } from '../graphql';
import { CardInfoProps } from '../types';

const CardInfo = ({ loading, expiryMonth, expiryYear, last4, brand }: CardInfoProps) => {
  return (
    <CardInfoView loading={loading} expiryMonth={expiryMonth} expiryYear={expiryYear} last4={last4} brand={brand} />
  );
};

const CardInfoWithApollo = compose(withCardInfo)(CardInfo);

export default CardInfoWithApollo;
