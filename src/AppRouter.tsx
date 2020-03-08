import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import {store} from './redux/configureStore';
import MainLayout from './components/MainLayout/MainLayout';
import NotFound from './components/NotFound/NotFound';
import CreateOrderPage from './components/CreateOrderPage/CreateOrderPage';
import OrdersListPage from './components/OrderListPage/OrderListPage';

import { ActiveTab } from './models/ActiveTab';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';


const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#153B50',
			dark: '#0e212b',
			contrastText: '#fff',
		},
		secondary: {
			main: '#A0D2DB',
			dark: '#66868C',
			contrastText: '#fff',
		}
	}
});

function AppRouter() {
  
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<React.Fragment>
						{
							<Switch>
								<Route 
									path="/" 
									exact
									render={() => <Redirect to="/CreateOrder"/>}
								/>

								<Route path="/CreateOrder"
									render={() => <MainLayout activeTab={ActiveTab.CreateOrder}>
										<CreateOrderPage/>
									</MainLayout>}/>

								<Route path="/ListOrders"
									render={() => <MainLayout activeTab={ActiveTab.ListOrders}>
										<OrdersListPage/>
									</MainLayout>}/>

								<Route render={() => <MainLayout activeTab={ActiveTab.None}>
									<NotFound/>
								</MainLayout>}/>                                                     
							</Switch>
						}
					</React.Fragment>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>

	);
}

export default AppRouter;
