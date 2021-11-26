import { createSlice } from '@reduxjs/toolkit'



export interface PopupState {
    active: boolean;

}

const initialState: PopupState = {
    active: false,
}


export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        open: (state) => {
            state.active = true
        },
        close: (state) => {
            state.active = false
        },

    },
})

export const {
    open,
    close
} = popupSlice.actions



export default popupSlice.reducer