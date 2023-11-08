import React, {Fragment, useState} from 'react';

import styles from './FormChangePass.module.scss';
import Form, {Input} from '~/components/controls/Form';
import Button from '~/components/controls/Button';
import {JSEncrypt} from 'jsencrypt/lib/JSEncrypt';
import {PUBLICH_KEY} from '~/constants/configs';
import {httpRequest} from '~/services';
import LoadingScreen from '~/components/common/LoadingScreen';
import selfInformation from '~/services/selfInformation';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {SecuritySafe} from 'iconsax-react';

function FormChangePass() {
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState<any>({
		password: '',
		newPassword: '',
		rePassword: '',
	});

	const handleSubmit = () => {
		if (typeof window !== 'undefined') {
			const encrypt = new JSEncrypt({default_key_size: '2048'});
			encrypt.setPublicKey(PUBLICH_KEY);

			// Hash pass
			const encryptedPass = encrypt.encrypt(form.password);
			const encryptedNewPass = encrypt.encrypt(form.newPassword);

			if (token) {
				// Call api
				httpRequest({
					setLoading: setLoading,
					showMessage: true,
					http: selfInformation.changePassword({
						token: token!,
						uuid: accountId as string,
						passwordOld: encryptedPass as string,
						passwordNew: encryptedNewPass as string,
					}),
				}).then((data) => {
					if (data) {
						setForm({
							password: '',
							newPassword: '',
							rePassword: '',
						});
					}
				});
			}
		}
	};

	return (
		<Fragment>
			<LoadingScreen isLoading={loading} />

			<div className={styles.container}>
				<p className={styles.title}>
					Nhập mật khẩu từ 6 đến 50 ký tự, bao gồm ít nhất chữ hoa,
					chữ thường và số!
				</p>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
					<div className={styles.inputElement}>
						<label className={styles.label}>
							Mật khẩu cũ <span style={{color: 'red'}}>*</span>
						</label>
						<Input
							onClean
							showDone
							isRequired
							isNotCheckPass
							name='password'
							type='password'
							icon={<SecuritySafe />}
							placeholder='Nhập mật khẩu hiện tại'
							textRequired='Nhập mật khẩu hiện tại.'
							value={form.password || ''}
						/>
					</div>
					<div className={styles.inputElement}>
						<label className={styles.label}>
							Mật khẩu mới <span style={{color: 'red'}}>*</span>
						</label>
						<Input
							showDone
							isRequired
							onClean
							name='newPassword'
							type='password'
							icon={<SecuritySafe />}
							value={form.newPassword || ''}
							min={6}
							max={50}
							placeholder='Nhập mật khẩu mới'
							textRequired='Nhập mật khẩu mới.'
						/>
					</div>
					<div className={styles.inputElement}>
						<label className={styles.label}>
							Xác nhận mật khẩu{' '}
							<span style={{color: 'red'}}>*</span>
						</label>
						<Input
							onClean
							showDone
							isRequired
							isNotCheckPass
							type='password'
							name='resPassword'
							valueConfirm={form.newPassword}
							icon={<SecuritySafe />}
							placeholder='Nhập lại mật khẩu mới'
							textRequired='Nhập lại mật khẩu mới'
							textConfirm='Mật khẩu và xác nhận mật khẩu không trùng nhau'
							value={form.rePassword || ''}
						/>
					</div>
					<div className={styles.btn}>
						<Button primary_2 bold rounded_8>
							Cập nhật
						</Button>
					</div>
				</Form>
			</div>
		</Fragment>
	);
}

export default FormChangePass;
