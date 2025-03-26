import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';
import { saveData, buscaData, clearAsyncStorage } from '../../AsyncStorage/storage';

export function Taskes() {
    const [list, setList] = useState([]);
    const [task, setTask] = useState("");
    
    
    // Carregar dados quando o componente montar
    useEffect(() => {
        loadData();
    }, []);

    // Nova função para carregar dados usando a função importada
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
            <View style={styles.buttonexcluir}>
                <AntDesign  name ="delete" size={24}
                    color="grey" 
                    onPress={() => {
                        const newList = list.filter(listItem => listItem.id !== item.id);
                        setList(newList);
                        saveData(newList);
                    }}>
                    
                    </AntDesign>
                
            </View>
        </View>
    );
      
    const addTask = () => {
        if (task !== "") {
            const newList = [...list, {id: Date.now(), title: task, completed: false}];
            setList(newList);
            setTask("");
            saveData(newList);
        }
    }
    
    
    return (
        <View style={{ flex: 1 , alignItems:"center" , backgroundColor: "#f0eded"}}>
           
            
            <View  style = {{display : "flex" , flexDirection : "row" , marginVertical: 20 , alignItems: "center" ,  backgroundColor: "white" , borderRadius: 50, borderColor: "grey" , marginTop: 50}}>
                <TextInput
                    onChangeText={(txt) => setTask(txt)}
                    placeholder="escreva sua tarefa"
                    value={task}
                    style={{
                        padding: 20,
                        height:60,
                        width:250,
                        
                    }}>   
                    </TextInput>
                    <AntDesign name="pluscircle" size={30} color= "red" onPress={addTask} style={{marginRight:15}} >



            </AntDesign>
                
            </View>
            
            <View  style = {{ width:350}}>
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