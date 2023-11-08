export interface PropsSectionCalendarToday {}

export interface TypeCalendarToday {
	time: string;
	patients: Array<TypePatient>;
}

export interface TypePatient {
	uuid: string;
	name: string;
	image: string;
	state: {
		id: number;
		name: string;
	};
	addressType: {
		id: number;
		name: string;
	};
	ticketUuid: string;
}
