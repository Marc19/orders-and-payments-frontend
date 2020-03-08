import React from 'react';
import {ActiveTab} from '../../models/ActiveTab';
import NavBar from '../NavBar/NavBar';
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { resetApiCallsStatusesActionCreator } from '../../redux/actions/order/orderActions';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			paddingTop: '2rem',
			paddingBottom: '2rem'
		}
	}),
);

interface Props {
    children: React.ReactNode;
    activeTab: ActiveTab;
}

const MainLayout = (props: Props) => {  
	const classes = useStyles();
	const dispatch = useDispatch();

	dispatch(resetApiCallsStatusesActionCreator());
	return (
		<>
			<NavBar activeTab={props.activeTab}/>
			<Container maxWidth="lg" className={classes.container}>
				{props.children}
			</Container>
		</>
	);
};

export default MainLayout;
