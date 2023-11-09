import { ReactElement } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Page from "~/components/layout/Page";
import MainHospital from "~/components/page/hospital/MainHospital";
import RequireAuth from "~/components/protected/RequiredAuth";

function Hospital() {
    return ( <RequireAuth>
        <Page disabledEffect title='Cơ sở y tế'>
           <MainHospital/>
        </Page>
    </RequireAuth>);
}

export default Hospital;

Hospital.getLayout = function(page: ReactElement){
    return <BaseLayout title='Cơ sở y tế'>{page}</BaseLayout>;
}