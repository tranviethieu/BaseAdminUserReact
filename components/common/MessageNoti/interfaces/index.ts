import {ReactNode} from 'react';

export interface PropsMessageNoti {
	image?: string;
	title?: ReactNode;
	des?: ReactNode;
	btn?: boolean;
	text_btn?: string;
	href?: string;
	width?: string;
}
