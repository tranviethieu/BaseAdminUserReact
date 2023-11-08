export interface TypePopupCreateSpecify {
	isCanInsertDesignations: boolean;
	uuidTicket: string;
	onClose: () => void;
}

export interface TypeSpecify {
	uuidDesignation: string;
	nameDesignation: string;
	note: string;
	checkValue: boolean;
}

export interface TypeValue {
	uuidDesignation: string;
	nameDesignation: string;
	note: string;
}
