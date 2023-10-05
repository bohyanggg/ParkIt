import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseconfig";
import { updateProfile } from "firebase/auth";
import {
  QuerySnapshot,
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const Separator = () => <View style={styles.separator} />;

const SettingScreen = ({ navigation }) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const user = auth.currentUser;
  const [fullName, setfullname] = useState();
  const [email, setEmail] = useState();

  // const fetchData = async () => {
  //   const userDocRef = doc(db, "users", auth.currentUser.uid);
  //   const docSnap = await getDoc(userDocRef);
  //   console.log("testing")
  //   let temp = {
  //     FullName: "",
  //   };
  //   if (docSnap.exists()) {
  //     const user = docSnap.data();
  //     temp = {
  //       FullName: user.fullname,
  //     };
  //     return temp;
  //   }
  //   return temp;
  // };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setfullname(docSnap.data().fullName);
      setEmail(docSnap.data().email);
    } else {
      console.log("No such document!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingBottom: 20 }}>
        <Image
          source={require("../assets/images/manuser.png")}
          style={styles.image}
        />
      </View>

      <View>
        <Text>Full Name: {fullName}</Text>
        <Text>Email: {email}</Text>
      </View>

      <View style={styles.buttons}>
        <View style={styles.navigators}>
          <Button
            title="Change Password"
            color="#5D0EEA"
            onPress={() => {
              fetchData;
            }}

            //not able to implement in time
          />
        </View>
      </View>

      <View style={styles.buttons}>
        <View style={styles.navigators}>
          <Button title="Log Out" color="#5D0EEA" onPress={handleSignOut} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  navigators: {
    marginVertical: 2,
    paddingHorizontal: "20%",
    flex: 1,
  },

  buttons: {
    marginVertical: 8,
    flexDirection: "row",
    paddingTop: 20,
  },

  image: {
    margin: 20,
    padding: 16,
  },

  textInputStyling: {
    borderWidth: 1,
    justifyContent: "center",
  },

  forgotPasswordStyle: {
    color: "#5D0EEA",
    fontSize: 10,
    textAlign: "right",
  },

  forgotPasswordViewStyle: {
    width: "52%",
    paddingTop: 10,
  },
});

export default SettingScreen;
