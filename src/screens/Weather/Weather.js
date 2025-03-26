
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, StatusBar, Text, TextInput, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

export function Weather() {


    const API_KEY = "534db6d894b5546bbcf42d6d25f7cf11"

    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeather] = useState(null);
    const [erroMessage, setErrorMessage] = useState(null);

    async function fetchWeather(city) {

        setLoading(true);

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${API_KEY}&units=metric&lang=pt_br`);
        const result = await res.json();
        setErrorMessage("");
        if (result?.cod === "404") {
            setWeather(null);
            setErrorMessage("Cidade não encontrada");
            setLoading(false);


            return;
        }

        setWeather(result);
        setLoading(false);
    }
    useEffect(() => {
        if (city != "") {
            fetchWeather(city);

        }

    }, []);

    return (

        <View style={{ display: "flex", flex: 1, alignItems: "center", backgroundColor: "#f0eded" }}>


            <StatusBar />


            <View style={{ marginVertical: 20, display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 30, marginTop: 50 }}>
                <TextInput onChangeText={(txt) => {
                    setCity(txt)


                }} value={city} placeholder="Digite sua cidade" style={{


                    width: 250,
                    borderRadius: 30,
                    padding: 20,
                    backgroundColor: 'white',


                }}></TextInput>
                {loading ? (<ActivityIndicator color="grey" size={24} style={{ padding: 10 }}></ActivityIndicator>) : (<FontAwesome5 onPress={() => {

                    if (city != "") {
                        fetchWeather(city);
                        setCity("");
                    }
                }} name="search-location" size={24} color="black" style={{ padding: 10 }} >

                </FontAwesome5>)}
            </View>

            {erroMessage && <Text>{erroMessage}</Text>}


            {
                weatherData && (


                    <>

                        <View style={{ borderRadius: 30, backgroundColor: "white", height: 300, width: 300, alignItems: "center", padding: 20, marginTop: 20 }}>
                            <Text style={{ fontSize: 40, }}>{weatherData.name}</Text>
                            <Entypo name="icloud" size={50} color="black" style={{ marginTop: 20 }}></Entypo>
                            <Text style={{ fontWeight: "700", fontSize: 25 }}>{weatherData.weather[0].description}</Text>
                            <View style={{ marginLeft: 10, marginTop: 20 }}>
                                <FontAwesome6 name="temperature-high" size={35} color="black" />
                            </View>
                            <Text style={{ fontWeight: "700", fontSize: 25 }}>{weatherData.main.temp}</Text>


                        </View>
                    </>


                )
            }


        </View >

    );


}
export default Weather;