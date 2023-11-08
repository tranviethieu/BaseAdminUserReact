import ImageWithFallback from '../Image/ImageWithFallback';
import {AiFillCamera} from 'react-icons/ai';
import {PropsAvatarChange} from './interfaces';
import styles from './AvatarChange.module.scss';

function AvatarChange({src, onChange, name, className}: PropsAvatarChange) {
	return (
		<div className={styles.container}>
			{src ? (
				<ImageWithFallback
					className={styles.avatar}
					src={src}
					layout='fill'
					alt='avatar'
				/>
			) : null}
			<label className={styles.input}>
				<AiFillCamera />
				<input
					hidden
					type='file'
					name={name}
					onChange={onChange}
					onClick={(e: any) => (e.target.value = null)}
				/>
			</label>
		</div>
	);
}

export default AvatarChange;
