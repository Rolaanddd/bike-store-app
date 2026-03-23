// app/(tabs)/profile.tsx
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { fetchProfile, updateProfile, logout } from "../../services/api";

type UserProfile = {
  id: number;
  full_name: string;
  email: string;
  city: string | null;
  age: number | null;
  avatar_url: string | null;
  address_line: string | null;
  address_city: string | null;
  address_state: string | null;
  address_zip: string | null;
  address_country: string | null;
};

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form fields
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [addressCountry, setAddressCountry] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await fetchProfile();
      setUser(data);
    } catch (err: any) {
      if (err.message?.includes("token") || err.message?.includes("401")) {
        router.replace("/login");
      } else {
        Alert.alert("Error", "Could not load profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill form with current user data when modal opens
  const openEditModal = () => {
    setFullName(user?.full_name || "");
    setCity(user?.city || "");
    setAge(user?.age ? String(user.age) : "");
    setAvatarUrl(user?.avatar_url || "");
    setAddressLine(user?.address_line || "");
    setAddressCity(user?.address_city || "");
    setAddressState(user?.address_state || "");
    setAddressZip(user?.address_zip || "");
    setAddressCountry(user?.address_country || "");
    setModalVisible(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateProfile({
        full_name: fullName || undefined,
        city: city || undefined,
        age: age ? parseInt(age, 10) : undefined,
        avatar_url: avatarUrl || undefined,
        address_line: addressLine || undefined,
        address_city: addressCity || undefined,
        address_state: addressState || undefined,
        address_zip: addressZip || undefined,
        address_country: addressCountry || undefined,
      });
      setUser(updated);
      setModalVisible(false);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Could not save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#1a0f00",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#e87c00" />
      </View>
    );
  }

  const hasAddress = user?.address_line || user?.address_city;
  const addressLine2 = [user?.address_city, user?.address_country]
    .filter(Boolean)
    .join(", ");
  const zipLine = user?.address_zip ? ` ${user.address_zip}` : "";

  return (
    <View style={{ flex: 1, backgroundColor: "#111008" }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* ── EDIT PROFILE MODAL ── */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "#1a0f00" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* Modal Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#3d2200",
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "#9a7a5a", fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 17, fontWeight: "800" }}>
              Edit Profile
            </Text>
            <TouchableOpacity onPress={handleSave} disabled={saving}>
              <Text
                style={{
                  color: saving ? "#a05500" : "#e87c00",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {saving ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{ padding: 20, gap: 16 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Section: Personal */}
            <Text style={sectionLabel}>Personal Info</Text>

            <View>
              <Text style={fieldLabel}>Full Name</Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Your full name"
                placeholderTextColor="#5a4030"
                style={inputStyle}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={fieldLabel}>City</Text>
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  placeholder="City"
                  placeholderTextColor="#5a4030"
                  style={inputStyle}
                />
              </View>
              <View style={{ width: 90 }}>
                <Text style={fieldLabel}>Age</Text>
                <TextInput
                  value={age}
                  onChangeText={setAge}
                  placeholder="25"
                  placeholderTextColor="#5a4030"
                  keyboardType="numeric"
                  maxLength={3}
                  style={[inputStyle, { textAlign: "center" }]}
                />
              </View>
            </View>

            <View>
              <Text style={fieldLabel}>Profile Picture URL</Text>
              <TextInput
                value={avatarUrl}
                onChangeText={setAvatarUrl}
                placeholder="https://..."
                placeholderTextColor="#5a4030"
                autoCapitalize="none"
                style={inputStyle}
              />
            </View>

            {/* Section: Address */}
            <Text style={[sectionLabel, { marginTop: 8 }]}>Home Address</Text>

            <View>
              <Text style={fieldLabel}>Street / Area</Text>
              <TextInput
                value={addressLine}
                onChangeText={setAddressLine}
                placeholder="123 Main Street"
                placeholderTextColor="#5a4030"
                style={inputStyle}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={fieldLabel}>City</Text>
                <TextInput
                  value={addressCity}
                  onChangeText={setAddressCity}
                  placeholder="Bangalore"
                  placeholderTextColor="#5a4030"
                  style={inputStyle}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={fieldLabel}>State</Text>
                <TextInput
                  value={addressState}
                  onChangeText={setAddressState}
                  placeholder="Karnataka"
                  placeholderTextColor="#5a4030"
                  style={inputStyle}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ width: 110 }}>
                <Text style={fieldLabel}>PIN Code</Text>
                <TextInput
                  value={addressZip}
                  onChangeText={setAddressZip}
                  placeholder="560001"
                  placeholderTextColor="#5a4030"
                  keyboardType="numeric"
                  maxLength={10}
                  style={inputStyle}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={fieldLabel}>Country</Text>
                <TextInput
                  value={addressCountry}
                  onChangeText={setAddressCountry}
                  placeholder="India"
                  placeholderTextColor="#5a4030"
                  style={inputStyle}
                />
              </View>
            </View>

            {/* Save Button (also at bottom for convenience) */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              activeOpacity={0.85}
              style={{
                backgroundColor: saving ? "#a05500" : "#e87c00",
                borderRadius: 14,
                height: 54,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 12,
                shadowColor: "#e87c00",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.45,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "800" }}>
                {saving ? "Saving..." : "Save Changes"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* ── MAIN PROFILE SCREEN ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Top Bar */}
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
            onPress={openEditModal}
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

        {/* Profile Card */}
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
                source={{
                  uri:
                    user?.avatar_url ||
                    `https://i.pravatar.cc/80?u=${user?.email}`,
                }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#3d2200",
                }}
              />
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
                {user?.full_name || "—"}
              </Text>
              {user?.city && (
                <Text style={{ color: "#9a7a5a", fontSize: 13, marginTop: 2 }}>
                  {user.city}
                  {user.age ? ` · ${user.age} yrs` : ""}
                </Text>
              )}
            </View>
          </View>

          <View
            style={{ height: 1, backgroundColor: "#3d2200", marginBottom: 14 }}
          />

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
              {user?.email || "—"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="location-outline" size={17} color="#9a7a5a" />
            <Text style={{ color: "#ccc", fontSize: 14 }}>
              {[user?.city, user?.address_country].filter(Boolean).join(", ") ||
                "No location set"}
            </Text>
          </View>
        </View>

        {/* My Address */}
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
                  {hasAddress ? (
                    <Text
                      style={{
                        color: "#9a7a5a",
                        fontSize: 13,
                        marginTop: 4,
                        lineHeight: 19,
                      }}
                    >
                      {user?.address_line ? `${user.address_line}\n` : ""}
                      {addressLine2}
                      {zipLine}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#5a4030",
                        fontSize: 13,
                        marginTop: 4,
                        width: 260,
                      }}
                    >
                      No address saved — tap Edit Profile to add one
                    </Text>
                  )}
                </View>
              </View>
            </View>

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
                {user?.address_city || user?.city || "No location"}
                {user?.address_country ? `, ${user.address_country}` : ""}
              </Text>
            </View>
          </View>
        </View>

        {/* My Orders */}
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

        {/* Go to Cart */}
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

        {/* Logout */}
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

const sectionLabel = {
  color: "#e87c00" as const,
  fontSize: 12,
  fontWeight: "700" as const,
  letterSpacing: 1.2,
  textTransform: "uppercase" as const,
};

const fieldLabel = {
  color: "#9a7a5a" as const,
  fontSize: 12,
  fontWeight: "600" as const,
  marginBottom: 6,
};

const inputStyle = {
  backgroundColor: "#2a1800",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#3d2200",
  paddingHorizontal: 14,
  height: 48,
  color: "#fff" as const,
  fontSize: 15,
};
