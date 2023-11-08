import {RootState} from '~/redux/store';
import {getItemStorage} from '~/common/func/localStorage';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';

interface IRequireAuthProps {
	children: React.ReactNode;
}

export default function RequireAuth(props: IRequireAuthProps) {
	const router = useRouter();

	const {loading} = useSelector((state: RootState) => state.site);
	const {isLogin} = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (!isLogin && !loading)
			router.replace('/auth/login', undefined, {scroll: false});
	}, [isLogin, loading, router]);

	if (isLogin && !loading) {
		return <>{props.children}</>;
	}

	return <></>;
}
