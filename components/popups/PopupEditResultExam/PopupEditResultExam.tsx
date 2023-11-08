import React, {Fragment, useEffect, useState} from 'react';
import styles from './PopupEditResultExam.module.scss';
import {Add, Trash} from 'iconsax-react';
import {IoMdClose} from 'react-icons/io';
import Image from 'next/image';
import {TypePopupEditResultExam} from './interfaces';
import Button from '~/components/controls/Button/Button';
import clsx from 'clsx';
import {toastError, toastSuccess, toastWarn} from '~/common/func/toast';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import uploadImageService from '~/services/uploadService';
import medicalRecord from '~/services/medicalRecord';
import LoadingScreen from '~/components/common/LoadingScreen';

function PopupEditResultExam({
	data,
	uuidConclusion,
	onClose,
}: TypePopupEditResultExam) {
	const router = useRouter();

	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [content, setContent] = useState<string>('');
	const [images, setImages] = useState<any[]>([]);

	const handleFileChange = (event: any) => {
		const files = event.target.files;
		const newImages: any = [];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const url = URL.createObjectURL(file);
			newImages.push({url, file});
		}

		setImages((prevImages) => [...prevImages, ...newImages]);
	};

	const handleDelete = (index: number) => {
		setImages((prevImages) => {
			URL.revokeObjectURL(prevImages[index].url);
			return [
				...prevImages.slice(0, index),
				...prevImages.slice(index + 1),
			];
		});
	};

	useEffect(() => {
		if (data) {
			setContent(data?.result);
			setImages(() =>
				data?.images?.map((item: string) => ({
					url: item,
					img: `${process.env.NEXT_PUBLIC_URL_FILE}/${item}`,
				}))
			);
		}
	}, [data]);

	const handleSubmit = async () => {
		if (!content) {
			return toastWarn({msg: 'Vui lòng nhập kết luận khám!'});
		}

		if (images.length == 0) {
			return toastWarn({msg: 'Vui lòng thêm ảnh tài liệu đính kèm!'});
		}

		// Lấy ra danh sách ảnh có trước
		const currentImage = images
			.filter((item) => !!item.img)
			.map((v) => v.url);

		// Xử lý upload ảnh
		const files = images.map((image) => image.file);
		const formData = new FormData();
		files.forEach((image) => {
			formData.append(`files`, image);
		});

		// List image submit
		const imagesFile = await httpRequest({
			http: uploadImageService.uploadMutilImage({
				token: token!,
				formData: formData,
			}),
		});

		if (token) {
			setLoading(true);

			// Call api
			const editConclusion = await httpRequest({
				setError: (err) => {
					toastError({msg: err});
				},
				http: medicalRecord.editConclusion({
					token: token!,
					AccountUuid: accountId as string,
					uuid: uuidConclusion as string,
					content: content,
					images: [...currentImage, ...imagesFile],
				}),
			});
			setLoading(false);

			if (editConclusion) {
				onClose();
				router.replace(router.asPath, undefined, {scroll: false});
				return toastSuccess({
					msg: 'Chỉnh sửa kết luận khám thành công!',
				});
			}
		}
	};

	return (
		<Fragment>
			<LoadingScreen isLoading={loading} />
			<div className={clsx('effectZoom', styles.container)}>
				<h3 className={styles.title}>Chỉnh sửa kết luận khám</h3>
				<p className={styles.des}>
					Hãy chắc chắn rằng kết quả khám của bạn không có sự nhầm
					lẫn.
				</p>
				<textarea
					value={content}
					className={styles.textarea}
					placeholder='Nhập kết luận khám của bạn...'
					onChange={(e: any) => setContent(e.target.value)}
				></textarea>
				<h4 className={styles.title_2}>Thêm tệp tài liệu</h4>
				<p className={styles.des_2}>
					Kết quả được tải lên không quá 10MB. Định dạng tệp: .jpg,
					.png, .jpeg
				</p>
				<label className={styles.btn_image}>
					<div className={styles.icon_add}>
						<Add size={16} color='#303B48' />
					</div>
					<p className={styles.text_btn}>Tải lên</p>
					<input
						hidden
						type='file'
						multiple
						onClick={(e: any) => {
							e.target.value = null;
						}}
						onChange={handleFileChange}
					/>
				</label>
				<div className={styles.list_image}>
					{images.map((image, index) => (
						<div className={styles.box_image} key={image.url}>
							<Image
								className={styles.image}
								src={image.img || image.url}
								alt='image'
								objectFit='cover'
								layout='fill'
							/>
							<div
								className={styles.delete}
								onClick={() => handleDelete(index)}
							>
								<Trash size={14} />
							</div>
						</div>
					))}
				</div>

				<div className={styles.btn}>
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
							Thay đổi kết quả
						</Button>
					</div>
				</div>

				<div onClick={onClose} className={styles.icon_close}>
					<IoMdClose size={20} />
				</div>
			</div>
		</Fragment>
	);
}

export default PopupEditResultExam;
