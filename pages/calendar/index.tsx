import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import RequireAuth from '~/components/protected/RequiredAuth';
import MainCalendar from '~/components/page/calendar/MainCalendar';

function Calendar() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Lịch làm việc'>
				<MainCalendar />
			</Page>
		</RequireAuth>
	);
}

export default Calendar;

Calendar.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Lịch làm việc'>{page}</BaseLayout>;
};
