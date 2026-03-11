import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/login"),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1a0f00" }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0f00" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ── Top Bar ── */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 56,
            paddingBottom: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "800" }}>
            My Profile
          </Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
          >
            <Text
              style={{
                color: "#e87c00",
                fontSize: 13,
                fontWeight: "700",
                letterSpacing: 0.3,
              }}
            >
              EDIT PROFILE
            </Text>
            <Feather name="edit-2" size={13} color="#e87c00" />
          </TouchableOpacity>
        </View>

        {/* ── Profile Card ── */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "#231200",
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: "#3d2200",
          }}
        >
          {/* Avatar + Name */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              marginBottom: 16,
            }}
          >
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: "https://i.pravatar.cc/80?img=12" }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#3d2200",
                }}
              />
              {/* Badge */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#e87c00",
                  borderWidth: 2,
                  borderColor: "#231200",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="checkmark" size={10} color="#fff" />
              </View>
            </View>
            <View>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800" }}>
                Roland Kenneth P
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View
            style={{ height: 1, backgroundColor: "#3d2200", marginBottom: 14 }}
          />

          {/* Email */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <Ionicons name="mail-outline" size={17} color="#9a7a5a" />
            <Text style={{ color: "#ccc", fontSize: 14 }}>
              roland@gmail.com
            </Text>
          </View>

          {/* Location */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="location-outline" size={17} color="#9a7a5a" />
            <Text style={{ color: "#ccc", fontSize: 14 }}>
              Bangalore, India
            </Text>
          </View>
        </View>

        {/* ── My Address ── */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "800",
              marginBottom: 14,
            }}
          >
            My Address
          </Text>
          <View
            style={{
              backgroundColor: "#231200",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#3d2200",
              overflow: "hidden",
            }}
          >
            {/* Address row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: 16,
              }}
            >
              <View style={{ flexDirection: "row", gap: 10, flex: 1 }}>
                <Ionicons
                  name="home-outline"
                  size={18}
                  color="#e87c00"
                  style={{ marginTop: 1 }}
                />
                <View>
                  <Text
                    style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}
                  >
                    Home Address
                  </Text>
                  <Text
                    style={{
                      color: "#9a7a5a",
                      fontSize: 13,
                      marginTop: 4,
                      lineHeight: 19,
                    }}
                  >
                    123 R.S.Palya{"\n"}Bangalore, India 560001
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: "#3d2200",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="edit-2" size={14} color="#e87c00" />
              </TouchableOpacity>
            </View>

            {/* Map placeholder */}
            <View
              style={{
                height: 130,
                backgroundColor: "#2a1800",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Ionicons name="map-outline" size={36} color="#5a4030" />
              <Text style={{ color: "#5a4030", fontSize: 12 }}>
                Bangalore, India
              </Text>
            </View>
          </View>
        </View>

        {/* ── My Orders ── */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "800",
              marginBottom: 14,
            }}
          >
            My Orders
          </Text>
          <View
            style={{
              backgroundColor: "#231200",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#3d2200",
              padding: 32,
              alignItems: "center",
            }}
          >
            {/* Moto icon circle */}
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: "#3d2200",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <MaterialCommunityIcons
                name="motorbike"
                size={34}
                color="#e87c00"
              />
            </View>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 6,
              }}
            >
              No orders yet
            </Text>
            <Text
              style={{
                color: "#9a7a5a",
                fontSize: 13,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              Your purchased bikes and gear{"\n"}will appear here.
            </Text>
            <TouchableOpacity style={{ marginTop: 14 }}>
              <Text
                style={{ color: "#e87c00", fontSize: 14, fontWeight: "700" }}
              >
                Start Browsing
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Go to Cart ── */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/cart")}
            activeOpacity={0.85}
            style={{
              backgroundColor: "#e87c00",
              borderRadius: 14,
              height: 54,
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
            <Ionicons name="cart" size={20} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "800" }}>
              Go to Cart
            </Text>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                width: 22,
                height: 22,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#e87c00", fontSize: 11, fontWeight: "800" }}
              >
                2
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Logout ── */}
        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.75}
            style={{
              backgroundColor: "#231200",
              borderRadius: 14,
              height: 54,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              borderWidth: 1,
              borderColor: "#3d2200",
            }}
          >
            <MaterialCommunityIcons name="logout" size={20} color="#e87c00" />
            <Text style={{ color: "#e87c00", fontSize: 15, fontWeight: "700" }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
