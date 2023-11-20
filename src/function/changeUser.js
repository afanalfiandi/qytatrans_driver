import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./baseUrl";
const changeUser = async (nama, username, email, whatsapp, alamat) => {
  const id_driver = await AsyncStorage.getItem("id_driver");
  const res = await fetch(api + "changeUser", {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      id_driver: id_driver,
      nama: nama,
      username: username,
      email: email,
      whatsapp: whatsapp,
    }),
  });

  const data = await res.json();
  return data;
};

export default changeUser;
