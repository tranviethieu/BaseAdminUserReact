import React, {useEffect, useState} from 'react';

import styles from './FormEditProfile.module.scss';
import AvatarChange from '~/components/common/AvatarChange';
import {toastError, toastText, toastWarn} from '~/common/func/toast';
import Form, {Input} from '~/components/controls/Form';
import Select, {Option} from '~/components/controls/Select';
import {TypeAddress} from './interfaces';
import {httpRequest} from '~/services';
import basicService from '~/services/basicService';
import DatePicker from '~/components/controls/DatePicker';
import Button from '~/components/controls/Button';
import {GENDER} from '~/constants/mock/enum';
import selfInformation from '~/services/selfInformation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import uploadFileService from '~/services/uploadService';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import LoadingData from '~/components/common/LoadingData';
import {setInfoDoctor} from '~/redux/reducer/user';
import {MAXIMUM_FILE} from '~/constants/configs';

const JoditEditor = dynamic(() => import('jodit-react'), {ssr: false});

function FormEditProfile() {
	const router = useRouter();
	const dispatch = useDispatch();
	const {accountId, infoDoctor} = useSelector(
		(state: RootState) => state.user
	);
	const {token} = useSelector((state: RootState) => state.auth);

	// STATE
	const [date, setDate] = useState<string>('');
	const [form, setForm] = useState<any>({});
	const [province, setProvince] = useState<Array<TypeAddress>>([]);
	const [district, setDistrict] = useState<Array<TypeAddress>>([]);
	const [ward, setWard] = useState<Array<TypeAddress>>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [avatar, setAvatar] = useState<string>('');
	const [content, setContent] = useState<any>();
	const [avatarRequest, setAvatarRequest] = useState<string | null>(null);

	// Onchange form
	const handleChange = (e: any) => {
		const {name, value} = e.target;
		setForm((prev: any) => ({...prev, [name]: value}));
	};

	// Handle get base64 avatar
	function getBase64(file: any) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			setForm((prev: any) => ({
				...prev,
				imageBase64: reader.result,
				avatar: reader.result,
			}));
		};
	}

	// Handle change avatar
	const handleSelectImg = (e: any) => {
		/*---------- Kiểm tra nếu có file ----------*/
		if (!e.target.files[0]) {
			return;
		}

		const {size, type} = e.target.files[0];

		if (size / 1000000 > MAXIMUM_FILE) {
			toastError({
				msg: `Kích thước tối đa của ảnh là ${MAXIMUM_FILE} mb`,
			});
			return;
		} else if (
			type !== 'image/jpeg' &&
			type !== 'image/jpg' &&
			type !== 'image/png'
		) {
			toastWarn({
				msg: `Định dạng tệp không chính xác, đuôi tệp chấp nhận .jpg, .jpeg, .png`,
			});
			return;
		}

		/*---------- Chuyển thành dạng base64 ----------*/
		getBase64(e.target.files[0]);
		setForm((prev: any) => ({...prev, file: e.target.files[0]}));
	};

	// Lấy danh sách tỉnh
	useEffect(() => {
		httpRequest({
			http: basicService.getProvince({
				token: token!,
				keyword: '',
				limit: 0,
				page: 0,
			}),
		}).then((data) => {
			if (data) {
				setProvince(data?.items);
			}
		});
	}, [token]);

	// Lấy danh sách huyện
	useEffect(() => {
		if (form?.provinceId) {
			httpRequest({
				http: basicService.getDistrict({
					token: token!,
					keyword: '',
					limit: 0,
					page: 0,
					provinceId: Number(form?.provinceId),
				}),
			}).then((data) => {
				if (data) {
					setDistrict(data?.items);
				}
			});
		}
	}, [form?.provinceId, token]);

	// Lấy danh sách xã phường
	useEffect(() => {
		if (form?.districtId) {
			httpRequest({
				http: basicService.getWard({
					token: token!,
					keyword: '',
					limit: 0,
					page: 0,
					districtId: Number(form?.districtId),
				}),
			}).then((data) => {
				if (data) {
					setWard(data?.items);
				}
			});
		}
	}, [form?.districtId, token]);

	// Reset Huyện khi thay đổi tỉnh/thành phố
	const changeDistrict = () => {
		handleChange({
			target: {
				name: 'districtId',
				value: null,
			},
		});
		changeWard();
	};

	// Reset Xã khi thay đổi Huyện
	const changeWard = () => {
		handleChange({
			target: {
				name: 'wardId',
				value: null,
			},
		});
	};

	// Lấy chi tiết profile
	useEffect(() => {
		httpRequest({
			setLoading: setLoading,
			http: selfInformation.getInfo({
				token: token!,
				AccountUuid: accountId as string,
			}),
		}).then((data) => {
			if (data) {
				setAvatar(data.image);
				setDate(data.dateOfBirth);
				setContent(data.description);
				setForm({
					...data,
					genderId: data?.gender?.id,
					hospitalName: data?.hospitalName,
					specialist: data?.specialist?.name,
					position: data?.position?.name,
					provinceId: data?.province?.id,
					districtId: data?.district?.id,
					wardId: data?.ward?.id,
				});
			}
		});
	}, [accountId, token]);

	const handleSubmit = async () => {
		const regex =
			/^(\+84|84|0)(1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|7[0-9]|8[0-9]|70|56|58|59|9[0-9]|86|88|89)([0-9]{7})$/;

		// Validate
		if (!form?.genderId) {
			return toastText({msg: 'Vui lòng nhập giới tính!'});
		}

		if (!date) {
			return toastText({msg: 'Vui lòng nhập ngày sinh!'});
		}

		if (new Date(date) > new Date()) {
			return toastText({msg: 'Ngày sinh không lớn hơn ngày hiện tại!'});
		}

		if (form?.idCard?.length != 9 && form?.idCard?.length != 12) {
			return toastText({msg: 'Số CMND/CCCD gồm 9 hoặc 12 ký tự!'});
		}

		if (!form?.provinceId) {
			return toastText({msg: 'Vui lòng nhập tỉnh/thành phố!'});
		}
		if (!form?.districtId) {
			return toastText({msg: 'Vui lòng nhập quận/huyện phố!'});
		}
		if (!form?.wardId) {
			return toastText({msg: 'Vui lòng nhập xã/phường phố!'});
		}

		if (form?.specificAddress?.length > 400) {
			return toastText({msg: 'Địa chỉ chi tiết tối đa 400 ký tự!'});
		}

		if (regex.test(form?.phone) == false) {
			return toastText({msg: 'Số điện thoại không hợp lệ!'});
		}
		if (token) {
			const {file} = form;
			if (file) {
				const data: any = new FormData();
				data.append('file', file);

				const avt = await httpRequest({
					http: uploadFileService.uploadImage({
						token: token!,
						formData: data,
					}),
				});

				if (avt) {
					setAvatarRequest(avt);
				}
			}

			setLoading(true);

			const editProfile = await httpRequest({
				http: selfInformation.editInfo({
					token: token!,
					uuid: accountId as string,
					image: avatarRequest ? avatarRequest : '',
					name: form?.name,
					email: form?.email,
					phone: form?.phone,
					genderId: form?.genderId,
					dateOfBirth: date,
					idCard: form?.idCard,
					provinceId: form?.provinceId,
					districtId: form?.districtId,
					wardId: form?.wardId,
					specificAddress: form?.specificAddress,
					description: content,
				}),
				showMessage: true,
			});

			setLoading(false);

			if (editProfile) {
				router.replace(router.asPath, undefined, {scroll: false});
				// Update redux
				dispatch(
					setInfoDoctor({
						...infoDoctor,
						avatar: avatarRequest ? avatarRequest : avatar,
						fullName: form?.name,
					})
				);
			}
		}
	};

	return (
		<LoadingData isLoading={loading}>
			<div className={styles.container}>
				<div className={styles.main}>
					<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
						<div className={styles.avatar}>
							<h5 className={styles.title_avatar}>Ảnh hồ sơ</h5>
							<AvatarChange
								src={
									form?.imageBase64 ||
									`${process.env.NEXT_PUBLIC_URL_FILE}/${avatar}`
								}
								onChange={handleSelectImg}
							/>
						</div>
						<div className={styles.col_2}>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Họ và tên{' '}
									<span style={{color: 'red'}}>*</span>
								</label>
								<Input
									rounded_8
									bgGrey
									placeholder='Họ và tên'
									rounde
									value={form?.name}
									name='name'
									textRequired='Nhập họ tên'
									min={2}
									max={100}
								/>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Số điện thoại{' '}
									<span style={{color: 'red'}}>*</span>
								</label>
								<Input
									isPhone
									rounded_8
									isRequired
									bgGrey
									rounde
									placeholder='Số điện thoại'
									name='phone'
									value={form?.phone}
									type='number'
								/>
							</div>
						</div>
						<div className={styles.col_2}>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Tài khoản
								</label>
								<input
									type='text'
									value={form?.username}
									name='userProfileUuid'
									disabled
									placeholder='Tài khoản'
									className={styles.input_disabled}
								/>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>Email</label>
								<input
									className={styles.input_disabled}
									type='text'
									name='email'
									value={form?.email}
									disabled
									placeholder='Email'
								/>
							</div>
						</div>
						<div className={styles.col_3}>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Giới tính{' '}
									<span style={{color: 'red'}}>*</span>
								</label>
								<div className={styles.groupInputRadio}>
									<label className={styles.groupRadio}>
										<input
											type='radio'
											value={GENDER.NAM}
											name='genderId'
											checked={
												form?.genderId == GENDER.NAM
											}
											onChange={handleChange}
										/>
										<p className={styles.lable_radio}>
											Nam
										</p>
									</label>
									<label className={styles.groupRadio}>
										<input
											onChange={handleChange}
											type='radio'
											value={GENDER.NU}
											name='genderId'
											checked={
												form?.genderId == GENDER.NU
											}
										/>
										<p className={styles.lable_radio}>Nữ</p>
									</label>
									<label className={styles.groupRadio}>
										<input
											onChange={handleChange}
											type='radio'
											value={GENDER.KHAC}
											name='genderId'
											checked={
												form?.genderId == GENDER.KHAC
											}
										/>
										<p className={styles.lable_radio}>
											Khác
										</p>
									</label>
								</div>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Ngày sinh{' '}
									<span style={{color: 'red'}}>*</span>
								</label>
								<div className={styles.select_date}>
									<DatePicker
										placeholder='Chọn ngày sinh'
										value={date}
										onSetValue={setDate}
										name='dateOfBirth'
										className={styles.date}
									/>
								</div>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									CMND/CCCD
								</label>
								<Input
									type='number'
									rounded_8
									bgGrey
									rounde
									placeholder='CMND/CCCD'
									name='idCard'
									value={form?.idCard}
								/>
							</div>
						</div>
						<div className={styles.col_3}>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Cơ sở y tế
								</label>
								<input
									className={styles.input_disabled}
									type='text'
									name='hospitalName'
									value={form?.hospitalName}
									disabled
									placeholder='Chuyên khoa'
								/>
							</div>

							<div className={styles.inputElement}>
								<label className={styles.label}>
									Chuyên khoa
								</label>
								<input
									className={styles.input_disabled}
									type='text'
									name='specialist'
									value={form?.specialist}
									disabled
									placeholder='Chuyên khoa'
								/>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>Chức vụ</label>
								<input
									type='text'
									name='position'
									value={form?.position || 'Chưa cập nhật'}
									disabled
									placeholder='Chức vụ'
									className={styles.input_disabled}
								/>
							</div>
						</div>

						<div className={styles.col_3}>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Tỉnh/Thành phố{' '}
									<span style={{color: 'red'}}>*</span>
								</label>
								<Select
									placeholder='Tỉnh/Thành phố'
									name='provinceId'
									onChange={handleChange}
									value={form?.provinceId}
									overflow={true}
								>
									{province.map((v) => (
										<Option
											key={v.id}
											title={String(v.name)}
											value={v.id}
											onClick={changeDistrict}
										/>
									))}
								</Select>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Quận/huyện{' '}
									<span style={{color: 'red'}}>*</span>
								</label>
								<Select
									placeholder='Quận/huyện'
									name='districtId'
									onChange={handleChange}
									value={form?.districtId}
									overflow={true}
								>
									{district.map((v) => (
										<Option
											key={v.id}
											title={String(v.name)}
											value={v.id}
											onClick={changeWard}
										/>
									))}
								</Select>
							</div>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Phường/xã{' '}
									<span style={{color: 'red'}}>*</span>
								</label>
								<Select
									placeholder='Phường/xã'
									name='wardId'
									onChange={handleChange}
									value={form?.wardId}
									overflow={true}
								>
									{ward.map((v) => (
										<Option
											key={v.id}
											title={String(v.name)}
											value={v.id}
										/>
									))}
								</Select>
							</div>
						</div>
						<div className={styles.col_1}>
							<div className={styles.inputElement}>
								<label className={styles.label}>
									Địa chỉ chi tiết
								</label>
								<Input
									rounded_8
									bgGrey
									placeholder='Địa chỉ chi tiết'
									rounde
									name='specificAddress'
									value={form?.specificAddress}
								/>
							</div>
						</div>

						<div className={styles.col_1}>
							<div className={styles.inputElement}>
								<label className={styles.label}>Mô tả</label>
								<div className={styles.texteare}>
									<JoditEditor
										value={content}
										onBlur={(newContent) =>
											setContent(newContent)
										}
										onChange={(newContent) => {
											setContent(newContent);
										}}
									/>
								</div>
							</div>
						</div>

						<div className={styles.btn}>
							<Button p_10_40 primary_2 bold rounded_8>
								Cập nhật
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</LoadingData>
	);
}

export default FormEditProfile;
