export interface TypeCreateSpecifyItem {
	specify: {
		uuidDesignation: string;
		nameDesignation: string;
		note: string;
		checkValue: boolean
	};
	onChange: (any: TypeValue) => void;
	clearSpecify: () => void;
	checkValue: boolean;
	show: boolean;
}

export interface TypeValue {
	uuidDesignation: string;
	nameDesignation: string;
	note: string;
}
