interface types {
	value: string;
	valueConfirm?: string;
	isConfirm?: boolean;
	onSetMessage?: any;
	nameMessage?: string;
	max?: number;
	min?: number;
	message?: any;
	isNumber?: boolean;
	isRequired?: boolean;
	isEmail?: boolean;
}

const validate = ({
	value = '',
	valueConfirm,
	isConfirm,
	isEmail,
	onSetMessage,
	nameMessage,
	max,
	min,
	message,
	isNumber,
	isRequired,
}: types) => {
	const setMessage = (str: string) => {
		if (nameMessage) {
			onSetMessage && onSetMessage((prev: any) => ({...prev, [nameMessage]: str}));
		} else {
			onSetMessage && onSetMessage(str);
		}
	};

	if (isRequired) {
		if (value.trim() === '') {
			setMessage(message?.required || `Please enter this field`);
			return false;
		}
	}

	if (isNumber) {
		for (let i of value) {
			if (isNaN(Number(i))) {
				setMessage(message?.number || `Please enter the number`);
				return false;
			}
		}
	}

	if (isEmail) {
		if (
			!value
				.trim()
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
		) {
			setMessage(message?.mail || `Please enter this field`);
			return false;
		}
	}

	if (max) {
		if (value.trim().length > max) {
			setMessage(message?.max || `Enter up to ${max} characters`);
			return false;
		}
	}

	if (min) {
		if (value.trim().length < min) {
			setMessage(message?.min || `Enter at least ${min} characters`);
			return false;
		}
	}

	if (valueConfirm && isConfirm) {
		if (value !== valueConfirm) {
			setMessage(message?.confirm || `Re-entered password is not correct`);
			return false;
		}
	}

	return true;
};

export default validate;
