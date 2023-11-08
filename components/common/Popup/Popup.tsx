import React, {Fragment, useEffect} from 'react';

import Portal from '../Portal';
import clsx from 'clsx';
import style from './Popup.module.scss';

/*===========> INTERFACE <==========*/
interface props {
	open: boolean;
	notOutside?: boolean;
	onClose: () => void;
	children?: React.ReactNode;
	[props: string]: any;
}

/*===========> MAIN COMPONENT <==========*/
function Overlay({open, notOutside, onClose, children}: props) {
	useEffect(() => {
		if (open) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'overlay';
		}
	}, [open]);

	// Truyền props notOutside thì không được click overlay ==> Popup đăng kí
	const handleClose = () => {
		if (!notOutside) {
			onClose();
		}
	};

	return (
		<Fragment>
			{open && (
				<Portal>
					<div
						className={clsx(style.overlay)}
						onClick={handleClose}
					></div>
					<div className={style.main}>{children}</div>
				</Portal>
			)}
		</Fragment>
	);
}

export default Overlay;
