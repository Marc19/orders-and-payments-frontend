import axios, { AxiosResponse } from 'axios';

import Payment from '../models/Payment';
import { BASE_URL } from './config';

export const postPayment = (payment: Payment): Promise<AxiosResponse<Payment>> => {
	return axios.post(BASE_URL + '/payments', payment);
};