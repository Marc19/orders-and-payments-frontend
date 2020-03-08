import React, { useState } from 'react';
import { List, makeStyles, Theme, createStyles, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import OrderDetail from '../../models/OrderDetail';
import {OrderItem} from '../OrderItem/OrderItem';
import { CreateOrEditOrderItem } from '../CreateOrEditOrderItem/CreateOrEditOrderItem';

interface Props {
    orderDetails: OrderDetail[];
    withActions: boolean;
    deleteItem: Function;
    editItem: (newOrderDetail: OrderDetail, index?: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		list: {
			color: theme.palette.primary.main
		}
	}),
);

export const OrderItemsList = ({orderDetails, withActions, deleteItem, editItem}: Props) => {
	const [indexOfItemBeingEdited, setIndexOfItemBeingEdited] = useState(-1);

	const theme = useTheme();
	const classes = useStyles(theme);

	const markItemBeingEdited = (index: number) => {
		setIndexOfItemBeingEdited(index);
	};

	const finishedEditingCleanup = () => {
		setIndexOfItemBeingEdited(-1);
	};

	return (
		<List className={classes.list}>
			{
				orderDetails.map((o,i) =>
					indexOfItemBeingEdited === i?
						<div key={i}>
							<Divider variant="inset" component="li" style={{  marginBottom: '1rem' }} />
							<CreateOrEditOrderItem 
								product={o.product}
								price={o.price?.toString()}
								count={o.count?.toString()}
								isEditing={true} 
								addOrEditOrderDetail={editItem}
								indexToBeEdited={i}
								finishedEditingCleanup={finishedEditingCleanup}
							/>
							<Divider variant="inset" component="li" style={{ marginTop: '1rem' }} />
						</div>
						:
						<OrderItem 
							key={i} 
							index={i} 
							orderDetail={o} 
							isBeingEdited={false}
							withActions={withActions} 
							deleteItem={deleteItem}
							markItemBeingEdited={markItemBeingEdited} 
						/>
				)        
			}                
		</List>
	);
};