import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator
                    size="large"
                    color="black"
                    style={{
                        transform: [{ scaleX: 2 },
                        { scaleY: 2 }]
                    }}
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 200 }}>
            <View style={{
                width: 300,
                height: 320,
                backgroundColor: "white",
                alignContent: 'center',
                borderRadius: 30,
                padding: 20
            }}>
                <Text style={{ fontSize: 20, textAlign: 'justify' }}>
                    Nesse aplicativo Você pode organizar suas tarefas, fazer anotações e consultar o clima de sua região. O App contém 3 telas de navegação; Referentes as atividades que o aplicativo realiza. Foi desevolvido para te ajudar em suas atividades rotineiras. Faça um bom uso!
                </Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width: 400,
                height: 190,
                marginTop: 160
            }}>
                <AntDesign
                    name="right"
                    size={50}
                    color="black"
                    onPress={() => {
                        saveFirstLaunchStatus();

                    }}
                />
            </View>
        </View>
    );
}

export default Initial;