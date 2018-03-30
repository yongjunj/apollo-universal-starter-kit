import { QueryProps } from 'react-apollo';
import { Errors } from '../../../../../common/types';
import { UpdateCardFn, CardOptions } from './card';

/* --- ENTITIES --- */
// tslint:disable-next-line:no-empty-interface
interface SubscriptionOptions extends CardOptions {}

/* ---  TYPES --- */

/* --- COMPONENT PROPS --- */
interface SubscribersOnlyProps extends QueryProps {
  number?: number;
}

/**
 * Mutation props
 */
interface SubscriptionOperation {
  subscribe: UpdateCardFn;
}

/**
 * Query props
 */
interface SubscriptionsOnlyResult {
  subscribersOnlyNumber: SubscribersOnlyProps;
}

export { SubscriptionsOnlyResult, SubscriptionOperation, SubscribersOnlyProps };
