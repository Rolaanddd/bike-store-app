import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const TOTAL_AMOUNT = "₹44,549.00";

export default function PaymentScreen() {
  const router = useRouter();

  const handleConfirm = () => {
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
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#111008" }}>
      <StatusBar barStyle="light-content" backgroundColor="#111008" />

      {/* ── Top Bar ── */}
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
        <TouchableOpacity
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
          <Ionicons name="help-circle-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {/* ── Total Amount Card ── */}
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
            <Text
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: "900",
                marginTop: 4,
              }}
            >
              {TOTAL_AMOUNT}
            </Text>
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

        {/* ── QR Scanner Box ── */}
        <View
          style={{
            backgroundColor: "#2a2a2a",
            borderRadius: 20,
            padding: 24,
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          {/* Scanner frame with orange corners */}
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
            {/* Top-left */}
            <View style={{ position: "absolute", top: 0, left: 0 }}>
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
            {/* Top-right */}
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                alignItems: "flex-end",
              }}
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
            {/* Bottom-left */}
            <View style={{ position: "absolute", bottom: 0, left: 0 }}>
              <View
                style={{
                  width: 4,
                  height: 32,
                  backgroundColor: "#e87c00",
                  borderRadius: 2,
                }}
              />
              <View
                style={{
                  width: 32,
                  height: 4,
                  backgroundColor: "#e87c00",
                  borderRadius: 2,
                  marginTop: -4,
                }}
              />
            </View>
            {/* Bottom-right */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                alignItems: "flex-end",
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 32,
                  backgroundColor: "#e87c00",
                  borderRadius: 2,
                }}
              />
              <View
                style={{
                  width: 32,
                  height: 4,
                  backgroundColor: "#e87c00",
                  borderRadius: 2,
                  marginTop: -4,
                }}
              />
            </View>

            {/* Dashed border overlay */}
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

            {/* QR Code image */}
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
              {/* Simulated QR Code using pattern */}
              <View
                style={{ width: 150, height: 150, backgroundColor: "#f9e8e0" }}
              >
                <Image
                  source={{
                    uri: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=motodrive-payment-44549&color=1a0f00&bgcolor=f9e8e0",
                  }}
                  style={{ width: 150, height: 150 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>

        {/* ── UPI Text ── */}
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

        {/* ── Verified Merchant Banner ── */}
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

        {/* ── Confirm Payment Button ── */}
        <TouchableOpacity
          onPress={handleConfirm}
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
              fontSize: 16,
              fontWeight: "800",
              letterSpacing: 0.5,
            }}
          >
            Confirm Payment
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>

        {/* ── Payment method icons ── */}
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
