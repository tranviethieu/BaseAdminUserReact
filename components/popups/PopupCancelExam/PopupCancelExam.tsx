import React, {Fragment, useState} from 'react';

import styles from './PopupCancelExam.module.scss';
import clsx from 'clsx';
import Button from '~/components/controls/Button';
import {TypePopupCancelExam} from './interfaces';
import {toastError, toastText} from '~/common/func/toast';
import {IoCloseOutline} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import manageBooking from '~/services/manageBooking';
import LoadingScreen from '~/components/common/LoadingScreen';
import {useMutation, useQueryClient} from 'react-query';
import {QUERY_APPOINTMENT_SCHEDULE} from '~/constants/mock/enum';

function PopupCancelExam({
	ticketUuid,
	namePatient,
	onClose,
}: TypePopupCancelExam) {
	const queryClient = useQueryClient();
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [content, setContent] = useState<string>('');

	const {mutate: handleSubmit, isLoading} = useMutation(
		async () => {
			if (!content) {
				return toastText({msg: 'Vui lòng nhập nội dung từ chối!'});
			}
			if (accountId && ticketUuid && token) {
				httpRequest({
					setError: (err) => {
						toastError({msg: err});
					},
					http: manageBooking.refuseExam({
						token: token!,
						AccountUuid: accountId as string,
						uuid: ticketUuid,
						note: content,
					}),
				}).then((data) => {
					if (data) {
						onClose();
						toastText({
							msg: `Bạn đã từ chối lịch hẹn khám của bệnh nhân ${namePatient}`,
						});
					}
				});
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(QUERY_APPOINTMENT_SCHEDULE.WAIT); // KEY REACT QUERY
			},
		}
	);

	return (
		<Fragment>
			<LoadingScreen isLoading={isLoading} />
			<div className={clsx('effectZoom', styles.container)}>
				<h4 className={styles.title}>Từ chối</h4>
				<p className={styles.text}>
					Sau khi bị từ chối, bạn không thể thao tác khám trên lịch
					này.
				</p>
				<textarea
					className={styles.textarea}
					placeholder='Nhập nội dung từ chối ...'
					onChange={(e: any) => setContent(e.target.value)}
				></textarea>

				<div className={styles.btn}>
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
				<div className={styles.close} onClick={onClose}>
					<IoCloseOutline size={24} />
				</div>
			</div>
		</Fragment>
	);
}

export default PopupCancelExam;
