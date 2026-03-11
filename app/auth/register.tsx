import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  User,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react-native";

export default function RegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleRegister = () => {
    if (!agreed) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    // TODO: add your registration logic here
    console.log("Register:", { fullName, email, city, age, password });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1a0f00" }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0f00" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Back Button ── */}
          <View style={{ paddingTop: 56, paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* ── Title ── */}
          <View
            style={{ paddingHorizontal: 20, marginTop: 12, marginBottom: 28 }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 28,
                fontWeight: "800",
                letterSpacing: 0.3,
              }}
            >
              Create Account
            </Text>
            <Text style={{ color: "#9a7a5a", fontSize: 14, marginTop: 6 }}>
              Join and discover your next motorcycle
            </Text>
          </View>

          {/* ── Form ── */}
          <View style={{ paddingHorizontal: 20, gap: 16 }}>
            {/* Full Name */}
            <View>
              <Text style={labelStyle}>Full Name</Text>
              <View style={[inputContainer, { marginTop: 8 }]}>
                <User size={18} color="#9a7a5a" style={{ marginRight: 10 }} />
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="John Doe"
                  placeholderTextColor="#5a4030"
                  style={inputStyle}
                />
              </View>
            </View>

            {/* Email Address */}
            <View>
              <Text style={labelStyle}>Email Address</Text>
              <View style={[inputContainer, { marginTop: 8 }]}>
                <Mail size={18} color="#9a7a5a" style={{ marginRight: 10 }} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="john@example.com"
                  placeholderTextColor="#5a4030"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={inputStyle}
                />
              </View>
            </View>

            {/* City + Age (side by side) */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              {/* City */}
              <View style={{ flex: 1 }}>
                <Text style={labelStyle}>City</Text>
                <View style={[inputContainer, { marginTop: 8 }]}>
                  <MapPin
                    size={18}
                    color="#9a7a5a"
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    value={city}
                    onChangeText={setCity}
                    placeholder="Los Angeles"
                    placeholderTextColor="#5a4030"
                    style={[inputStyle]}
                  />
                </View>
              </View>

              {/* Age */}
              <View style={{ width: 85 }}>
                <Text style={labelStyle}>Age</Text>
                <View
                  style={[
                    inputContainer,
                    {
                      marginTop: 8,
                      justifyContent: "center",
                      paddingHorizontal: 12,
                    },
                  ]}
                >
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
            </View>

            {/* Password */}
            <View>
              <Text style={labelStyle}>Password</Text>
              <View style={[inputContainer, { marginTop: 8 }]}>
                <Lock size={18} color="#9a7a5a" style={{ marginRight: 10 }} />
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
                  {showPassword ? (
                    <EyeOff size={18} color="#9a7a5a" />
                  ) : (
                    <Eye size={18} color="#9a7a5a" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms Checkbox */}
            <TouchableOpacity
              onPress={() => setAgreed(!agreed)}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 12,
                marginTop: 4,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: agreed ? "#e87c00" : "#5a4030",
                  backgroundColor: agreed ? "#e87c00" : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 1,
                  flexShrink: 0,
                }}
              >
                {agreed && (
                  <Text
                    style={{ color: "#fff", fontSize: 11, fontWeight: "800" }}
                  >
                    ✓
                  </Text>
                )}
              </View>
              <Text
                style={{
                  color: "#9a7a5a",
                  fontSize: 13,
                  flex: 1,
                  lineHeight: 20,
                }}
              >
                I agree to the{" "}
                <Text style={{ color: "#e87c00", fontWeight: "600" }}>
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text style={{ color: "#e87c00", fontWeight: "600" }}>
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity
              onPress={handleRegister}
              activeOpacity={0.85}
              style={{
                backgroundColor: "#e87c00",
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
                  letterSpacing: 0.5,
                }}
              >
                Create Account
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
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text
                style={{ color: "#e87c00", fontSize: 14, fontWeight: "700" }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Shared styles ──────────────────────────────────────────────
const labelStyle = {
  color: "#ccc" as const,
  fontSize: 13,
  fontWeight: "600" as const,
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

const inputStyle = {
  flex: 1,
  color: "#fff" as const,
  fontSize: 15,
};
