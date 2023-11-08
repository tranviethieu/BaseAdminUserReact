import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import 'moment/locale/vi';
import '~/styles/globals.scss';
import type {AppProps} from 'next/app';
import {ReactElement, ReactNode, Fragment} from 'react';
import {Provider} from 'react-redux';
import {store} from '~/redux/store';
import SplashScreen from '~/components/protected/SplashScreen';
import UpdateRoute from '~/components/protected/UpdateRoute';
import LoadingTopBar from '~/components/common/LoadingTopBar';
import type {NextPage} from 'next';
import {ToastContainer} from 'react-toastify';
import {QueryClient, QueryClientProvider} from 'react-query';
import Head from 'next/head';
import icons from '~/constants/images/icons';

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<Fragment>
			<Head>
				<title>{process.env.NEXT_PUBLIC_TITLE_PAGE}</title>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta property='og:type' content='website' />
				<meta
					name='description'
					content={process.env.NEXT_PUBLIC_DES}
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1'
				/>
				<meta
					property='og:title'
					content={process.env.NEXT_PUBLIC_TITLE_PAGE}
				/>
				<meta property='og:image' content={icons.logo_sale.src} />
			</Head>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<ToastContainer autoClose={3000} />
					<UpdateRoute />
					<SplashScreen />
					<LoadingTopBar />
					{getLayout(<Component {...pageProps} />)}
				</Provider>
			</QueryClientProvider>
		</Fragment>
	);
}
