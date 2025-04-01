import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from "@react-navigation/native"
import CustomDrawer from '../routes/CustomDrawer'
import { Taskes } from '../screens/Tasks/Taskes.tsx'
import { Weather } from '../screens/Weather/Weather.js'
import { Notes } from '../screens/Notes/Notes.js'
import { Initial } from '../screens/Initial/Initial.js'



const Drawer = createDrawerNavigator();


export function AppRoutes() {



    return (



        <NavigationContainer >


            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} initialRouteName='Info' screenOptions={{ drawerActiveTintColor: 'white', drawerActiveBackgroundColor: '#6b73c7', drawerLabelStyle: { fontSize: 20, }, drawerStyle: { backgroundColor: '#d4d5ff', }, headerStyle: { backgroundColor: '#d4d5ff', }, headerTintColor: '#6b73c7', headerTitleStyle: { color: '#6b73c7' } }} >

                <Drawer.Screen name="Tarefas" component={Taskes} />
                <Drawer.Screen name="Anotações" component={Notes} />
                <Drawer.Screen name="Clima" component={Weather} />
                <Drawer.Screen name="Info" component={Initial} options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />


            </Drawer.Navigator>

        </NavigationContainer >
    )

}



export default AppRoutes;