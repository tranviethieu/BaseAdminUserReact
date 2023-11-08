export interface TypePopupDetailExam {
	setTicketUuid?: (any: any) => void;
	setNamePatient?: (any: any) => void;
	onClose: () => void;
	onOpenBrowseExam?: () => void;
	onOpenCancelExam?: () => void;
	onOpenConfirmExam?: () => void;
}

export interface TypeDetailExam {
	uuid: string;
	code: string;
	note: string;
	addressType: {
		id: number;
		name: string;
	};
	createAt: string;
	state: {
		id: number;
		name: string;
	};
	timeExam: string;
	service: {
		id: number | null;
		name: string | null;
	};
	address: {
		ward: {
			id: number;
			name: string;
		};
		province: {
			id: number;
			name: string;
		};
		district: {
			id: number;
			name: string;
		};
		specificAddress: string;
	};
	patient: {
		image: string | null;
		birthDay: string;
		phone: string;
		sympton: string;
		gender: {
			id: number;
			name: string;
		};
		symptonImages: Array<string>;
		name: string;
		uuid: string;
	};
}
