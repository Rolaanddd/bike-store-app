import { View, Text, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CartScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1a0f00",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1a0f00" />
      <Ionicons name="cart" size={48} color="#e87c00" />
      <Text style={{ color: "#fff", fontSize: 28, fontWeight: "800" }}>
        Cart
      </Text>
    </View>
  );
}
