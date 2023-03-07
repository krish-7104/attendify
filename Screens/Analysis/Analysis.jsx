import { StyleSheet, Text, ScrollView, View } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import Dashboard from "../Add Attendance/Dashboard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Analysis = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "black",
      title: "Attendance Analysis",
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
            Attendance Analysis
          </Text>
        );
      },
    });
  }, [navigation]);
  const data = useSelector((state) => state);

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Dashboard />
      <Text
        style={{
          fontFamily: "Poppins-SemiBold",
          marginVertical: 14,
          fontSize: 18,
        }}
      >
        Subject Wise Analysis
      </Text>
      <View
        style={{
          backgroundColor: "#fff",
          width: "90%",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          elevation: 10,
          shadowColor: "#18181860",
          marginBottom: 20,
        }}
      >
        {data.map((subject, index) => {
          return (
            <View style={styles.card} key={subject.id}>
              <Text style={styles.title}>{subject.name}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.subTitle}>
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#4ade80",
                        paddingHorizontal: 6,
                        paddingVertical: 6,
                        borderRadius: 30,
                      }}
                    ></View>{" "}
                    Present: {subject.present.length}/
                    {subject.present.length + subject.absent.length}
                  </Text>
                  <Text style={styles.subTitle}>
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#f87171",
                        paddingHorizontal: 6,
                        paddingVertical: 6,
                        borderRadius: 30,
                      }}
                    ></View>{" "}
                    Absent: {subject.absent.length}/
                    {subject.present.length + subject.absent.length}
                  </Text>
                  <Text style={styles.subTitle}>
                    <View
                      key={index}
                      style={{
                        backgroundColor: "#60a5fa",
                        paddingHorizontal: 6,
                        paddingVertical: 6,
                        borderRadius: 30,
                      }}
                    ></View>{" "}
                    Cancel: {subject.absent.length}
                  </Text>
                </View>
                <Text style={styles.totalPercentage}>
                  {subject.present.length === 0 && subject.absent.length === 0
                    ? 0
                    : (
                        (subject.present.length * 100) /
                        (subject.present.length + subject.absent.length)
                      ).toPrecision(4)}
                  %
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: "96%",
    borderBottomColor: "#18181810",
    borderBottomWidth: 2,
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginBottom: 4,
  },
  subTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#18181890",
  },
  totalPercentage: {
    fontSize: 24,
    fontFamily: "Poppins-Medium",
  },
});
