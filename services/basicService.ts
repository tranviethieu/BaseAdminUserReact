import {checkNullQuery} from '~/common/func/checkNullQuery';
import axiosClient from '.';

const router = 'Basic';

const basicService = {
	// Lấy danh sách tỉnh
	getProvince: (
		data: {
			token: string | null;
			limit: number;
			page: number;
			keyword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/get-list-province`, data, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},

	// Lấy danh sách huyện
	getDistrict: (
		data: {
			token: string | null;
			limit: number;
			page: number;
			keyword: string;
			provinceId: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(
			`/${router}/get-list-district?provinceId=${data.provinceId}`,
			data,
			{
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},

	// Lấy danh sách xã
	getWard: (
		data: {
			token: string | null;
			limit: number;
			page: number;
			keyword: string;
			districtId: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(
			`/${router}/get-list-ward?districtId=${data.districtId}`,
			data,
			{
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},

	// Lấy danh sách loại thuốc
	getTypeMedicines: (data: {token: string | null}, tokenAxios?: any) => {
		return axiosClient.get(`/${router}/medicine_type`, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + data.token,
			},
		});
	},

	// Lấy danh sách chỉ định
	getDesignationList: (
		data: {
			token: string | null;
			HospitalUuid: string;
			limit: number | null;
			page: number | null;
			keyword: string;
			DesignationTypeId?: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/designation-list?limit=${data.limit}&page=${
				data.page
			}${checkNullQuery('keyword', data.keyword)}${checkNullQuery(
				'DesignationTypeId',
				data.DesignationTypeId
			)}`,
			{
				headers: {
					HospitalUuid: data.HospitalUuid,
					Authorization: 'Bearer ' + data.token,
				},
				cancelToken: tokenAxios,
			}
		);
	},

	// Lấy danh sách loại chỉ định
	getTypeDesignationList: (
		data: {
			token: string | null;
			HospitalUuid: string;
			limit: number | null;
			page: number | null;
			keyword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/designation-types?limit=${data.limit}&page=${
				data.page
			}${checkNullQuery('keyword', data.keyword)}`,
			{
				headers: {
					HospitalUuid: data.HospitalUuid,
					Authorization: 'Bearer ' + data.token,
				},
				cancelToken: tokenAxios,
			}
		);
	},
};

export default basicService;
