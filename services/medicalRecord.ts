import {checkNullQuery} from '~/common/func/checkNullQuery';
import axiosClient from '.';

const router = 'MedicalRecords';

// Phiếu khám bệnh
const medicalRecord = {
	// Danh sách phiếu khám bệnh sắp tới
	getMedicalRecordWait: (
		data: {
			token: string;
			AccountUuid: string;
			Page: number;
			Limit: number;
			Keyword: string;
			AddressType: number | null;
			To: string | undefined;
			From: string | undefined;
			State: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/wait-exam?Limit=${data.Limit}&Page=${
				data.Page
			}${checkNullQuery('AddressType', data.AddressType)}&Keyword=${
				data.Keyword
			}${checkNullQuery('From', data.From)}${checkNullQuery(
				'To',
				data.To
			)}${checkNullQuery('State', data.State)}`,
			{
				headers: {
					AccountUuid: data.AccountUuid,
					Authorization: 'Bearer ' + data.token,
				},
				cancelToken: tokenAxios,
			}
		);
	},

	// Danh sách phiếu khám đang diễn ra
	getMedicalRecordDoing: (
		data: {
			token: string | null;
			AccountUuid: string;
			Page: number;
			Limit: number;
			Keyword: string;
			AddressType: number | null;
			To: string | undefined;
			From: string | undefined;
			State: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/doing?Limit=${data.Limit}&Page=${
				data.Page
			}${checkNullQuery('AddressType', data.AddressType)}&Keyword=${
				data.Keyword
			}${checkNullQuery('From', data.From)}${checkNullQuery(
				'To',
				data.To
			)}${checkNullQuery('State', data.State)}`,
			{
				headers: {
					AccountUuid: data.AccountUuid,
					Authorization: 'Bearer ' + data.token,
				},
				cancelToken: tokenAxios,
			}
		);
	},

	// Danh sách phiếu khám bệnh kết thúc
	getMedicalRecordFinish: (
		data: {
			token: string | null;
			AccountUuid: string;
			Page: number;
			Limit: number;
			Keyword: string;
			AddressType: number | null;
			To: string | undefined;
			From: string | undefined;
			State: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}/finish?Limit=${data.Limit}&Page=${
				data.Page
			}${checkNullQuery('AddressType', data.AddressType)}&Keyword=${
				data.Keyword
			}${checkNullQuery('From', data.From)}${checkNullQuery(
				'To',
				data.To
			)}${checkNullQuery('State', data.State)}`,
			{
				headers: {
					AccountUuid: data.AccountUuid,
					Authorization: 'Bearer ' + data.token,
				},
				cancelToken: tokenAxios,
			}
		);
	},

	// Xác nhận đến lượt khám
	confirmMedicalExam: (
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

	// Hủy phiếu khám
	cancelMedicalExam: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
			note: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/${data.uuid}/cancel`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Kết thúc phiên khám
	finishMedicalExam: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/${data.uuid}/finish`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Lấy chi tiết phiếu khám
	getDetailMedicalRecord: (
		data: {
			token: string;
			AccountUuid: string;
			uuid: string;
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

	// Tạo kết quả khám
	createConclusion: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
			content: string;
			images: Array<string>;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/${data.uuid}/conclusion`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Chỉnh sửa kết quả khám
	editConclusion: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
			content: string;
			images: Array<string>;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/conclusion/${data.uuid}`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Chỉnh sửa chỉ số cơ bản
	editBasicIndex: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
			height: number;
			weight: number;
			temperature: number;
			heartRate: number;
			breathingRate: number;
			bloodPressure: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/${data.uuid}/basic-index`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Thêm chỉ định khám
	createDesignation: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
			array: Array<{uuid: string; name: string; note: string}>;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(
			`/${router}/${data.uuid}/designation`,
			data.array,
			{
				headers: {
					AccountUuid: data.AccountUuid,
					Authorization: 'Bearer ' + data.token,
				},
				cancelToken: tokenAxios,
			}
		);
	},

	// Xóa chỉ định
	deleteDesignation: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.delete(`/${router}/designation/${data.uuid}`, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Tạo đơn thuốc
	createPrescription: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
			medicines: Array<{
				medicineName: string;
				dosage: string;
				unit: string;
				note: string;
			}>;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/${router}/${data.uuid}/prescription`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Xóa đơn thuốc
	deletePrescription: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.delete(`/${router}/prescription/${data.uuid}`, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},

	// Chỉnh sửa đơn thuốc
	updatePrescription: (
		data: {
			token: string | null;
			uuid: string;
			AccountUuid: string;
			medicineName: string;
			dosage: string;
			unit: string;
			note: string;
			medicineTypeId: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`/${router}/prescription/${data.uuid}`, data, {
			headers: {
				AccountUuid: data.AccountUuid,
				Authorization: 'Bearer ' + data.token,
			},
			cancelToken: tokenAxios,
		});
	},
};

export default medicalRecord;
