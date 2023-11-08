import CardItem from './components/CardItem';
import {PropsSectionRecentCalendar, TypeData} from './interfaces';
import {Stickynote} from 'iconsax-react';
import styles from './SectionRecentCalendar.module.scss';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {useEffect, useState} from 'react';
import {httpRequest} from '~/services';
import dashboardServices from '~/services/dashboardServices';
import LoadingData from '~/components/common/LoadingData';
import ImageFill from '~/components/common/ImageFill';
import backgrounds from '~/constants/images/backgrounds';

function SectionRecentCalendar({}: PropsSectionRecentCalendar) {
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<Array<TypeData>>([]);

	// Call api
	useEffect(() => {
		httpRequest({
			setLoading: setLoading,
			http: dashboardServices.getCalendarRecently({
				token: token!,
				AccountUuid: accountId as string,
				Limit: 6,
				Page: 1,
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
						<Stickynote
							className={styles.icon_stic}
							variant='Bold'
							color='#4CD28A'
						/>
					</span>
					<h3>Khám gần đây</h3>
				</div>
				{/* <Link
					href={'/patient-examination?_status=happenning'}
					className={styles.btn}
				>
					Tất cả
					<RiArrowRightSLine className={styles.icon} />
				</Link> */}
			</div>
			<LoadingData isLoading={loading}>
				{data?.length > 0 ? (
					<div className={styles.main}>
						{data.map((v) => (
							<CardItem key={v.uuid} data={v} />
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

export default SectionRecentCalendar;
