import React, {useState} from 'react';

import styles from './FormForgotPassword.module.scss';
import {TypeForm, TypeFormForgotPassword} from './interfaces';
import LayoutAuth from '~/components/layout/LayoutAuth';
import backgrounds from '~/constants/images/backgrounds';
import {ArrowLeft} from 'iconsax-react';
import clsx from 'clsx';
import FormEmail from './components/FormEmail';
import FormCode from './components/FormCode/FormCode';
import FormPassword from './components/FormPassword/FormPassword';
import {ContextForgotPassword} from './contextForgotPassword';
import {useRouter} from 'next/router';

function FormForgotPassword({}: TypeFormForgotPassword) {
	const router = useRouter();

	const progressSteps: Array<number> = [1, 2, 3];

	const [step, setStep] = useState<number>(1);
	const [form, setForm] = useState<TypeForm>({
		user: '',
		code: '',
		newPassword: '',
		rePassword: '',
		emailRegistry: '',
	});

	const handleBack = () => {
		if (step == 1) {
			router.replace('/auth/login', undefined, {scroll: false});
		}
		if (step == 2) {
			setStep(1);
		}
		if (step == 3) {
			setStep(2);
		}
	};

	return (
		<LayoutAuth background={backgrounds.forgotPassword}>
			<div className={styles.container}>
				<div className={styles.back} onClick={handleBack}>
					<ArrowLeft size={28} />
				</div>
				<h4 className={styles.title}>Quên mật khẩu?</h4>
				<div className={styles.progress}>
					{progressSteps.map((v, i) => (
						<div
							key={i}
							className={clsx(styles.item_step, {
								[styles.step]: step >= v,
							})}
						></div>
					))}
				</div>
				<p className={styles.des}>
					{step == 1 &&
						'Chúng tôi sẽ gửi cho bạn một mã xác thực về email của bạn'}
					{step == 2 &&
						`Điền mã OTP được gửi đến email ${form.emailRegistry}`}
					{step == 3 &&
						'Mật khẩu đăng nhập ít nhất từ 6 - 50 ký tự bao gồm ký tự chữ in hoa, chữ thường và số!'}
				</p>
				<ContextForgotPassword.Provider
					value={{step, setStep, form, setForm}}
				>
					<div className={styles.form}>
						{step == 1 ? <FormEmail /> : null}
						{step == 2 ? <FormCode /> : null}
						{step == 3 ? <FormPassword /> : null}
					</div>
				</ContextForgotPassword.Provider>
			</div>
		</LayoutAuth>
	);
}

export default FormForgotPassword;
