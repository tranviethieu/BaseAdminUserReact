export interface PropsItemCalendarToday {
	time: string;
	users: {
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
	}[];
	isOdd?: boolean;
}
