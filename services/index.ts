import {toastInfo, toastSuccess, toastWarn} from '~/common/func/toast';

import axios from 'axios';
import {store} from '~/redux/store';
import {setStateLogin, setToken} from '~/redux/reducer/auth';
import {setAccountId, setInfoDoctor} from '~/redux/reducer/user';

const axiosClient = axios.create({
	headers: {
		'content-type': 'application/json',
		Product: 'User',
	},
	baseURL:
		process.env.NEXT_PUBLIC_IS_DEV == 'true'
			? process.env.NEXT_PUBLIC_API_URL_DEV
			: process.env.NEXT_PUBLIC_API_URL_PRODUCTION,
	timeout: 15000,
	timeoutErrorMessage: 'Timeout error request',
});

axiosClient.interceptors.request.use(async (config) => {
	return config;
});

axiosClient.interceptors.response.use(
	(response: any) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error: any) => {
		if (error.response && error.response.data) {
			throw error.response.data;
		}

		if (!axios.isCancel(error)) throw error;
	}
);

export default axiosClient;

export const httpRequest = async ({
	http,
	dispatch,
	setLoading,
	setError,
	msgSuccess = 'Thành công',
	showMessage = false,
	onError,
}: {
	http: any;
	dispatch?: any;
	setLoading?: (any: any) => void;
	setError?: (any: any) => void;
	onError?: () => void;
	showMessage?: boolean;
	msgSuccess?: string;
}) => {
	setLoading && setLoading(() => true);
	try {
		// await delay(500);
		const res: any = await http;

		if (res.error.code === 0) {
			showMessage &&
				msgSuccess &&
				toastSuccess({msg: msgSuccess && res?.error?.message});
			setLoading && setLoading(() => false);
			return res?.data || true;
		} else {
			setLoading && setLoading(() => false);
			onError && onError();
			throw res?.error?.message;
		}
	} catch (err: any) {
		if (err?.error?.code === 401 || err?.response?.status == 401) {
			store.dispatch(setToken(null));
			store.dispatch(setAccountId(null));
			store.dispatch(setInfoDoctor(null));
			store.dispatch(setStateLogin(false));
		} else if (typeof err == 'string') {
			showMessage && toastWarn({msg: err || 'Có lỗi đã xảy ra'});
			setLoading && setLoading(() => false);
		} else if (err.code == 'ERR_NETWORK' || err.code == 'ECONNABORTED') {
			showMessage && toastInfo({msg: 'Kiểm tra kết nối internet'});
			setLoading && setLoading(() => false);
		}

		if (setError) {
			setError(err);
		}
	}
};
