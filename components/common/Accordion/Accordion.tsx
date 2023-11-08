import {PropsAccordion} from './interfaces';
import clsx from 'clsx';
import styles from './Accordion.module.scss';
import {useState} from 'react';

function Accordion({title, content}: PropsAccordion) {
	const [active, setActive] = useState<boolean>(false);

	return (
		<div className={clsx(styles.container, {[styles.active]: active})}>
			<div className={styles.header} onClick={() => setActive(!active)}>
				<p>{title}</p>
				<div className={styles.icon}></div>
			</div>
			<div className={styles.content}>
				<p>{content}</p>
			</div>
		</div>
	);
}

export default Accordion;
