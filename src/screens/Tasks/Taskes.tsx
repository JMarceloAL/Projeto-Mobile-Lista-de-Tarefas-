import { useNavigation } from "@react-navigation/native"; // Importação para navegação entre telas (não utilizada neste componente)
import React, { useEffect, useState } from "react"; // Importações do React e hooks
import { Button, Text, View, TouchableOpacity } from "react-native"; // Componentes do React Native
import styles from "../../styles/styles"; // Importação de estilos personalizados
import { FlatList, TextInput } from "react-native-gesture-handler"; // Componentes para lista e entrada de texto
import AntDesign from '@expo/vector-icons/AntDesign'; // Biblioteca de ícones
import { saveData, buscaData } from '../../AsyncStorage/storage'; // Funções personalizadas para armazenamento de dados
import Ionicons from '@expo/vector-icons/Ionicons';
export function Taskes() {
    // Estado para armazenar a lista de tarefas
    const [list, setList] = useState([]);
    
    // Estado para controlar o texto da nova tarefa
    const [task, setTask] = useState("");
    
    // Hook de efeito para carregar dados quando o componente é montado
    useEffect(() => {
        loadData();
    }, []); // Array vazio significa que será executado apenas uma vez na montagem

    // Função assíncrona para carregar dados do armazenamento
    const loadData = async () => {
        const data = await buscaData(); // Busca dados salvos anteriormente
        setList(data); // Atualiza o estado da lista com os dados carregados
    };

    // Função para marcar/desmarcar tarefa como concluída
    const toggleCheckbox = (id) => {
        // Cria nova lista com o estado de conclusão da tarefa alternado
        const newList = list.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setList(newList); // Atualiza o estado da lista
        saveData(newList); // Salva a nova lista no armazenamento
    };

    // Componente para renderizar cada item da lista
    const Item = ({ item }) => (
        <View style={styles.item}>
            {/* Botão de checkbox para marcar tarefa como concluída */}
            <TouchableOpacity 
                style={styles.checkbox}
                onPress={() => toggleCheckbox(item.id)}
            >
                <View style={[
                    styles.checkboxBase,
                    item.completed && styles.checkboxChecked
                ]}>
                    {item.completed && <Text style={styles.checkMark}>✓</Text>}
                </View>
            </TouchableOpacity>

            {/* Texto da tarefa com estilo condicional para tarefas concluídas */}
            <Text style={[
                styles.title,
                item.completed && styles.completedTask
            ]}>
                {item.title}
            </Text>

            {/* Botão para excluir tarefa */}
            <View style={{}}>
                
                <TouchableOpacity onPress={()=> {
                    // Filtra a lista removendo o item com o ID correspondente
                    const newList = list.filter(listItem => listItem.id !== item.id);
                    setList(newList); // Atualiza o estado da lista
                    saveData(newList); // Salva a nova lista no armazenamento
                }} >

                <Ionicons name="trash-sharp" size={30} color="black" style={{ }} 
                      
                 />  
                </TouchableOpacity>
              
            </View>
        </View>
    );
      
    // Função para adicionar nova tarefa
    const addTask = () => {
        if (task !== "") {
            // Cria nova lista com a tarefa adicionada
            const newList = [...list, {
                id: Date.now(), // Usa timestamp como ID único
                title: task, 
                completed: false
            }];
            setList(newList); // Atualiza o estado da lista
            setTask(""); // Limpa o campo de entrada
            saveData(newList); // Salva a nova lista no armazenamento
        }
    }
    
    // Renderização do componente
    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#f0eded"}}>
            {/* Container para entrada de nova tarefa */}
            <View style={{
                display: "flex", 
                flexDirection: "row", 
                marginVertical: 20, 
                alignItems: "center", 
                backgroundColor: "white", 
                borderRadius: 50, 
                borderColor: "grey", 
                marginTop: 50
            }}>
                {/* Campo de entrada de texto para nova tarefa */}
                <TextInput
                    maxLength={20} // Limite de 20 caracteres
                    onChangeText={(txt) => setTask(txt)} // Atualiza estado da tarefa
                    placeholder="escreva sua tarefa"
                    value={task} // Valor controlado pelo estado
                    style={{
                        fontSize: 18,
                        padding: 20,
                        height: 60,
                        width: 250,
                    }}
                />
                {/* Botão para adicionar tarefa */}
                <TouchableOpacity onPress={addTask}>

                
                <AntDesign 
                    name="pluscircle" 
                    size={30} 
                    color="red" 
                    style={{marginRight:15}} 
                    />
                    </TouchableOpacity>
            </View>
            
            {/* Lista de tarefas */}
            <View style={{ width:350}}>
                <FlatList 
                    data={list} // Dados da lista de tarefas
                    renderItem={({ item }) => <Item item={item} />} // Componente de renderização
                    keyExtractor={item => item.id.toString()} // Chave única para cada item
                />
            </View>
        </View>
    );
};

export default Taskes;