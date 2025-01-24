import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
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
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          borderTopColor: Colors.light.text,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: Colors.light.tabIconSelected,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="films"
        options={{
          title: "All Films",
          tabBarLabel: "Films",
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarLabel: "Favorites",
        }}
      />

      <Tabs.Screen
        name="details"
        options={{
          title: "Details",
          tabBarLabel: "Details",
        }}
      />
    </Tabs>
  );
}
