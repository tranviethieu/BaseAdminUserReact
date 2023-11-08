import React, {Fragment, useState} from 'react';
import {TypeItemPrescription} from './interfaces';

import styles from './ItemPrescription.module.scss';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import {Edit2, Trash} from 'iconsax-react';
import Popup from '~/components/common/Popup';
import PopupDeletePrescription from '~/components/popups/PopupDeletePrescription';
import PopupUpdatePrescription from '~/components/popups/PopupUpdatePrescription';

function ItemPrescription({data}: TypeItemPrescription) {
	const [openUpdate, setOpenUpdate] = useState<boolean>(false);
	const [openDelete, setOpenDelete] = useState<boolean>(false);
	const [uuidPrescription, setUuidPrescription] = useState<string>('');
	const [dataPrescription, setDataPrescription] = useState<any>();

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.info}>
					{/* <ImageFill
						src={`${process.env.NEXT_PUBLIC_URL_FILE}/${data.image}`}
						style_1_1
						className={styles.image}
					/> */}
					<div className={styles.content}>
						<p className={styles.name}>{data?.name}</p>
						<p className={styles.qlt}>
							{data?.dosage} - {data?.unit}
						</p>
						<p className={styles.amount}>{data?.note}</p>
					</div>
				</div>
				<div className={styles.control}>
					<div
						className={styles.edit}
						onClick={() => {
							setOpenUpdate(true);
							setUuidPrescription(data.uuid);
							setDataPrescription(data);
						}}
					>
						<Edit2 size={18} />
					</div>
					<div
						className={styles.trash}
						onClick={() => {
							setOpenDelete(true);
							setUuidPrescription(data.uuid);
						}}
					>
						<Trash size={18} />
					</div>
				</div>
			</div>

			{/* Popup */}
			<Popup open={openDelete} onClose={() => setOpenDelete(false)}>
				<PopupDeletePrescription
					uuidPrescription={uuidPrescription}
					onClose={() => setOpenDelete(false)}
				/>
			</Popup>

			<Popup open={openUpdate} onClose={() => setOpenUpdate(false)}>
				<PopupUpdatePrescription
					dataPrescription={dataPrescription}
					onClose={() => setOpenUpdate(false)}
				/>
			</Popup>
		</Fragment>
	);
}

export default ItemPrescription;
