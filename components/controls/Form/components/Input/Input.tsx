import {ContextData, PropsInput} from './interfaces';
import {
	RiCheckFill,
	RiCloseCircleFill,
	RiEyeLine,
	RiEyeOffLine,
} from 'react-icons/ri';
import {useContext, useEffect, useState} from 'react';

import {FormContext} from '../../contexts';
import checkString from '~/common/func/checkString';
import clsx from 'clsx';
import isEmail from '~/common/func/isEmail';
import styles from './Input.module.scss';

function Input({
	label,
	note,
	type = 'text',
	placeholder = '',
	name,
	blur = true,
	showDone = false,
	onClean = false,
	bgGrey = false,
	disabled = false,
	isNotCheckPass = false,
	className,
	...props
}: PropsInput) {
	const regexPhone =
		/^(\+84|84|0)(1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|7[0-9]|8[0-9]|70|56|58|59|9[0-9]|86|88|89)([0-9]{7})$/;

	const [showPass, setShowPass] = useState<boolean>(false);
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const data = useContext<ContextData>(FormContext);

	const isPassword = type === 'password';

	/********** Xử lí khi submit, kiểm tra validate input **********/
	useEffect(() => {
		if (data.countValidate > 0) {
			handleSetMessage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.countValidate]);

	/********** Xử lí khi value input thay đổi, kiểm tra validate input **********/
	useEffect(() => {
		data.setValidate((prev: any) => ({
			...prev,
			[name]: handleValidate(),
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.form]);

	/********** Kiểm tra thay đổi value confirm **********/
	useEffect(() => {
		if (
			props.valueConfirm &&
			data.form[name] !== props.valueConfirm &&
			data.form[name] !== ''
		) {
			return data.setErrorText((prev: any) => ({
				...prev,
				[name]: props.textConfirm || 'Mật khẩu không trùng khớp',
			}));
		} else {
			data.setErrorText((prev: any) => ({
				...prev,
				[name]: null,
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.valueConfirm]);

	const handleClickbtn = () => {
		if (props.isActiveButton && props.onClick) {
			props.onClick();
		}
	};

	const handleToggleShowPass = () => {
		setShowPass(!showPass);
	};

	const handleClean = () => {
		data.setForm((prev: any) => ({
			...prev,
			[name]: '',
		}));
	};

	const handlerFocused = () => {
		setIsFocus(true);
		data.setErrorText((prev: any) => ({
			...prev,
			[name]: null,
		}));
	};

	const handleChange = (e: any) => {
		const {value, name} = e.target;

		if (type === 'number' && parseFloat(value) < 0) {
			return data.setForm((prev: any) => ({
				...prev,
				[name]: '',
			}));
		}

		return data.setForm((prev: any) => ({
			...prev,
			[name]: value,
		}));
	};

	const handlerBlur = () => {
		setIsFocus(false);
		if (blur) {
			handleSetMessage();
			/********** return validate passed **********/
			return data.setValidate((prev: any) => ({
				...prev,
				[name]: handleValidate(),
			}));
		}
	};

	/********** Hiển thị message thông báo validate **********/
	const handleSetMessage = () => {
		data.setErrorText((prev: any) => ({
			...prev,
			[name]: null,
		}));

		if (
			(props.isRequired && `${data.form[name]}`.trim() === '') ||
			(!data.form[name] && props.isRequired)
		) {
			return data.setErrorText((prev: any) => ({
				...prev,
				[name]: props.textRequired || 'Vui lòng nhập trường này',
			}));
		}

		if (isPassword && !checkString(data.form[name]) && !isNotCheckPass) {
			return data.setErrorText((prev: any) => ({
				...prev,
				[name]: `Nhập mật khẩu từ ${props.min || 6} đến ${
					props.max || 50
				} ký tự, bao gồm ít nhất chữ hoa, chữ thường và số`,
			}));
		}

		if (!!data.form[name] && `${data.form[name]}`.trim() !== '') {
			if (props.isNumber) {
				if (!Number(data.form[name])) {
					return data.setErrorText((prev: any) => ({
						...prev,
						[name]: 'Vui lòng chỉ nhập số',
					}));
				}
			}

			if (props.isPhone) {
				for (let i of data.form[name]) {
					if (isNaN(Number(i))) {
						return data.setErrorText((prev: any) => ({
							...prev,
							[name]: 'Số điện thoại không hợp lệ',
						}));
					}
				}

				// regex
				if (regexPhone.test(data.form[name]) == false) {
					return data.setErrorText((prev: any) => ({
						...prev,
						[name]: 'Số điện thoại không hợp lệ',
					}));
				}
			}

			if (props.valueConfirm && data.form[name] !== props.valueConfirm) {
				return data.setErrorText((prev: any) => ({
					...prev,
					[name]:
						props.textConfirm ||
						'Mật khẩu và xác nhận mật khẩu không trùng nhau',
				}));
			}

			if (props.isEmail && !isEmail(data.form[name])) {
				return data.setErrorText((prev: any) => ({
					...prev,
					[name]: 'Email không hợp lệ, Vui lòng nhập lại!',
				}));
			}

			if (
				props.max &&
				`${data.form[name]}`.trim().length > Number(props.max)
			) {
				return data.setErrorText((prev: any) => ({
					...prev,
					[name]: `Nhập tối đa ${props.max} kí tự`,
				}));
			}

			if (
				props.min &&
				`${data.form[name]}`.trim().length < Number(props.min)
			) {
				return data.setErrorText((prev: any) => ({
					...prev,
					[name]: `Nhập tối thiểu ${props.min} kí tự`,
				}));
			}

			if (
				isPassword &&
				!checkString(data.form[name]) &&
				!isNotCheckPass
			) {
				return data.setErrorText((prev: any) => ({
					...prev,
					[name]: `Mật khẩu từ ${props.min || 6} - ${
						props.max || 50
					} ký tự, gồm chữ hoa, chữ thường và số`,
				}));
			}
		}
	};

	/********** Check validate **********/
	const handleValidate = () => {
		if (
			(props.isRequired && `${data.form[name]}`.trim() === '') ||
			(!data.form[name] && props.isRequired)
		) {
			return false;
		}

		if (!!data.form[name] && `${data.form[name]}`.trim() !== '') {
			if (props.isNumber) {
				const numericValue = Number(data.form[name]);
				if (isNaN(numericValue) || numericValue < 0) {
					return false;
				}
			}

			if (props.isPhone) {
				for (let i of data.form[name]) {
					if (isNaN(Number(i))) {
						return false;
					}
				}

				// regex
				if (regexPhone.test(data.form[name]) == false) {
					return false;
				}
			}

			if (props.valueConfirm && data.form[name] !== props.valueConfirm) {
				return false;
			}

			if (props.isEmail && !isEmail(data.form[name])) {
				return false;
			}

			if (
				props.max &&
				`${data.form[name]}`.trim().length > Number(props.max)
			) {
				return false;
			}

			if (
				props.min &&
				`${data.form[name]}`.trim().length < Number(props.min)
			) {
				return false;
			}

			if (
				isPassword &&
				!checkString(data.form[name]) &&
				!isNotCheckPass
			) {
				return false;
			}
		}

		return true;
	};

	return (
		<div
			className={clsx(styles.container, {
				[styles.error]: data?.errorText[name] !== null,
				[styles.focus]: isFocus,
			})}
		>
			{label ? <label className={styles.label}>{label}</label> : null}
			<div
				className={clsx({
					[styles.group]: true,
					[styles.iconGroup]: props.icon,
					[styles.focus]: isFocus,
					[styles.done]: showDone && data.isDone,
					[styles.bgGrey]: bgGrey,
				})}
			>
				{props.icon && <div className={styles.icon}>{props.icon}</div>}
				<div className={styles.inputGroup}>
					<input
						onFocus={handlerFocused}
						onChange={handleChange}
						onBlur={handlerBlur}
						className={clsx(styles.inputElement, className)}
						type={showPass ? 'text' : type}
						name={name}
						value={data.form[name]}
						placeholder={placeholder}
						autoComplete='off'
						disabled={disabled}
					/>
					{onClean && !!data.form[name] && props.isRequired ? (
						<span
							className={styles.toggleType}
							onClick={handleClean}
						>
							<RiCloseCircleFill color='#5e6167' />
						</span>
					) : null}
					{!isPassword && onClean && data.isDone ? (
						<span
							className={styles.toggleType}
							onClick={handleToggleShowPass}
						>
							<RiCheckFill color={'#83BF6E'} />
						</span>
					) : null}
					{isPassword ? (
						<span
							className={styles.toggleType}
							onClick={handleToggleShowPass}
						>
							{showPass ? <RiEyeLine /> : <RiEyeOffLine />}
						</span>
					) : null}
				</div>
				{props.txtBtn ? (
					<div
						className={clsx(styles.btn, {
							[styles.active]: props.isActiveButton,
						})}
						onClick={handleClickbtn}
					>
						{props.txtBtn}
					</div>
				) : null}
			</div>
			<p className={styles.errorText}>{data?.errorText[name]}</p>
			{note ? <small className={styles.note}>{note}</small> : null}
		</div>
	);
}

export default Input;
