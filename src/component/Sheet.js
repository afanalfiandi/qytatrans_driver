import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { color } from "../styles/color";
import { global } from "../styles/global";
import { home } from "../styles/home";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { history } from "../styles/history";
import moment from "moment/moment";
import getNextOrder from "../function/getNextOrder";
import getEarliest from "../function/getEarliest";

const Sheet = ({ latDriver, longDriver }) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [ind, setInd] = useState(0);
  const [refresh, setRefresh] = useState(Math.random());
  const [earliest, setEarliest] = useState([]);
  // variables
  const snapPoints = useMemo(() => ["99%", "100%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    setInd(index);
  }, []);
  const [order, setOrder] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getNextOrder().then((res) => {
        console.log(res);
        if (res.status != 1) {
          setOrder(res);
        }
      });
      getEarliest().then((res) => {
        if (res.status != 1) {
          setEarliest(res);
        }
      });
    }, [refresh])
  );

  const renderItem = useCallback(
    ({ item }) => (
      <View style={home.itemContainer}>
        <View style={home.historyRow}>
          <Text>
            {moment(item.tanggal).format("DD MMMM YYYY")} - {item.pukul}
          </Text>
        </View>
        <View style={[global.dFlex, home.routeContainer, home.historyRow]}>
          <Image source={require("../../assets/img/icon/location.png")} />
          <Text style={home.routeText}>
            {item.asal_kota}-{item.tujuan_kota}
          </Text>
        </View>
        <View style={[global.dFlex, global.spaceBetween, home.historyRow]}>
          <Text>Rp. {item.harga}</Text>
        </View>
      </View>
    ),
    []
  );

  const RenderOrder = ({ item }) => {
    return (
      <TouchableOpacity
        style={history.row}
        onPress={() => {
          navigation.navigate("PickUp", {
            no_transaksi: item.no_transaksi,
            latitude: item.latitude,
            longitude: item.longitude,
            latDriver: latDriver,
            longDriver: longDriver,
            telp: item.telp,
            id_status: item.id_status,
            nama_penumpang: item.nama_penumpang,
            no_transaksi: item.no_transaksi
          });
        }}
      >
        <View style={[global.dFlex, global.spaceBetween, history.rowHeader]}>
          <Text>{moment(item.tanggal_jemput).format("DD MMMM YYYY")}</Text>
          <Image source={require("../../assets/img/icon/play.png")} />
        </View>
        <View style={[global.dFlex, home.routeContainer, home.historyRow]}>
          <Image source={require("../../assets/img/icon/location.png")} />
          <Text style={home.routeText}>
            {item.asal_kota} - {item.tujuan_kota}
          </Text>
        </View>
        <View style={[global.dFlex, global.spaceBetween, history.rowHeader]}>
          <Text>{item.nama_penumpang}</Text>
          <Text>Rp. {item.harga}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <GestureHandlerRootView
      style={[
        home.bottomSheetSection,
        {
          height:
            ind == 0
              ? Dimensions.get("screen").height * 0.54
              : Dimensions.get("screen").height * 0.75,
        },
      ]}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enableOverDrag={true}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
        backgroundStyle={home.bottomSheet}
        handleIndicatorStyle={home.indicator}
        handleHeight={100}
      >
        <View style={home.contentContainer}>
          <Text style={home.sectionTitle}>Pesanan Berikutnya</Text>
          {order.length > 0 && (
            <FlatList
              data={order}
              keyExtractor={(item, index) => {
                return index;
              }}
              renderItem={RenderOrder}
            />
          )}
          {order.length <= 0 && <Text>Tidak ada data untuk ditampilkan</Text>}
        </View>
        <View style={home.contentContainer}>
          <Text style={home.sectionTitle}>Baru-baru Ini</Text>
          {earliest.length > 0 && (
            <FlatList
              horizontal={true}
              data={earliest}
              keyExtractor={(i, index) => index}
              renderItem={renderItem}
            />
          )}
          {earliest.length <= 0 && (
            <Text>Tidak ada data untuk ditampilkan</Text>
          )}
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Sheet;
