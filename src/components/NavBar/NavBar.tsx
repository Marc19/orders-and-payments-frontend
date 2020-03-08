import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme,useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { shallowEqual,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ActiveTab } from '../../models/ActiveTab';
import Order from '../../models/Order';
import { AppState } from '../../redux/reducers/initialState';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuItem: {
			marginRight: theme.spacing(2),
		},
		link: {
			textDecoration: 'none',
			color: 'inherit'
		},
		statsDiv: {
			marginLeft: 'auto',
			display: 'flex',
			justifyContent: 'center'
		}
	}),
);

interface Props{
		activeTab: ActiveTab;
}

const NavBar = ({activeTab}: Props) => {
	const theme = useTheme();
	const classes = useStyles(theme);

	const orders: Order[] = useSelector((state: AppState) => state.orderState.orders, shallowEqual); 

	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar>

					<Typography variant="h6" className={classes.menuItem}>
							Orders and Payments
					</Typography>
						
					<Link to="/CreateOrder" className={classes.link + ' ' + classes.menuItem}>
						<Button 
							color="inherit"
							variant={activeTab === ActiveTab.CreateOrder? 'outlined' : undefined}
						>
												Create Order 
						</Button>
					</Link>

					<Link to="/ListOrders" className={classes.link + ' ' + classes.menuItem}>
						<Button 
							color="inherit" 
							variant={activeTab === ActiveTab.ListOrders? 'outlined' : undefined}
						>
												List Orders
						</Button>
					</Link>

					{
						orders.length > 0?
							<div className={classes.statsDiv}>
								<p>
									Total orders: {orders.length} &nbsp;
								</p>

								<p>
									Paid orders: {orders.filter(o => o.isPaid? true : false).length} &nbsp;
								</p>

								<p>
									Unpaid orders: {orders.filter(o => o.isPaid? false : true).length}
								</p>
							</div>
							:
							''
					}

				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
