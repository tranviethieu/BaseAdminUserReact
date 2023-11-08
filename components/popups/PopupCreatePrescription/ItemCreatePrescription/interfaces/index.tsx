export interface TypeItemCreatePrescription {
	checkValue: boolean;
	show: boolean;
	dataPrescription: TypeFormData;
	onChange: (any: TypeFormData) => void;
	clearPrescription: () => void;
}

export interface TypeFormData {
	name: string;
	dosage: string;
	unit: string;
	instructions: string;
}
