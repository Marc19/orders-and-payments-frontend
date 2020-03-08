import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { Color } from '@material-ui/lab/Alert';
import React from 'react';

interface Props {
    isOpen: boolean;
    severity?: Color;
    children: React.ReactNode;
    onClose: (event: React.SyntheticEvent, reason?: string) => void;
    onAlertMessageExited?: () => void;
}

export const AlertMessage = ({isOpen, severity, children, onClose, onAlertMessageExited}: Props) => {
	return (
		<Snackbar 
			open={isOpen} 
			autoHideDuration={3000} 
			onClose={onClose} 
			onExited={() => onAlertMessageExited? onAlertMessageExited() : undefined}
		>
			<MuiAlert elevation={6} variant="filled" onClose={onClose} severity={severity}>
				{children}
			</MuiAlert>
		</Snackbar>
	);
};