import Button from "~/components/controls/Button";
import styles from "./MainHospital.module.scss"
import Link from "next/link";
import TableHospital from "../TableHospital";
import { useRouter } from "next/router";
function MainHospital() {
    const handleClick = ()=>{

    }
    return (
        <section className={styles.wrapper}>
            <div className={styles.headerMain}>
                <h3>Danh sách cơ sở y tế</h3>
                <div>
                <Link className={styles.btnAdd} href={"hospital/upsert"}>Thêm mới</Link>
                </div>
            </div>
            <div className={styles.bodyMain}>
                <TableHospital/>
            </div>
        </section>
    );
}

export default MainHospital;