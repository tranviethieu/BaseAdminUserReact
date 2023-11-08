import {memo, useEffect} from 'react';

import {updateRouterPrev} from '~/redux/reducer/site';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';

function UpdateRoute() {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (
				router.asPath !== '/auth/login' &&
				router.asPath !== '/auth/forgot-password'
			) {
				dispatch(updateRouterPrev(router.asPath));
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	return null;
}

export default memo(UpdateRoute);
