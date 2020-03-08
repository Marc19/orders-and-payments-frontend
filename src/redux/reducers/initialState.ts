import Order from '../../models/Order';

export enum ApiStatus {
    NONE,
    CALLING,
    CALL_SUCCEEDED,
    CALL_FAILED
}

export interface OrderState {
    orders: Order[];
    gettingOrdersStatus: ApiStatus;
    postingOrderStatus: ApiStatus;
    postingOrderErrorMessage: string;
}

export interface PaymentState {
    payingOrderStatus: ApiStatus;
    payingOrderErrorMessage: string;
}

export interface AppState {
    orderState: OrderState;
    paymentState: PaymentState;
}
 
export const initialState: AppState = {
	orderState: {
		orders: [],
		gettingOrdersStatus: ApiStatus.NONE,
		postingOrderStatus: ApiStatus.NONE,
		postingOrderErrorMessage: ''
	},
	paymentState: {
		payingOrderStatus: ApiStatus.NONE,
		payingOrderErrorMessage: ''
	}
};
  