import React, { useState } from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl } from '@material-ui/core';
import OrderDetail from '../../models/OrderDetail';

interface Props {
    addOrEditOrderDetail: (newOrderDetail: OrderDetail, index?: number, finishedEditingCleanup?: Function) => void;
    isEditing?: boolean;
    product?: string;
    price?: string;
    count?: string;
    indexToBeEdited?: number;
    finishedEditingCleanup?: Function;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		addOrEditOrderDetailBtn: {
			marginTop: 12
		},
		textField: {
			marginRight: '1rem'
		}
	}),
);

export const CreateOrEditOrderItem = ({addOrEditOrderDetail, isEditing=false, product='', price='', count='', indexToBeEdited, finishedEditingCleanup}: Props) => {
	const [productText, setProductText] = useState(product);
	const [priceText, setPriceText] = useState(price);
	const [countText, setCountText] = useState(count);
	const [productTextError, setProductTextError] = useState<string|undefined>(undefined);
	const [priceTextError, setPriceTextError] = useState<string|undefined>(undefined);
	const [countTextError, setCountTextError] = useState<string|undefined>(undefined);

	const theme = useTheme();
	const classes = useStyles(theme);

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		switch(event.target.id){ 
			case 'product': { 
				setProductText(event.target.value);
				break; 
			} 
			case 'price': { 
				setPriceText(event.target.value);
				break; 
			} 
			case 'count': { 
				setCountText(event.target.value); 
				break; 
			}  
		}
	};

	const validateProductText = () => {
		if(productText.length < 2 || productText.length > 10){
			setProductTextError('must be between 2 and 10 characters');
		}
		else{
			setProductTextError(undefined);
		}
	};

	const validatePriceText = () => {
		const priceVal: number = parseFloat(priceText);
		if(!priceVal || priceVal <= 0){
			setPriceTextError('only positive numbers are allowed');
		}
		else{
			setPriceTextError(undefined);
		}
	};

	const validateCountText = () => {
		const countVal: number = parseInt(countText);
		if(!countVal || countVal <= 0 || countText.includes('.')){
			setCountTextError('only positive integers are allowed');
		}
		else{
			setCountTextError(undefined);
		}
	};

	const validateNewOrderDetail = () => {
		if(productTextError || priceTextError || countTextError){
			return false;
		}

		let fieldLeftEmpty = false;
		if(productText.trim().length === 0){
			setProductTextError('Required');
			fieldLeftEmpty = true;
		}

		if(priceText.trim().length === 0){
			setPriceTextError('Required');
			fieldLeftEmpty = true;
		}

		if(countText.trim().length === 0){
			setCountTextError('Required');
			fieldLeftEmpty = true;
		}

		if(fieldLeftEmpty){
			return false;
		}

		return true;
	};

	const addOrEditOrderDetailClicked = () => {
		if(!validateNewOrderDetail()){
			return;
		}

		const newOrderDetail: OrderDetail = {
			id: 0,
			product: productText,
			count: parseInt(countText),
			price: parseFloat(priceText)
		};

		addOrEditOrderDetail(newOrderDetail, indexToBeEdited, finishedEditingCleanup);
		setProductText('');
		setPriceText('');
		setCountText('');
	};

	return (
		<Grid container justify="center">
			<Grid item xs={4} md={2}>
				<TextField 
					className={classes.textField}
					id="product" 
					label="Product"
					value={productText}
					onChange={e => handleTextChange(e)} 
					onBlur={validateProductText}
					error={productTextError? true : false}
					helperText={productTextError? productTextError : ''}
				/>
			</Grid>

			<Grid item xs={4} md={2}>
				<TextField
					className={classes.textField} 
					id="price" 
					label="Price"
					value={priceText}
					onChange={e => handleTextChange(e)} 
					onBlur={validatePriceText}
					error={priceTextError? true : false}
					helperText={priceTextError? priceTextError : ''}
				/>
			</Grid>
            
			<Grid item xs={4} md={2}>
				<TextField
					className={classes.textField}
					id="count" 
					label="Count"
					value={countText}
					onChange={e => handleTextChange(e)} 
					onBlur={validateCountText}
					error={countTextError? true : false}
					helperText={countTextError? countTextError : ''}
				/>
			</Grid>
            
			<Grid item container xs={4} md={2}>
				<FormControl style={isEditing?{ marginLeft: 'auto' }:undefined}>
					<Button 
						onClick={addOrEditOrderDetailClicked}
						color="primary" 
						variant="contained" 
						className={classes.addOrEditOrderDetailBtn}
					> 
						{
							isEditing?
								'Edit order item'
								:
								'Add order item' 
						}
					</Button>
				</FormControl>
			</Grid>
			{
				isEditing?
					<Grid item container xs={4} md={2}>
						<FormControl style={{ marginLeft: '1rem' }}>
							<Button 
								onClick={() => finishedEditingCleanup? finishedEditingCleanup() : undefined}
								color="secondary" 
								variant="contained" 
								className={classes.addOrEditOrderDetailBtn}
							> 
                            Cancel
							</Button>
						</FormControl>
					</Grid>
					:
					''
			}
		</Grid>
	);
};