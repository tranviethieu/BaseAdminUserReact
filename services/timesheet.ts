import {checkNullQuery} from '~/common/func/checkNullQuery';
import axiosClient from '.';

const router = 'Timesheet';

const timesheetService = {
	// Lấy lịch làm việc của bác sĩ
	getCalendarDoctor: (
		data: {
			token: string | null;
			addressType: number | null;
			AccountUuid: string;
			HospitalUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`/${router}${
				data.addressType ? `?addressType=${data.addressType}` : ''
			}`,
			{
				cancelToken: tokenAxios,
				headers: {
					AccountUuid: data.AccountUuid,
					HospitalUuid: data.HospitalUuid,
					Authorization: 'Bearer ' + data.token,
				},
			}
		);
	},
};

export default timesheetService;
