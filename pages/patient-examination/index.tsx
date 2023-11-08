import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainPatientExamination from '~/components/page/patient-examination/MainPatientExamination';
import RequireAuth from '~/components/protected/RequiredAuth';

function PatientExamination() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Phiếu khám bệnh'>
				<MainPatientExamination />
			</Page>
		</RequireAuth>
	);
}

export default PatientExamination;

PatientExamination.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Phiếu khám bệnh'>{page}</BaseLayout>;
};
