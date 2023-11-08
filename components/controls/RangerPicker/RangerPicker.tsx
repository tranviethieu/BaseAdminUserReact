import DatePicker from 'antd/lib/date-picker';
import clsx from 'clsx';
import {CloseCircle} from 'iconsax-react';
import moment from 'moment';
import styles from './RangerPicker.module.scss';

function RangerPicker({
	setValue,
	value,
	placeholder = ['Bắt đầu', 'Kết thúc'],
	nameValue,
	setDateFilter,
}: {
	setValue: (any: any) => void;
	value: any;
	nameValue: any;
	setDateFilter?: any;
	placeholder?: any;
}) {
	return (
		<div className={clsx(styles.container)}>
			<DatePicker.RangePicker
				className={styles.date}
				placeholder={placeholder}
				value={[
					value[nameValue[0]]
						? moment(value[nameValue[0]], 'YYYY-MM-DD')
						: value[nameValue[0]],
					value[nameValue[1]]
						? moment(value[nameValue[1]], 'YYYY-MM-DD')
						: value[nameValue[1]],
				]}
				onChange={(e: any) => {
					setDateFilter && setDateFilter('5');
					setValue((prev: any) => ({
						...prev,
						[nameValue[0]]: moment(e[0]._d, 'YYYY-MM-DD'),
						[nameValue[1]]: moment(e[1]._d, 'YYYY-MM-DD'),
					}));
				}}
			/>
			{value[nameValue[0]] && value[nameValue[1]] && (
				<div
					className={styles.btnClose}
					onClick={() => {
						setDateFilter && setDateFilter('4');
						setValue((prev: any) => ({
							...prev,
							[nameValue[0]]: null,
							[nameValue[1]]: null,
						}));
					}}
				>
					<CloseCircle variant='Bold' />
				</div>
			)}
		</div>
	);
}

export default RangerPicker;
