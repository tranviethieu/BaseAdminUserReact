import {useEffect, useState} from 'react';
import InfoItem from './components/InfoItem';
import {PropsSectionInfo} from './interfaces';
import styles from './SectionInfo.module.scss';
import {httpRequest} from '~/services';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import dashboardServices from '~/services/dashboardServices';

function SectionInfo({}: PropsSectionInfo) {
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);
	const [data, setData] = useState<any>();

	// Call api
	useEffect(() => {
		httpRequest({
			http: dashboardServices.overview({
				token: token!,
				AccountUuid: accountId as string,
			}),
		}).then((data) => {
			if (data) {
				setData(data);
			}
		});
	}, [accountId, token]);

	return (
		<div className={styles.container}>
			<InfoItem title='Lịch hẹn khám' number={data?.todayTicket} />
			<InfoItem title='Bệnh nhân mới' number={data?.newPatient} />
			<InfoItem title='Bệnh nhân cũ' number={data?.oldPatient} />
		</div>
	);
}

export default SectionInfo;
