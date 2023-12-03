import {
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Dimensions,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "../styles/global";
import { profile } from "../styles/profile";
import BtnBlock from "../component/BtnBlock";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Tab from "../component/Tab";
import Loading from "../component/Loading";
import { color } from "../styles/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUser from "../function/getUser";
import changeUser from "../function/changeUser";
import { baseUrl } from "../function/baseUrl";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import profilePict from "../function/profilePict";
const Profile = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [logoutLoad, setLogoutLoad] = useState(false);
  const [refresh, setRefresh] = useState(Math.random());
  const [ubah, setUbah] = useState(true);
  const [data, setData] = useState({});
  const [imgModal, setImgModal] = useState(false);
  const [imgPreview, setImgPreview] = useState(false);
  const [images, setImages] = useState({});

  const onLogout = async () => {
    setLogoutLoad(true);

    setTimeout(async () => {
      try {
        await AsyncStorage.removeItem("id_driver");
        navigation.navigate("Auth");
      } catch (error) {
        console.log(error);
      }
      setLogoutLoad(false);
    }, 3000);
  };
  const onSubmit = () => {
    setLoad(true);
    setTimeout(() => {
      changeUser(data.nama, data.username, data.email, data.whatsapp).then(
        (res) => {
          if (res.status == 0) {
            getUser().then((resp) => {
              setData(resp);
              setImages({ uri: baseUrl + "uploads/img/" + res.img });
            });
            ToastAndroid.show("Berhasil", 3000);
          } else {
            ToastAndroid.show("Gagal", 3000);
          }
        }
      );
      setLoad(false);
    }, 3000);
  };

  const handleInputText = (inputName, text) => {
    setData({ ...data, [inputName]: text });
  };
  useFocusEffect(
    React.useCallback(() => {
      getUser().then((res) => {
        setData(res);
        setImages({ uri: baseUrl + "uploads/img/" + res.img });
      });
    }, [refresh])
  );

  const launchGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      let uri = result.assets[0].uri;
      let name = result.assets[0].uri.split("/").pop();
      let type = mime.getType(result.assets[0].uri);
      profilePict(data.id_driver, uri, name, type).then((res) => {
        setTimeout(() => {
          getUser().then((resp) => {
            setData(resp);
            setImages({
              uri: baseUrl + "uploads/img/" + resp.img,
            });

            ToastAndroid.show("Berhasil!", 3000);
          });
        }, 1000);
      });
    }
  };
  return (
    <SafeAreaView style={global.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={imgPreview}
        onRequestClose={() => {
          setImgPreview(false);
        }}
      >
        <View style={profile.imgModalPreview}>
          <TouchableOpacity
            style={profile.closeBtn}
            onPress={() => {
              setImgPreview(false);
            }}
          >
            <Text>Tutup</Text>
          </TouchableOpacity>
          <Image
            style={profile.imgLg}
            source={{ uri: baseUrl + "/uploads/img/" + data.img }}
          />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={imgModal}
        onRequestClose={() => {
          setImgModal(false);
        }}
      >
        <View style={profile.imgModalContainer}>
          <View style={profile.imgModalContent}>
            <TouchableOpacity
              style={profile.imgBtnOpt}
              onPress={() => {
                setImgModal(false);
                setImgPreview(true);
              }}
            >
              <Text>Lihat Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profile.imgBtnOpt}
              onPress={() => {
                setImgModal(false);
                launchGallery();
              }}
            >
              <Text>Ubah Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={profile.imgBtnOpt}
              onPress={() => {
                setImgModal(false);
              }}
            >
              <Text>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView
        style={{
          flex: 1,
          paddingBottom: 300,
        }}
      >
        <View style={profile.imgContainer}>
          <TouchableOpacity
            style={profile.imgBtn}
            onPress={() => {
              setImgModal(true);
            }}
          >
            <Image style={profile.img} source={images} />
          </TouchableOpacity>
          <TouchableOpacity style={profile.logoutBtn} onPress={onLogout}>
            {logoutLoad && <Loading color={color.danger} />}
            {!logoutLoad && (
              <Text style={[global.inputLabel, global.dangerText]}>Keluar</Text>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={[global.dFlex, global.spaceBetween, { alignItems: "center" }]}
        >
          <Text style={profile.label}>Informasi Personal</Text>
          <TouchableOpacity
            onPress={() => {
              setUbah(!ubah);
            }}
          >
            <Text>Ubah</Text>
          </TouchableOpacity>
        </View>
        <View style={profile.formGroup}>
          <Text style={global.inputLabel}>Nama Lengkap</Text>
          <TextInput
            editable={ubah ? false : true}
            style={global.textInput}
            value={data.nama}
            onChangeText={(text) => {
              handleInputText("nama", text);
            }}
          />
        </View>
        <View style={profile.formGroup}>
          <Text style={global.inputLabel}>Username</Text>
          <TextInput
            editable={ubah ? false : true}
            style={global.textInput}
            value={data.username}
            onChangeText={(text) => {
              handleInputText("username", text);
            }}
          />
        </View>
        <View style={profile.formGroup}>
          <Text style={global.inputLabel}>Email</Text>
          <TextInput
            editable={ubah ? false : true}
            style={global.textInput}
            value={data.email}
            onChangeText={(text) => {
              handleInputText("email", text);
            }}
          />
        </View>
        <View style={profile.formGroup}>
          <Text style={global.inputLabel}>Telepon</Text>
          <TextInput
            editable={ubah ? false : true}
            style={global.textInput}
            value={data.whatsapp}
            onChangeText={(text) => {
              handleInputText("whatsapp", text);
            }}
          />
        </View>

        <BtnBlock
          text={"Ubah"}
          onPress={onSubmit}
          loading={load}
          disabled={ubah ? true : false}
        />
        <TouchableOpacity
          style={profile.pwLink}
          onPress={() => {
            navigation.navigate("Password");
          }}
        >
          <Text style={[global.primaryText, global.bold]}>Ubah kata sandi</Text>
        </TouchableOpacity>
        <View style={{ paddingTop: 150 }}></View>
      </ScrollView>
      <Tab />
    </SafeAreaView>
  );
};

export default Profile;
