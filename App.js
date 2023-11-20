import * as React from "react";
import {
  View,
  BackHandler,
  StyleSheet,
  Text,
  Image,
  Alert,
} from "react-native";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { navigationRef } from "./src/function/navigationRef";
import SplashScreen from "./src/pages/SplashScreen";
import Auth from "./src/pages/Auth";
import Home from "./src/pages/Home";
import History from "./src/pages/History";
import Profile from "./src/pages/Profile";
import Password from "./src/pages/Password";
import PickUp from "./src/pages/PickUp";
import TransactionDetail from "./src/pages/TransactionDetail";

const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="PickUp" component={PickUp} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
