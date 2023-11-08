import clsx from 'clsx';
import {ArrowDown2} from 'iconsax-react';
import {Fragment, useCallback, useMemo, useState} from 'react';
import styles from './ButtonDateRanger.module.scss';
import {PropsButtonDateRanger} from './interfaces';
import TippyHeadless from '@tippyjs/react/headless';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {updateSort} from '~/redux/reducer/sort';
import Moment from 'react-moment';
import RangeDatePicker from '../RangeDatePicker';

function ButtonDateRanger({Icon, title, keyName}: PropsButtonDateRanger) {
	const [show, setShow] = useState(false);

	const {[keyName]: valueCalendar} = useSelector(
		(state: RootState) => state.sort
	).sort;

	const dispatch = useDispatch();

	const handleChangeValue = useCallback(
		(data: any) => {
			dispatch(updateSort({name: keyName, value: data}));
		},
		[dispatch, keyName]
	);

	const dateString = useMemo(() => {
		if (valueCalendar) {
			return (
				<Fragment>
					:{' '}
					<b>
						<Moment format='DD/MM/YYYY' date={valueCalendar.from} />{' '}
						- <Moment format='DD/MM/YYYY' date={valueCalendar.to} />
					</b>
				</Fragment>
			);
		}

		return null;
	}, [valueCalendar]);

	return (
		<div>
			<TippyHeadless
				maxWidth={'100%'}
				interactive
				visible={show}
				onClickOutside={() => setShow(false)}
				placement='bottom-start'
				render={(attrs) => (
					<RangeDatePicker
						{...attrs}
						onClose={() => setShow(false)}
						onSetValue={handleChangeValue}
						value={valueCalendar}
						open={show}
					/>
				)}
			>
				<div
					className={clsx(styles.containner, 'btn', {
						[styles.active]: show,
					})}
					onClick={() => setShow(!show)}
				>
					<div className={styles.box_icon}>
						<Icon size={16} />
					</div>
					<p className={styles.text}>
						{title}
						<span className={styles.time}>{dateString}</span>
					</p>
					{/* <ArrowDown2 className={styles.arrow} size={20} /> */}
					<div
						className={clsx(styles.box_icon, {
							[styles.down]: show,
						})}
					>
						<ArrowDown2 size={20} />
					</div>
				</div>
			</TippyHeadless>
		</div>
	);
}

export default ButtonDateRanger;
