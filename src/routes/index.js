import * as React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerView } from '@react-navigation/drawer'
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


            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} initialRouteName='Clima' screenOptions={{ drawerActiveTintColor: 'red', drawerLabelStyle: { fontSize: 20 } }} >

                <Drawer.Screen name="Tarefas" component={Taskes} />
                <Drawer.Screen name="Anotações" component={Notes} />
                <Drawer.Screen name="Clima" component={Weather} />
                <Drawer.Screen name="Info" component={Initial} options={{ drawerItemStyle: { display: '' }, headerShown: false }} />


            </Drawer.Navigator>

        </NavigationContainer >
    )

}



export default AppRoutes;