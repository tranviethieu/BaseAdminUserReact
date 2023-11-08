import {checkNullQuery} from '~/common/func/checkNullQuery';
import axiosClient from '.';

const router = 'ManageBooking';

const manageBooking = {
	// Lịch đặt khám chờ duyệt
	getInfoBookingWait: (
		data: {
			token: string | null;
			uuid: string;
			Page: number;
			Limit: number;
			Keyword: string;
			To: string | undefined;
			From: string | undefined;
			AddressType: number | null;
			StateId: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/${data.uuid}/wait?Limit=${data.Limit}&Page=${
				data.Page
			}${checkNullQuery('AddressType', data.AddressType)}&Keyword=${
				data.Keyword
			}${checkNullQuery('From', data.From)}${checkNullQuery(
				'To',
				data.To
			)}${checkNullQuery('StateId', data.StateId)}`,
			{
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},
	// Lịch đặt khám đang diễn ra
	getInfoBookingPenning: (
		data: {
			token: string | null;
			uuid: string;
			Page: number;
			Limit: number;
			Keyword: string;
			To: string | undefined;
			From: string | undefined;
			AddressType: number | null;
			StateId: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/${data.uuid}/doing-exam?Limit=${data.Limit}&Page=${
				data.Page
			}${checkNullQuery('AddressType', data.AddressType)}&Keyword=${
				data.Keyword
			}${checkNullQuery('From', data.From)}${checkNullQuery(
				'To',
				data.To
			)}${checkNullQuery('StateId', data.StateId)}`,
			{
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},
	// Lịch đặt khám kết thúc
	getInfoBookingEnd: (
		data: {
			token: string | null;
			uuid: string;
			Page: number;
			Limit: number;
			Keyword: string;
			To: string | undefined;
			From: string | undefined;
			AddressType: number | null;
			StateId: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/${data.uuid}/end?Limit=${data.Limit}&Page=${
				data.Page
			}${checkNullQuery('AddressType', data.AddressType)}&Keyword=${
				data.Keyword
			}${checkNullQuery('From', data.From)}${checkNullQuery(
				'To',
				data.To
			)}${checkNullQuery('StateId', data.StateId)}`,
			{
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},

	// Chi tiết lịch khám
	getDetailBooking: (
		data: {
			token: string | null;
			uuid: string;
			ticketUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/${data.uuid}/detail/${data.ticketUuid}`,
			{
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},

	// Duyệt lịch khám
	confirmExam: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/${data.uuid}/confirm`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Từ chối lịch khám
	refuseExam: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
			note: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/${data.uuid}/refuse`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Xác nhận đến lượt khám
	confirmTurnExam: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/${data.uuid}/confirm-exam`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},
};

export default manageBooking;
