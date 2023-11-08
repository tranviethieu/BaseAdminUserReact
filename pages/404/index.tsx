import Button from '~/components/controls/Button';
import styles from './Page404.module.scss';

function Page404() {
    return <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <h3>Không tìm thấy nội dung</h3>
        <p>URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</p>
        <p>Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng URL đã lưu.</p>
        <div className={styles.btn}>
            <Button rounded_32 primary href="/">
                Truy cập trang chủ
            </Button>
        </div>
    </div>;
}

export default Page404;
