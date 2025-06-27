
import axios from 'axios';

const API_KEY = "sua_chave_api";

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
