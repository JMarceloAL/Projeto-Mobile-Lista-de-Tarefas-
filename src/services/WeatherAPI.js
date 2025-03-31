
import axios from 'axios';

const API_KEY = "534db6d894b5546bbcf42d6d25f7cf11";

export async function fetchWeather(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("Cidade não encontrada");
        }
        throw new Error("Erro ao buscar dados meteorológicos");
    }
}

export default fetchWeather;