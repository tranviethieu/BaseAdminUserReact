export const checkNullQuery = (name: string, value: any) => {
	if (value == null || value == undefined || value == '') {
		return '';
	} else {
		return `&${name}=${value}`;
	}
};
