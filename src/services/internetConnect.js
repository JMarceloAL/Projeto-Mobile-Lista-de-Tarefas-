import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export function useNetworkStatus() {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        // Função para verificar o estado inicial da conexão
        const checkInitialConnection = async () => {
            const state = await NetInfo.fetch();
            setIsConnected(state.isConnected);
            if (!state.isConnected) {
                Alert.alert(
                    "Falha na conexão",
                    "Você está sem conexão com a internet. Alguns recursos podem não funcionar corretamente.",
                    [{ text: "OK" }]
                );
            }
        };

        // Verificar conexão inicial
        checkInitialConnection();

        // Configurar listener para mudanças no estado da conexão
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);

            // Se a conexão foi perdida, mostrar alerta
            if (!state.isConnected) {
                Alert.alert(
                    "Falha na conexão",
                    "Você está sem conexão com a internet. Alguns recursos podem não funcionar corretamente.",
                    [{ text: "OK" }]
                );
            }
        });

        // Remover listener quando o componente for desmontado
        return () => unsubscribe();
    }, []);

    return isConnected;
}