export interface TypeItemPrescription {
	data: {
		dosage: number;
		image: string;
		name: string;
		note: string;
		unit: string;
		uuid: string;
		medicineType: {
			id: number;
			name: string;
		};
	};
}
