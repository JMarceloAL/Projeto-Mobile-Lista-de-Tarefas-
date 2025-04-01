import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        zIndex: -2,
        backgroundColor: '#d4d5ff'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    loadingIndicator: {
        transform: [
            { scaleX: 2 },
            { scaleY: 2 }
        ]
    },
    infoCard: {
        width: 300,
        height: 320,
        backgroundColor: "white",
        alignContent: 'center',
        borderRadius: 30,
        padding: 20,
        marginTop: 200
    },
    infoText: {
        fontSize: 20,
        textAlign: 'justify'
    },
    navigationButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: 400,
        height: 190,
        marginTop: 160
    }
});

export default styles;