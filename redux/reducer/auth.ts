import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {deleteItemStorage, setItemStorage} from '~/common/func/localStorage';

export interface AuthState {
	token: string | null;
	isLogin: boolean;
	isRemember: boolean;
	dataSavePass: {userStr: string; passStr: string};
}

const initialState: AuthState = {
	token: null,
	isLogin: false,
	isRemember: false,
	dataSavePass: {userStr: '', passStr: ''},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string | null>) => {
			state.token = action?.payload;
		},
		setStateLogin: (state, action: {payload: boolean}) => {
			state.isLogin = action?.payload;
		},
		toggleRememberPass: (state, action: PayloadAction<boolean>) => {
			if (action.payload) {
				state.isRemember = true;
			} else {
				deleteItemStorage('userStr');
				deleteItemStorage('passStr');
				state.isRemember = false;
			}
		},
		savePass: (
			state,
			action: PayloadAction<{userStr: string; passStr: string}>
		) => {
			if (state.isRemember) {
				const {userStr, passStr} = action.payload;
				setItemStorage('userStr', userStr);
				setItemStorage('passStr', passStr);
				state.dataSavePass.userStr = userStr;
				state.dataSavePass.passStr = passStr;
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {setToken, setStateLogin, toggleRememberPass, savePass} =
	authSlice.actions;
export default authSlice.reducer;
