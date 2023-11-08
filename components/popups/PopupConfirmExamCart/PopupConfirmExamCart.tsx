import React, {Fragment, useState} from 'react';

import styles from './PopupConfirmExamCart.module.scss';
import clsx from 'clsx';
import Button from '~/components/controls/Button';
import {TypePopupConfirmExamCart} from './interfaces';
import {toastError, toastText} from '~/common/func/toast';
import {AiFillExclamationCircle} from 'react-icons/ai';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import medicalRecord from '~/services/medicalRecord';
import LoadingScreen from '~/components/common/LoadingScreen';

function PopupConfirmExamCart({
	ticketUuid,
	namePatient,
	onClose,
}: TypePopupConfirmExamCart) {
	const router = useRouter();
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = () => {
		if (accountId && ticketUuid) {
			httpRequest({
				setError: (err) => {
					toastError({msg: err});
				},
				setLoading: setLoading,
				http: medicalRecord.confirmMedicalExam({
					token: token!,
					AccountUuid: accountId as string,
					uuid: ticketUuid,
				}),
			}).then((data) => {
				if (data) {
					onClose();
					router.replace(router.asPath, undefined, {scroll: false});
					toastText({
						msg: `Bạn đang khám cho bệnh nhân ${namePatient}`,
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
				<h4 className={styles.title}>Đến lượt khám</h4>
				<p className={styles.text}>Xác nhận khám cho bệnh nhân này.</p>
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
						Đồng ý
					</Button>
				</div>
			</div>
		</Fragment>
	);
}

export default PopupConfirmExamCart;
