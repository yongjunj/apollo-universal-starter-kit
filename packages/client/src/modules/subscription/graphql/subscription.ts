import { graphql, OptionProps } from 'react-apollo';

import SUBSCRIBE from './Subscribe.graphql';
import SUBSCRIPTION_QUERY from './SubscriptionQuery.graphql';
import CARD_INFO from './CardInfoQuery.graphql';
import NUMBER_QUERY from './SubscribersOnlyNumberQuery.graphql';

import { SubscriptionOperation, CardOptions, SubscriptionsOnlyResult } from '../types';

const withSubscribing = (Component: any) =>
  graphql(SUBSCRIBE, {
    props: ({ ownProps: { history, navigation }, mutate }: OptionProps<any, SubscriptionOperation>) => ({
      subscribe: async ({ token, expiryMonth, expiryYear, last4, brand }: CardOptions) => {
        try {
          const { data: { subscribe } }: any = await mutate({
            variables: { input: { token, expiryMonth, expiryYear, last4, brand } },
            update: (store, { data }: any) => {
              const subscriptionData: any = store.readQuery({ query: SUBSCRIPTION_QUERY });
              subscriptionData.subscription = data.subscribe;
              store.writeQuery({ query: SUBSCRIPTION_QUERY, data: subscriptionData });
            },
            refetchQueries: [{ query: CARD_INFO }]
          });

          if (subscribe.errors) {
            return { errors: subscribe.errors };
          }

          if (history) {
            history.push('/subscribers-only');
          }
          if (navigation) {
            navigation.goBack();
          }

          return subscribe;
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.log(e.graphQLErrors);
        }
      }
    })
  });

const withSubscribersOnly = (Component: any) =>
  graphql(NUMBER_QUERY, {
    options: { fetchPolicy: 'network-only' },
    props({ data: { loading, subscribersOnlyNumber } }: OptionProps<any, SubscriptionsOnlyResult>) {
      return { loading, number: subscribersOnlyNumber && subscribersOnlyNumber.number };
    }
  });

export { withSubscribing, withSubscribersOnly };
