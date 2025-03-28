import React, { useEffect, useState } from "react";
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';

export function Notes() {
    // Estados para gerenciar a lista de notas, título, conteúdo, modo de edição e item sendo editado
    const [Lista, setLista] = useState([]);
    const [Notes, setNotes] = useState("");
    const [Titulo, setTitulo] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);

    const updateNotes = () => {
        // Atualiza uma nota existente se o conteúdo e título não estiverem vazios
        if (Notes && Titulo !== "") {
            // Cria uma nova lista com o item atualizado
            const updatedList = Lista.map(item =>
                item.id === editingItemId
                    ? { id: Titulo, title: Notes }
                    : item
            );

            // Atualiza o estado com a nova lista
            setLista(updatedList);

            // Redefine os estados de edição e campos de entrada
            setNotes("");
            setTitulo("");
            setIsEditing(false);
            setEditingItemId(null);
            setVisible(false);
        }
    };

    const Item = ({ item }) => (
        // Componente que renderiza cada item da lista de notas
        <View style={{ padding: 20, borderRadius: 30, marginVertical: 8, backgroundColor: "white", maxHeight: 150, flexDirection: "row-reverse", alignItems: "center" }} >
            <View style={{}}>
                <TouchableOpacity onPress={() => {
                    // Ativa o modo de edição quando o botão de editar é pressionado
                    setIsEditing(true);
                    setEditingItemId(item.id);
                    setTitulo(item.id);
                    setNotes(item.title);
                    setVisible(true);
                }}>
                    <Foundation name="pencil" size={30} color="black" style={{ marginLeft: 5 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    // Remove a nota da lista
                    const NewLista = Lista.filter(listItem => listItem.id !== item.id);
                    setLista(NewLista);
                }}>
                    <Ionicons name="trash-sharp" size={30} color="black" style={{ marginTop: 10 }} onPress={() => deleteNote(item.id)} />
                </TouchableOpacity>
            </View >
            <TouchableOpacity onPress={() => { }}>
                <View style={{ marginRight: 30, width: 200, maxHeight: 50, marginBottom: 30, backgroundColor: "" }}>
                    <Text style={{ fontSize: 15 }}>Titulo:  {item.id}</Text>
                    <Text>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </View >
    );

    const deleteNote = (itemId) => {
        // Exibe um alerta de confirmação antes de excluir a nota
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta anotação?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => {
                        // Remove a nota da lista após confirmação
                        const NewLista = Lista.filter(listItem => listItem.id !== itemId);
                        setLista(NewLista);
                    }
                }
            ]
        );
    };

    const addNotes = () => {
        // Adiciona uma nova nota se o conteúdo e título não estiverem vazios
        if (Notes && Titulo !== "") {
            // Verifica se a nota já existe para evitar duplicatas
            const isDuplicate = Lista.some(
                item => item.id === Titulo && item.title === Notes
            );

            if (isDuplicate) {
                // Exibe um alerta se a nota for duplicada
                Alert.alert(
                    "Anotação duplicada",
                    "Anotação que você esta querendo criar ja existe."
                );
                return;
            }

            // Adiciona a nova nota à lista
            const Newlista = [...Lista, { id: Titulo, title: Notes }]
            setLista(Newlista);
            setNotes("");
            setTitulo("");
        }
    };

    // Estado para controlar a visibilidade do modal
    const [visible, setVisible] = useState(false);

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: '#f0eded' }}>
            {/* Modal para adicionar e editar notas */}
            <Modal animationType="fade" visible={visible} style={{ backgroundColor: "#f0eded" }}>
                <View style={{ alignItems: "flex-end", backgroundColor: "#f0eded" }}>
                    {/* Botão para fechar o modal */}
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {

                        setVisible(false);
                        // Redefine os estados quando o modal é fechado
                        setIsEditing(false);
                        setEditingItemId(null);
                        setNotes("");
                        setTitulo("");
                    }}>


                        <FontAwesome name="remove" size={40} color="black"

                            style={{}} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "flex-start", width: 100, position: "absolute", marginLeft: 10 }} >
                    {/* Botão para salvar nota */}
                    <TouchableOpacity onPress={() => {
                        // Determina se deve adicionar ou atualizar com base no estado de edição
                        isEditing ? updateNotes() : addNotes(); setVisible(false);

                    }}>

                        <Feather name="save" size={40} color="black" style={{}}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: '#f0eded' }}>
                    {/* Input para o título da nota */}
                    <TextInput
                        onChangeText={(txt) => setTitulo(txt)}
                        value={Titulo}
                        maxLength={30}
                        placeholder="Titulo"
                        style={{ backgroundColor: 'white', fontSize: 20, marginLeft: 20, marginRight: 20, borderRadius: 20, padding: 20, marginTop: 10 }}
                    />
                    {/* Input para o conteúdo da nota */}
                    <TextInput
                        onChangeText={(txt) => setNotes(txt)}
                        value={Notes}
                        textAlignVertical="top"
                        editable
                        multiline={true}
                        numberOfLines={29}
                        maxLength={850}
                        style={{ backgroundColor: 'white', fontSize: 16, height: 710, padding: 20, margin: 20, borderRadius: 30 }}
                    />
                </View>
            </Modal >

            {/* Botão para adicionar nova nota */}
            < TouchableOpacity onPress={() => {
                setVisible(true);
                // Redefine os estados ao adicionar uma nova nota
                setIsEditing(false);
                setEditingItemId(null);
                setNotes("");
                setTitulo("");
            }
            }>
                <MaterialCommunityIcons name="note-plus-outline" size={50} color="black" style={{ marginTop: 30 }} />
            </TouchableOpacity >

            {/* Lista de notas */}
            < View style={{ width: 300, height: 600, marginTop: 30 }} >
                <FlatList
                    data={Lista}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item.id.toString()}
                />
            </View >
        </View >
    );
};

export default Notes;