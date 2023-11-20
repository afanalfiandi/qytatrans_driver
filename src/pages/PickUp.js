import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { global } from "../styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { pickup } from "../styles/pickup";
import FloatBtn from "../component/FloatBtn";
import getPosition from "../function/getPosition";
import onStatus from "../function/onStatus";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import NavigationMap from "../component/NavigationMap";
import getBooking from "../function/getBooking";
import LoadingPage from "../component/LoadingPage";

const PickUp = ({ route }) => {
  const navigation = useNavigation();
  const latDestination = Number(route.params.latitude);
  const longDestination = Number(route.params.longitude);
  const latDriver = Number(route.params.latDriver);
  const longDriver = Number(route.params.longDriver);
  const telp = route.params.telp;
  const id_status = route.params.id_status;
  const nama_penumpang = route.params.nama_penumpang;
  const no_transaksi = route.params.no_transaksi;

  const origin = { latitude: latDriver, longitude: longDriver };
  const destination = { latitude: latDestination, longitude: longDestination };

  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [refresh, setRefresh] = useState(Math.random());
  const [mapSection, setMapSection] = useState(false);
  const [status, setStatus] = useState();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const onSubmit = (stts) => {
    setLoad(true);

    setTimeout(() => {
      onStatus(no_transaksi, stts).then((res) => {
        if (res.status == 0) {
          setStatus(stts);
        } else {
          ToastAndroid.show("Mengalami kegagalan", 3000);
        }
      });
      setLoad(false);
    }, 3000);
  };
  const onWhatsapp = () => {
    Linking.openURL(`http://api.whatsapp.com/send?phone=${telp}`);
  };

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      getBooking(no_transaksi).then((res) => {
        setStatus(res.id_status);
        console.log(res.id_status);
      });
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
    }, [refresh])
  );
  return (
    <SafeAreaView style={[pickup.container]}>
      {loading && <LoadingPage />}

      {!loading && (
        <View style={{ flex: 1 }}>
          <View style={[pickup.mapSection]}>
            <NavigationMap
              latDestination={latDestination}
              longDestination={longDestination}
              latDriver={latDriver}
              longDriver={longDriver}
            />
          </View>
          <View style={pickup.content}>
            <View
              style={[global.dFlex, global.spaceBetween, pickup.contentHeader]}
            >
              <Text style={pickup.text}>{nama_penumpang}</Text>
              <TouchableOpacity style={pickup.whatsappBtn} onPress={onWhatsapp}>
                <Image
                  style={pickup.whatsappImg}
                  source={require("../../assets/img/icon/whatsapp.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={pickup.row}>
              <Text style={pickup.label}>lokasi penjemputan</Text>
              <Text style={pickup.text}>purwokerto</Text>
            </View>
            <View style={pickup.row}>
              <Text style={pickup.label}>tujuan</Text>
              <Text style={pickup.text}>cilacap</Text>
            </View>
            <View style={pickup.row}>
              <Text style={pickup.label}>jarak</Text>
              <Text style={pickup.text}>12 km</Text>
            </View>
            <View style={pickup.row}>
              <Text style={pickup.label}>harga</Text>
              <Text style={pickup.text}>Rp. 150000</Text>
            </View>
            <View style={pickup.row}>
              {status == "1" && (
                <FloatBtn
                  text={"pick up"}
                  onPress={() => {
                    onSubmit(5);
                  }}
                  loading={load}
                />
              )}

              {status == "5" && (
                <FloatBtn
                  text={"sudah dilokasi"}
                  onPress={() => {
                    onSubmit(6);
                  }}
                  loading={load}
                />
              )}
              {status == "6" && (
                <FloatBtn
                  text={"selesai"}
                  onPress={() => {
                    onSubmit(2);
                  }}
                  loading={load}
                />
              )}
              {status == "2" && (
                <FloatBtn
                  text={"lihat detail"}
                  onPress={() => {
                    navigation.navigate("TransactionDetail", {
                      no_transaksi: no_transaksi,
                    });
                  }}
                  loading={load}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PickUp;
