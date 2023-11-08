import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface InfoDoctor {
	doctorProfileUuid?: string;
	fullName?: string;
	avatar?: string;
	hospitalUuid?: string;
	hospitalName?: string;
	position?: {
		id: number;
		name: string;
	};
	specialist?: {
		uuid: string;
		name: string;
	};
}

interface UserState {
	infoDoctor: InfoDoctor | null;
	accountId: string | null;
}

const initialState: UserState = {
	infoDoctor: null,
	accountId: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setInfoDoctor: (state, action: PayloadAction<InfoDoctor | null>) => {
			state.infoDoctor = action?.payload;
		},
		setAccountId: (state, action: PayloadAction<string | null>) => {
			state.accountId = action?.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {setInfoDoctor, setAccountId} = userSlice.actions;
export default userSlice.reducer;
