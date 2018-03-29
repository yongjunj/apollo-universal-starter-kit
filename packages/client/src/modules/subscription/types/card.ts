/* --- ENTITIES --- */
interface Card {
  expiryMonth: number;
  expiryYear: number;
  last4: string;
  brand: string;
}

interface CardUpdateOptions extends Card {
  token: string;
}

interface CardInfo extends Card {
  loading: boolean;
}

/* ---  TYPES --- */
type UpdateCardFn = (options: CardUpdateOptions) => Promise<boolean>;

/* --- COMPONENT PROPS --- */

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

export { CardInfo, CardUpdateOptions };
export { CardOperation, CardQueryResult };
