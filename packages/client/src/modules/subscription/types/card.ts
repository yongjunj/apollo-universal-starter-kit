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

/* ---  TYPES --- */
type UpdateCardFn = (options: CardUpdateOptions) => Promise<boolean>;

/* --- COMPONENT PROPS --- */
interface CardInfoProps extends Card {
  loading: boolean;
}
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

export { CardInfoProps, CardUpdateOptions };
export { CardOperation, CardQueryResult };
