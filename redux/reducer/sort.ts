import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface SiteState {
	sort: any;
}

const initialState: SiteState = {
	sort: {},
};

export const sortSlice = createSlice({
	name: 'site',
	initialState,
	reducers: {
		updateSort: (
			state,
			action: PayloadAction<{name: string; value: any}>
		) => {
			state.sort = {
				...state.sort,
				[action.payload.name]: action.payload.value,
			};
		},
		resetSort: (state) => {
			state.sort = {};
		},
	},
});

export const {updateSort, resetSort} = sortSlice.actions;
// Action creators are generated for each case reducer function
export default sortSlice.reducer;
