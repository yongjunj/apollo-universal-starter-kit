import { QueryProps } from 'react-apollo';
import { Errors } from '../../../../../common/types';

/* --- ENTITIES --- */
interface Card {
  expiryMonth?: number;
  expiryYear?: number;
  last4?: string;
  brand?: string;
}

interface CardOptions extends Card {
  token: string;
}

/* ---  TYPES --- */
type UpdateCardFn = (options: CardOptions) => Promise<boolean | Errors>;

/* --- COMPONENT PROPS --- */
interface CardInfoProps extends Card, CardOperation {
  loading: boolean;
}

interface CardValues {
  name: string;
}

interface CardFormProps {
  action?: string;
  submitting?: boolean;
  onSubmit: (options?: any) => void;
  stripe?: any;
}

// tslint:disable-next-line:no-empty-interface
interface UpdateCardProps extends CardOperation {}
/**
 * Mutation props
 */
interface CardOperation {
  updateCard?: UpdateCardFn;
}

/**
 * Query props
 */
interface CardQueryResult {
  subscriptionCardInfo: Card;
}

export { UpdateCardFn };
export { CardValues, CardFormProps };
export { CardInfoProps, CardOptions, UpdateCardProps };
export { CardOperation, CardQueryResult };
