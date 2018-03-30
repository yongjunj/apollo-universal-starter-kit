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
interface CardInfoProps extends Card, QueryProps {}
/**
 * Mutation props
 */
interface CardOperation {
  updateCard: UpdateCardFn;
}

/**
 * Query props
 */
interface CardQueryResult {
  subscriptionCardInfo: Card;
}

export { UpdateCardFn };
export { CardInfoProps, CardOptions };
export { CardOperation, CardQueryResult };
