import React, {Fragment, useEffect, useState} from 'react';

import styles from './FormSettings.module.scss';
import Switch from '~/components/controls/Switch';
import {TypeSettingsNoti} from './interfaces';
import {httpRequest} from '~/services';
import notificationService from '~/services/notification';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {STATE_NOTI} from '~/constants/mock/enum';
import LoadingData from '~/components/common/LoadingData';
import Popup from '~/components/common/Popup';
import PopupOnOffNoti from '~/components/popups/PopupOnOffNoti';

function FormSettings() {
	const router = useRouter();
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [state, setState] = useState<number>(0);
	const [notificationCategory, setNotificationCategory] = useState<number>(0);
	const [description, setDescription] = useState<string>('');

	const [dataSettingNoti, setDataSettingNoti] = useState<
		Array<TypeSettingsNoti>
	>([]);

	// Call api lấy danh sách cài đặt thông báo
	useEffect(() => {
		httpRequest({
			setLoading: setLoading,
			http: notificationService.notificationSetting({
				token: token!,
				AccountUuid: accountId as string,
			}),
		}).then((data) => {
			if (data) {
				setDataSettingNoti(data.items);
			}
		});
	}, [accountId, router, token]);

	return (
		<Fragment>
			<div className={styles.container}>
				<p className={styles.title}>
					Bạn có thể cài đặt cấu hình nhận thông báo của mình.
				</p>

				<LoadingData isLoading={loading}>
					{dataSettingNoti.map((v) => (
						<div key={v.id} className={styles.item}>
							<div className={styles.left}>
								<p className={styles.text_1}>{v.name}</p>
								<p className={styles.text_2}>{v.description}</p>
							</div>
							<div className={styles.switch}>
								<Switch
									onClick={() => {
										setOpen(true);
										setState(v.state);
										setDescription(v.description);
										setNotificationCategory(v.id);
									}}
									checkOn={v.state == STATE_NOTI.DANG_BAT}
								/>
							</div>
						</div>
					))}
				</LoadingData>
			</div>

			{/* Popup */}
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupOnOffNoti
					title={
						state == STATE_NOTI.DANG_BAT
							? 'Tắt thông báo'
							: 'Bật thông báo'
					}
					description={description}
					notificationCategory={notificationCategory}
					state={state}
					onClose={() => setOpen(false)}
				/>
			</Popup>
		</Fragment>
	);
}

export default FormSettings;
