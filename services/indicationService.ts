import {checkNullQuery} from '~/common/func/checkNullQuery';
import axiosClient from '.';

const router = 'MedicalRecordDesignations';

const indicationService = {
	// Danh sách phiếu chỉ định chờ xử lý
	getIndicationWait: (
		data: {
			token: string | null;
			uuid: string;
			Page: number;
			Limit: number;
			Keyword: string;
			TimeDesignation: string | undefined;
			Designation: string;
			Type: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/${data.uuid}/wait?Limit=${data.Limit}&Page=${
				data.Page
			}${checkNullQuery('Type', data.Type)}${checkNullQuery(
				'Keyword',
				data.Keyword
			)}${checkNullQuery(
				'TimeDesignation',
				data.TimeDesignation
			)}${checkNullQuery('Designation', data.Designation)}`,
			{
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},

	// Danh sách phiếu chỉ định đang xử lý
	getIndicationDoing: (
		data: {
			token: string | null;
			uuid: string;
			Page: number;
			Limit: number;
			Keyword: string;
			TimeDesignation: string | undefined;
			Designation: string;
			Type: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/${data.uuid}/doing?Limit=${data.Limit}&Page=${
				data.Page
			}${checkNullQuery('Type', data.Type)}${checkNullQuery(
				'Keyword',
				data.Keyword
			)}${checkNullQuery(
				'TimeDesignation',
				data.TimeDesignation
			)}${checkNullQuery('Designation', data.Designation)}`,
			{
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},

	// Danh sách phiếu chỉ định kết thúc
	getIndicationEnd: (
		data: {
			token: string | null;
			uuid: string;
			Page: number;
			Limit: number;
			Keyword: string;
			TimeDesignation: string | undefined;
			Designation: string;
			Type: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/${data.uuid}/end?Limit=${data.Limit}&Page=${
				data.Page
			}${checkNullQuery('Type', data.Type)}${checkNullQuery(
				'Keyword',
				data.Keyword
			)}${checkNullQuery(
				'TimeDesignation',
				data.TimeDesignation
			)}${checkNullQuery('Designation', data.Designation)}`,
			{
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},

	// Chi tiết chỉ định
	detailIndication: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`/${router}/${data.uuid}`, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Xác nhận xử lý chỉ định
	defineHandleIndication: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/${data.uuid}/define-handle`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	//Xóa chỉ định
	deleteIndication: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
			HospitalUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.delete(`/${router}/${data.uuid}`, {
			headers: {
				AccountUuid: data.AccountUuid,
				HospitalUuid: data.HospitalUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Tạo kết quả chỉ định
	createResultIndication: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
			result: string;
			images: Array<string>;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/${data.uuid}/result`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},
};

export default indicationService;
