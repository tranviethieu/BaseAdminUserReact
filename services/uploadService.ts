import axiosClient from '.';

const router = 'UploadImage';

const uploadFileService = {
	// upload ảnh
	uploadImage: (
		data: {
			token: string;
			formData: any;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${router}/upload-images`, data.formData, {
			cancelToken: tokenAxios,
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + data.token,
			},
		});
	},

	// upload mutil ảnh
	uploadMutilImage: (
		data: {
			token: string;
			formData: any;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${router}/upload-image-many`, data.formData, {
			cancelToken: tokenAxios,
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + data.token,
			},
		});
	},
};

export default uploadFileService;
