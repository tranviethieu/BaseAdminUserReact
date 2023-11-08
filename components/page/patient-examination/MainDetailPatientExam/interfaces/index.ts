export interface TypeMainDetailPatientExam {}

export interface TypeDetailMedicalRecord {
	medicalRecordInfo: {
		uuid: string;
		code: string;
		specialist: {
			uuid: string;
			name: string;
		};
		service: {
			uuid: string;
			name: string;
		};
		addressType: {
			id: number;
			name: string;
		};
		timeExam: string | null;
		timeCreated: string | null;
		timeLastUpdated: string | null;
		state: {
			id: number;
			name: string;
		};
	};
	patientInfo: {
		uuid: string;
		image: string;
		code: string;
		fullName: string;
		dateOfBirth: string | null;
		gender: {
			id: number;
			name: string;
		};
		phone: string;
		sympton: string;
		symptonImages: Array<string>;
		province: {
			id: number;
			name: string;
		};
		district: {
			id: number;
			name: string;
		};
		ward: {
			id: number;
			name: string;
		};
		specificAddress: string;
	};
	doctorInfo: {
		uuid: string;
		name: string;
		image: string;
		clinic: {
			uuid: string;
			name: string;
		};
	};
	designations: Array<{
		uuid: string;
		name: string;
		result: string;
		state: {
			id: number;
			name: string;
		};
		timeCreated: string | null;
		timeUpdated: string | null;
		isCanDelete: boolean;
	}>;
	recordingFile: {
		file: string;
	};
	basicIndex: {
		id: number | null;
		height: number | null;
		weight: number | null;
		temperature: number | null;
		heartRate: number | null;
		breathingRate: number | null;
		bloodPressure: number | null;
	};
	examResults: {
		uuid: string;
		result: string;
		images: Array<string>;
		isCanEdit: boolean;
	};
	prescriptions: Array<{
		uuid: string;
		name: string;
		dosage: string;
		unit: string;
		note: string;
		image: string;
	}>;
	mrBoolean: {
		isCanConfirmExam: boolean;
		isCanFinish: boolean;
		isCanCancel: boolean;
		isCanInsertDesignations: boolean;
		isCanInsertConclusion: boolean;
		isCanInsertPrescriptions: boolean;
		isCanInsertBasicIndex: boolean;
	};
}
