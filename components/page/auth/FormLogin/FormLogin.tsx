import React, {useEffect, useState} from 'react';
import styles from './FormLogin.module.scss';
import LayoutAuth from '~/components/layout/LayoutAuth';
import Form, {Input} from '~/components/controls/Form';
import clsx from 'clsx';
import Link from 'next/link';
import Button from '~/components/controls/Button';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {PUBLICH_KEY} from '~/constants/configs';
import {httpRequest} from '~/services';
import auth from '~/services/auth';
import {savePass, setStateLogin, setToken} from '~/redux/reducer/auth';
import {setAccountId, setInfoDoctor} from '~/redux/reducer/user';
import LoadingScreen from '~/components/common/LoadingScreen';
import {JSEncrypt} from 'jsencrypt/lib/JSEncrypt';
import {RootState} from '~/redux/store';
import ButtonRemember from '~/components/controls/ButtonRemember';

function FormLogin() {
	const router = useRouter();
	const dispatch = useDispatch();

	const {routerPrev} = useSelector((state: RootState) => state.site);
	const {token} = useSelector((state: RootState) => state.auth);
	const {dataSavePass} = useSelector((state: RootState) => state.auth);

	const [isLoading, setisLoading] = useState(false);

	const [form, setForm] = useState({
		username: dataSavePass.userStr,
		password: dataSavePass.passStr,
	});

	const handleSubmit = () => {
		if (typeof window !== 'undefined') {
			const encrypt = new JSEncrypt({default_key_size: '2048'});
			encrypt.setPublicKey(PUBLICH_KEY);
			const encryptedPass = encrypt.encrypt(form.password);
			httpRequest({
				setLoading: setisLoading,
				showMessage: true,
				http: auth.login({
					token: token ? token : null,
					username: form.username.trim(),
					password: encryptedPass as string,
					ipLogin: '',
					device: '',
					os: '',
					model: '',
					isApp: false,
				}),
			}).then((data) => {
				console.log(data)
				debugger
				if (data) {
					dispatch(setToken(data.token));
					dispatch(setAccountId(data.accountUserUuid));
					dispatch(setInfoDoctor(data));
					dispatch(setStateLogin(true));
					dispatch(
						savePass({
							userStr: form.username.trim(),
							passStr: form.password,
						})
					);
					// Quay sang trang chủ ==> routerPrev
					router.replace('/', undefined, {scroll: false});
				}
			});
		}
	};

	return (
		<LayoutAuth>
			<LoadingScreen isLoading={isLoading} />
			<h1 className={styles.title}>
				Chào mừng trở lại
				<br />
				<span>MobiDoctor</span>
			</h1>
			<p className={styles.note}>
				Đăng nhập để sử dụng dịch vụ dành cho bạn
			</p>
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<Input
					bgGrey
					name='username'
					type='text'
					placeholder='Tài khoản đăng nhập *'
					isRequired
					value={form.username}
					textRequired='Nhập tài khoản đăng nhập'
				/>
				<Input
					bgGrey
					name='password'
					type='password'
					placeholder='Mật khẩu *'
					isRequired
					value={form.password}
					textRequired='Nhập mật khẩu'
				/>
				<div className={styles.remember}>
					<div className={styles.switch}>
						<ButtonRemember />
						<p>Nhớ mật khẩu</p>
					</div>

					<Link
						className={clsx(styles.link, 'link')}
						href={'/auth/forgot-password'}
					>
						Quên mật khẩu?
					</Link>
				</div>

				<div className={styles.btn}>
					<Button primary bold rounded_8>
						Đăng nhập
					</Button>
				</div>
			</Form>
		</LayoutAuth>
	);
}

export default FormLogin;
