import React from 'react';

import styles from './FormRules.module.scss';

function FormRules() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<p className={styles.des}>
					MobiDoctor là 1 sản phẩm thuộc hệ sinh thái của dự án
					MobiMed, là thành viên trong hệ sinh thái công nghệ thông
					tin MobiMed. Với việc sử dụng các thông tin, dịch vụ, sản
					phẩm trên ứng dụng MobiDoctor, đồng nghĩa với việc Khách
					hàng đã chấp nhận hoàn toàn các quy định sử dụng ứng dụng
					dưới đây. Mời Khách hàng vui lòng đọc kỹ các quy định sử
					dụng trước khi tải ứng dụng và/hoặc q uyết định sử dụng
					thông tin, dịch vụ, sản phẩm của chúng tôi.
				</p>
				<div className={styles.item}>
					<h4 className={styles.title}>1. Mobi Doctor là gì?</h4>
					<p className={styles.title_des}>
						MobiDoctor là 1 sản phẩm thuộc hệ sinh thái của dự án
						MobiMed, là thành viên trong hệ sinh thái công nghệ
						thông tin MobiMed. Với việc sử dụng các thông tin, dịch
						vụ, sản phẩm trên ứng dụng MobiDoctor, đồng nghĩa với
						việc Khách hàng đã chấp nhận hoàn toàn các quy định sử
						dụng ứng dụng dưới đây. Mời Khách hàng vui lòng đọc kỹ
						các quy định sử dụng trước khi tải ứng dụng và/hoặc q
						uyết định sử dụng thông tin, dịch vụ, sản phẩm của chúng
						tôi.
					</p>
				</div>

				<div className={styles.item}>
					<h4 className={styles.title}>
						2. Các điều kiện để sử dụng nền tảng của chúng tôi
					</h4>
					<p className={styles.title_des}>
						Khách hàng được hiểu là các người sử dụng có khả năng
						tiếp cận Dịch vụ của Nhà Cung Cấp thông qua việc sử dụng
						Dịch vụ nền tảng của Mobi Doctor. Bằng việc sử dụng hoặc
						trở thành thành viên của ứng dụng Mobi Doctor, Khách
						hàng đồng ý và chịu trách nhiệm đối với toàn bộ các nội
						dung trong Điều khoản sử dụng này.
					</p>
				</div>

				<div className={styles.item}>
					<h4 className={styles.title}>
						3. Đăng ký sử dụng và đăng nhập tài khoản
					</h4>
					<p className={styles.title_des}>
						Khi đăng ký sử dụng tài khoản trên Mobi Doctor, Khách
						hàng cần cung cấp cho ứng dụng các thông tin cá nhân
						chính xác, đầy đủ và mới nhất. Khách hàng chịu trách
						nhiệm về tính chính xác đối với mọi thông tin cá nhân,
						nhân thân khi tiến hành đăng ký sử dụng tài khoản trên
						Mobi Doctor. Sau khi đăng ký, Khách hàng chịu trách
						nhiệm bảo quản mật khẩu và không nên tiết lộ mật khẩu
						cho bất cứ ai hoặc ủy quyền, cho phép bất cứ người nào
						sử dụng vào bất cứ mục đích nào. Mobi Doctor sẽ luôn coi
						việc truy nhập và sử dụng các dịch vụ trên trang web
						bằng tên truy nhập và mật khẩu của một người nào đó như
						là việc truy nhập và sử dụng các dịch vụ bởi chính khách
						hàng đó, bất kể tên truy nhập và mật khẩu có thể được sử
						dụng bởi người khác mà chủ sở hữu không biết hoặc không
						cho phép. Nếu phát hiện ra bất cứ người nào biết mật
						khẩu hoặc sử dụng mật khẩu của mình để truy nhập và sử
						dụng các dịch vụ trên trang ứng dụng, Khách hàng cần
						thay đổi mật khẩu hoặc yêu cầu ứng dụng hỗ trợ cài đặt
						mật khẩu mới và thông báo ngay lập tức cho chúng tôi.
					</p>
				</div>
				<div className={styles.item}>
					<h4 className={styles.title}>
						4. Quyền thu thập và sử dụng thông tin
					</h4>
					<p className={styles.title_des}>
						Khi Khách hàng truy cập và sử dụng ứng dụng, Mobi Doctor
						có thể thu thập, cập nhật và lưu trữ các thông tin như
						cấu hình điện thoại, số liệu thống kê quá trình truy
						cập, thông tin cá nhân cung cấp cho Mobi Doctor khi đăng
						ký… Các thông tin cá nhân khách hàng cung cấp bao gồm
						nhưng không giới hạn: họ tên, số điện thoại, CMND/hộ
						chiếu/thẻ căn cước, email, địa chỉ, thông tin vị trí
						bệnh sử, thông tin về sức khỏe,… Chúng tôi có thể sử
						dụng các thông tin này vào việc giúp bạn sử dụng được
						hoàn thiện các chức năng của ứng dụng, cải thiện trải
						nghiệm khách hàng hoặc cung cấp thông tin cho các cơ
						quan pháp luật theo yêu cầu của Luật pháp hoặc của Toà
						án.
					</p>
				</div>
				<div className={styles.item}>
					<h4 className={styles.title}>
						5. Quy định về nội dung thông tin trên ứng dụng
					</h4>
					<p className={styles.title_des}>
						Khách hàng phải đảm bảo rằng thông tin mà mình cung cấp
						cho Mobi Doctor là chính xác và đầy đủ. Mobi Doctor luôn
						có quyền xác minh thông tin mà Khách hàng đã cung cấp và
						từ chối Dịch Vụ hoặc sử dụng Ứng Dụng mà không cần đưa
						ra lý do. Khách hàng chỉ có thể truy cập Dịch Vụ bằng
						cách sử dụng phương tiện được cho phép. Trách nhiệm của
						Khách hàng là phải kiểm tra để đảm bảo rằng mình tải về
						đúng Ứng Dụng cho thiết bị của mình. Mobi Doctor không
						chịu trách nhiệm nếu Khách hàng không có thiết bị di
						động tương thích hoặc nếu Khách hàng tải về sai phiên
						bản Ứng Dụng cho thiết bị di động của mình. Với việc sử
						dụng Ứng Dụng hoặc Dịch Vụ, khách hàng/ đối tác đồng ý
						thêm rằng: Chỉ sử dụng Dịch Vụ nền tảng hoặc tải về Ứng
						Dụng vì mục đích sử dụng cá nhân duy nhất và sẽ không
						bán lại nó cho bên thứ ba. Không ủy quyền cho người khác
						sử dụng tài khoản của mình; Không chuyển nhượng hay bằng
						cách khác chuyển giao tài khoản của mình cho bất kỳ
						người hay thực thể pháp lý nào khác; Không sử dụng tài
						khoản phụ thuộc bất kỳ quyền nào của người không phải là
						khách hàng mà không có sự cho phép thích hợp; Không sử
						dụng Dịch Vụ nền tảng hoặc Ứng Dụng nhằm mục đích trái
						pháp luật, bao gồm nhưng không giới hạn ở việc gửi hoặc
						lưu trữ bất kỳ tài liệu trái pháp luật nào hoặc nhằm mục
						đích gian lận; Không sử dụng Dịch Vụ nền tảng hoặc Ứng
						Dụng để gây phiền toái, khó chịu hoặc bất tiện cho người
						khác; Không cố tình phá hoại hoạt động của mạng lưới
						chuyên gia IVIE - Bác sĩ ơi bằng cách spam thông tin
						đăng kí ảo, hoặc lịch khám ảo; Không cố tình gây thiệt
						hại cho Dịch Vụ nền tảng hoặc Ứng Dụng theo bất kỳ cách
						nào; Không sao chép hoặc phân phối Ứng Dụng hoặc Nội
						Dung khác của IVIE - Bác sĩ ơi mà không có sự cho phép
						bằng văn bản của IVIE - Bác sĩ ơi; Giữ an toàn và bí mật
						cho mật khẩu tài khoản của mình hoặc bất kỳ thông tin
						nhận dạng nào mà chúng tôi cung cấp cho khách hàng có
						thể cho phép truy cập Dịch Vụ nền tảng và Ứng Dụng;
					</p>
				</div>
			</div>
		</div>
	);
}

export default FormRules;
