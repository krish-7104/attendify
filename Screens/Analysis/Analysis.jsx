import { StyleSheet, Text, ScrollView, View } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import Dashboard from "../Add Attendance/Dashboard";
import { useSelector } from "react-redux";
const Analysis = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "black",
      title: "Attendify",
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
    <View style={styles.container}>
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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: "center" }}
      >
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
          }}
        >
          {data.map((subject, index) => {
            return (
              <View style={styles.card} key={subject.id}>
                <View>
                  <Text style={styles.title}>{subject.name}</Text>
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
                <View
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: 20,
                    padding: 12,
                  }}
                >
                  <Text style={styles.totalPercentage}>
                    {(subject.present.length * 100) /
                      (subject.present.length + subject.absent.length)}
                    %
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    width: "96%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#18181810",
    borderBottomWidth: 2,
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  subTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#18181890",
  },
  totalPercentage: {
    fontSize: 28,
    fontFamily: "Poppins-Medium",
  },
});
