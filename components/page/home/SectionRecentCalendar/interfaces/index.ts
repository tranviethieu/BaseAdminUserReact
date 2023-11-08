export interface PropsSectionRecentCalendar {}

export interface TypeData {
	uuid: string;
	image: string;
	code: string;
	patientCode: string;
	patientName: string;
	addressType: {
		id: number;
		name: string;
	};
	phone: string;
	createAt: string;
	state: {
		id: number;
		name: string;
	};
	timeExam: string;
	sympton: string;
	gender: {
		id: number;
		name: string;
	};
}
