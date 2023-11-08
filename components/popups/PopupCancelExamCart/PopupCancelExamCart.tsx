import React, {Fragment, useEffect, useState} from 'react';

import styles from './PopupCancelExamCart.module.scss';
import clsx from 'clsx';
import Button from '~/components/controls/Button';
import {TypePopupCancelExamCart} from './interfaces';
import {toastError, toastText, toastWarn} from '~/common/func/toast';
import {IoCloseOutline} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import medicalRecord from '~/services/medicalRecord';
import LoadingScreen from '~/components/common/LoadingScreen';

function PopupCancelExamCart({
	// isCanCancel,
	ticketUuid,
	namePatient,
	onClose,
}: TypePopupCancelExamCart) {
	const router = useRouter();
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [reason, setReason] = useState<number>(1);
	const [content, setContent] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (reason == 1) {
			setContent('Bệnh nhân không tới khám');
		}
		if (reason == 2) {
			setContent('Không nghe điện');
		}
		if (reason == 3) {
			setContent('');
		}
	}, [reason]);

	const handleSubmit = () => {
		// if (!isCanCancel) {
		// 	return toastWarn({msg: 'Chưa đủ điều kiện kết thúc phiếu khám!'});
		// }

		if (!content) {
			toastText({msg: 'Vui lòng chọn hoặc nhập lý do hủy phiếu khám!'});
			return;
		}
		if (accountId && ticketUuid && token) {
			httpRequest({
				setError: (err) => {
					toastError({msg: err});
				},
				setLoading: setLoading,
				http: medicalRecord.cancelMedicalExam({
					token: token!,
					uuid: ticketUuid,
					AccountUuid: accountId as string,
					note: content,
				}),
			}).then((data) => {
				if (data) {
					onClose();
					router.replace(router.asPath, undefined, {scroll: false});
					toastText({
						msg: `Bạn đã từ chối lịch hẹn khám của bệnh nhân ${namePatient}`,
					});
				}
			});
		}
	};

	return (
		<Fragment>
			<LoadingScreen isLoading={loading} />
			<div className={clsx('effectZoom', styles.container)}>
				<h4 className={styles.title}>Hủy khám</h4>
				<p className={styles.text}>
					Hãy nêu rõ lý do bạn hủy phiếu khám này
				</p>

				<div className={styles.box_reason}>
					<div className={styles.item}>
						<input
							id='reason_1'
							type='radio'
							name='reason'
							value={reason}
							checked={reason == 1}
							onChange={() => setReason(1)}
							className={styles.radio}
						/>
						<label
							htmlFor='reason_1'
							className={styles.text_reason}
						>
							Bệnh nhân không tới khám
						</label>
					</div>
					<div className={styles.item}>
						<input
							id='reason_2'
							type='radio'
							name='reason'
							value={reason}
							checked={reason == 2}
							onChange={() => setReason(2)}
							className={styles.radio}
						/>
						<label
							htmlFor='reason_2'
							className={styles.text_reason}
						>
							Không nghe điện
						</label>
					</div>
					<div className={styles.item}>
						<input
							id='reason_3'
							type='radio'
							name='reason'
							value={reason}
							checked={reason == 3}
							onChange={() => setReason(3)}
							className={styles.radio}
						/>
						<label
							htmlFor='reason_3'
							className={styles.text_reason}
						>
							Lý do khác
						</label>
					</div>
				</div>

				{reason == 3 && (
					<textarea
						className={styles.textarea}
						placeholder='Nhập nội dung ...'
						onChange={(e: any) => setContent(e.target.value)}
					></textarea>
				)}

				<div className={styles.btn}>
					<div className={styles.groupBtnPopup}>
						<Button grey rounded_8 bold p_8_24 onClick={onClose}>
							Bỏ qua
						</Button>
						<Button
							danger
							bold
							rounded_8
							p_8_24
							onClick={handleSubmit}
						>
							Hủy phiếu
						</Button>
					</div>
				</div>
				<div className={styles.close} onClick={onClose}>
					<IoCloseOutline size={24} />
				</div>
			</div>
		</Fragment>
	);
}

export default PopupCancelExamCart;
