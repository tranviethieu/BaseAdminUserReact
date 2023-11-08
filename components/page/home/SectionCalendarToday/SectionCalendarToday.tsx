import {Calendar2} from 'iconsax-react';
import ItemCalendarToday from './components/ItemCalendarToday';
import Link from 'next/link';
import {PropsSectionCalendarToday, TypeCalendarToday} from './interfaces';
import {RiArrowRightSLine} from 'react-icons/ri';
import styles from './SectionCalendarToday.module.scss';
import {useEffect, useState} from 'react';
import {httpRequest} from '~/services';
import dashboardServices from '~/services/dashboardServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingData from '~/components/common/LoadingData';
import ImageFill from '~/components/common/ImageFill';
import backgrounds from '~/constants/images/backgrounds';

function SectionCalendarToday({}: PropsSectionCalendarToday) {
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<Array<TypeCalendarToday>>([]);

	// Call api
	useEffect(() => {
		httpRequest({
			setLoading: setLoading,
			http: dashboardServices.getCalendarToday({
				token: token!,
				AccountUuid: accountId as string,
				From: null,
				To: null,
			}),
		}).then((data) => {
			if (data) {
				setData(data.items);
			}
		});
	}, [accountId, token]);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.title}>
					<span className={styles.icon}>
						<Calendar2 variant='Bold' color='#0071CE' />
					</span>
					<h3>Lịch khám hôm nay</h3>
				</div>

				{/* <Link className={styles.btn} href='/patient-examination'>
					Tất cả
					<RiArrowRightSLine className={styles.icon} />
				</Link> */}
			</div>
			<LoadingData isLoading={loading}>
				{data.length > 0 ? (
					<div className={styles.main}>
						{data.map((v, i) => (
							<ItemCalendarToday
								key={i}
								time={v.time}
								users={v.patients}
								isOdd={false}
							/>
						))}
					</div>
				) : (
					<div className={styles.noti}>
						<ImageFill
							src={backgrounds.empty_notify}
							className={styles.image_noti}
						/>
						<h4 className={styles.title_noti}>
							Không có lịch khám nào
						</h4>
						<p className={styles.text_noti}>
							Có vẻ như hôm nay bạn chưa có lịch khám nào.
						</p>
					</div>
				)}
			</LoadingData>
		</div>
	);
}

export default SectionCalendarToday;
