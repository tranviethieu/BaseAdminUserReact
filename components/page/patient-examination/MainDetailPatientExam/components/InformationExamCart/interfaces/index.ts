export interface TypeInformationExamCart {}

export interface TypeData {
	data: {
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
			note: string;
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
	};
}
