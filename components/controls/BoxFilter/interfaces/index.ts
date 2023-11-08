export interface TypeFilter {
	isStatus?: boolean;
	keyNameStatus: string;
	keyNameExam: string;
	keyNameTime: string;
	keyNameKeyword: string | '';
	arrayStatus: Array<{value: number; title: string}>;
}
