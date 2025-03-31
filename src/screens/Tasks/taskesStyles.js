import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Estilos existentes que já estavam sendo importados
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxBase: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: 'green',
    },
    checkMark: {
        color: 'white',
        fontSize: 16,
    },
    title: {
        fontSize: 18,
        flex: 1,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },

    // Novos estilos extraídos do código inline
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f0eded',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        borderColor: 'grey',
        marginTop: 50,
    },
    textInput: {
        fontSize: 18,
        padding: 20,
        height: 60,
        width: 250,
    },
    addButton: {
        marginRight: 15,
    },
    listContainer: {
        width: 350,
    },
    deleteButton: {
        // Este está vazio no código original, mas pode ser adicionado se necessário
    },
});

export default styles;