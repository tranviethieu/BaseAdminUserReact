import {useState} from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import Calendar from './components/Calendar';
import {TypeButtonDatePicker} from './interfaces';
import clsx from 'clsx';
import styles from './ButtonDatePicker.module.scss';
import {CalendarSearch, ArrowDown2} from 'iconsax-react';
import convertDate from '~/common/func/convertDate';
import {useDispatch} from 'react-redux';
import {updateSort} from '~/redux/reducer/sort';

function ButtonDatePicker({
	keyNameTime,
	placeholder,
	value,
	blockOldDay,
	futureDayblock,
}: TypeButtonDatePicker) {
	const dispatch = useDispatch();

	const [show, setShow] = useState<boolean>(false);

	const handleClickDay = (time: number) => {
		setShow(false);
		dispatch(
			updateSort({
				name: keyNameTime,
				value: new Date(time),
			})
		);
	};

	return (
		<HeadlessTippy
			interactive
			visible={show}
			placement='bottom'
			onClickOutside={() => setShow(false)}
			render={(attrs) => (
				<Calendar
					onClickDay={handleClickDay}
					show={show}
					blockOldDay={blockOldDay}
					futureDayblock={futureDayblock}
				/>
			)}
		>
			<div
				className={clsx(styles.calendar)}
				onClick={() => setShow(!show)}
			>
				<div className={styles.box_icon}>
					{<CalendarSearch size={16} />}
				</div>
				<div className={styles.text}>
					{value ? convertDate(value).getDateFormat() : placeholder}
				</div>
				<div className={clsx(styles.box_icon, {[styles.down]: show})}>
					<ArrowDown2 size={20} />
				</div>
			</div>
		</HeadlessTippy>
	);
}

export default ButtonDatePicker;
