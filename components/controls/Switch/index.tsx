import clsx from 'clsx';
import {Fragment, memo, useState} from 'react';
import style from './Switch.module.scss';
import {TypeSwitch} from './interfaces';

function Switch({checkOn, onClick}: TypeSwitch) {
	return (
		<Fragment>
			<div className={style.main} onClick={() => onClick && onClick()}>
				<div className={clsx([style.btn, {[style.on]: checkOn}])}>
					<span className={clsx([style.switch])}></span>
				</div>
			</div>
		</Fragment>
	);
}

export default memo(Switch);
