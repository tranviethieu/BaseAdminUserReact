import React, {Fragment, useEffect, useState} from 'react';

import styles from './PopupConfirmIndication.module.scss';
import clsx from 'clsx';
import Button from '~/components/controls/Button';
import {TypePopupConfirmIndication} from './interfaces';
import {AiFillExclamationCircle} from 'react-icons/ai';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingScreen from '~/components/common/LoadingScreen';
import {toastError, toastSuccess} from '~/common/func/toast';
import {httpRequest} from '~/services';
import indicationService from '~/services/indicationService';

function PopupConfirmIndication({
	uuidIndication,
	onClose,
}: TypePopupConfirmIndication) {
	const router = useRouter();

	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = () => {
		if (accountId && uuidIndication && token) {
			httpRequest({
				setLoading: setLoading,
				setError: (err) => {
					toastError({msg: err});
				},
				http: indicationService.defineHandleIndication({
					token: token!,
					AccountUuid: accountId as string,
					uuid: uuidIndication,
				}),
			}).then((data) => {
				if (data) {
					onClose();
					router.replace(router.asPath, undefined, {scroll: false});
					toastSuccess({
						msg: `Xác nhận bắt đầu xử lý chỉ định thành công!`,
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
				<h4 className={styles.title}>Bắt đầu xử lý</h4>
				<p className={styles.text}>
					Bạn chắc chắn muốn xử lý phiếu chỉ định này?
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
						Đồng ý
					</Button>
				</div>
			</div>
		</Fragment>
	);
}

export default PopupConfirmIndication;
