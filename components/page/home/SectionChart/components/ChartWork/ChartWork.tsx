import {PropsChartWork} from './interfaces';
import styles from './ChartWork.module.scss';
import {useMemo} from 'react';

function ChartWork({
	num_1 = 0,
	num_2 = 0,
	num_3 = 0,
	color_1 = '#4CD28A',
	color_2 = '#00B2FF',
	color_3 = '#B4A2FE',
	note_1 = '',
	note_2 = '',
	note_3 = '',
	title = '',
}: PropsChartWork) {
	const total = useMemo(() => num_1 + num_2 + num_3, [num_1, num_2, num_3]);

	const percent: string = useMemo(() => {
		const num1Percent = (100 / total) * num_1;
		const num2Percent = num1Percent + (100 / total) * num_2;
		const num3Percent = num2Percent + (100 / total) * num_3;

		return num3Percent
			? `${color_1} 0%,
			${color_1} ${num1Percent}%,
			${color_2} ${num1Percent}%,
			${color_2} ${num2Percent}%,
			${color_3} ${num2Percent}%,
			${color_3} ${num3Percent}%`
			: '#edf2f6 0%, #edf2f6 100%';
	}, [color_1, color_2, color_3, num_1, num_2, num_3, total]);

	return (
		<div className={styles.container}>
			<div
				className={styles.chart}
				style={{
					backgroundImage: `conic-gradient(${percent})`,
				}}
			>
				<div className={styles.dot}>
					<p className={styles.title}>{title}</p>
					<p className={styles.num}>{total}</p>
				</div>
			</div>
			<div className={styles.notes}>
				<div className={styles.line}>
					<div
						className={styles.box}
						style={{backgroundColor: color_1}}
					></div>
					<div className={styles.info}>
						<p className={styles.text}>{note_1}</p>
						<p className={styles.num}>{num_1}</p>
					</div>
				</div>
				<div className={styles.line}>
					<div
						className={styles.box}
						style={{backgroundColor: color_2}}
					></div>
					<div className={styles.info}>
						<p className={styles.text}>{note_2}</p>
						<p className={styles.num}>{num_2}</p>
					</div>
				</div>
				<div className={styles.line}>
					<div
						className={styles.box}
						style={{backgroundColor: color_3}}
					></div>
					<div className={styles.info}>
						<p className={styles.text}>{note_3}</p>
						<p className={styles.num}>{num_3}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChartWork;
