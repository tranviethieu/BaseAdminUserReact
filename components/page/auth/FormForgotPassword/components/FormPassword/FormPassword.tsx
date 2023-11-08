import React, {useContext, useState} from 'react';
import styles from './FormPassword.module.scss';
import Form, {Input} from '~/components/controls/Form';
import {ContextForgotPassword} from '../../contextForgotPassword';
import Button from '~/components/controls/Button';
import {JSEncrypt} from 'jsencrypt/lib/JSEncrypt';
import {PUBLICH_KEY} from '~/constants/configs';
import {httpRequest} from '~/services';
import auth from '~/services/auth';
import LoadingScreen from '~/components/common/LoadingScreen';
import {useRouter} from 'next/router';
import {toastError, toastWarn} from '~/common/func/toast';
import checkString from '~/common/func/checkString';
import {SecuritySafe} from 'iconsax-react';

function FormPassword() {
	const router = useRouter();
	const context = useContext<any>(ContextForgotPassword);
	const [loading, setLoading] = useState<boolean>(false);

	const handleChangePass = async () => {
		if (typeof window !== 'undefined') {
			// Kiểm tra mật khẩu chỉ chứa kí tự chữ hoa, chữ thường, số và kí tự đặc biệt
			if (checkString(context.form.rePassword) == false) {
				toastWarn({
					msg: 'Mật khẩu đăng nhập ít nhất từ 6 - 50 ký tự bao gồm ký tự chữ in hoa, chữ thường và số!',
				});
				return;
			}

			const encrypt = new JSEncrypt({default_key_size: '2048'});
			encrypt.setPublicKey(PUBLICH_KEY);

			// Hash pass
			const encryptedNewPassword = encrypt.encrypt(
				context.form.rePassword
			);

			// Call api
			httpRequest({
				setLoading: setLoading,
				setError: (err) => {
					return toastError({msg: err});
				},
				http: auth.forgotPassword({
					newPassword: encryptedNewPassword as string,
					otp: context?.form?.code,
					token: '',
					username: context?.form?.user,
				}),
			}).then((data) => {
				if (data) {
					router.replace('/auth/login', undefined, {scroll: false});
				}
			});
		}
	};

	return (
		<div className={styles.container}>
			<LoadingScreen isLoading={loading} />
			<Form
				form={context.form}
				setForm={context.setForm}
				onSubmit={handleChangePass}
			>
				<Input
					showDone
					isRequired
					onClean
					name='newPassword'
					type='password'
					placeholder='Mật khẩu mới'
					textRequired='Vui lòng nhập mật khẩu mới'
					icon={<SecuritySafe />}
				/>
				<Input
					showDone
					isRequired
					onClean
					name='rePassword'
					type='password'
					valueConfirm={context.form.newPassword}
					placeholder='Xác nhận mật khẩu'
					textRequired='Vui lòng nhập lại mật khẩu mới'
					icon={<SecuritySafe />}
				/>

				<div className={styles.btn}>
					<Button primary bold rounded_8>
						Đổi mật khẩu
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default FormPassword;
