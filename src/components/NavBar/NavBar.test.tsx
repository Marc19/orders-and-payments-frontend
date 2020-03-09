import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter,Link } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ActiveTab } from '../../models/ActiveTab';
import NavBar from './NavBar';

configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Navbar', () => {
	it('should display navbar', () => {
		const store = mockStore({orderState: {orders: []}});
		const wrapper = mount(
			<Provider store={store}>
				<BrowserRouter>
					<NavBar activeTab={ActiveTab.None}/>
				</BrowserRouter>
			</Provider>
		);
		expect(wrapper.find(Link)).toHaveLength(2);
	});

	it('should display stats div when array of orders is not empty', () => {
		const store = mockStore({orderState: {orders: [{name: 'someOrder'}]}});
		const wrapper = mount(
			<Provider store={store}>
				<BrowserRouter>
					<NavBar activeTab={ActiveTab.None}/>
				</BrowserRouter>
			</Provider>
		);

		expect(wrapper.find(NavBar).find('div').filterWhere(n => n.hasClass(/makeStyles-statsDiv-(\d+)/))).toHaveLength(1);
	});

	it('should not display stats div when array of orders is empty', () => {
		const store = mockStore({orderState: {orders: []}});
		const wrapper = mount(
			<Provider store={store}>
				<BrowserRouter>
					<NavBar activeTab={ActiveTab.None}/>
				</BrowserRouter>
			</Provider>
		);

		expect(wrapper.find(NavBar).find('div').filterWhere(n => n.hasClass(/makeStyles-statsDiv-(\d+)/))).toHaveLength(0);
	});
});