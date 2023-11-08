import axiosClient from '.';

const router = 'Notification';

const notificationService = {
	// Lấy tất cả thông báo
	getAllNotification: (
		data: {
			token: string;
			AccountUuid: string;
			Limit: number;
			Page: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}?Limit=${data.Limit}&Page=${data.Page}`,
			{
				headers: {
					AccountUuid: data.AccountUuid,
					Authorization: 'Bearer ' + data.token,
				},
				cancelToken: tokenAxios,
			}
		);
	},

	// Đọc thông báo
	readNotification: (
		data: {
			token: string;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/mark-as-read/${data.uuid}`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},

	// Đọc tất cả thông báo
	readAllNotification: (
		data: {
			token: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/mark-all-as-read`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Lấy số thông báo chưa đọc
	ping: (
		data: {
			token: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/ping`, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Lấy danh sách cài đặt thông báo
	notificationSetting: (
		data: {
			token: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/notification-setting`, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Bật tắt thông báo
	createResultIndication: (
		data: {
			token: string;
			AccountUuid: string;
			action: number;
			notificationCategory: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/notification-on-off`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},
};

export default notificationService;
