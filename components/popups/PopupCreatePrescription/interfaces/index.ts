export interface TypePopupCreatePrescription {
	uuidTicket: string;
	isCanInsertPrescriptions: boolean;
	onClose: () => void;
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

export interface TypeForm {
	name: string;
	dosage: string;
	unit: string;
	instructions: string;
	checkValue?: boolean;
}
