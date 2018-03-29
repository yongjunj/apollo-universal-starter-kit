import { graphql, OptionProps } from 'react-apollo';

import UPDATE_CARD from './UpdateCard.graphql';
import CARD_INFO from './CardInfoQuery.graphql';
import CARD_INFO_QUERY from './CardInfoQuery.graphql';

import { CardOperation, CardQueryResult, CardUpdateOptions } from '../types';

const withCardUpdating = (Component: any) =>
  graphql(UPDATE_CARD, {
    props: ({ ownProps: { history }, mutate }: OptionProps<any, CardOperation>) => ({
      updateCard: async ({ token, expiryMonth, expiryYear, last4, brand }: CardUpdateOptions) => {
        try {
          const { data: { updateCard } }: any = await mutate({
            variables: { input: { token, expiryMonth, expiryYear, last4, brand } },
            refetchQueries: [{ query: CARD_INFO }]
          });

          if (!updateCard) {
            return { errors: ['Error updating card.'] };
          }

          if (history) {
            history.push('/profile');
          }
          return updateCard;
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.log(e.graphQLErrors);
        }
      }
    })
  })(Component);

const withCardInfo = (Component: any) =>
  graphql(CARD_INFO_QUERY, {
    props({ data: { loading, subscriptionCardInfo } }: OptionProps<any, CardQueryResult>) {
      return {
        loading,
        expiryMonth: subscriptionCardInfo && subscriptionCardInfo.expiryMonth,
        expiryYear: subscriptionCardInfo && subscriptionCardInfo.expiryYear,
        last4: subscriptionCardInfo && subscriptionCardInfo.last4,
        brand: subscriptionCardInfo && subscriptionCardInfo.brand
      };
    }
  });

export { withCardUpdating };
