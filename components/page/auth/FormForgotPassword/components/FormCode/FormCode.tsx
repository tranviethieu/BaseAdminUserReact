import React, {useContext, useEffect, useState} from 'react';
import styles from './FormCode.module.scss';
import {ContextForgotPassword} from '../../contextForgotPassword';
import InputSingle from '~/components/controls/InputSingle';
import Button from '~/components/controls/Button';
import {toastError, toastText, toastWarn} from '~/common/func/toast';
import {TIME_OTP} from '~/constants/mock/enum';
import clsx from 'clsx';
import fancyTimeFormat from '~/common/func/fancyTimeFormat';
import {httpRequest} from '~/services';
import auth from '~/services/auth';
import LoadingScreen from '~/components/common/LoadingScreen';
import {RootState} from '~/redux/store';
import {useSelector} from 'react-redux';

function FormCode() {
	const context = useContext<any>(ContextForgotPassword);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [countDown, setCoutDown] = useState<number>(TIME_OTP);

	// Đếm ngược thời gian gửi lại code
	useEffect(() => {
		if (countDown > 0) {
			const time = setTimeout(() => {
				setCoutDown(countDown - 1);
			}, 1000);
			return () => clearInterval(time);
		}
	}, [countDown]);

	// Submit
	const handleSetCode = () => {
		if (!context.form.code) {
			toastText({msg: 'Vui lòng nhập mã code được gửi về email!'});
			return;
		}

		if (context.form.code.length > 6 || context.form.code.length < 6) {
			toastText({msg: 'Mã code không hợp lệ. Vui lòng nhập lại!'});
			return;
		}

		// Call API
		httpRequest({
			setLoading: setLoading,
			http: auth.checkOTP({
				token: token || null,
				username: context?.form?.user,
				otp: context?.form?.code,
			}),
		}).then((data) => {
			if (data) {
				if (data?.isPass) {
					context.setStep(3);
				} else {
					return toastWarn({
						msg: 'Mã OTP không đúng, vùi lòng kiểm tra lại!',
					});
				}
			}
		});
	};

	// Gửi lại code
	const handleSendcode = async () => {
		httpRequest({
			setLoading: setLoading,
			http: auth.checkUser({
				token: token || null,
				username: context?.form?.user,
				Channel: 1,
			}),
		}).then((data) => {
			if (data) {
				setCoutDown(TIME_OTP);
			}
		});
	};

	return (
		<div className={styles.container}>
			<LoadingScreen isLoading={loading} />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSetCode();
				}}
			>
				<div className={styles.box_code}>
					<InputSingle
						onSetValue={context.setForm}
						name='code'
						lenght={6}
					/>
				</div>

				<p className={styles.countDown}>
					Bạn chưa nhận được mã.{' '}
					{countDown > 0 ? (
						<span className={clsx(styles.textGreen, styles.btnOtp)}>
							Gửi lại ({fancyTimeFormat(countDown)})
						</span>
					) : (
						<span
							className={clsx(styles.textGreen, styles.btnOtp)}
							onClick={handleSendcode}
						>
							Gửi lại
						</span>
					)}
				</p>

				<div className={styles.btn}>
					<Button primary bold rounded_8>
						Xác nhận
					</Button>
				</div>
			</form>
		</div>
	);
}

export default FormCode;
