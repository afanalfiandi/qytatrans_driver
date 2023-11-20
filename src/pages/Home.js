import {
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  View,
  BackHandler,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Tab from "../component/Tab";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "../styles/global";
import { home } from "../styles/home";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import "moment/locale/id";

import moment from "moment/moment";
import getPosition from "../function/getPosition";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Sheet from "../component/Sheet";
import getNextOrder from "../function/getNextOrder";

const Home = () => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(Math.random());
  const [mapSection, setMapSection] = useState(false);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  }); 
  useFocusEffect(
    React.useCallback(() => {
      getPosition().then((result) => {
        setTimeout(() => {
          setInitialRegion({
            latitude: result.latitude,
            longitude: result.longitude,
            latitudeDelta: result.latitudeDelta,
            longitudeDelta: result.longitudeDelta,
          });
          setMapSection(true);
        }, 100);
      });

      const backAction = () => {
        Alert.alert("", "Apakah Anda yakin ingin keluar dari aplikasi?", [
          {
            text: "Batal",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Keluar", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [refresh])
  );

  return (
    <SafeAreaView style={[global.container, { paddingBottom: 100 }]}>
      <View style={home.header}>
        <Text style={global.text}>Hi, Bagasipasi</Text>
      </View>

      <View style={[home.mapSection]}>
        <View style={[global.dFlex, global.spaceBetween]}>
          <Text style={home.sectionTitle}>Lokasi Anda</Text>
          <TouchableOpacity>
            <Text style={global.primaryText}>Lihat Peta</Text>
          </TouchableOpacity>
        </View>
        {mapSection && (
          <View style={home.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={initialRegion}
              style={home.map}
              showsUserLocation={true}
              showsMyLocationButton={true}
            ></MapView>
          </View>
        )}
      </View>
      {mapSection && (
        <Sheet
          latDriver={initialRegion.latitude}
          longDriver={initialRegion.longitude}
        />
      )}
      <Tab />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
