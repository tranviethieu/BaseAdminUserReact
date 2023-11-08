import {TbArrowsUpDown} from 'react-icons/tb';
import styles from './Table.module.scss';
import {PropsTable} from './interfaces';

function Table({data, column}: PropsTable) {
	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr>
						{column.map((v, i) => (
							<th key={i}>
								<div className={styles.title}>
									{v.title != '' && (
										<div className={styles.icon_title}>
											<TbArrowsUpDown size={16} />
										</div>
									)}
									{v.title}
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((v, i) => (
						<tr key={i}>
							{column.map((y, j) => (
								<td className={y.className} key={j}>
									{y.render(v)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
