import {CalendarEdit} from 'iconsax-react';
import CardItem from './components/CardItem';
import {PropsSectionCalendarSoon} from './interfaces';
import {RiArrowRightSLine} from 'react-icons/ri';
import styles from './SectionCalendarSoon.module.scss';
import Link from 'next/link';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import dashboardServices from '~/services/dashboardServices';
import LoadingData from '~/components/common/LoadingData';
import {useQuery} from 'react-query';
import {QUERY_APPOINTMENT_SCHEDULE} from '~/constants/mock/enum';
import ImageFill from '~/components/common/ImageFill';
import backgrounds from '~/constants/images/backgrounds';

function SectionCalendarSoon({}: PropsSectionCalendarSoon) {
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const {data, isLoading} = useQuery({
		queryKey: [
			QUERY_APPOINTMENT_SCHEDULE.WAIT, // KEY REACT QUERY
			accountId,
			token,
		],
		queryFn: async () => {
			const res = await httpRequest({
				http: dashboardServices.getCalendarAwait({
					token: token!,
					AccountUuid: accountId as string,
					Limit: 6,
					Page: 1,
				}),
			});
			if (res) {
				return {
					items: res.items || [],
				};
			}
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.title}>
					<span className={styles.icon}>
						<CalendarEdit variant='Bold' color='#FF6A55' />
					</span>
					<h3>Lịch khám sắp tới</h3>
				</div>
				{/* <Link href={'/appointment-schedule'} className={styles.btn}>
					Tất cả
					<RiArrowRightSLine className={styles.icon} />
				</Link> */}
			</div>
			<LoadingData isLoading={isLoading}>
				<div className={styles.main}>
					{data?.items?.length > 0 ? (
						<>
							{data?.items.map((v: any) => (
								<CardItem key={v.uuid} data={v} />
							))}
						</>
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
				</div>
			</LoadingData>
		</div>
	);
}

export default SectionCalendarSoon;
