import {PropsMainHome} from './interfaces';
import SectionCalendarSoon from '../SectionCalendarSoon';
import SectionCalendarToday from '../SectionCalendarToday';
import SectionChart from '../SectionChart';
import SectionHello from '../SectionHello';
import SectionInfo from '../SectionInfo';
import SectionRecentCalendar from '../SectionRecentCalendar';
import styles from './MainHome.module.scss';

function MainHome({}: PropsMainHome) {
	return (
		<div className={styles.container}>
			<div className={styles.col}>
				<SectionHello />
				<SectionInfo />
				<SectionChart />
				<SectionRecentCalendar />
			</div>
			<div className={styles.col}>
				<SectionCalendarToday />
				<SectionCalendarSoon />
			</div>
		</div>
	);
}

export default MainHome;
