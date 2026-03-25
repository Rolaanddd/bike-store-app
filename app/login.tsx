// app/login.tsx  ── updated to use real backend
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { login } from "../services/api"; // ← your API service

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password); // saves JWT to SecureStore
      router.replace("/(tabs)/home");
    } catch (err: any) {
      Alert.alert("Login Failed", err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#111008" }}>
      <StatusBar barStyle="light-content" backgroundColor="#111008" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header ── */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 56,
              paddingBottom: 16,
              gap: 10,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#2a1500",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="motorbike"
                size={22}
                color="#e87c00"
              />
            </View>
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "700",
                letterSpacing: 0.5,
              }}
            >
              MotoDrive
            </Text>
          </View>

          {/* ── Hero Image ── */}
          <View
            style={{
              marginHorizontal: 20,
              borderRadius: 18,
              overflow: "hidden",
              backgroundColor: "#2a1800",
              height: 200,
            }}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1614888441179-9e21cfd014d9?q=80&w=1170&auto=format&fit=crop",
              }}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </View>

          {/* ── Welcome Text ── */}
          <View
            style={{ alignItems: "center", marginTop: 28, marginBottom: 8 }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: "800",
                letterSpacing: 0.3,
              }}
            >
              Welcome Back
            </Text>
            <Text style={{ color: "#9a7a5a", fontSize: 14, marginTop: 6 }}>
              Sign in to explore motorcycles
            </Text>
          </View>

          {/* ── Form ── */}
          <View style={{ paddingHorizontal: 20, marginTop: 24, gap: 16 }}>
            {/* Email */}
            <View>
              <Text style={labelStyle}>Email</Text>
              <View style={inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color="#9a7a5a"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  placeholderTextColor="#5a4030"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={inputStyle}
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={labelStyle}>Password</Text>
              </View>
              <View style={inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#9a7a5a"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#5a4030"
                  secureTextEntry={!showPassword}
                  style={inputStyle}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#9a7a5a"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={loading}
              style={{
                backgroundColor: loading ? "#a05500" : "#e87c00",
                borderRadius: 14,
                height: 54,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 8,
                shadowColor: "#e87c00",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.45,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "800",
                  letterSpacing: 1.5,
                }}
              >
                {loading ? "SIGNING IN..." : "LOGIN"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Footer ── */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 32,
              marginBottom: 40,
              gap: 4,
            }}
          >
            <Text style={{ color: "#9a7a5a", fontSize: 14 }}>
              Don&apos;t have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("./auth/register")}>
              <Text
                style={{ color: "#e87c00", fontSize: 14, fontWeight: "700" }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const labelStyle = {
  color: "#ccc" as const,
  fontSize: 13,
  fontWeight: "600" as const,
  marginBottom: 8,
};
const inputContainer = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  backgroundColor: "#2a1800",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#3d2200",
  paddingHorizontal: 14,
  height: 52,
};
const inputStyle = { flex: 1, color: "#fff" as const, fontSize: 15 };
