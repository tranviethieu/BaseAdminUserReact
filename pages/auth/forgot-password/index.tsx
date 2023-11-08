import React from 'react';
import Page from '~/components/layout/Page';
import FormForgotPassword from '~/components/page/auth/FormForgotPassword';
import RequiredLogout from '~/components/protected/RequiredLogout';

function ForgotPassword() {
	return (
		<RequiredLogout>
			<Page disabledEffect title='Quên mật khẩu'>
				<FormForgotPassword />
			</Page>
		</RequiredLogout>
	);
}

export default ForgotPassword;
