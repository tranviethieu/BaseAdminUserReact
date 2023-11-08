export interface TypeAppointmentSchedule {}

export interface TypeData {
	image: string;
	code: string;
	patientCode: string;
	patientName: string;
	phone: string;
	addressType: {
		id: number;
		name: string;
	};
	createAt: string;
	timeExam: string;
	state: {
		id: number;
		name: string;
	};
	uuid: string;
}
