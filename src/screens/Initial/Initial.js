import * as React from 'react';
import { View, Text, Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export function Initial({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 200 }}>
            <View style={{ width: 300, height: 320, backgroundColor: "white", alignContent: 'center', alignContent: 'center', borderRadius: 30, padding: 20 }}>

                <Text style={{ fontSize: 20, textAlign: 'justify' }}>Nesse aplicativo Você pode organizar suas tarefas, fazer anotações e consultar o clima de sua região. O App contém 3 telas de navegação; Referentes as atividades que o aplicativo realiza. Foi desevolvido para te ajudar em suas atividades rotineiras. Faça um bom uso!</Text>

            </View>
            <View style={{ felx: 1, justifyContent: 'flex-end', alignItems: 'flex-end', width: 400, height: 190, backgroundColor: '', marginTop: 160 }}>
                <AntDesign name="right" size={50} color="black" onPress={() => navigation.navigate('Tarefas')} />
            </View>
        </View >
    );
}

export default Initial;