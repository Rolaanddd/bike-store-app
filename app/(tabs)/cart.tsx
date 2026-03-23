import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { INITIAL_CART, formatPrice, type CartItem } from "./data/store";

const SHIPPING = 250;

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.bike.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.bike.id !== id));
  };

  const goToProduct = (id: string) => {
    router.push({ pathname: "/(tabs)/bike/[id]", params: { id } });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.bike.price * item.quantity,
    0,
  );
  const total = subtotal + (cartItems.length > 0 ? SHIPPING : 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#111008" }}>
      <StatusBar barStyle="light-content" backgroundColor="#111008" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ── Title ── */}
        <View
          style={{ paddingHorizontal: 20, paddingTop: 52, marginBottom: 20 }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 28,
              fontWeight: "900",
              letterSpacing: 1,
            }}
          >
            MY CART
          </Text>
        </View>

        {/* ── Cart Items ── */}
        {cartItems.length === 0 ? (
          <View style={{ alignItems: "center", paddingVertical: 60, gap: 12 }}>
            <MaterialCommunityIcons name="cart-off" size={52} color="#3d2200" />
            <Text style={{ color: "#9a7a5a", fontSize: 16 }}>
              Your cart is empty
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/home")}
              style={{
                marginTop: 8,
                backgroundColor: "#e87c00",
                borderRadius: 12,
                paddingHorizontal: 24,
                paddingVertical: 12,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>
                Start Browsing
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 20, gap: 12 }}>
            {cartItems.map((item) => (
              <TouchableOpacity
                key={item.bike.id}
                onPress={() => goToProduct(item.bike.id)}
                activeOpacity={0.88}
                style={{
                  backgroundColor: "#1e1200",
                  borderRadius: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#2e1a00",
                  gap: 12,
                }}
              >
                {/* Image */}
                <Image
                  source={{ uri: item.bike.image }}
                  style={{
                    width: 90,
                    height: 75,
                    borderRadius: 10,
                    resizeMode: "cover",
                  }}
                />

                {/* Info */}
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: "800",
                        flex: 1,
                        paddingRight: 8,
                        lineHeight: 19,
                      }}
                    >
                      {item.bike.name}
                    </Text>
                    {/* stopPropagation so trash tap doesn't navigate */}
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        removeItem(item.bike.id);
                      }}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#e84040"
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{ color: "#9a7a5a", fontSize: 12, marginTop: 3 }}
                  >
                    {item.variant}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#e87c00",
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      {formatPrice(item.bike.price * item.quantity)}
                    </Text>

                    {/* Qty control — stopPropagation so +/- don't navigate */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#2e1a00",
                        borderRadius: 8,
                        overflow: "hidden",
                      }}
                    >
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          updateQty(item.bike.id, -1);
                        }}
                        style={{
                          width: 30,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons name="remove" size={16} color="#fff" />
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 14,
                          fontWeight: "700",
                          width: 24,
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          updateQty(item.bike.id, 1);
                        }}
                        style={{
                          width: 30,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons name="add" size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ── Totals ── */}
        {cartItems.length > 0 && (
          <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "#9a7a5a", fontSize: 15 }}>Subtotal</Text>
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>
                {formatPrice(subtotal)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Text style={{ color: "#9a7a5a", fontSize: 15 }}>Shipping</Text>
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>
                {formatPrice(SHIPPING)}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#1e1200",
                borderRadius: 14,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 18,
                paddingVertical: 16,
                borderWidth: 1,
                borderColor: "#2e1a00",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: "900",
                  letterSpacing: 1,
                }}
              >
                TOTAL AMOUNT
              </Text>
              <Text
                style={{ color: "#e87c00", fontSize: 18, fontWeight: "900" }}
              >
                {formatPrice(total)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/payment")}
              activeOpacity={0.85}
              style={{
                backgroundColor: "#e87c00",
                borderRadius: 50,
                height: 56,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                shadowColor: "#e87c00",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: "900",
                  letterSpacing: 1.5,
                }}
              >
                PROCEED TO PAYMENT
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
