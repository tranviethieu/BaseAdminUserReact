export default function checkString(str: string) {
	var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

	if (regex.test(str)) {
		// Hợp lệ
		return true;
	} else {
		// Không hợp lệ
		return false;
	}
}
