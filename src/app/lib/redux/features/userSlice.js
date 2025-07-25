import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.user = null;
        },
    },
});

export const { setSignIn, signOut } = userSlice.actions;
export default userSlice.reducer;
