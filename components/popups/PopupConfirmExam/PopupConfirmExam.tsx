import React, {Fragment, useState} from 'react';

import styles from './PopupConfirmExam.module.scss';
import clsx from 'clsx';
import Button from '~/components/controls/Button';
import {TypePopupConfirmExam} from './interfaces';
import {toastError, toastText} from '~/common/func/toast';
import {AiFillExclamationCircle} from 'react-icons/ai';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import manageBooking from '~/services/manageBooking';
import LoadingScreen from '~/components/common/LoadingScreen';
import {useMutation, useQueryClient} from 'react-query';
import {QUERY_APPOINTMENT_SCHEDULE} from '~/constants/mock/enum';

function PopupConfirmExam({
	ticketUuid,
	namePatient,
	onClose,
}: TypePopupConfirmExam) {
	const queryClient = useQueryClient();
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const {mutate: handleSubmit, isLoading} = useMutation(
		async () => {
			if (token && accountId && ticketUuid) {
				httpRequest({
					setError: (err) => {
						return toastError({msg: err});
					},
					http: manageBooking.confirmTurnExam({
						token: token!,
						AccountUuid: accountId as string,
						uuid: ticketUuid,
					}),
				}).then((data) => {
					if (data) {
						onClose();
						toastText({
							msg: `Bạn đã xác nhận khám cho bệnh nhân ${namePatient}`,
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
				<div className={styles.image}>
					<AiFillExclamationCircle color='#0071CE' size={48} />
				</div>
				<h4 className={styles.title}>Xác nhận khám</h4>
				<p className={styles.text}>
					Xác nhận phiếu khám cho bệnh nhân này.
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

export default PopupConfirmExam;
