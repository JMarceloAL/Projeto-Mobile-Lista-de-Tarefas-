import { StyleSheet } from "react-native";
import React, { useRef, useEffect } from 'react'
import { Animated, Text, View } from "react-native";




const styles = StyleSheet.create({

    container: {

        flex: 1,

    },

    checkbox: {
        marginRight: 10,
        justifyContent: 'center',
    },
    checkboxBase: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'green',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: 'green',
    },
    checkMark: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    item: {
        flexDirection: 'row',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 30,
        alignItems: 'center',

    },
    title: {
        flex: 1,
        fontSize: 16,
    },
    buttonexcluir: {
        marginLeft: 10,
    },

})

export default styles;





