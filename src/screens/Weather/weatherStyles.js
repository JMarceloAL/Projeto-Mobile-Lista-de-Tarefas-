import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f0eded"
    },
    searchContainer: {
        marginVertical: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 30,
        marginTop: 50
    },
    searchInput: {
        fontSize: 18,
        width: 250,
        borderRadius: 30,
        padding: 20,
        backgroundColor: 'white',
    },
    searchButton: {
        padding: 10
    },
    errorText: {
        color: "red",
        marginTop: 10
    },
    offlineText: {
        color: "grey",
        marginTop: 10
    },
    loader: {
        marginTop: 50,
        alignSelf: 'center'
    },
    weatherCard: {
        borderRadius: 30,
        backgroundColor: "white",
        height: 300,
        width: 300,
        alignItems: "center",
        padding: 20,
        marginTop: 20
    },
    cityName: {
        fontSize: 40,
        fontWeight: "bold"
    },
    weatherIcon: {
        marginTop: 20
    },
    weatherDescription: {
        fontWeight: "700",
        fontSize: 25
    },
    temperatureIcon: {
        marginLeft: 10,
        marginTop: 20
    },
    temperature: {
        fontWeight: "700",
        fontSize: 25
    },
    updateTimestamp: {
        fontSize: 14,
        color: "gray",
        marginTop: 10
    }
});