import {
	CalendarEdit,
	DocumentText,
	FolderOpen,
	Health,
	MenuBoard,
	ProfileCircle,
	Setting3,
	ShieldSecurity,
	TaskSquare,
} from 'iconsax-react';

export const MAXIMUM_FILE = 20; //MB

export const allowFiles = [
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'image/jpeg',
	'image/jpg',
	'image/png',
];

export const PUBLICH_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+lIcx1p+foo+pUZfRWNU
aByv+sDnfsglJT4HMwvScndviKlBV9C2Hi/658aUlKYPk6AqC2HkfrfP/aTQn6bU
JdN/fjJ5MXKBUpgYjT9ZG3dFKwb0U5rSTwBdJhdfdoqhxe1ck+un/rTu/3duCLnd
j6v9eYpQ4SO7zulU6WDEMiy78Hqah5BNNuKJCDh8v7DboyY/m4P5WJTdI0zBQr0z
ArNNBDDifEj+H14lkInvEKLcISuQulowHrrCgm6lt+g/LxpW4dwMvhyL4lNAatok
DhElJrfUf1WXkbaZuG9XkDpdYDJbULxSltXmrPY4NS3JN5Z3lHKafdAzs69Rt20Z
NQIDAQAB
-----END PUBLIC KEY-----`;
export const listMenus: Array<any> = [
	{
		mainTitle: 'MENU',
		title: '',
		icon: CalendarEdit,
		href: '',
	},
	{
		mainTitle: '',
		title: 'Tổng quan',
		icon: Health,
		href: '/',
	},
	{
		mainTitle: 'KHÁCH HÀNG',
		title: '',
		icon: CalendarEdit,
		href: '',
	},
	{
		mainTitle: 'KHÁCH HÀNG',
		title: 'Cơ sở y tế',
		icon: CalendarEdit,
		href: '/hospital',
	},
	
];

export const listMenu: Array<any> = [
	[
		{
			title: 'Tổng quan',
			icon: Health,
			href: '/',
		},
	],
	[
		{
			title: 'Cơ sở y tế',
			icon: CalendarEdit,
			href: '/hospital',
		},
		{
			title: 'Quản lý khám bệnh',
			icon: FolderOpen,
			href: '/patient-examination',
		},
		{
			title: 'Quản lý chỉ định',
			icon: TaskSquare,
			href: '/disease-indication',
		},
	],
	[
		{
			title: 'Lịch làm việc',
			icon: MenuBoard,
			href: '/calendar',
		},
		{
			title: 'Cài đặt',
			icon: Setting3,
			href: '/profile',
		},
	],
];

export const listMenuProfile: Array<any> = [
	{
		title: 'Tài khoản của tôi',
		icon: ProfileCircle,
		href: '/profile',
	},
	{
		title: 'Đổi mật khẩu',
		icon: ShieldSecurity,
		href: '/profile/change-pass',
	},
];

export const listSidebarProfile: Array<any> = [
	{
		title: 'Tài khoản của tôi',
		icon: ProfileCircle,
		href: '/profile',
	},
	{
		title: 'Đổi mật khẩu',
		icon: ShieldSecurity,
		href: '/profile/change-pass',
	},
	{
		title: 'Điều khoản sử dụng',
		icon: DocumentText,
		href: '/profile/rules',
	},
];
