import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { color } from "../styles/color";
import { global } from "../styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { splashscreen } from "../styles/splashscreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();

  const navig = async () => {
    const session = await AsyncStorage.getItem("id_driver");

    if (session == null) {
      navigation.navigate("Auth");
    } else {
      navigation.navigate("Home");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      navig();
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={[global.container, splashscreen.container]}>
      <Image source={require("../../assets/img/app-logo.png")} />
    </SafeAreaView>
  );
};

export default SplashScreen;
