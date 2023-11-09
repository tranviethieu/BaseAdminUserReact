import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Pagination from '~/components/controls/Pagination';
import { useSelector } from "react-redux";
import useDebounce from "~/common/hooks/useDebounce";
import { RootState } from "~/redux/store";
import { httpRequest } from "~/services";
import {useQuery} from 'react-query';
import accounts from "~/services/acccounts";
import {TypeData} from  '../MainHospital/interfaces'
import Tippy from "@tippyjs/react";
import Table from "~/components/common/Table";
import DataWrapper from "~/components/common/DataWrapper";
import styles from "./TableHospital.module.scss";
import Noti from '~/components/common/DataWrapper/components/Noti';
import clsx from 'clsx';
import backgrounds from '~/constants/images/backgrounds';
import Popup from "~/components/common/Popup";
import PopupDetailExam from "~/components/popups/PopupDetailExam";


function TableHospital() {
    const router = useRouter();
	const {uuid, ...rest} = router.query;
    const {token} = useSelector((state: RootState) => state.auth);
    const {
		hospitalStatus,
		hospitalType,
		hospitalKeyword,
	} = useSelector((state: RootState) => state.sort).sort;
	const keyword = useDebounce(hospitalKeyword || '', 1000);
    ///------
    const [limit, setLimit] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    //====
    const [dataTable, setDataTable] = useState<any[]>([]);
    const [total, setTotal] = useState(0)
    
    const {data,error, isLoading} = useQuery(
        [
			keyword,
			hospitalStatus?.id,
			hospitalType?.id,
			limit,
			page,
			token,
        ],
        ()=>{
            httpRequest({
                http: accounts.getListHospitals({
					token: token!,
					Keyword: keyword,
					Status: hospitalStatus?.id || null,
					CustomerType: hospitalType?.id || null,
					Limit: limit,
					Page: page,
				}).then((data)=>{
                    debugger
                    //setDataTable(data?.data?.items || [])
                    //setTotal(data?.data?.pagination?.totalCount || 0)
                    return {
                        data: data?.data?.items || [],
                        total: data?.data?.pagination?.totalCount || 0,
                        isLoading: false
                    }
                })
            })
        }
    );

      // eslint-disable-next-line react-hooks/rules-of-hooks
    //   useEffect(() => {
    //     setDataTable(data?.data || []);
    //   }, [data]);

    console.log(dataTable)
    return (
		<Fragment>
			<div className={styles.container}>
				<DataWrapper
					loading={isLoading}
					// noti={
                    //     <Noti
					// 		img={backgrounds.table_noti}
					// 		title='Chưa có lịch'
					// 		des='Hiện tại bạn chưa có lịch hẹn khám nào.'
					// 	/>
						
					// }
				>
					<div className={styles.table}>
						<Table
							data={dataTable}
							column={[
								{
									className: styles.title,
									title: 'Mã đặt khám',
									render: (item: TypeData) => (
                                        
										<Tippy
											content='Xem chi tiết'
											placement='top'
										>
											<p
												className={clsx(
													styles.fit_content,
													'hover_text'
												)}
												onClick={() => {
													router.replace(
														{
															pathname:
																router.pathname,
															query: {
																...router.query,
																uuid: item.uuid,
															},
														},
														undefined,
														{
															shallow: true,
															scroll: false,
														}
													);
												}}
											>
												{item.name}
											</p>
										</Tippy>
									),
								},
                                {
									title: 'Số điện thoại',
									render: (item: TypeData) => (
										<>{item.customerType.name}</>
									),
								}
								
							]}
						/>
					</div>
				</DataWrapper>
				{dataTable.length > 0 && (
					<div className={styles.pagination}>
						<Pagination
							pageCurrent={page}
							pageSize={limit}
							onSetPage={setPage}
							onSetPageSize={setLimit}
							totalItem={total}
							textResult='lịch hẹn khám'
						/>
					</div>
				)}
			</div>

			{/* Popup */}
			<Popup
				open={!!uuid}
				onClose={() =>
					router.replace(
						{
							pathname: router.pathname,
							query: {
								...rest,
							},
						},
						undefined,
						{shallow: true, scroll: false}
					)
				}
			>
				<PopupDetailExam
					onClose={() =>
						router.replace(
							{
								pathname: router.pathname,
								query: {
									...rest,
								},
							},
							undefined,
							{shallow: true, scroll: false}
						)
					}
				/>
			</Popup>
		</Fragment>
	);
}

export default TableHospital;