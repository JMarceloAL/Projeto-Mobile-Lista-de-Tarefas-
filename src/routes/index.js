import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from "@react-navigation/native"




const Drawer = createDrawerNavigator();

import { Taskes } from '../screens/Tasks/Taskes.tsx'
import { Weather } from '../screens/Weather/Weather.js'
import { Notes } from '../screens/Notes/Notes.js'
import { Initial } from '../screens/Initial/Initial.js'
export function AppRoutes() {



    return (



        <NavigationContainer >


            <Drawer.Navigator initialRouteName='Inicio' screenOptions={{ drawerActiveTintColor: 'red', }}>

                <Drawer.Screen name="Tarefas" component={Taskes} />
                <Drawer.Screen name="Anotações" component={Notes} />
                <Drawer.Screen name="Clima" component={Weather} />
                <Drawer.Screen name="Inicio" component={Initial} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />

            </Drawer.Navigator>

        </NavigationContainer >
    )

}



export default AppRoutes;