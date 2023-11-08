export interface TypePopupUpdatePrescription {
	onClose: () => void;
	dataPrescription: {
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

export interface TypePrescription {
	image: string;
	code: string;
	type: {
		id: null;
		name: string;
	};
	unit: any;
	name: string;
	uuid: string;
	instructions: string;
}
