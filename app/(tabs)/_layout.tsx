import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TabIconProps = {
  label: string;
  focused: boolean;
  icon: React.ReactNode;
};

function TabIcon({ label, focused, icon }: TabIconProps) {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", paddingTop: 15 }}
    >
      {icon}
      <Text
        style={{
          fontSize: 9,
          width: 40,
          height: 16,
          textAlign: "center",
          fontWeight: focused ? "700" : "500",
          color: focused ? "#e87c00" : "#6b5040",
          marginTop: 3,
          letterSpacing: 0.5,
        }}
      >
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111008",
          borderTopColor: "#3d2200",
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 0,
          paddingTop: 9,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              label="Home"
              focused={focused}
              icon={
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={22}
                  color={focused ? "#e87c00" : "#6b5040"}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              label="Cart"
              focused={focused}
              icon={
                <Ionicons
                  name={focused ? "cart" : "cart-outline"}
                  size={22}
                  color={focused ? "#e87c00" : "#6b5040"}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              label="Profile"
              focused={focused}
              icon={
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={22}
                  color={focused ? "#e87c00" : "#6b5040"}
                />
              }
            />
          ),
        }}
      />
      {/* Hidden screens — no tab bar icon */}
      <Tabs.Screen name="all-bikes" options={{ href: null }} />
      <Tabs.Screen name="bike/[id]" options={{ href: null }} />
      <Tabs.Screen name="payment" options={{ href: null }} />
      <Tabs.Screen name="data/store" options={{ href: null }} />
    </Tabs>
  );
}
