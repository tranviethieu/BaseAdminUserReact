import axiosClient from '.';

const router = 'Dashboard';

const dashboardServices = {
	// Lấy lịch làm việc hôm nay
	getCalendarToday: (
		data: {
			token: string | null;
			AccountUuid: string;
			From: string | null;
			To: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/today`, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Lịch khám gần đây
	getCalendarRecently: (
		data: {
			token: string | null;
			AccountUuid: string;
			Limit: number;
			Page: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/recently?Limit=${data.Limit}&Page=${data.Page}`,
			{
				headers: {
					AccountUuid: data.AccountUuid,
					Authorization: 'Bearer ' + data.token,
				},
				cancelToken: tokenAxios,
			}
		);
	},

	// Lịch khám sắp tới
	getCalendarAwait: (
		data: {
			token: string | null;
			AccountUuid: string;
			Limit: number;
			Page: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/await?Limit=${data.Limit}&Page=${data.Page}`,
			{
				headers: {
					AccountUuid: data.AccountUuid,
					Authorization: 'Bearer ' + data.token,
				},
				cancelToken: tokenAxios,
			}
		);
	},

	// Tổng quan
	overview: (
		data: {
			token: string | null;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/overview`, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Thông kê theo giới tính
	getGenders: (
		data: {
			token: string | null;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/genders`, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Thông kê theo hình thức
	getAddressType: (
		data: {
			token: string | null;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/address-types`, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},
};

export default dashboardServices;
