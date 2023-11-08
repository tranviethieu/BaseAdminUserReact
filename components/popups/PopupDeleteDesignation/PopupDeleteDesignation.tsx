import React, {Fragment, useState} from 'react';

import styles from './PopupDeleteDesignation.module.scss';
import clsx from 'clsx';
import Button from '~/components/controls/Button';
import {TypePopupDeleteDesignation} from './interfaces';
import {toastError, toastSuccess} from '~/common/func/toast';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import LoadingScreen from '~/components/common/LoadingScreen';
import {AiFillExclamationCircle} from 'react-icons/ai';
import medicalRecord from '~/services/medicalRecord';

function PopupDeleteDesignation({uuid, onClose}: TypePopupDeleteDesignation) {
	const router = useRouter();
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = () => {
		if (accountId && uuid && token) {
			httpRequest({
				setLoading: setLoading,
				setError: (err) => {
					toastError({msg: err});
				},
				http: medicalRecord.deleteDesignation({
					token: token!,
					AccountUuid: accountId as string,
					uuid: uuid,
				}),
			}).then((data) => {
				if (data) {
					onClose();
					router.replace(router.asPath, undefined, {scroll: false});
					toastSuccess({
						msg: `Xóa chỉ định thành công!`,
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
				<h4 className={styles.title}>Xóa chỉ định</h4>
				<p className={styles.text}>
					Bạn chắc chắn muốn xóa chỉ định này!
				</p>
				<div className={styles.groupBtnPopup}>
					<Button grey rounded_8 bold p_8_24 onClick={onClose}>
						Hủy bỏ
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

export default PopupDeleteDesignation;
