import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './config';
import Order from '../models/Order';

export const getOrders = (): Promise<AxiosResponse<Order[]>> => {
	return axios.get(BASE_URL + '/orders');
};

export const getOrderById = (id: number): Promise<AxiosResponse<Order>> => {
	return axios.get(BASE_URL + '/orders/' + id);
};

export const postOrder = (order: Order): Promise<AxiosResponse<Order>> => {
	return axios.post(BASE_URL + '/orders', order);
};

export const deleteOrder = (id: number): Promise<AxiosResponse<void>> => {
	return axios.delete(BASE_URL + '/orders/' + id);
};