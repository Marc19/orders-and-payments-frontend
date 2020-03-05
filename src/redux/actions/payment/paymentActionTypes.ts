import { Action } from "redux";
import Payment from '../../../models/Payment';

export interface IPostingPaymentAction extends Action<"POSTING_PAYMENT"> {
}

export interface IPostedPaymentSucceededAction extends Action<"POSTED_PAYMENT_SUCCEEDED"> {
  result: Payment;
}

export interface IPostedPaymentFailedAction extends Action<"POSTED_PAYMENT_FAILED"> {
  errorMessage: string;
}

export interface IResetPaymentApiStatus extends Action<"RESET_PAYMENT_API_STATUS">{
}

export type PaymentActions = 
 | IPostingPaymentAction
 | IPostedPaymentSucceededAction
 | IPostedPaymentFailedAction
 | IResetPaymentApiStatus