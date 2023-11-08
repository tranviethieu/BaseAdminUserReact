import {Fragment, useMemo} from 'react';

import ImageWithFallback from '~/components/common/Image';
import LightGallery from 'lightgallery/react';
import {PropsListImage} from './interfaces';
import lgZoom from 'lightgallery/plugins/zoom';
import styles from './ListImage.module.scss';

function ListImage({images = [], alt = 'Mô tả ảnh', max = 4}: PropsListImage) {
	// const max = 4;
	const countImage = useMemo(() => images.length, [images]);

	return (
		<Fragment>
			<LightGallery
				elementClassNames={styles.container}
				speed={500}
				plugins={[lgZoom]}
			>
				{images?.map((v, i) => (
					<a
						hidden={i >= max}
						className={styles.item_image}
						key={i}
						href={`${process.env.NEXT_PUBLIC_URL_FILE}/${v}`}
					>
						<ImageWithFallback
							className={styles.image_sick}
							src={`${process.env.NEXT_PUBLIC_URL_FILE}/${v}`}
							alt={alt}
							layout='fill'
						/>
						{i + 1 == max && countImage > max ? (
							<div className={styles.count}>
								+{countImage - max}
							</div>
						) : null}
					</a>
				))}
			</LightGallery>
		</Fragment>
	);
}

export default ListImage;
