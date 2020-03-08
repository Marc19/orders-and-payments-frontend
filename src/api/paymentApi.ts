import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './config';
import Payment from '../models/Payment';

export const postPayment = (payment: Payment): Promise<AxiosResponse<Payment>> => {
	return axios.post(BASE_URL + '/payments', payment);
};