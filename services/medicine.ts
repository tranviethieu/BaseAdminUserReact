import {checkNullQuery} from '~/common/func/checkNullQuery';
import axiosClient from '.';

const router = 'Medicine';

// Đơn thuốc
const medicine = {
	// Danh sách đơn thuốc
	getMedicines: (
		data: {
			token: string | null;
			HospitalUuid: string;
			Type: number | null;
			Keyword: string;
			Limit: number | null;
			Page: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}?${checkNullQuery('Limit', data.Limit)}${checkNullQuery(
				'Page',
				data.Page
			)}${checkNullQuery('Keyword', data.Keyword)}${checkNullQuery(
				'Type',
				data.Type
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
};

export default medicine;
