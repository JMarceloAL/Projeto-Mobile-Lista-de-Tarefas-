import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { fetchWeather } from '../../services/WeatherAPI';
import { saveWeatherData, loadLastWeatherData } from '../../AsyncStorage/wetherstorage';
import { styles } from '../../screens/Weather/weatherStyles'; // Importação do arquivo de estilos

export function Weather() {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeather] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isOfflineData, setIsOfflineData] = useState(false);

    // Carregar dados do AsyncStorage na inicialização
    useEffect(() => {
        const loadSavedData = async () => {
            setLoading(true);
            try {
                const savedData = await loadLastWeatherData();
                if (savedData) {
                    setWeather(savedData);
                    setIsOfflineData(true);

                    // Calculamos quanto tempo passou desde o último salvamento
                    const savedTime = new Date(savedData.timestamp);
                    const currentTime = new Date();
                    const hoursDiff = Math.abs(currentTime - savedTime) / 36e5; // 36e5 é o número de milissegundos em uma hora

                    // Se os dados forem de mais de 1 hora atrás, avisamos o usuário
                    if (hoursDiff > 1) {
                        Alert.alert(
                            "Dados offline",
                            `Exibindo dados de ${savedData.name} salvos há ${Math.floor(hoursDiff)} horas atrás.`,
                            [{ text: "OK" }]
                        );
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar dados salvos:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSavedData();
    }, []);

    const handleFetchWeather = async (cityName) => {
        setLoading(true);
        setErrorMessage(null);
        setIsOfflineData(false);

        try {
            const result = await fetchWeather(cityName);
            setWeather(result);

            // Salvar os dados no AsyncStorage
            await saveWeatherData(result);
        } catch (error) {
            setWeather(null);
            setErrorMessage(error.message);

            // Se não conseguir buscar online, tentar carregar do storage
            try {
                const savedData = await loadWeatherData(cityName);
                if (savedData) {
                    setWeather(savedData);
                    setIsOfflineData(true);
                    setErrorMessage("Usando dados salvos offline (podem estar desatualizados)");
                }
            } catch (storageError) {
                console.error("Erro ao tentar carregar do storage:", storageError);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar />

            <View style={styles.searchContainer}>
                <TextInput
                    onChangeText={(txt) => {
                        setCity(txt)
                    }}
                    value={city}
                    placeholder="Digite sua cidade"
                    maxLength={20}
                    style={styles.searchInput}
                />
                {loading ? (
                    <ActivityIndicator color="grey" size={24} style={{ padding: 10 }} />
                ) : (
                    <TouchableOpacity style={styles.searchButton} onPress={() => {
                        if (city != "") {
                            handleFetchWeather(city);
                            setCity("");
                        }
                    }}>
                        <FontAwesome5
                            name="search-location"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

            {isOfflineData && !errorMessage && (
                <Text style={styles.offlineText}>
                    Dados carregados desde a última sessão
                </Text>
            )}

            {loading ? (
                <ActivityIndicator
                    color="grey"
                    size="large"
                    style={styles.loader}
                />
            ) : weatherData && (
                <>
                    <View style={styles.weatherCard}>
                        <Text style={styles.cityName}>{weatherData.name}</Text>

                        <Entypo name="icloud" size={50} color="black" style={styles.weatherIcon} />

                        <Text style={styles.weatherDescription}>{weatherData.weather[0].description}</Text>

                        <View style={styles.temperatureIcon}>
                            <FontAwesome6 name="temperature-high" size={35} color="black" />
                        </View>

                        <Text style={styles.temperature}>{weatherData.main.temp}</Text>

                        {weatherData.timestamp && (
                            <Text style={styles.updateTimestamp}>
                                Atualizado em: {new Date(weatherData.timestamp).toLocaleString()}
                            </Text>
                        )}
                    </View>
                </>
            )}
        </View>
    );
}

export default Weather;