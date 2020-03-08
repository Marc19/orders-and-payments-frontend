import React, { useState, useEffect } from 'react';

import OrderDetail from '../../models/OrderDetail';

import {CreateOrEditOrderItem} from '../CreateOrEditOrderItem/CreateOrEditOrderItem';
import {OrderItemsList} from '../OrderItemsList/OrderItemsList';
import {AlertMessage} from '../AlertMessage/AlertMessage';

import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { postOrderActionCreator, resetApiCallsStatusesActionCreator } from '../../redux/actions/order/orderActions';
import Order from '../../models/Order';
import { AppState, ApiStatus } from '../../redux/reducers/initialState';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			marginTop: '4rem',
			marginBottom: '2rem'
		},
		orderItemsCard: {
			marginTop: '4rem',
		},
		cardHeader: {
			color: theme.palette.primary.main
		},
		emptyCardContent: {
			color: theme.palette.secondary.main,
			display: 'flex',
			justifyContent: 'center'
		},
		orderItemsPerfectScrollbar: {
			border: '1px solid ' + theme.palette.secondary.main,
			borderRadius: '8px',
			margin: '0.5rem'
		},
		orderItemsCardContent: {
			maxHeight: '45vh'
		},
		ConfirmOrderBtn: {
			margin: '1rem',
			marginLeft: 'auto'
		}
	}),
);

const CreateOrderPage = () => {
	const [currentOrderDetails, setCurrentOrderDetails] = useState<OrderDetail[]>([]);
	const [alertMessageOpen, setAlertMessageOpen] = useState(false);

	const postingOrderStatus = useSelector((state: AppState) => state.orderState.postingOrderStatus);
	const postingOrderErrorMessage = useSelector((state: AppState) => state.orderState.postingOrderErrorMessage);

	const dispatch = useDispatch();

	const theme = useTheme();
	const classes = useStyles(theme);

	useEffect( () => {
		if(postingOrderStatus === ApiStatus.CALL_SUCCEEDED || postingOrderStatus === ApiStatus.CALL_FAILED){
			setAlertMessageOpen(true);
			setCurrentOrderDetails([]);
		}
	}, [postingOrderStatus]);

	const addOrderDetail = (newOrderDetail: OrderDetail) => {
		setCurrentOrderDetails([ ...currentOrderDetails, newOrderDetail ]);
	};

	const deleteItemClicked = (index: number) => {
		setCurrentOrderDetails(currentOrderDetails.filter( (o, i) => index !== i));
	};

	const editItem = (orderDetail: OrderDetail, index?: number, finishedEditingCleanup?: Function) => {
		const newOrderDetails = currentOrderDetails.map( (o, i) => {
			if(i === index){
				return orderDetail;
			} 
			else{
				return o;
			}
		});

		setCurrentOrderDetails(newOrderDetails);
        
		if(finishedEditingCleanup){
			finishedEditingCleanup();
		}
	};

	const confirmOrderClicked = () => {
		const order: Order = {
			orderDetails: currentOrderDetails
		};
		dispatch(postOrderActionCreator(order));
	};

	const onAlertMessageClose = (event?: React.SyntheticEvent, reason?: string) => {
		setAlertMessageOpen(false);
	};

	const onAlertMessageExited = () => {
		dispatch(resetApiCallsStatusesActionCreator());
	};
        
	return (
		<>
			<Grid container justify="center" className={classes.title}>
				<Typography variant="h6" color="secondary">
                    Simulate the creation of an order by adding custom order items manually
				</Typography>
			</Grid>

			<CreateOrEditOrderItem addOrEditOrderDetail={addOrderDetail}/>

			<Card className={classes.orderItemsCard}>
				<CardHeader className={classes.cardHeader} title="Order items" />
				{
					postingOrderStatus === ApiStatus.CALLING?
						<CardContent className={classes.emptyCardContent}>
							<CircularProgress color="secondary" /> 
						</CardContent>
						:
						postingOrderStatus === ApiStatus.CALL_FAILED?
							<CardContent className={classes.emptyCardContent}>
								<p>Something went wrong</p>
							</CardContent>
							:
							currentOrderDetails.length === 0?
								<CardContent className={classes.emptyCardContent}>
									<p>Start adding order items</p>
								</CardContent>
								:
								<PerfectScrollbar className={classes.orderItemsPerfectScrollbar}>
									<CardContent className={classes.orderItemsCardContent}>
										<OrderItemsList 
											orderDetails={currentOrderDetails} 
											withActions={true} 
											deleteItem={deleteItemClicked}
											editItem={editItem}
										/>
									</CardContent>
								</PerfectScrollbar>
				}
                
				<CardActions disableSpacing>
					<Button onClick={confirmOrderClicked} color="primary" variant="contained" className={classes.ConfirmOrderBtn}>
                        Confirm Order
					</Button>
				</CardActions>
			</Card>
                
			<AlertMessage 
				isOpen={alertMessageOpen} 
				severity={postingOrderStatus === ApiStatus.CALL_SUCCEEDED? 'success' : 
					postingOrderStatus === ApiStatus.CALL_FAILED? 'error' : undefined}
				onClose={onAlertMessageClose}
				onAlertMessageExited={onAlertMessageExited}
			> 
				{
					postingOrderStatus === ApiStatus.CALL_SUCCEEDED?
						'Order was created successfully'
						:
						postingOrderStatus === ApiStatus.CALL_FAILED?
							postingOrderErrorMessage
							:
							''
				}
			</AlertMessage>
		</>
	);
};

export default CreateOrderPage;