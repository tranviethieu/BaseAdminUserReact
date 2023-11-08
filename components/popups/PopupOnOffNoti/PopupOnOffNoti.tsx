import clsx from 'clsx';
import styles from './PopupOnOffNoti.module.scss';
import {AiFillExclamationCircle} from 'react-icons/ai';
import Button from '~/components/controls/Button';
import {TypePopupOnOffNoti} from './interfaces';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {useState, Fragment} from 'react';
import {httpRequest} from '~/services';
import {toastError, toastText} from '~/common/func/toast';
import notificationService from '~/services/notification';
import LoadingScreen from '~/components/common/LoadingScreen';
import {STATE_NOTI} from '~/constants/mock/enum';

function PopupOnOffNoti({
	title,
	description,
	notificationCategory,
	state,
	onClose,
}: TypePopupOnOffNoti) {
	const router = useRouter();

	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = () => {
		if (accountId && token) {
			httpRequest({
				setLoading: setLoading,
				setError: (err) => {
					toastError({msg: err});
				},
				http: notificationService.createResultIndication({
					token: token!,
					AccountUuid: accountId as string,
					action: state == STATE_NOTI.DANG_BAT ? 1 : 4,
					notificationCategory: notificationCategory,
				}),
			}).then((data) => {
				if (data) {
					onClose();
					router.replace(router.asPath, undefined, {scroll: false});
					toastText({
						msg: `${
							state == STATE_NOTI.DANG_BAT
								? 'Bạn vừa tắt thông báo '
								: 'Bạn vừa bật thông báo'
						} thành công!`,
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
				<h4 className={styles.title}>{title}</h4>
				<p className={styles.text}>{description}</p>
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

export default PopupOnOffNoti;
