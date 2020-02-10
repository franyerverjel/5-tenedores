import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";

export default function LoginFacebook(props) {
  const { toastRef, navigation } = props;
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const login = async () => {
    try {
      await Facebook.initializeAsync(FacebookApi.application_id);

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: FacebookApi.permissions
      });

      if (type === "success") {
        setIsVisibleLoading(true);
        const credentials = firebase.auth.FacebookAuthProvider.credential(
          token
        );
        await firebase
          .auth()
          .signInWithCredential(credentials)
          .then(() => {
            navigation.navigate("MyAccount");
          })
          .catch(() => {
            toastRef.current.show(
              "Error accediendo con Facebook, inténtalo de nuevo"
            );
          });
      } else if (type === "cancel") {
        toastRef.current.show("Inicio de sesión cancelado");
      } else {
        toastRef.current.show("Error desconocido, inténtalo de nuevo");
      }
    } catch ({ message }) {
      toastRef.current.show("Error de red, inténtalo de nuevo");
    }
    setIsVisibleLoading(false);
  };

  return (
    <>
      <SocialIcon
        title="Ingresar con facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading isVisible={isVisibleLoading} text="Iniciando sesión" />
    </>
  );
}
