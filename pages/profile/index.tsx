import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import Page from '~/components/layout/Page';
import RequireAuth from '~/components/protected/RequiredAuth';
import LayoutProfile from '~/components/layout/LayoutProfile';
import FormEditProfile from '~/components/page/profile/FormEditProfile';

function Profile() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Thông tin cá nhân'>
				<LayoutProfile title='Thông tin cá nhân'>
					<FormEditProfile />
				</LayoutProfile>
			</Page>
		</RequireAuth>
	);
}

export default Profile;
Profile.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Cài đặt'>{page}</BaseLayout>;
};
