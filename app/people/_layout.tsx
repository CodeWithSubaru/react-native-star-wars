import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTitleAlign: "center",
        headerTintColor: Colors.light.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "All Characters",
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: "Character",
        }}
      />
    </Stack>
  );
};
export default Layout;
const styles = StyleSheet.create({});
