import React, {useContext, useState} from 'react';
import styles from './FormEmail.module.scss';
import Form, {Input} from '~/components/controls/Form';
import {ContextForgotPassword} from '../../contextForgotPassword';
import Button from '~/components/controls/Button';
import {httpRequest} from '~/services';
import auth from '~/services/auth';
import LoadingScreen from '~/components/common/LoadingScreen';
import {toastError} from '~/common/func/toast';
import {RootState} from '~/redux/store';
import {useSelector} from 'react-redux';
import {HiOutlineMail} from 'react-icons/hi';

function FormEmail() {
	const context = useContext<any>(ContextForgotPassword);
	const [loading, setLoading] = useState<boolean>(false);
	const {token} = useSelector((state: RootState) => state.auth);

	const handleSubmit = async () => {
		httpRequest({
			setLoading: setLoading,
			setError: (err) => {
				return toastError({msg: err});
			},
			http: auth.checkUser({
				token: token || null,
				username: context?.form?.user,
				Channel: 1,
			}),
		}).then((data) => {
			if (data) {
				context.setStep(2);
				context.setForm((prev: any) => ({
					...prev,
					emailRegistry: data.emailRegistry,
				}));
			}
		});
	};

	return (
		<div className={styles.container}>
			<LoadingScreen isLoading={loading} />
			<Form
				form={context.form}
				setForm={context.setForm}
				onSubmit={handleSubmit}
			>
				<Input
					showDone
					isRequired
					onClean
					name='user'
					type='text'
					value={context.form.user}
					placeholder='Nhập username'
					textRequired='Vui lòng nhập username'
					icon={<HiOutlineMail size={24} />}
				/>
				<div className={styles.btn}>
					<Button primary bold rounded_8>
						Bước tiếp theo
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default FormEmail;
