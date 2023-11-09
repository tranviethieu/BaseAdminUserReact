import { ReactElement } from "react";
import BaseLayout from "~/components/layout/BaseLayout";
import Page from "~/components/layout/Page";
import RequireAuth from "~/components/protected/RequiredAuth";

function UpsertHospital() {
    return ( <RequireAuth>
        <Page disabledEffect title='Cơ sở y tế'>
            <div>aaa</div>
        </Page>
    </RequireAuth>);
}

export default UpsertHospital;

UpsertHospital.getLayout = function(page: ReactElement){
    return <BaseLayout title='Cơ sở y tế'>{page}</BaseLayout>;
}