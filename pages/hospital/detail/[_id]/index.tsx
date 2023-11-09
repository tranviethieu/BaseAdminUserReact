import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainDetailPatientExam from '~/components/page/patient-examination/MainDetailPatientExam';
import RequireAuth from '~/components/protected/RequiredAuth';

function DetailHospital() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Chi tiết bệnh viện'>
				<MainDetailPatientExam />
			</Page>
		</RequireAuth>
	);
}

export default DetailHospital;

DetailHospital.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Chi tiết bệnh viện'>{page}</BaseLayout>;
};
