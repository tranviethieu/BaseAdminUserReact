import React, {Fragment, useContext, useEffect, useState} from 'react';

import styles from './PopupCreateIndication.module.scss';
import clsx from 'clsx';
import {TypePopupCreateIndication} from './interfaces';
import Button from '~/components/controls/Button';
import {Add, Trash} from 'iconsax-react';
import {IoMdClose} from 'react-icons/io';
import Image from 'next/image';
import {ContextIndication} from '~/components/page/disease-indication/TableIndicationPendding/contextIndication';
import {TypeContext} from '~/components/page/disease-indication/TableIndicationPendding/interfaces';
import {toastText} from '~/common/func/toast';
import {MAXIMUM_FILE} from '~/constants/configs';

function PopupCreateIndication({
	onOpenPopupSubmitResult,
	onClose,
}: TypePopupCreateIndication) {
	// Context
	const contextIndication = useContext<TypeContext>(ContextIndication);

	// Xử lý thêm ảnh mới ==> set images context form
	const handleFileChange = (event: any) => {
		const files = event.target.files;
		const newImages: any = [];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];

			// Kiểm tra file đúng định dạng
			if (file.size / 1000000 > MAXIMUM_FILE) {
				toastText({
					msg: `Kích thước tối đa của ảnh là ${MAXIMUM_FILE} mb`,
				});
				// return;
			} else if (
				file.type !== 'image/jpeg' &&
				file.type !== 'image/jpg' &&
				file.type !== 'image/png'
			) {
				toastText({
					msg: `Định dạng tệp không chính xác, đuôi tệp chấp nhận .jpg, .jpeg, .png`,
				});
				return;
			}
			// add image to array
			const url = URL.createObjectURL(file);
			newImages.push({url, file});
		}

		contextIndication.setContextForm((prev: any) => ({
			...prev,
			images: prev.images
				? [...prev?.images, ...newImages]
				: [...newImages],
		}));
	};

	// Xử lý xóa ảnh ==> set là images context form
	const handleDelete = (index: number) => {
		contextIndication.setContextForm((prev: any) => {
			URL.revokeObjectURL(prev.images[index].url);

			return {
				...prev,
				images: [
					...prev.images.slice(0, index),
					...prev.images.slice(index + 1),
				],
			};
		});
	};

	// Validate form ==> step 2
	const handleSubmit = () => {
		if (!contextIndication.contextForm.uuidIndication) {
			return toastText({msg: 'Không tìm thấy phiếu chỉ định!'});
		}
		if (!contextIndication.contextForm.result) {
			return toastText({msg: 'Vui lòng nhập kết quả chỉ định!'});
		}
		if (contextIndication.contextForm.images.length == 0) {
			return toastText({msg: 'Vui lòng thêm tài liệu đính kèm!'});
		}

		onClose();
		onOpenPopupSubmitResult();
	};

	return (
		<div className={clsx('effectZoom', styles.container)}>
			<h3 className={styles.title}>Tạo kết quả</h3>
			<p className={styles.des}>Nội dung kết quả của chỉ định</p>
			<textarea
				value={contextIndication?.contextForm?.result}
				className={styles.textarea}
				placeholder='Nhập kết quả chỉ định ...'
				onChange={(e: any) =>
					contextIndication.setContextForm((prev: any) => ({
						...prev,
						result: e.target.value,
					}))
				}
			></textarea>

			<h4 className={styles.title_2}>Thêm tệp tài liệu</h4>
			<p className={styles.des_2}>
				Kết quả được tải lên không quá 10MB. Định dạng tệp: .jpg, .png,
				.jpeg
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
				{contextIndication?.contextForm?.images?.map((image, index) => (
					<div className={styles.box_image} key={image.url}>
						<Image
							className={styles.image}
							src={image.url}
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
						Bỏ qua
					</Button>
					<Button
						primary_2
						bold
						rounded_8
						p_8_24
						onClick={handleSubmit}
					>
						Tạo kết quả
					</Button>
				</div>
			</div>

			<div onClick={onClose} className={styles.icon_close}>
				<IoMdClose size={20} />
			</div>
		</div>
	);
}

export default PopupCreateIndication;
