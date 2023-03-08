import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { mystore } from "./redux/store";
import { Alert, Linking } from "react-native";
import Main from "./Screens/Add Attendance/Main";
import Subject from "./Screens/Add Subject/Subject";
import EditAttend from "./Screens/Edit Attendance/EditAttend";
import Setting from "./Screens/Settings/Setting";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import Analysis from "./Screens/Analysis/Analysis";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const Drawer = createDrawerNavigator();
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView
        onLayout={onLayoutRootView}
        {...props}
        contentContainerStyle={{
          paddingTop: 80,
        }}
      >
        <DrawerItemList {...props} />
        <DrawerItem
          label="About Developer"
          onPress={() => Linking.openURL("")}
        />
        <DrawerItem label="Feedback" onPress={() => Linking.openURL("")} />
      </DrawerContentScrollView>
    );
  }
  return (
    <Provider store={mystore}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          useLegacyImplementation
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={Main} />
          <Drawer.Screen name="Subject" component={Subject} />
          <Drawer.Screen name="Analysis" component={Analysis} />
          <Drawer.Screen name="Edit Attendance" component={EditAttend} />
          <Drawer.Screen name="Reset App" component={Setting} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
