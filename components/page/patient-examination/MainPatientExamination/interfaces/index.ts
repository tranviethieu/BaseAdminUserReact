export interface TypeMainPatientExamination {}

export interface TypeData {
	uuid: string;
	code: string;
	ticketCode: string;
	patient: {
		uuid: string;
		name: string;
		code: string;
		image: string;
	};
	addressType: {
		id: number | null;
		name: string;
	};
	timeCreated: string | null;
	timeExam: string | null;
	state: {
		id: number | null;
		name: string;
	};
	isStartExam: boolean;
	isFinishExam: boolean;
}
