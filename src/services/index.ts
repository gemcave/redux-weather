import axios from "axios";

export const link = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_SECRET}`;



export const service = {
    fetchByCity: (city: string) => axios.get(`${link}&query=${city}`)
}