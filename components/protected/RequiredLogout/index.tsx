//**********************
//* COMPONENT PROTECTED SCREEN THEN LOGIN
//**********************

import React from 'react';
import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';

interface props {
	children: React.ReactNode;
}

function RequiredLogout({children}: props) {
	const router = useRouter();

	const {loading, routerPrev} = useSelector((state: RootState) => state.site);
	const {isLogin} = useSelector((state: RootState) => state.auth);

	/********** redirect home when user login  **********/
	if (isLogin && !loading) {
		router.replace('/', undefined, {scroll: false});
	}

	if (!isLogin && !loading) {
		return <>{children}</>;
	}

	return <div className='loading-page'></div>;
}

export default RequiredLogout;
