import {getISOWeek} from 'date-fns';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import allLocales from '@fullcalendar/core/locales-all';
import FullCalendar from '@fullcalendar/react';
import styles from './MainCalendar.module.scss';
import {startOfWeek} from 'date-fns';
import convertDate from '~/common/func/convertDate';
import {TYPE_EXAM} from '~/constants/mock/enum';
import {useEffect, useMemo, useState} from 'react';
import {httpRequest} from '~/services';
import timesheetService from '~/services/timesheet';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingData from '~/components/common/LoadingData';

function MainCalendar() {
	const {accountId, infoDoctor} = useSelector(
		(state: RootState) => state.user
	);
	const {token} = useSelector((state: RootState) => state.auth);

	// Lấy tuần hiện tại
	const currentWeek = getISOWeek(new Date());

	// Danh sách tuần convert
	const week = [8, 2, 3, 4, 5, 6, 7];

	// Lấy ngày đầu tiên trong tuần hiện tại
	const startDayOfWeek = startOfWeek(new Date());

	// STATE
	const [data, setData] = useState<Array<any>>([]);
	const [loading, setLoading] = useState<boolean>(false);

	// Hàm Lấy giờ có lịch làm việc sớm nhất trong tuần
	const getTimeMin = (arr: any) => {
		let min = arr[0]?.start;
		for (let i = 0; i < arr?.length; i++) {
			if (new Date(arr[i]?.start).getHours() < new Date(min).getHours()) {
				min = arr[i]?.start;
			}
		}
		return min;
	};

	// Hàm Covert data calender
	const convertData = (arrData: Array<any>) => {
		// Mảng data
		let data: any = [];

		// Lặp lấy tất cả ngày trong tuần bắt đầu từ startDayOfWeek
		for (let i = 0; i < 7; i++) {
			// Mỗi lần lặp thì cộng thêm 1 ngày cho ngày bắt đầu trong tuần
			startDayOfWeek.setDate(startDayOfWeek.getDate() + 1);

			// lặp mảng data đầu vào
			arrData.forEach((item) => {
				// Lặp mảng time ==> covert time start, end
				item.times.forEach((time: any) => {
					// Kiểm tra thứ trong mảng = thứ thứ trong tuần
					if (time.daysOfWeek == week[startDayOfWeek.getDay()]) {
						// Nếu thứ trong mảng = thứ trong tuần thì thêm data vào mảng
						data.push({
							id: item.uuid,
							start: `${convertDate(
								startDayOfWeek
							).getDateSubmit()}T${time.timeStart}`,
							end: `${convertDate(
								startDayOfWeek
							).getDateSubmit()}T${time.timeEnd}`,
							color:
								item.addressType.id == TYPE_EXAM.CO_SO_Y_TE
									? '#2A85FF'
									: item.addressType.id ==
									  TYPE_EXAM.TRUC_TUYEN
									? '#8E59FF'
									: '#9D88F0',
							title: item.name,
						});
					}
				});
			});
		}

		// Trả ra data
		return data;
	};

	// Call api
	useEffect(() => {
		httpRequest({
			setLoading: setLoading,
			http: timesheetService.getCalendarDoctor({
				token: token!,
				addressType: null,
				AccountUuid: accountId as string,
				HospitalUuid: infoDoctor?.hospitalUuid as string,
			}),
		}).then((data) => {
			if (data) {
				setData(data.items);
			}
		});
	}, [accountId, infoDoctor?.hospitalUuid, token]);

	// set data arrayCalendar
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const arrayCalendar = useMemo(() => convertData(data), [data]);

	const scrollMinTime = useMemo(
		() => convertDate(getTimeMin(arrayCalendar)).getTime(),
		[arrayCalendar]
	);

	return (
		<LoadingData isLoading={loading}>
			<div className={styles.container}>
				<div className={styles.top}>
					<p className={styles.week}>Tuần {currentWeek}</p>
					<div className={styles.right}>
						<div className={styles.item}>
							<div
								className={styles.box}
								style={{backgroundColor: '#2A85FF'}}
							></div>
							<p className={styles.text}>Tại CSYT</p>
						</div>
						<div className={styles.item}>
							<div
								className={styles.box}
								style={{backgroundColor: '#8E59FF'}}
							></div>
							<p className={styles.text}>Trực tuyến</p>
						</div>
					</div>
				</div>

				<div className={styles.line}></div>

				<div className={styles.main}>
					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin]} // add Plugin
						initialView='timeGridWeek' // Hiện thị theo tuần
						headerToolbar={{
							start: '',
							center: '',
							end: '',
						}} // Tắt header FullCalendar
						allDaySlot={false} // Tắt slot all day
						locales={allLocales}
						locale={'vi'} // Convert về tiếng việt
						slotLabelFormat={{
							hour: '2-digit',
							minute: '2-digit',
							hour12: false,
						}} // Format time 24h
						dayHeaderContent={({date}) =>
							date.toLocaleDateString('vi', {weekday: 'short'})
						} // Convert thứ của thead table
						scrollTime={scrollMinTime} // Scoll về giờ có lịch làm việc sớm nhất trong tuần
						slotDuration='00:30:00' // Config khoảng thời gian
						slotEventOverlap={false} // Config của event trùng giờ không đè lên nhau
						events={arrayCalendar} // Add events
						// Còn lại
						editable={true}
						selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						nowIndicator={false}
					/>
				</div>
			</div>
		</LoadingData>
	);
}

export default MainCalendar;
