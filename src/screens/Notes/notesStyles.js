import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#d4d5ff',
        zIndex: -2
    },
    addButton: {
        marginTop: 30
    },
    notesList: {
        width: 300,
        height: 600,
        marginTop: 30
    },
    noteItem: {
        padding: 20,
        borderRadius: 30,
        marginVertical: 8,
        backgroundColor: "white",
        maxHeight: 150,
        flexDirection: "row-reverse",
        alignItems: "center"
    },
    actionButtons: {
    },
    editButton: {
        marginLeft: 5
    },
    deleteButton: {
        marginTop: 10
    },
    noteContent: {
        marginRight: 30,
        width: 200,
        maxHeight: 50,
        marginBottom: 30
    },
    noteTitle: {
        fontSize: 15,
        fontWeight: "bold"
    },
    modalContainer: {
        backgroundColor: '#d4d5ff',
        flex: 1
    },
    closeButton: {
        alignItems: "flex-end",
        marginTop: 15,
        marginRight: 30
    },
    viewNoteContent: {
        backgroundColor: "white",
        margin: 30,
        padding: 20,
        flex: 1,
        borderRadius: 30
    },
    viewNoteTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20
    },
    viewNoteText: {
        fontSize: 18,
        lineHeight: 24
    },
    headerButtons: {
        alignItems: "flex-end",
        backgroundColor: '#d4d5ff'
    },
    headerCloseButton: {
        marginRight: 20,
        marginTop: 15
    },
    saveButtonContainer: {
        alignItems: "flex-start",
        width: 100,
        position: "absolute",
        marginLeft: 10
    },
    saveButton: {
        marginTop: 15
    },
    titleInput: {
        backgroundColor: 'white',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        padding: 20,
        marginTop: 10,
        fontWeight: "bold"
    },
    contentInput: {
        backgroundColor: 'white',
        fontSize: 16,
        height: 680,
        padding: 20,
        margin: 20,
        borderRadius: 30
    }
});