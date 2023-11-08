import styles from './RangeDatePicker.module.scss';
import {PropsRangeDatePicker} from './interfaces';
import {createContext, memo, useCallback, useEffect, useState} from 'react';
import clsx from 'clsx';
import {RiArrowLeftLine, RiArrowRightLine} from 'react-icons/ri';
import Button from '~/components/controls/Button';
import CalendarMain from './components/CalendarMain';

const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
export const ContextCalendar = createContext<any>(null);

function RangeDatePicker({
	onClose,
	onSetValue,
	value,
	open,
}: PropsRangeDatePicker) {
	const [dateLeft, setDateLeft] = useState(new Date());
	const [dateRight, setDateRight] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth() + 1)
	);

	const [dateHover, setDateHover] = useState<Date | null>(null);

	const [datePicker, setDatePicker] = useState<{
		to: Date | null;
		from: Date | null;
	}>({
		from: null,
		to: null,
	});

	const handleNext = useCallback(
		(isCalendarRight?: boolean) => {
			if (isCalendarRight) {
				setDateRight((prevDate) => {
					const month = prevDate.getMonth() + 1;
					const year = prevDate.getFullYear();
					const newDate = new Date(year, month);
					return newDate;
				});
			} else {
				setDateLeft((prevDate) => {
					const month = prevDate.getMonth() + 1;
					const year = prevDate.getFullYear();
					const newDate = new Date(year, month);
					if (newDate < dateRight) return newDate;
					else return prevDate;
				});
			}
		},
		[dateRight]
	);

	const handlePrev = useCallback(
		(isCalendarRight?: boolean) => {
			if (isCalendarRight) {
				setDateRight((prevDate) => {
					const month = prevDate.getMonth() - 1;
					const year = prevDate.getFullYear();
					const newDate = new Date(year, month);
					if (dateLeft < newDate) return newDate;
					else return prevDate;
				});
			} else {
				setDateLeft((prevDate) => {
					const month = prevDate.getMonth() - 1;
					const year = prevDate.getFullYear();
					const newDate = new Date(year, month);
					return newDate;
				});
			}
		},
		[dateLeft]
	);

	const titleMonthYear = (date: Date) => {
		return `Tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
	};

	const handleSubmit = useCallback(() => {
		if (datePicker.from && datePicker.to) {
			onSetValue(datePicker);
			onClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [datePicker]);

	//Cap nhat value neu co
	useEffect(() => {
		if (!open) {
			setDatePicker({
				from: value?.from,
				to: value?.to,
			});
		} else {
			if (!!value?.from && !!value?.to) {
				if (
					value?.from.getMonth() == value?.to.getMonth() &&
					value?.from.getFullYear() == value?.to.getFullYear()
				) {
					setDateLeft(new Date(value?.from.getTime()));
					setDateRight(
						new Date(
							value?.from.getFullYear(),
							value?.from.getMonth() + 1
						)
					);
				} else {
					setDateLeft(new Date(value?.from.getTime()));
					setDateRight(new Date(value?.to.getTime()));
				}
			}
		}
	}, [open, value?.from, value?.to]);

	return (
		<ContextCalendar.Provider
			value={{
				datePicker,
				setDateHover,
				dateHover,
				setDatePicker,
			}}
		>
			<div className={styles.container}>
				<div className={styles.groupCalendar}>
					<div className={styles.main}>
						<div className={styles.displayTitle}>
							<div
								className={clsx('btn', styles.arrow)}
								onClick={() => handlePrev(false)}
							>
								<RiArrowLeftLine />
							</div>
							<p>{titleMonthYear(dateLeft)}</p>
							<div
								className={clsx('btn', styles.arrow, {
									[styles.disable]:
										dateLeft.getFullYear() ==
											dateRight.getFullYear() &&
										dateLeft.getMonth() + 1 ==
											dateRight.getMonth(),
								})}
								onClick={() => handleNext(false)}
							>
								<RiArrowRightLine />
							</div>
						</div>
						<div className={styles.rows}>
							{daysOfWeek.map((day, i) => (
								<div className={styles.day} key={i}>
									{day}
								</div>
							))}
						</div>
						<CalendarMain date={dateLeft} />
					</div>
					<div className={styles.main}>
						<div className={styles.displayTitle}>
							<div
								className={clsx('btn', styles.arrow, {
									[styles.disable]:
										dateLeft.getFullYear() ==
											dateRight.getFullYear() &&
										dateLeft.getMonth() + 1 ==
											dateRight.getMonth(),
								})}
								onClick={() => handlePrev(true)}
							>
								<RiArrowLeftLine />
							</div>
							<p>{titleMonthYear(dateRight)}</p>
							<div
								className={clsx('btn', styles.arrow)}
								onClick={() => handleNext(true)}
							>
								<RiArrowRightLine />
							</div>
						</div>
						<div className={styles.rows}>
							{daysOfWeek.map((day, i) => (
								<div className={styles.day} key={i}>
									{day}
								</div>
							))}
						</div>
						<CalendarMain date={dateRight} />
					</div>
				</div>
				<div className={styles.groupBtn}>
					<Button
						primary
						bold
						rounded_8
						p_8_24
						onClick={handleSubmit}
						disable={!datePicker.from || !datePicker.to}
					>
						Áp dụng
					</Button>
					<Button
						grey_outline
						bold
						rounded_8
						p_8_24
						onClick={onClose}
					>
						Hủy bỏ
					</Button>
				</div>
			</div>
		</ContextCalendar.Provider>
	);
}

export default memo(RangeDatePicker);
