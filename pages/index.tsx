import BaseLayout from '~/components/layout/BaseLayout';
import MainHome from '~/components/page/home/MainHome';
import Page from '~/components/layout/Page';
import {ReactElement} from 'react';
import RequireAuth from '~/components/protected/RequiredAuth';

export default function Home() {
	return (
		<RequireAuth>
			<Page disabledEffect title='Trang chủ'>
				<MainHome />
			</Page>
		</RequireAuth>
	);
}

Home.getLayout = function (page: ReactElement) {
	return <BaseLayout title='Tổng quan'><div></div></BaseLayout>;
	// return <BaseLayout title='Tổng quan'>{page}</BaseLayout>;
};
