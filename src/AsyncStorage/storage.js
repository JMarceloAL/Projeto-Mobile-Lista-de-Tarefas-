import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvar dados no AsyncStorage
export const saveData = async (dataToSave = []) => {
    try {
        const jsonValue = JSON.stringify(dataToSave);
        await AsyncStorage.setItem('@App1', jsonValue);
    } catch (error) {
        console.log("Erro ao salvar dados:", error);
    }
}

// Buscar dados do AsyncStorage
export const buscaData = async () => {
    try {
        const value = await AsyncStorage.getItem('@App1');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        console.log("Erro ao buscar dados:", error);
        return [];
    }
};

// Limpar todos os dados do AsyncStorage
export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
        console.log("Todos os dados foram apagados");
        return true;
    } catch (error) {
        console.log("Erro ao limpar AsyncStorage:", error);
        return false;
    }
}