import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar os dados do clima
export const saveWeatherData = async (weatherData) => {
    try {
        // Criando objeto com dados principais e timestamp
        const dataToSave = {
            ...weatherData,
            timestamp: new Date().toISOString(),
        };

        // Salvando no AsyncStorage com a cidade como chave
        await AsyncStorage.setItem(
            `weather_${weatherData.name.toLowerCase()}`,
            JSON.stringify(dataToSave)
        );

        // Também salvamos a última cidade pesquisada
        await AsyncStorage.setItem('last_searched_city', weatherData.name);

        return true;
    } catch (error) {
        console.error('Erro ao salvar dados do clima:', error);
        return false;
    }
};

// Função para carregar dados do clima de uma cidade específica
export const loadWeatherData = async (cityName) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`weather_${cityName.toLowerCase()}`);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Erro ao carregar dados do clima:', error);
        return null;
    }
};

// Função para carregar a última cidade pesquisada
export const loadLastSearchedCity = async () => {
    try {
        return await AsyncStorage.getItem('last_searched_city');
    } catch (error) {
        console.error('Erro ao carregar última cidade:', error);
        return null;
    }
};

// Função para carregar dados do clima da última cidade pesquisada
export const loadLastWeatherData = async () => {
    try {
        const lastCity = await loadLastSearchedCity();
        if (lastCity) {
            return await loadWeatherData(lastCity);
        }
        return null;
    } catch (error) {
        console.error('Erro ao carregar dados do último clima:', error);
        return null;
    }
};

// Função para limpar todos os dados de clima salvos
export const clearAllWeatherData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const weatherKeys = keys.filter(key => key.startsWith('weather_') || key === 'last_searched_city');

        if (weatherKeys.length > 0) {
            await AsyncStorage.multiRemove(weatherKeys);
        }

        return true;
    } catch (error) {
        console.error('Erro ao limpar dados do clima:', error);
        return false;
    }
};