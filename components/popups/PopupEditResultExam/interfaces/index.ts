export interface TypePopupEditResultExam {
	uuidConclusion: string;
	data: {
		uuid: string;
		result: string;
		images: Array<string>;
		isCanEdit: boolean;
	};
	onClose: () => void;
}
