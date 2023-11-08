import axiosClient from '.';

const router = 'Authenticates';

const auth = {
	// Đăng nhập
	login: (
		data: {
			token: string | null;
			username: string;
			password: string;
			ipLogin: string;
			device: string;
			os: string;
			model: string;
			isApp: boolean;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/login`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},

	// Kiểm tra email, tài khoản user
	checkUser: (
		data: {
			token: string | null;
			username: string;
			Channel: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/${data.username}/otp?Channel=${data.Channel}`,
			{
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},

	// Kiểm tra OTP
	checkOTP: (
		data: {
			token: string | null;
			otp: string;
			username: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/otp-verify`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},

	// Thiết lập mật khẩu
	forgotPassword: (
		data: {
			username: string;
			newPassword: string;
			token: string | null;
			otp: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/forgot-password`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default auth;
