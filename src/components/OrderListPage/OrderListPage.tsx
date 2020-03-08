import React, { useEffect, useState } from 'react';

import {OrderItemsList} from '../OrderItemsList/OrderItemsList';

import Order from '../../models/Order';
import Payment from '../../models/Payment';
import {AppState, ApiStatus} from '../../redux/reducers/initialState';
import {getOrdersActionCreator, getOrderByIdActionCreator, deleteOrderActionCreator} from '../../redux/actions/order/orderActions';
import {postPaymentActionCreator, resetPaymentApiStatusActionCreator} from '../../redux/actions/payment/paymentActions';

import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PaymentIcon from '@material-ui/icons/Payment';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip, Checkbox, FormControlLabel } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import {AlertMessage} from '../AlertMessage/AlertMessage';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		filterInputs: {
			marginTop: '4rem'
		},
		table: {
			minWidth: 650,
		},
		tableHeader: {
			color: theme.palette.primary.dark
		},
		tableData: {
			color: theme.palette.primary.main
		},
		search: {
			display: 'flex',
			marginBottom: '2rem'
		},
		paper: {
			position: 'absolute',
			width: 400,
			backgroundColor: theme.palette.background.paper,
			border: '2px solid ' + theme.palette.secondary.main,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		}
	}),
);

const getModalStyle = () => {
	const top = 50;
	const left = 50;
  
	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
};

const OrderListPage = () => {
	const [searchText, setSearchText] = useState('');
	const [showPaidOnly, setShowPaidOnly] = useState(false);
	const [showOrderDetailsId, setShowOrderDetailsId] = useState(-1);
	const [alertMessageOpen, setAlertMessageOpen] = useState(false);
	const [lastPaidOrderId, setLastPaidOrderId] = useState(-1);

	const orders: Order[]= useSelector((state: AppState) => state.orderState.orders, shallowEqual);
	const gettingOrdersStatus = useSelector((state: AppState) => state.orderState.gettingOrdersStatus);
	const payingOrderStatus = useSelector((state: AppState) => state.paymentState.payingOrderStatus);
	const payingOrderErrorMessage = useSelector((state: AppState) => state.paymentState.payingOrderErrorMessage);
            
	const dispatch = useDispatch();
    
	const theme = useTheme();
	const classes = useStyles(theme);

	useEffect( () => {
		dispatch(getOrdersActionCreator());
	}, [dispatch]);

	useEffect( () => {
		if(payingOrderStatus === ApiStatus.CALL_SUCCEEDED || payingOrderStatus === ApiStatus.CALL_FAILED){
			setAlertMessageOpen(true);
		}

		if(payingOrderStatus === ApiStatus.CALL_SUCCEEDED){
			dispatch(getOrderByIdActionCreator(lastPaidOrderId));
		}
	}, [dispatch, payingOrderStatus, lastPaidOrderId]);

	const handleModalClose = () => {
		setShowOrderDetailsId(-1);
	};

	const orderClicked = (id: number|undefined) => {
		if(!id){
			return;
		}
		setShowOrderDetailsId(id);
	};

	const searchTextChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearchText(event.target.value);
	}; 

	const matchFilters = (o: Order, i: number) => {
		if(showPaidOnly && !o.isPaid){
			return false;
		} 
        
		if(searchText.length < 2){
			return true;
		}

		const productsArray = o.orderDetails?.map(od => od.product) || [];
        
		for (let index = 0; index < productsArray.length; index++) {
			const product = productsArray[index];
			if(product?.toLowerCase().includes(searchText.toLowerCase())){
				return true;
			}
		}

		return false;
	};

	const payOrderClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: number) => {
		if(!id){
			return;
		}        
		event.stopPropagation();

		const payment: Payment = {
			orderId: id
		};

		dispatch(postPaymentActionCreator(payment));
		setLastPaidOrderId(id);
	};

	const deleteOrderClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: number) => {
		if(!id){
			return;
		}     
		event.stopPropagation();

		dispatch(deleteOrderActionCreator(id));
	};

	const onAlertMessageClose = (event?: React.SyntheticEvent, reason?: string) => {
		setAlertMessageOpen(false);
	};

	const onAlertMessageExited = () => {
		dispatch(resetPaymentApiStatusActionCreator());
	};

	return (
		<>
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={showOrderDetailsId>0}
				onClose={handleModalClose}
			>
				<div style={getModalStyle()} className={classes.paper}>
					<h2 style={{ color:theme.palette.primary.main }} id="simple-modal-title">Order items for order number: {showOrderDetailsId}</h2>
					<OrderItemsList 
						orderDetails={orders.find(o => o.id === showOrderDetailsId)?.orderDetails || []}
						withActions={false}
						deleteItem={()=>{}}
						editItem={()=>{}}
					/>
				</div>
			</Modal>
            
			<Grid container justify="space-between" className={classes.filterInputs}>
				<Grid item xs={6} md={10}> 
					<TextField id="search" value={searchText} onChange={(e) => searchTextChanged(e)} label="search by entering order details" className={classes.search} color="secondary" />
				</Grid>

				<Grid container item xs={6} md={2} justify="flex-end" style={{ color: theme.palette.primary.main }}>
					<FormControlLabel
						control={
							<Checkbox onChange={() => setShowPaidOnly(!showPaidOnly)} />
						}
						label="Paid orders"
					/>
				</Grid>
			</Grid>
            
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableHeader}>Order number</TableCell>
							<TableCell className={classes.tableHeader}>Number of items</TableCell>
							<TableCell className={classes.tableHeader}>Price</TableCell>
							<TableCell className={classes.tableHeader}>Placement date</TableCell>
							<TableCell className={classes.tableHeader}>Payment</TableCell>
							<TableCell className={classes.tableHeader}>Actions</TableCell>
						</TableRow>
					</TableHead>
                   
					<TableBody>
						{
							gettingOrdersStatus === ApiStatus.CALLING?
								<TableRow>
									<TableCell colSpan={6} align="center">
										<CircularProgress color="secondary" /> 
									</TableCell>
								</TableRow>
								:
								gettingOrdersStatus === ApiStatus.CALL_FAILED?
									<TableRow>
										<TableCell colSpan={6} align="center"> Something went wrong! </TableCell>
									</TableRow>
									:
									!orders || orders.length === 0?
										<TableRow>
											<TableCell colSpan={6} align="center"> No Orders found </TableCell>
										</TableRow>
										:
										orders.filter(matchFilters).map(o => (
											<TableRow key={o.id} hover onClick={() => orderClicked(o.id)}>
												<TableCell className={classes.tableData}> {o.id} </TableCell>
												<TableCell className={classes.tableData}> {o.totalNumberOfItems} </TableCell>
												<TableCell className={classes.tableData}> {o.totalAmount} </TableCell>
												<TableCell className={classes.tableData}> {o.creationDate} </TableCell>
												<TableCell className={classes.tableData}>
													{
														o.isPaid?
                                    o.payment?.paymentDate
															:
															<Tooltip title="pay" placement="top">
																<IconButton color="primary" aria-label="pay" size="medium" onClick={(e) => payOrderClicked(e, o.id)}>
																	<PaymentIcon color="secondary" />
																</IconButton>
															</Tooltip>
													}
												</TableCell>
												<TableCell>
													<Tooltip title="delete" placement="top">
														<IconButton onClick={(e) => deleteOrderClicked(e, o.id)} edge="end" aria-label="edit" color="secondary">
															<DeleteIcon />
														</IconButton>
													</Tooltip>
												</TableCell>
											</TableRow>
										))
						}
					</TableBody>
				</Table>
			</TableContainer>
        
			<AlertMessage 
				isOpen={alertMessageOpen} 
				severity={payingOrderStatus === ApiStatus.CALL_SUCCEEDED? 'success' : 
					payingOrderStatus === ApiStatus.CALL_FAILED? 'error' : undefined}
				onClose={onAlertMessageClose}
				onAlertMessageExited={onAlertMessageExited}
			> 
				{
					payingOrderStatus === ApiStatus.CALL_SUCCEEDED?
						'Successful payment'
						:
						payingOrderStatus === ApiStatus.CALL_FAILED?
						// "Couldn't make the payment"
							payingOrderErrorMessage
							:
							''
				}
			</AlertMessage>
		</>
	);
};

export default OrderListPage;