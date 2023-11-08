import {ReactElement} from 'react';
import BaseLayout from '~/components/layout/BaseLayout';
import LayoutProfile from '~/components/layout/LayoutProfile';
import Page from '~/components/layout/Page';
import FormRules from '~/components/page/profile/FormRules';
import RequireAuth from '~/components/protected/RequiredAuth';

function Rules() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Điều khoản sử dụng'>
				<LayoutProfile title='Điều khoản sử dụng'>
					<FormRules />
				</LayoutProfile>
			</Page>
		</RequireAuth>
	);
}

export default Rules;
Rules.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Cài đặt'>{page}</BaseLayout>;
};
