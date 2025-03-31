import * as React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../screens/Initial/initialStyles';

export function Initial({ navigation }) {
    // Estado para controlar o carregamento
    const [isLoading, setIsLoading] = React.useState(true);

    // Função para salvar o status da primeira inicialização
    const saveFirstLaunchStatus = async () => {
        try {
            // Salva que o aplicativo já foi inicializado anteriormente
            await AsyncStorage.setItem('isFirstLaunch', 'false');

            // Navega diretamente para a tela de Tarefas
            navigation.navigate('Tarefas');
        } catch (error) {
            console.error('Erro ao salvar o status da primeira inicialização:', error);
        }
    };

    // Verifica se é a primeira inicialização e navega automaticamente
    React.useEffect(() => {
        const checkFirstLaunch = async () => {
            try {
                // Define o estado de carregamento como true no início
                setIsLoading(true);

                // Verifica se o aplicativo já foi inicializado antes
                const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');

                // Se não for a primeira inicialização, vai direto para Tarefas
                if (isFirstLaunch !== null) {
                    navigation.navigate('Tarefas');
                }
            } catch (error) {
                console.error('Erro ao verificar a primeira inicialização:', error);
            } finally {
                // Define o estado de carregamento como false quando a verificação terminar
                setIsLoading(false);
            }
        };
        checkFirstLaunch();
    }, []);

    // Se estiver carregando, exibe o ActivityIndicator
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="large"
                    color="black"
                    style={styles.loadingIndicator}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoCard}>
                <Text style={styles.infoText}>
                    Nesse aplicativo Você pode organizar suas tarefas, fazer anotações e consultar o clima de sua região. O App contém 3 telas de navegação; Referentes as atividades que o aplicativo realiza. Foi desevolvido para te ajudar em suas atividades rotineiras. Faça um bom uso!
                </Text>
            </View>
            <View style={styles.navigationButtonContainer}>
                <TouchableOpacity onPress={saveFirstLaunchStatus}>
                    <AntDesign
                        name="right"
                        size={50}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Initial;