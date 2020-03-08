import React from 'react';
import { useTheme } from '@material-ui/core';

const NotFound = () => {
	const theme = useTheme();

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<p style={{ color: theme.palette.secondary.main }}>The page is not found</p>
		</div>
	);
};

export default NotFound;