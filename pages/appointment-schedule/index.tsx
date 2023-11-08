import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import MainAppointmentSchedule from '~/components/page/appointment-schedule/MainAppointmentSchedule';
import RequireAuth from '~/components/protected/RequiredAuth';

function AppointmentSchedule() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Lịch đặt khám'>
				<MainAppointmentSchedule />
			</Page>
		</RequireAuth>
	);
}

export default AppointmentSchedule;

AppointmentSchedule.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Lịch đặt khám'>{page}</BaseLayout>;
};
