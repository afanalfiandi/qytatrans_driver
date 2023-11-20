import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./baseUrl";

const changePassword = async (lama, baru) => {
  const id_driver = await AsyncStorage.getItem("id_driver");

  const res = await fetch(api + "changePassword", {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      id_driver: id_driver,
      lama: lama,
      baru: baru,
    }),
  });

  const data = await res.json();
  return data;
};

export default changePassword;
