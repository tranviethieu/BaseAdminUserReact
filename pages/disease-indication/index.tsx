import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import RequireAuth from '~/components/protected/RequiredAuth';
import MainDiseaseIndication from '~/components/page/disease-indication/MainDiseaseIndication';

function DiseaseIndication() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Chỉ định'>
				<MainDiseaseIndication />
			</Page>
		</RequireAuth>
	);
}

export default DiseaseIndication;

DiseaseIndication.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Chỉ định'>{page}</BaseLayout>;
};
