import axiosClient from '.';

const router = 'SelfInformation';

const selfInformation = {
	getInfo: (
		data: {
			token: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}`, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	editInfo: (
		data: {
			token: string | null;
			uuid: string;
			wardId: number | null;
			provinceId: number | null;
			districtId: number | null;
			specificAddress: string;
			image: string;
			name: string;
			email: string;
			phone: string;
			dateOfBirth: string | null;
			genderId: number | null;
			idCard: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/${data.uuid}`, data, {
			cancelToken: tokenAxios,
			headers: {Authorization: 'Bearer ' + data.token},
		});
	},

	changePassword: (
		data: {
			token: string | null;
			uuid: string;
			passwordOld: string;
			passwordNew: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/${data.uuid}/password`, data, {
			cancelToken: tokenAxios,
			headers: {Authorization: 'Bearer ' + data.token},
		});
	},
};

export default selfInformation;
