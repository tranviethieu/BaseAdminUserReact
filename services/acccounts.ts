import {checkNullQuery} from '~/common/func/checkNullQuery';
import axiosClient from '.';

const routerHospital = 'Accounts/customers-hospital';

const accounts = {

    //danh sach co so y te
    getListHospitals:(
        data: {
			token: string | null;
			Page: number;
			Limit: number;
			Keyword: string;
			Status: number | null;
			CustomerType: number | null;
		},
		tokenAxios?: any
    )=>{
        return axiosClient.get(
            `/${routerHospital}?Limit=${data.Limit}&Page=${data.Page}&
            ${checkNullQuery('CustomerType', data.CustomerType)}&Keyword=${data.Keyword}
            &${checkNullQuery('Status', data.Status)}
            `,
            {
				cancelToken: tokenAxios,
				headers: {
					Authorization: 'Bearer ' + data.token,
				},
			}
        );
    },
}
export default accounts; 