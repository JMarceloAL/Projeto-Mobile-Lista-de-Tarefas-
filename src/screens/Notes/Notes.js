import React, { useEffect, useState } from "react";
import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../screens/Notes/notesStyles'; // Importando os estilos

// Chave para armazenar as notas no AsyncStorage
const STORAGE_KEY = '@notes_app:notes';

export function Notes() {
    // Estados para gerenciar a lista de notas, título, conteúdo, modo de edição e item sendo editado
    const [Lista, setLista] = useState([]);
    const [Notes, setNotes] = useState("");
    const [Titulo, setTitulo] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isView, setIsView] = useState(false);
    const [currentViewItem, setCurrentViewItem] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null);
    const [visible, setVisible] = useState(false);

    // Carrega as notas salvas quando o componente for montado
    useEffect(() => {
        loadNotes();
    }, []);

    // Função para carregar as notas do AsyncStorage
    const loadNotes = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue !== null) {
                setLista(JSON.parse(jsonValue));
            }
        } catch (error) {
            console.error('Erro ao carregar notas:', error);
            Alert.alert(
                "Erro",
                "Não foi possível carregar suas anotações."
            );
        }
    };

    // Função para salvar as notas no AsyncStorage
    const saveNotes = async (notesArray) => {
        try {
            const jsonValue = JSON.stringify(notesArray);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (error) {
            console.error('Erro ao salvar notas:', error);
            Alert.alert(
                "Erro",
                "Não foi possível salvar suas anotações."
            );
        }
    };

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
            // Salva as notas atualizadas no AsyncStorage
            saveNotes(updatedList);

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
        <View style={styles.noteItem}>
            <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => {
                    // Ativa o modo de edição quando o botão de editar é pressionado
                    setIsEditing(true);
                    setEditingItemId(item.id);
                    setTitulo(item.id);
                    setNotes(item.title);
                    setVisible(true);
                }}>
                    <Foundation name="pencil" size={30} color="black" style={styles.editButton} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteNote(item.id)}>
                    <Ionicons name="trash-sharp" size={30} color="black" style={styles.deleteButton} />
                </TouchableOpacity>
            </View>
            {/* Botão para visualizar o modal com as informações titulo e notes */}
            <TouchableOpacity onPress={() => {
                viewNoteDetails(item);
            }}>
                <View style={styles.noteContent}>
                    <Text style={styles.noteTitle}>Titulo: {item.id}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    // Função para visualizar os detalhes da nota
    const viewNoteDetails = (item) => {
        setCurrentViewItem(item);
        setIsView(true);
    };

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
                        // Salva as notas atualizadas no AsyncStorage
                        saveNotes(NewLista);
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
            const Newlista = [...Lista, { id: Titulo, title: Notes }];
            setLista(Newlista);
            // Salva as notas atualizadas no AsyncStorage
            saveNotes(Newlista);
            setNotes("");
            setTitulo("");
        }
    };

    return (
        <View style={styles.container}>

            {/* Modal para visualizar detalhes da nota */}
            <Modal visible={isView} animationType="fade">
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsView(false)}>
                        <FontAwesome name="remove" size={40} color="black" />
                    </TouchableOpacity>
                    <View style={styles.viewNoteContent}>
                        {currentViewItem && (
                            <>
                                <Text style={styles.viewNoteTitle}>
                                    {currentViewItem.id}
                                </Text>
                                <Text style={styles.viewNoteText}>
                                    {currentViewItem.title}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Modal para adicionar e editar notas */}
            <Modal animationType="fade" visible={visible}>
                <View style={styles.headerButtons}>
                    {/* Botão para fechar o modal */}
                    <TouchableOpacity style={styles.headerCloseButton} onPress={() => {
                        setVisible(false);
                        // Redefine os estados quando o modal é fechado
                        setIsEditing(false);
                        setEditingItemId(null);
                        setNotes("");
                        setTitulo("");
                    }}>
                        <FontAwesome name="remove" size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.saveButtonContainer}>
                    {/* Botão para salvar nota */}
                    <TouchableOpacity style={styles.saveButton} onPress={() => {
                        // Determina se deve adicionar ou atualizar com base no estado de edição
                        isEditing ? updateNotes() : addNotes();
                        setVisible(false);
                    }}>
                        <Feather name="save" size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContainer}>
                    {/* Input para o título da nota */}
                    <TextInput
                        onChangeText={(txt) => setTitulo(txt)}
                        value={Titulo}
                        maxLength={30}
                        placeholder="Titulo"
                        style={styles.titleInput}
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
                        style={styles.contentInput}
                    />
                </View>
            </Modal>

            {/* Botão para adicionar nova nota */}
            <TouchableOpacity onPress={() => {
                setVisible(true);
                // Redefine os estados ao adicionar uma nova nota
                setIsEditing(false);
                setEditingItemId(null);
                setNotes("");
                setTitulo("");
            }}>
                <MaterialCommunityIcons
                    name="note-plus-outline"
                    size={50}
                    color="black"
                    style={styles.addButton}
                />
            </TouchableOpacity>

            {/* Lista de notas */}
            <View style={styles.notesList}>
                <FlatList
                    data={Lista}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>
    );
};

export default Notes;