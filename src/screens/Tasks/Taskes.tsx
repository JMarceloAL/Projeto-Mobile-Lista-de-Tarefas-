import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { saveData, buscaData } from '../../AsyncStorage/storage';
import styles from "../../screens/Tasks/taskesStyles"; // Mantemos a importação original do arquivo de estilos

export function Taskes() {
    const [list, setList] = useState([]);
    const [task, setTask] = useState("");
    
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await buscaData();
        setList(data);
    };

    const toggleCheckbox = (id) => {
        const newList = list.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setList(newList);
        saveData(newList);
    };

    // Função para formatar a data e hora
    const formatDateTime = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        return `${day}/${month}/${year} às ${hours}:${minutes}`;
    };

    const Item = ({ item }) => (
        <View style={styles.item}>
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

            <View style={styles.taskContent}>
                <Text style={[
                    styles.title,
                    item.completed && styles.completedTask
                ]}>
                    {item.title}
                </Text>
                
                {item.dateTime && (
                    <Text style={styles.dateTime}>
                        {item.dateTime}
                    </Text>
                )}
            </View>

            <View style={styles.deleteButton}>
                <TouchableOpacity onPress={() => {
                    const newList = list.filter(listItem => listItem.id !== item.id);
                    setList(newList);
                    saveData(newList);
                }}>
                    <Ionicons name="trash-sharp" size={30} color="#6b73c7" />  
                </TouchableOpacity>
            </View>
        </View>
    );
      
    const addTask = () => {
        if (task !== "") {
            // Obtém a data e hora atual formatada
            const currentDateTime = formatDateTime();
            
            const newList = [...list, {
                id: Date.now(),
                title: task, 
                completed: false,
                dateTime: currentDateTime // Adiciona a data e hora à tarefa
            }];
            setList(newList);
            setTask("");
            saveData(newList);
        }
    }
    
    return (
        <View style={styles.container}>

        
            <View style={styles.inputContainer}>
                <TextInput
                    maxLength={20}
                    onChangeText={(txt) => setTask(txt)}
                    placeholder="escreva sua tarefa"
                    value={task}
                    style={styles.textInput}
                />
                <TouchableOpacity onPress={addTask}>
                    <AntDesign 
                        name="pluscircle" 
                        size={30} 
                        color="#6b73c7" 
                        style={styles.addButton} 
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.listContainer}>
                <FlatList 
                    data={list}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item.id.toString()}
                />
            </View>

            <ImageBackground  style={{width: 400, height: 600, position: 'absolute', zIndex: -1, marginTop: 150}} resizeMode ={"contain"} source={require('../../../assets/img1.png')}>

            </ImageBackground>

          

        </View>
    );
};

export default Taskes;