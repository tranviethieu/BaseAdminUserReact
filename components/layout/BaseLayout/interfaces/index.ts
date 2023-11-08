export interface PropsBaseLayout {
	title?: string;
	children: any;
}

export interface TContextBaseLayout {
	show?: boolean;
	setShow?: (boolean: boolean) => void;
}
