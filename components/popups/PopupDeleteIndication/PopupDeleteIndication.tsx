import React, {Fragment, useState} from 'react';

import styles from './PopupDeleteIndication.module.scss';
import clsx from 'clsx';
import Button from '~/components/controls/Button';
import {TypePopupDeleteIndication} from './interfaces';
import {AiFillExclamationCircle} from 'react-icons/ai';
import LoadingScreen from '~/components/common/LoadingScreen';
import {toastError, toastSuccess} from '~/common/func/toast';
import indicationService from '~/services/indicationService';
import {httpRequest} from '~/services';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';

function PopupDeleteIndication({
	uuidIndication,
	onClose,
}: TypePopupDeleteIndication) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const {accountId, infoDoctor} = useSelector(
		(state: RootState) => state.user
	);

	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = () => {
		if (accountId && uuidIndication && token) {
			httpRequest({
				setLoading: setLoading,
				setError: (err) => {
					toastError({msg: err});
				},
				http: indicationService.deleteIndication({
					token: token!,
					AccountUuid: accountId as string,
					uuid: uuidIndication,
					HospitalUuid: infoDoctor?.hospitalUuid as string,
				}),
			}).then((data) => {
				if (data) {
					onClose();
					router.replace(router.asPath, undefined, {scroll: false});
					toastSuccess({
						msg: `Bạn đã xóa chỉ định thành công!`,
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
					Bạn chắc chắn muốn xóa chỉ định này?
				</p>
				<div className={styles.groupBtnPopup}>
					<Button grey rounded_8 bold p_8_24 onClick={onClose}>
						Đóng lại
					</Button>
					<Button danger bold rounded_8 p_8_24 onClick={handleSubmit}>
						Xóa bỏ
					</Button>
				</div>
			</div>
		</Fragment>
	);
}

export default PopupDeleteIndication;
