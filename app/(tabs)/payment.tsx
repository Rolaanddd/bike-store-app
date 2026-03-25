import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchCart, placeOrder, formatPrice } from "../../services/api";

export default function PaymentScreen() {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    loadTotal();
  }, []);

  const loadTotal = async () => {
    try {
      const data = await fetchCart();
      const SHIPPING = 250;
      setTotal(data.subtotal + (data.count > 0 ? SHIPPING : 0));
    } catch (err) {
      console.error("Failed to load cart total:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await placeOrder("upi");
      Alert.alert(
        "Payment Successful! 🎉",
        "Your order has been confirmed. Expected delivery in 4-6 weeks.",
        [
          {
            text: "Back to Home",
            onPress: () => router.replace("/(tabs)/home"),
          },
        ],
      );
    } catch (err: any) {
      Alert.alert("Error", err.message || "Could not place order.");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#111008" }}>
      <StatusBar barStyle="light-content" backgroundColor="#111008" />

      {/* Top Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: 52,
          paddingBottom: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: "#1e1200",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#2e1a00",
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#e87c00",
            fontSize: 20,
            fontWeight: "900",
            letterSpacing: 1,
          }}
        >
          Payment
        </Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {/* Total Amount Card */}
        <View
          style={{
            backgroundColor: "#1e1200",
            borderRadius: 16,
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#2e1a00",
            marginBottom: 24,
            marginTop: 8,
          }}
        >
          <View>
            <Text
              style={{
                color: "#9a7a5a",
                fontSize: 12,
                fontWeight: "700",
                letterSpacing: 1,
              }}
            >
              TOTAL AMOUNT
            </Text>
            {loading ? (
              <ActivityIndicator color="#e87c00" style={{ marginTop: 8 }} />
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontSize: 26,
                  fontWeight: "900",
                  marginTop: 4,
                }}
              >
                {formatPrice(total)}
              </Text>
            )}
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#3d2200",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="flash" size={24} color="#e87c00" />
          </View>
        </View>

        {/* QR Scanner Box */}
        <View
          style={{
            backgroundColor: "#2a2a2a",
            borderRadius: 20,
            padding: 24,
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <View
            style={{
              width: 240,
              height: 240,
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Corner brackets */}
            {[
              { top: 0, left: 0 },
              { top: 0, right: 0 },
              { bottom: 0, left: 0 },
              { bottom: 0, right: 0 },
            ].map((pos, i) => (
              <View
                key={i}
                style={[
                  { position: "absolute" },
                  pos,
                  {
                    alignItems:
                      pos.right !== undefined ? "flex-end" : "flex-start",
                  },
                ]}
              >
                <View
                  style={{
                    width: 32,
                    height: 4,
                    backgroundColor: "#e87c00",
                    borderRadius: 2,
                  }}
                />
                <View
                  style={{
                    width: 4,
                    height: 32,
                    backgroundColor: "#e87c00",
                    borderRadius: 2,
                    marginTop: -4,
                  }}
                />
              </View>
            ))}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderWidth: 1,
                borderColor: "#5a5a5a",
                borderStyle: "dashed",
                borderRadius: 4,
              }}
            />
            <View
              style={{
                width: 170,
                height: 170,
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{
                  uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=motodrive-payment-${total}&color=1a0f00&bgcolor=f9e8e0`,
                }}
                style={{ width: 150, height: 150 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* UPI Text */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 17,
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            Scan and pay using any UPI app
          </Text>
          <Text
            style={{
              color: "#9a7a5a",
              fontSize: 13,
              textAlign: "center",
              marginTop: 6,
            }}
          >
            GPay, PhonePe, Paytm, and others supported
          </Text>
        </View>

        {/* Verified Merchant */}
        <View
          style={{
            backgroundColor: "#1e1200",
            borderRadius: 14,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            borderWidth: 1,
            borderColor: "#2e1a00",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: "#e87c00",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="shield-checkmark" size={20} color="#fff" />
          </View>
          <View>
            <Text
              style={{
                color: "#9a7a5a",
                fontSize: 10,
                fontWeight: "700",
                letterSpacing: 1,
              }}
            >
              VERIFIED MERCHANT
            </Text>
            <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>
              MOTODRIVE LTD.
            </Text>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          onPress={handleConfirm}
          disabled={confirming || loading}
          activeOpacity={0.85}
          style={{
            backgroundColor: confirming ? "#a05500" : "#e87c00",
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
              fontSize: 16,
              fontWeight: "800",
              letterSpacing: 0.5,
            }}
          >
            {confirming ? "Placing Order..." : "Confirm Payment"}
          </Text>
          {!confirming && (
            <Ionicons name="chevron-forward" size={18} color="#fff" />
          )}
        </TouchableOpacity>

        {/* Payment icons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            marginTop: 24,
          }}
        >
          <MaterialCommunityIcons
            name="bank-outline"
            size={24}
            color="#5a4030"
          />
          <MaterialCommunityIcons
            name="credit-card-outline"
            size={24}
            color="#5a4030"
          />
          <MaterialCommunityIcons
            name="card-account-details-outline"
            size={24}
            color="#5a4030"
          />
        </View>
      </ScrollView>
    </View>
  );
}
