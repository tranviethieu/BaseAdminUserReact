import clsx from 'clsx';
import {Fragment, memo} from 'react';
import style from './ButtonRemember.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toggleRememberPass} from '~/redux/reducer/auth';

function ButtonRemember() {
	const {isRemember} = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch();

	/********** toggle remember password **********/
	const handleToggle = () => {
		dispatch(toggleRememberPass(!isRemember));
	};

	return (
		<Fragment>
			<div className={style.main}>
				<div
					className={clsx([style.btn, {[style.on]: isRemember}])}
					onClick={handleToggle}
				>
					<span className={clsx([style.switch])}></span>
				</div>
			</div>
		</Fragment>
	);
}

export default memo(ButtonRemember);
