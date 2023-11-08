import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import RequireAuth from '~/components/protected/RequiredAuth';
import LayoutProfile from '~/components/layout/LayoutProfile';
import FormChangePass from '~/components/page/profile/FormChangePass';

function ChangePass() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Đổi mật khẩu'>
				<LayoutProfile title='Đổi mật khẩu'>
					<FormChangePass />
				</LayoutProfile>
			</Page>
		</RequireAuth>
	);
}

export default ChangePass;

ChangePass.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Cài đặt'>{page}</BaseLayout>;
};
