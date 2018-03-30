import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CardGroup, CardTitle, CardText } from '../../common/components/web';

import { CardInfoProps } from '../types';

const CardInfoView = ({ loading, expiryMonth, expiryYear, last4, brand }: CardInfoProps) => {
  return (
    <div>
      {!loading &&
        expiryMonth &&
        expiryYear &&
        last4 &&
        brand && (
          <CardGroup>
            <CardTitle>Card Info</CardTitle>
            <CardText>
              card: {brand} ************{last4}
            </CardText>
            <CardText>
              expires: {expiryMonth}/{expiryYear}
            </CardText>
            <CardText>
              <Link to="/update-card">
                <Button color="primary">Update Card</Button>
              </Link>
            </CardText>
          </CardGroup>
        )}
    </div>
  );
};

export default CardInfoView;
