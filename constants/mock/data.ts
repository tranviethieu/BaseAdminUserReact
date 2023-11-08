import {STATUS_EXAM, STATUS_INDICATION, TYPE_EXAM} from './enum';

// eslint-disable-next-line import/no-anonymous-default-export
export const listExam: Array<{title: string; value: number}> = [
	{
		value: TYPE_EXAM.CO_SO_Y_TE,
		title: 'Khám tại CSYT',
	},
	{
		value: TYPE_EXAM.TRUC_TUYEN,
		title: 'Khám trực tuyến',
	},
	{
		value: TYPE_EXAM.TAI_NHA,
		title: 'Khám tại nhà',
	},
];

// Danh sách trạng thái lịch hẹn khám ==> chờ duyệt
export const listStatusWait: Array<{title: string; value: number}> = [
	{
		value: STATUS_EXAM.DA_XAC_NHAN,
		title: 'Đã xác nhận',
	},
	{
		value: STATUS_EXAM.DA_DUYET,
		title: 'Đã duyệt',
	},
];

// Danh sách trạng thái lịch hẹn khám ==> đang diễn ra
export const listStatusPenning: Array<{title: string; value: number}> = [
	{
		value: STATUS_EXAM.CHO_KHAM,
		title: 'Chờ khám',
	},
	// {
	// 	value: STATUS_EXAM.DEN_LUOT_KHAM,
	// 	title: 'Đến lượt khám',
	// },
	{
		value: STATUS_EXAM.DANG_KHAM,
		title: 'Đang khám',
	},
];

// Danh sách trạng thái lịch hẹn khám ==> kết thúc
export const listStatusEnd: Array<{title: string; value: number}> = [
	{
		value: STATUS_EXAM.DA_KHAM,
		title: 'Đã khám',
	},
	{
		value: STATUS_EXAM.TU_CHOI,
		title: 'Từ chối',
	},
	{
		value: STATUS_EXAM.DA_HUY,
		title: 'Đã Hủy',
	},
];

// Danh sách tất cả trạng thái
export const listStatus: Array<{title: string; value: number}> = [
	{
		value: STATUS_EXAM.CHUA_THANH_TOAN,
		title: 'Chưa thanh toán',
	},
	{
		value: STATUS_EXAM.CHO_XAC_NHAN,
		title: 'Chờ xác nhận',
	},
	{
		value: STATUS_EXAM.DA_XAC_NHAN,
		title: 'Đã xác nhận',
	},
	{
		value: STATUS_EXAM.DA_DUYET,
		title: 'Đã duyệt',
	},
	{
		value: STATUS_EXAM.CHO_KHAM,
		title: 'Chờ khám',
	},
	{
		value: STATUS_EXAM.DEN_LUOT_KHAM,
		title: 'Đến lượt khám',
	},
	{
		value: STATUS_EXAM.DANG_KHAM,
		title: 'Đang khám',
	},
	{
		value: STATUS_EXAM.DA_KHAM,
		title: 'Đã khám',
	},
	{
		value: STATUS_EXAM.TU_CHOI,
		title: 'Từ chối',
	},
	{
		value: STATUS_EXAM.DA_HUY,
		title: 'Đã Hủy',
	},
];

// Danh sách trang thái phiếu khám bệnh ==> tab chờ khám
export const statusMedicalRecordWait: Array<{title: string; value: number}> =
	[];

// Danh sách trang thái phiếu khám bệnh ==> tab đang diễn ra
export const statusMedicalRecordPenning: Array<{title: string; value: number}> =
	[];
// Danh sách trang thái phiếu khám bệnh ==> tab kết thúc
export const statusMedicalRecordEnd: Array<{title: string; value: number}> = [
	{
		value: STATUS_EXAM.DA_KHAM,
		title: 'Đã khám',
	},
	{
		value: STATUS_EXAM.DA_HUY,
		title: 'Đã hủy',
	},
];

// Danh sách trạng thái phiếu chỉ định
export const listStatusIndication: Array<{title: string; value: number}> = [
	{
		value: STATUS_INDICATION.CHO_XU_LY,
		title: 'Chờ xử lý',
	},
	{
		value: STATUS_INDICATION.DANG_XU_LY,
		title: 'Đang xử lý',
	},
	{
		value: STATUS_INDICATION.DA_XU_LY,
		title: 'Đã xử lý',
	},
];
