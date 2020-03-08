import OrderDetail from './OrderDetail';
import Payment from './Payment';

export default interface Order {
    id?: number;
    totalNumberOfItems?: number;
    totalAmount?: number;
    creationDate?: string;
    isPaid?: boolean;
    orderDetails?: OrderDetail[];
    payment?: Payment;
}