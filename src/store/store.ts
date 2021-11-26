import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from '@features/weatherSlice'
import popupSlice from '@features/popupSlice'


export const store = configureStore({
    reducer: {
        weather: weatherSlice,
        popup: popupSlice
    },
})

type RootState = ReturnType<typeof store.getState>

export const selectWeather = (state: RootState) => state.weather
export const selectPopup = (state: RootState) => state.popup

export type AppDispatch = typeof store.dispatch