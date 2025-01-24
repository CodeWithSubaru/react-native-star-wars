import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

export default function Layout() {
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
          title: "All Films",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Film Details",
        }}
      />
    </Stack>
  );
}
