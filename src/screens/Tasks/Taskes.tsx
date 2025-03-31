import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
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

            <Text style={[
                styles.title,
                item.completed && styles.completedTask
            ]}>
                {item.title}
            </Text>

            <View style={styles.deleteButton}>
                <TouchableOpacity onPress={() => {
                    const newList = list.filter(listItem => listItem.id !== item.id);
                    setList(newList);
                    saveData(newList);
                }}>
                    <Ionicons name="trash-sharp" size={30} color="black" />  
                </TouchableOpacity>
            </View>
        </View>
    );
      
    const addTask = () => {
        if (task !== "") {
            const newList = [...list, {
                id: Date.now(),
                title: task, 
                completed: false
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
                        color="red" 
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
        </View>
    );
};

export default Taskes;