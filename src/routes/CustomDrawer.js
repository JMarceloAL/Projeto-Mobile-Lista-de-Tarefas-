import React from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Foundation from '@expo/vector-icons/Foundation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = (props) => {
    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
    }

    return (
        <View style={{ flex: 1, }}>

            <DrawerContentScrollView  {...props}>
                <DrawerItemList {...props}></DrawerItemList>
            </DrawerContentScrollView>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>

                <TouchableOpacity style={{ marginBottom: 30, marginLeft: 20 }} onPress={() => {
                    clearAsyncStorage();

                }}>
                    <Foundation name="trash" size={50} color="black" />

                </TouchableOpacity>

            </View>
        </View>


    )

















}

export default CustomDrawer;