import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { service } from '@services/index'



export interface WeatherState {
    status: 'loading' | 'success' | 'failed';
    city: string;
    temperature: number;
    observationTime: string;
    isDay: string,
    description: string,
    properties: {
        cloudcover: {},
        humidity: {},
        windSpeed: {},
        pressure: {},
        uvIndex: {},
        visibility: {},
    },

}

const initialState: WeatherState = {
    status: 'failed',
    city: "Moscow",
    temperature: 0,
    observationTime: "00:00 AM",
    isDay: "yes",
    description: "",
    properties: {
        cloudcover: {},
        humidity: {},
        windSpeed: {},
        pressure: {},
        uvIndex: {},
        visibility: {},
    },
}

export const fetchWeatherData = createAsyncThunk(
    'weather/fetchDataByCity',
    async (city: string) => {
        const response = await service.fetchByCity(city);

        return response.data
    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        getWeatherRequest: (state) => {
            state.status = 'loading';
        },
        getWeatherFail: (state) => {
            state.status = 'failed';
        },
        setCity: (state, action) => {
            state.city = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherData.pending, (state, _action) => {
            state.status = 'loading'
        });
        builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
            const {
                current: {
                    cloudcover,
                    temperature,
                    humidity,
                    observation_time: observationTime,
                    pressure,
                    uv_index: uvIndex,
                    visibility,
                    is_day: isDay,
                    weather_descriptions: description,
                    wind_speed: windSpeed,
                },
                location: { name },
            } = action.payload;
            return state = {
                ...state,
                status: 'success',
                isDay,
                city: name,
                temperature,
                observationTime,
                description: description[0],
                properties: {
                    cloudcover: {
                        title: "cloudcover",
                        value: `${cloudcover}%`,
                        icon: "cloud.png",
                    },
                    humidity: {
                        title: "humidity",
                        value: `${humidity}%`,
                        icon: "humidity.png",
                    },
                    windSpeed: {
                        title: "wind speed",
                        value: `${windSpeed} km/h`,
                        icon: "wind.png",
                    },
                    pressure: {
                        title: "pressure",
                        value: `${pressure} %`,
                        icon: "gauge.png",
                    },
                    uvIndex: {
                        title: "uv Index",
                        value: `${uvIndex} / 100`,
                        icon: "uv-index.png",
                    },
                    visibility: {
                        title: "visibility",
                        value: `${visibility}%`,
                        icon: "visibility.png",
                    },
                },
            };
        });
        builder.addCase(fetchWeatherData.rejected, (state, _action) => {
            state.status = 'failed'
        });
    },
})

export const {
    getWeatherRequest,
    getWeatherFail,
    setCity
} = weatherSlice.actions



export default weatherSlice.reducer