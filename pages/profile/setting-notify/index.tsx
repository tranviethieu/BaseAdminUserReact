import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import RequireAuth from '~/components/protected/RequiredAuth';
import LayoutProfile from '~/components/layout/LayoutProfile';
import FormSettings from '~/components/page/profile/FormSettings';

function SettingNotify() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Cài đặt thông báo'>
				<LayoutProfile title='Cài đặt thông báo'>
					<FormSettings />
				</LayoutProfile>
			</Page>
		</RequireAuth>
	);
}

export default SettingNotify;
SettingNotify.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Cài đặt'>{page}</BaseLayout>;
};
