export interface TypeTableIndicationPendding {}

export interface TypeData {
	uuid: string;
	name: string;
	patientName: string;
	description: string;
	state: {
		id: number;
		name: string;
	};
	type: {
		uuid: string;
		name: string;
	};
	createAt: string | null;
	code: string;
}

export interface TypeContext {
	contextForm: {
		uuidIndication: string;
		result: string;
		images: Array<any>;
	};
	setContextForm: (any: any) => void;
}
