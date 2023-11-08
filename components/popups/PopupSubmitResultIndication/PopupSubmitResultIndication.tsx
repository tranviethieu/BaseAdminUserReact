import React, {Fragment, useContext, useState} from 'react';

import styles from './PopupSubmitResultIndication.module.scss';
import clsx from 'clsx';
import Button from '~/components/controls/Button';
import {TypePopupSubmitResultIndication} from './interfaces';
import {AiFillExclamationCircle} from 'react-icons/ai';
import {ContextIndication} from '~/components/page/disease-indication/TableIndicationPendding/contextIndication';
import {TypeContext} from '~/components/page/disease-indication/TableIndicationPendding/interfaces';
import {httpRequest} from '~/services';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {toastError, toastSuccess} from '~/common/func/toast';
import indicationService from '~/services/indicationService';
import uploadImageService from '~/services/uploadService';
import LoadingScreen from '~/components/common/LoadingScreen';

function PopupSubmitResultIndication({
	onClose,
	onOpenPopupCreate,
}: TypePopupSubmitResultIndication) {
	const router = useRouter();

	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);

	//Context
	const contextIndication = useContext<TypeContext>(ContextIndication);

	// Quay về step 1
	const handleBack = () => {
		onClose();
		onOpenPopupCreate();
	};

	// Xử lý tạo kết quả khám
	const handleSubmit = async () => {
		// Xử lý upload image
		const files = contextIndication.contextForm.images.map(
			(image) => image.file
		);
		const formData = new FormData();
		files.forEach((image) => {
			formData.append(`files`, image);
		});

		const imagesFile = await httpRequest({
			http: uploadImageService.uploadMutilImage({
				token: token!,
				formData: formData,
			}),
		});

		if (contextIndication.contextForm.uuidIndication && token) {
			httpRequest({
				setLoading: setLoading,
				setError: (err) => {
					toastError({msg: err});
				},
				http: indicationService.createResultIndication({
					token: token!,
					AccountUuid: accountId as string,
					uuid: contextIndication.contextForm.uuidIndication,
					result: contextIndication.contextForm.result,
					images: imagesFile,
				}),
			}).then((data) => {
				if (data) {
					onClose();
					router.replace(router.asPath, undefined, {scroll: false});
					toastSuccess({
						msg: `Tạo kết quả chỉ định thành công!`,
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
				<h4 className={styles.title}>Gửi kết quả</h4>
				<p className={styles.text}>
					Bạn chắc chắn với kết quả chỉ định của mình? Kết quả sau khi
					gửi sẽ không thể thay đổi.
				</p>
				<div className={styles.groupBtnPopup}>
					<Button grey rounded_8 bold p_8_24 onClick={handleBack}>
						Cập nhật
					</Button>
					<Button
						primary_2
						bold
						rounded_8
						p_8_24
						onClick={handleSubmit}
					>
						Gửi đi
					</Button>
				</div>
			</div>
		</Fragment>
	);
}

export default PopupSubmitResultIndication;
