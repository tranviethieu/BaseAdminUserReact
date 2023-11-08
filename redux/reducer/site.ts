import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface SiteState {
	loading: boolean;
	routerPrev: string;
}

const initialState: SiteState = {
	loading: true,
	routerPrev: '/',
};

export const siteSlice = createSlice({
	name: 'site',
	initialState,
	reducers: {
		updateRouterPrev: (state, action: PayloadAction<string>) => {
			state.routerPrev = action?.payload;
		},

		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action?.payload;
		},
	},
});

export const {updateRouterPrev, setLoading} = siteSlice.actions;
// Action creators are generated for each case reducer function
export default siteSlice.reducer;
