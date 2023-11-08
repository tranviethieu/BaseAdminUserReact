import React, {Fragment, useState} from 'react';

import styles from './PopupFinishExam.module.scss';
import clsx from 'clsx';
import Button from '~/components/controls/Button';
import {TypePopupFinishExam} from './interfaces';
import {toastError, toastText, toastWarn} from '~/common/func/toast';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import LoadingScreen from '~/components/common/LoadingScreen';
import {AiFillExclamationCircle} from 'react-icons/ai';
import medicalRecord from '~/services/medicalRecord';

function PopupFinishExam({
	isCanFinish,
	ticketUuid,
	namePatient,
	onClose,
}: TypePopupFinishExam) {
	const router = useRouter();
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = () => {
		if (!isCanFinish) {
			return toastWarn({msg: 'Chưa đủ điều kiện kết thúc phiếu khám!'});
		}

		if (accountId && ticketUuid && token) {
			httpRequest({
				setLoading: setLoading,
				setError: (err) => {
					toastError({msg: err});
				},
				http: medicalRecord.finishMedicalExam({
					token: token!,
					AccountUuid: accountId as string,
					uuid: ticketUuid,
				}),
			}).then((data) => {
				if (data) {
					onClose();
					router.replace(router.asPath, undefined, {scroll: false});
					toastText({
						msg: `Bạn đã kết thúc phiên khám của bệnh nhân ${namePatient}`,
					});
				}
			});
		}
	};

	return (
		<Fragment>
			<LoadingScreen isLoading={loading} />
			<div className={clsx('effectZoom', styles.container)}>
				<div className={styles.image}>
					<AiFillExclamationCircle color='#0071CE' size={48} />
				</div>
				<h4 className={styles.title}>Kết thúc phiếu khám</h4>
				<p className={styles.text}>
					Bạn chắc chắn muốn kết thúc phiếu khám này?
				</p>
				<div className={styles.groupBtnPopup}>
					<Button grey rounded_8 bold p_8_24 onClick={onClose}>
						Bỏ qua
					</Button>
					<Button
						primary_2
						bold
						rounded_8
						p_8_24
						onClick={handleSubmit}
					>
						Xác nhận
					</Button>
				</div>
			</div>
		</Fragment>
	);
}

export default PopupFinishExam;
