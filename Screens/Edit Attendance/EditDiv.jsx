import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const EditDiv = (props) => {
  if (props.present.includes(props.date) || props.absent.includes(props.date)) {
    return (
      <View style={styles.div}>
        <View style={styles.textArea}>
          <Text style={styles.subName}>{props.subject}</Text>
        </View>
        <View style={styles.attendShow}>
          <Text style={styles.subData}>
            {props.present.length +
              "/" +
              (props.present.length + props.absent.length) +
              "  (" +
              (
                (props.present.length * 100) /
                (props.present.length + props.absent.length)
              ).toPrecision(4) +
              "%)"}
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {props.present &&
              props.present.map((indi, index) => {
                if (indi === props.date) {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#4ade80",
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 30,
                        marginRight: 6,
                      }}
                    ></View>
                  );
                }
              })}
            {props.absent &&
              props.absent.map((indi, index) => {
                if (indi === props.date) {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#f87171",
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 30,
                        marginRight: 6,
                      }}
                    ></View>
                  );
                }
              })}
            {props.cancel &&
              props.cancel.map((indi, index) => {
                if (indi === props.date) {
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#60a5fa",
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                        borderRadius: 30,
                        marginRight: 6,
                      }}
                    ></View>
                  );
                }
              })}

            <TouchableOpacity
              onPress={() =>
                props.removeAttendanceHandler(props.id, props.date)
              }
              activeOpacity={0.4}
              style={{
                padding: 3,
                borderRadius: 4,
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

export default EditDiv;

const styles = StyleSheet.create({
  div: {
    width: "90%",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingRight: 16,
    marginBottom: 12,
    marginHorizontal: "auto",
    flexDirection: "column",
  },
  textArea: {
    display: "flex",
    justifyContent: "flex-start",
    flex: 1,
  },
  attendShow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  subName: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "Poppins-Medium",
  },
  subData: {
    fontSize: 15,
    marginTop: 4,
    letterSpacing: 1,
    fontFamily: "Poppins-Regular",
  },
  btnArea: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 10,
    borderRadius: 10,
  },
});
