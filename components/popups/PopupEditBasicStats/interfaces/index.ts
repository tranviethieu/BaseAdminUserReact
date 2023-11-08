export interface TypePopupEditBasicStats {
	uuidTicket: string;
	isCanInsertBasicIndex: boolean;
	onClose: () => void;
	data: {
		id: string;
		height: number | null;
		weight: number | null;
		temperature: number | null;
		heartRate: number | null;
		breathingRate: number | null;
		bloodPressure: number | null;
	};
}

export interface TypeForm {
	height: number | null;
	weight: number | null;
	temperature: number | null;
	heartRate: number | null;
	breathingRate: number | null;
	bloodPressure: number | null;
}
