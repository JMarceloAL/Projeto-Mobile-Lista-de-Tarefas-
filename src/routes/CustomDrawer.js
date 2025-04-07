import React from "react";
import { View, Text, TouchableOpacity, Linking } from 'react-native'
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
                <TouchableOpacity style={{ marginLeft: 15, marginTop: 10 }} onPress={() => {

                    Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScJEVPxvW58NJOnU_TBAXzNpNj2PkCBedMjVkq71AKKStGoCQ/viewform?usp=dialog')
                }}>

                    <Text style={{ fontSize: 20, color: "#6b73c7" }}>Avalie</Text>

                </TouchableOpacity>
            </DrawerContentScrollView>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>

                <TouchableOpacity style={{ marginBottom: 30, marginLeft: 20 }} onPress={() => {
                    clearAsyncStorage();

                }}>
                    <Foundation name="trash" size={50} color="#6b73c7" />

                </TouchableOpacity>

            </View>
        </View>


    )

















}

export default CustomDrawer;