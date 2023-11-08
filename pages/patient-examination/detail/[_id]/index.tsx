import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainDetailPatientExam from '~/components/page/patient-examination/MainDetailPatientExam';
import RequireAuth from '~/components/protected/RequiredAuth';

function DetailPatientExamination() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Chi tiết phiếu khám bệnh'>
				<MainDetailPatientExam />
			</Page>
		</RequireAuth>
	);
}

export default DetailPatientExamination;

DetailPatientExamination.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Chi tiết phiếu khám bệnh'>{page}</BaseLayout>;
};
