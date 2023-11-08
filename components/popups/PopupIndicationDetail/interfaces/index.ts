export interface TypePopupIndicationDetail {
	uuidIndication: string;
	onClose: () => void;
	onOpenConfirmIndication?: () => void;
	onOpenDeleteIndication?: () => void;
	onOpenCreateResult?: () => void;
}

export interface TypeDetailIndication {
	uuid: string;
	name: string;
	code: string;
	description: string;
	state: {
		id: number;
		name: string;
	};
	type: {
		uuid: string;
		name: string;
	};
	createAt: string;
	patient: {
		uuid: string;
		code: string;
		image: string;
		fullName: string;
		dateOfBirth: string;
		gender: {
			id: number;
			name: string;
		};
	};
	result: {
		doctorConclusion: {
			uuid: string;
			name: string;
		};
		updateAt: string | null;
		resultText: string;
		images: Array<string>;
	};
}
