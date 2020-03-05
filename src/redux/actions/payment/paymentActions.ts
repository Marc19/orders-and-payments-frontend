import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import Payment from "../../../models/Payment";
import { IPostedPaymentSucceededAction, IPostedPaymentFailedAction, IPostingPaymentAction, IResetPaymentApiStatus } from "./paymentActionTypes";
import { postPayment } from "../../../api/paymentApi";

export const postPaymentActionCreator: 
    ActionCreator<ThunkAction<
                    Promise<IPostedPaymentSucceededAction|IPostedPaymentFailedAction>,
                    Payment,
                    null,
                    (IPostedPaymentSucceededAction|IPostedPaymentFailedAction)>
                 > = (payment : Payment) => {

  return async (dispatch: Dispatch) => {
    const postingPaymentAction: IPostingPaymentAction = {
      type: "POSTING_PAYMENT"
    };
    dispatch(postingPaymentAction);

    try{
        const orderAxiosResponse = await postPayment(payment);
        const postedOrder = orderAxiosResponse.data;
    
        const postedOrderSucceededAction: IPostedPaymentSucceededAction = {
           type: "POSTED_PAYMENT_SUCCEEDED",
           result: postedOrder
        };
        return dispatch(postedOrderSucceededAction);
    }
    catch(error){
        const errorMessage = error.response.data.title;
        const postedOrderFailedAction : IPostedPaymentFailedAction = {
            type: "POSTED_PAYMENT_FAILED",
            errorMessage: errorMessage
        }
        return dispatch(postedOrderFailedAction);
    }
  };
}

export const resetPaymentApiStatusActionCreator : ActionCreator<IResetPaymentApiStatus> = () => {
  return {
    type: "RESET_PAYMENT_API_STATUS"
  }
};