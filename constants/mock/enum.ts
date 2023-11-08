// eslint-disable-next-line import/no-anonymous-default-export
export const KEY_STORE = 'mobi-doctor-store';
export enum GENDER {
	NAM = 1,
	NU = 2,
	KHAC = 3,
}

// Địa điểm khám
export enum TYPE_EXAM {
	CO_SO_Y_TE = 1,
	TRUC_TUYEN = 2,
	TAI_NHA = 3,
}

export const TIME_OTP = 60;

// Trạng thái phiếu khám
export enum STATUS_EXAM {
	CHUA_THANH_TOAN,
	CHO_XAC_NHAN,
	DA_XAC_NHAN,
	DA_DUYET,
	CHO_KHAM,
	DEN_LUOT_KHAM,
	DANG_KHAM,
	DA_KHAM,
	TU_CHOI,
	DA_HUY,
}

// Trạng thái chỉ định
export enum STATUS_INDICATION {
	CHO_XU_LY = 1,
	DANG_XU_LY,
	DA_XU_LY,
}

// ENUM REACT QUERY
export enum QUERY_APPOINTMENT_SCHEDULE {
	WAIT = 'appointment-schedule-wait',
	PENNING = 'appointment-schedule-penning',
	END = 'appointment-schedule-end',
}

// Trạng thái thông báo
export enum STATUS_NOTI {
	CHUA_DOC = 0,
	DA_DOC,
}

// Điều hướng thông báo
export enum NAVIGATE_TYPE_NOTI {
	KHONG_DIEU_HUONG = 0,
	LICH_HEN_KHAM = 1,
	PHIEU_KHAM_BENH = 2,
	DANH_SACH_LICH_HEN_KHAM = 4,
}

// Bật tắt thông báo
export enum STATE_NOTI {
	DANG_BAT = 1,
	DANG_TAT,
}
