import {useEffect, useState} from 'react';
import ChartWork from './components/ChartWork';
import {PropsSectionChart} from './interfaces';
import styles from './SectionChart.module.scss';
import {httpRequest} from '~/services';
import dashboardServices from '~/services/dashboardServices';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function SectionChart({}: PropsSectionChart) {
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [dataGender, setDataGender] = useState<any[]>([]);
	const [dataAddressType, setDataAddressType] = useState<any[]>([]);

	useEffect(() => {
		(async () => {
			Promise.all([
				httpRequest({
					http: dashboardServices.getGenders({
						token: token!,
						AccountUuid: accountId as string,
					}),
				}),
				httpRequest({
					http: dashboardServices.getAddressType({
						token: token!,
						AccountUuid: accountId as string,
					}),
				}),
			]).then(([dataGender, dataAddressType]) => {
				if (dataGender) {
					setDataGender(dataGender.items);
				}
				if (dataAddressType) {
					setDataAddressType(dataAddressType.items);
				}
			});
		})();
	}, [accountId, token]);

	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<p className={styles.title}>Theo giới tính</p>
				<ChartWork
					num_1={dataGender[0]?.count}
					num_2={dataGender[1]?.count}
					num_3={dataGender[2]?.count}
					title='Tổng'
					note_1={dataGender[0]?.gender?.name}
					note_2={dataGender[1]?.gender?.name}
					note_3={dataGender[2]?.gender?.name}
				/>
			</div>
			<div className={styles.item}>
				<p className={styles.title}>Theo hình thức</p>
				<ChartWork
					num_1={dataAddressType[0]?.count}
					num_2={dataAddressType[1]?.count}
					num_3={dataAddressType[2]?.count}
					title='Tổng'
					note_1={dataAddressType[0]?.addressType?.name}
					note_2={dataAddressType[1]?.addressType?.name}
					note_3={dataAddressType[2]?.addressType?.name}
				/>
			</div>
		</div>
	);
}

export default SectionChart;
