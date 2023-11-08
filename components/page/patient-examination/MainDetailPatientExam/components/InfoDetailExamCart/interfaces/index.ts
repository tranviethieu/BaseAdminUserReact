export interface TypeInfoDetailExamCart {}

export interface TypeData {
	data: {
		medicalRecordInfo: {
			uuid: string;
			code: string;
			addressType: {
				id: number;
				name: string;
			};
			state: {
				id: number;
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
			id: string;
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
			medicineType: {
				id: number;
				name: string;
			};
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
	};
}
