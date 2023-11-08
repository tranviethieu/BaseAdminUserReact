export interface PropsSelector {
	children: React.ReactNode;
	onChange?: (any: any) => void;
	name?: string;
	value?: any;
	placeholder?: string;
	overflow?: boolean;
	textname?: string;
	valuename?: string;
}

export interface PropsOption {
	children?: React.ReactNode;
	title: string;
	value: any;
	onClick?: () => void;
}
export interface TypeAddress {
	provinceId?: string;
	districtId?: string;
	wardId?: string;
	provinceName?: string;
	districtName?: string;
	wardName?: string;
	handleChangeAddress?: (e: any) => void;
}
