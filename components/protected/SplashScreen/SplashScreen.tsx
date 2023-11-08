import {Fragment, useEffect} from 'react';
import {getItemStorage, setItemStorage} from '~/common/func/localStorage';
import {
	savePass,
	setStateLogin,
	setToken,
	toggleRememberPass,
} from '~/redux/reducer/auth';
import {useDispatch, useSelector} from 'react-redux';

import {KEY_STORE} from '~/constants/mock/enum';
import Logo from '~/components/common/Logo';
import {PropsSplashScreen} from './interfaces';
import {RootState} from '~/redux/store';
import clsx from 'clsx';
import {setAccountId, setInfoDoctor} from '~/redux/reducer/user';
import {setCookie} from 'cookies-next';
import {setLoading} from '~/redux/reducer/site';
import styles from './SplashScreen.module.scss';
import icons from '~/constants/images/icons';

function SplashScreen({}: PropsSplashScreen) {
	const dispatch = useDispatch();

	const {token, isLogin, isRemember, dataSavePass} = useSelector(
		(state: RootState) => state.auth
	);
	const {infoDoctor, accountId} = useSelector(
		(state: RootState) => state.user
	);
	const {loading} = useSelector((state: RootState) => state.site);

	useEffect(() => {
		(async () => {
			const state = await getItemStorage(KEY_STORE);

			if (!!state) {
				setCookie(KEY_STORE, state);
				dispatch(setToken(state.token));
				dispatch(setAccountId(state.accountId));
				dispatch(setInfoDoctor(state.infoDoctor));
				dispatch(setStateLogin(state.isLogin));
				dispatch(toggleRememberPass(state.isRemember));
				dispatch(
					savePass({
						userStr: state.dataSavePass.userStr,
						passStr: state.dataSavePass.passStr,
					})
				);
			}

			dispatch(setLoading(false));
		})();
	}, [dispatch]);

	useEffect(() => {
		if (!loading) {
			setItemStorage(KEY_STORE, {
				token: token,
				isLogin: isLogin,
				accountId: accountId,
				infoDoctor: infoDoctor,
				isRemember: isRemember,
				dataSavePass: dataSavePass,
			});
			setCookie(KEY_STORE, {
				token: token,
				isLogin: isLogin,
				infoDoctor: infoDoctor,
				accountId: accountId,
				isRemember: isRemember,
				dataSavePass: dataSavePass,
			});
		}
	}, [
		token,
		isLogin,
		accountId,
		loading,
		infoDoctor,
		isRemember,
		dataSavePass,
	]);

	return (
		<Fragment>
			<div className={clsx(styles.container, {[styles.close]: !loading})}>
				<Logo src={icons.logo_doctor} className={styles.logo} />
			</div>
		</Fragment>
	);
}

export default SplashScreen;
