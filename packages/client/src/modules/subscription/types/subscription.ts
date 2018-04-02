import { QueryProps } from 'react-apollo';
import { Errors } from '../../../../../common/types';
import { UpdateCardFn, CardOptions } from './card';

/* ---  TYPES --- */
type Cancel = () => Promise<boolean | Errors>;

/* --- COMPONENT STATE --- */
interface CancelSubscriptionViewState {
  cancelling: boolean;
  errors: null | string;
}

/* --- COMPONENT PROPS --- */

/**
 * Mutation props
 */
interface SubscriptionOperation {
  subscribe?: UpdateCardFn;
  cancel?: Cancel;
}

/**
 * Component/container props
 */
interface SubscribersOnlyProps {
  randomNumber?: number;
  loading: boolean;
}

interface CancelSubscriptionProps extends SubscriptionOperation, SubscribersOnlyProps {
  active?: boolean;
}

interface SubscriptionNavigationProps extends CancelSubscriptionProps {
  children?: any;
  component?: any;
}

// tslint:disable-next-line:no-empty-interface
interface SubscriptionProps extends SubscriptionOperation {}

/**
 * Query props
 */
interface SubscriptionQueryResult {
  subscription: CancelSubscriptionProps;
}

interface SubscriptionsOnlyResult {
  subscribersOnlyNumber: SubscribersOnlyProps;
}

export { SubscriptionsOnlyResult, SubscriptionOperation, SubscribersOnlyProps };
export { SubscriptionQueryResult, CancelSubscriptionProps };
export { SubscriptionNavigationProps, SubscriptionProps };
export { CancelSubscriptionViewState };
