import React from 'react';
import Page from '~/components/layout/Page';
import FormLogin from '~/components/page/auth/FormLogin';
import RequiredLogout from '~/components/protected/RequiredLogout';

function Login() {
	return (
		<RequiredLogout>
			<Page disabledEffect title='Đăng nhập'>
				<FormLogin />
			</Page>
		</RequiredLogout>
	);
}

export default Login;
