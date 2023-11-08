import clsx from 'clsx';
import {memo, useCallback, useContext, useMemo} from 'react';
import {ContextCalendar} from '../../RangeDatePicker';
import styles from '../../RangeDatePicker.module.scss';
import {PropsCalendarMain} from './interfaces';

function CalendarMain({date}: PropsCalendarMain) {
	const context = useContext<any>(ContextCalendar);

	const hover = useMemo(() => {
		if (context?.datePicker.from && context?.dateHover) {
			if (context?.dateHover > context?.datePicker.from) {
				return {
					start: context?.datePicker.from,
					end: context?.dateHover,
				};
			}
			return {
				start: context?.dateHover,
				end: context?.datePicker.from,
			};
		}

		return null;
	}, [context?.dateHover, context?.datePicker.from]);

	const handleDatePick = useCallback(
		(datePick: Date) => {
			//Logic chon ngay bat dau
			if (
				context?.datePicker.from == null ||
				context?.datePicker.to != null
			) {
				if (context?.datePicker.to != null) {
					return context?.setDatePicker(() => ({
						from: datePick,
						to: null,
					}));
				}
				return context?.setDatePicker((prev: any) => ({
					...prev,
					from: datePick,
				}));
			}

			//Logic chon ngay ket thuc
			if (context?.datePicker.to == null) {
				context?.setDateHover(null);
				if (datePick < context?.datePicker.from) {
					return context?.setDatePicker((prev: any) => ({
						from: datePick,
						to: prev.from,
					}));
				}

				return context?.setDatePicker((prev: any) => ({
					...prev,
					to: datePick,
				}));
			}
		},
		[context]
	);

	const handleHover = useCallback(
		(dateHover: Date) => {
			if (
				context?.datePicker.from != null &&
				context?.datePicker.to == null
			) {
				context?.setDateHover(dateHover);
			}
		},
		[context]
	);

	const rows = useMemo(() => {
		const currentDate = new Date();
		const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
		const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		const startDate = new Date(monthStart);
		const endDate = new Date(monthEnd);
		const rows = [];

		while (startDate.getDay() !== 0) {
			startDate.setDate(startDate.getDate() - 1);
		}

		while (startDate <= endDate) {
			const cells = [];

			for (let i = 0; i < 7; i++) {
				const currDate = new Date(startDate);
				cells.push(
					<div
						key={startDate.getTime()}
						className={clsx(styles.date, 'btn', {
							[styles.isStart]:
								currDate.getTime() ==
								context?.datePicker.from?.getTime(),
							[styles.isEnd]:
								currDate.getTime() ==
								context?.datePicker.to?.getTime(),
							[styles.disable]:
								startDate.getMonth() !== date.getMonth(),
							[styles.inHover]:
								hover &&
								hover.start < currDate &&
								hover.end > currDate,
							[styles.startHover]:
								hover &&
								hover.start.getTime() == currDate.getTime(),
							[styles.endHover]:
								hover &&
								hover.end.getTime() == currDate.getTime(),
							[styles.currentDate]:
								startDate.toDateString() ==
									currentDate.toDateString() &&
								startDate.getMonth() == date.getMonth(),
							[styles.inActive]:
								context?.datePicker.to &&
								currDate < context?.datePicker.to &&
								context?.datePicker.from &&
								currDate > context?.datePicker.from,
						})}
						onClick={() => handleDatePick(currDate)}
						onMouseOver={() => handleHover(currDate)}
					>
						{startDate.getDate()}
					</div>
				);
				startDate.setDate(startDate.getDate() + 1);
			}
			rows.push(
				<div className={styles.rows} key={startDate.getTime()}>
					{cells}
				</div>
			);
		}

		return rows;
	}, [
		context?.datePicker.from,
		context?.datePicker.to,
		date,
		handleDatePick,
		handleHover,
		hover,
	]);

	return <div onMouseLeave={() => context?.setDateHover(null)}>{rows}</div>;
}

export default memo(CalendarMain);
