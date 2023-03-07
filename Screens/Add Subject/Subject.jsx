import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setValueHandler } from "../../redux/actions";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const Subject = ({ navigation }) => {
  const [input, setInput] = useState("");
  const attendance = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAttendanceData();
  }, []);

  useEffect(() => {
    storeData();
  }, [attendance]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "black",
      title: "Subjects",
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 20,
              marginTop: 6,
              marginLeft: -8,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Subjects
          </Text>
        );
      },
    });
  }, [navigation]);

  const getAttendanceData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("attendance");
      if (jsonValue !== null) {
        dispatch(
          setValueHandler(JSON.parse(jsonValue).sort((a, b) => a.id > b.id))
        );
      } else {
        dispatch(setValueHandler([]));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async () => {
    if (attendance) {
      try {
        await AsyncStorage.setItem("attendance", JSON.stringify(attendance));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const addSubjectHandler = () => {
    let id = Math.round(Math.random() * 10000);
    if (input.length !== 0) {
      dispatch(
        setValueHandler([
          ...attendance,
          {
            id: id,
            name: input,
            present: [],
            absent: [],
            cancel: [],
          },
        ])
      );
      setInput("");
      Keyboard.dismiss();
      setOpen(!open);
      ToastAndroid.show("Subject Added!", ToastAndroid.SHORT);
    }
  };

  const removeSubjectHandler = (id) => {
    Alert.alert(
      "Are You Sure?",
      "Deleting subject will delete that subject attendance also.",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            dispatch(
              setValueHandler(attendance.filter((item) => item.id !== id))
            ),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {attendance && attendance.length === 0 ? (
        <View style={styles.noSubDiv}>
          <Text style={styles.noSubText}>Add Subjects!</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.subListView}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {attendance &&
            attendance.map((item) => {
              return (
                <View key={item.id} style={styles.indiSubArea}>
                  <Text style={styles.indiSubName}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    activeOpacity={0.4}
                    onPress={() => removeSubjectHandler(item.id)}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      )}
      <View style={styles.addSubjectArea}>
        <TextInput
          style={styles.input}
          value={input}
          placeholder="Enter Subject Here"
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={addSubjectHandler}
        />
        <TouchableOpacity
          style={styles.addSubjectBtn}
          activeOpacity={0.4}
          onPress={addSubjectHandler}
        >
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </View>
  );
};

export default Subject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subListView: {
    width: "100%",
    flex: 1,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: "#181818",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    width: "80%",
    marginBottom: 20,
    borderRadius: 6,
  },
  indiSubArea: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 6,
    alignItems: "center",
    marginTop: 14,
    width: "90%",
    elevation: 20,
    shadowColor: "#18181840",
    marginBottom: 10,
  },
  indiSubName: {
    fontSize: 16,
    width: "90%",
    fontFamily: "Poppins-Medium",
  },
  deleteBtn: {
    paddingVertical: 4,
  },
  addSubjectArea: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    padding: 12,
    marginTop: 14,
  },
  addSubjectBtn: {
    backgroundColor: "#f2f2f2f",
    padding: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  input: {
    width: "82%",
    padding: 8,
    fontFamily: "Poppins-Medium",
  },
  noSubDiv: {
    flex: 1,
  },
  noSubText: {
    marginTop: 40,
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
