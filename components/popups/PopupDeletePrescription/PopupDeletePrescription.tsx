import React, {Fragment, useState} from 'react';
import {TypePopupDeletePrescription} from './interfaces';

import styles from './PopupDeletePrescription.module.scss';
import {AiFillExclamationCircle} from 'react-icons/ai';
import clsx from 'clsx';
import LoadingScreen from '~/components/common/LoadingScreen';
import Button from '~/components/controls/Button';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import {toastError, toastText} from '~/common/func/toast';
import medicalRecord from '~/services/medicalRecord';

function PopupDeletePrescription({
	uuidPrescription,
	onClose,
}: TypePopupDeletePrescription) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const {accountId} = useSelector((state: RootState) => state.user);
	const [loading, setLoading] = useState<boolean>(false);

	// Call api
	const handleSubmit = () => {
		if (accountId && uuidPrescription && token) {
			httpRequest({
				setError: (err) => {
					toastError({msg: err});
				},
				setLoading: setLoading,
				http: medicalRecord.deletePrescription({
					token: token!,
					AccountUuid: accountId as string,
					uuid: uuidPrescription,
				}),
			}).then((data) => {
				if (data) {
					onClose();
					router.replace(router.asPath, undefined, {scroll: false});
					toastText({
						msg: `Bạn vừa xóa đơn thuốc thành công!`,
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
				<h4 className={styles.title}>Xóa đơn thuốc</h4>
				<p className={styles.text}>
					Bạn chắc chắn muốn xóa đơn thuốc này.
				</p>
				<div className={styles.groupBtnPopup}>
					<Button grey rounded_8 bold p_8_24 onClick={onClose}>
						Hủy
					</Button>
					<Button
						primary_2
						bold
						rounded_8
						p_8_24
						onClick={handleSubmit}
					>
						Xóa
					</Button>
				</div>
			</div>
		</Fragment>
	);
}

export default PopupDeletePrescription;
