import { Action } from 'redux';
import Payment from '../../../models/Payment';

export interface PostingPaymentAction extends Action<'POSTING_PAYMENT'> {
}

export interface PostedPaymentSucceededAction extends Action<'POSTED_PAYMENT_SUCCEEDED'> {
  result: Payment;
}

export interface PostedPaymentFailedAction extends Action<'POSTED_PAYMENT_FAILED'> {
  errorMessage: string;
}

export interface ResetPaymentApiStatus extends Action<'RESET_PAYMENT_API_STATUS'>{
}

export type PaymentActions = 
 | PostingPaymentAction
 | PostedPaymentSucceededAction
 | PostedPaymentFailedAction
 | ResetPaymentApiStatus;