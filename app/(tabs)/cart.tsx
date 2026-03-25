import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
  formatPrice,
  type CartItem,
} from "../../services/api";

const SHIPPING = 250;

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Reload cart every time this tab comes into focus ──────────
  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, []),
  );

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await fetchCart();
      setCartItems(data.items);
    } catch (err) {
      console.error("Failed to load cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Derived totals from current state (always accurate) ───────
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.bike.price) * item.quantity,
    0,
  );
  const total = subtotal + (cartItems.length > 0 ? SHIPPING : 0);

  // ── Update quantity ───────────────────────────────────────────
  const handleUpdateQty = async (
    cartItemId: number,
    currentQty: number,
    delta: number,
  ) => {
    const newQty = currentQty + delta;
    if (newQty < 1) {
      handleRemove(cartItemId);
      return;
    }
    // Optimistic update
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item,
      ),
    );
    try {
      await updateCartItem(cartItemId, newQty);
    } catch (err: any) {
      Alert.alert("Error", err.message);
      loadCart(); // revert on failure
    }
  };

  // ── Remove item ───────────────────────────────────────────────
  const handleRemove = async (cartItemId: number) => {
    // Optimistic update
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    try {
      await removeCartItem(cartItemId);
    } catch (err: any) {
      Alert.alert("Error", err.message);
      loadCart(); // revert on failure
    }
  };

  const goToProduct = (bikeId: number) => {
    router.push({ pathname: "/(tabs)/bike/[id]", params: { id: bikeId } });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#111008",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#e87c00" />
      </View>
    );
  }

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
          {cartItems.length > 0 && (
            <Text style={{ color: "#9a7a5a", fontSize: 13, marginTop: 4 }}>
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </Text>
          )}
        </View>

        {/* ── Empty State ── */}
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
          <>
            {/* ── Cart Items ── */}
            <View style={{ paddingHorizontal: 20, gap: 12 }}>
              {cartItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
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
                  {/* Bike Image */}
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
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          handleRemove(item.id);
                        }}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
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
                      {item.variant || item.bike.category}
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
                        {formatPrice(Number(item.bike.price) * item.quantity)}
                      </Text>

                      {/* Qty Control */}
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
                            handleUpdateQty(item.id, item.quantity, -1);
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
                            handleUpdateQty(item.id, item.quantity, 1);
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

            {/* ── Totals ── */}
            <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: "#9a7a5a", fontSize: 15 }}>Subtotal</Text>
                <Text
                  style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}
                >
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
                <Text
                  style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}
                >
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
          </>
        )}
      </ScrollView>
    </View>
  );
}
