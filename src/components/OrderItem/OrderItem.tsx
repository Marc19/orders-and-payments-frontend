import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import OrderDetail from '../../models/OrderDetail';

interface Props {
    index: number;
    orderDetail: OrderDetail;
    isBeingEdited: boolean;
    withActions: boolean;
    deleteItem: Function;
    markItemBeingEdited: (index: number) => void;
}

export const OrderItem = ({index, orderDetail, withActions, deleteItem, markItemBeingEdited}: Props) => {
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar>
					<ShoppingBasketIcon color="secondary"/>
				</Avatar>
			</ListItemAvatar>

			<ListItemText
				primary={orderDetail.product}
				secondary={'Price: ' + orderDetail.price + ', Count: ' + orderDetail.count} 
			/>
			{
				withActions?
					<ListItemSecondaryAction>
						<IconButton onClick={() => markItemBeingEdited(index)} edge="end" aria-label="edit" color="secondary">
							<EditIcon />
						</IconButton>
                    
						<IconButton onClick={() => deleteItem(index)} edge="end" aria-label="delete" color="secondary">
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
					:
					''
			}
		</ListItem>
	);
};