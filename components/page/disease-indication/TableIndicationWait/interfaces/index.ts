export interface TypeTableIndicationWait {}

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
