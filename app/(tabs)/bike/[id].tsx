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
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import {
  fetchBikeById,
  addToCart,
  formatPrice,
  type Bike,
} from "../../../services/api";

const ENGINEERING_HIGHLIGHTS = [
  {
    id: "eh1",
    title: "Titanium Exhaust",
    subtitle: "Heat-treated lightweight system for peak performance",
    image:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&q=80",
  },
  {
    id: "eh2",
    title: "Digital Cockpit",
    subtitle: "Full-color TFT display with HUD connectivity",
    image:
      "https://images.unsplash.com/photo-1558980394-4c7304d9c052?w=400&q=80",
  },
];

function StatBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1e1200",
        borderRadius: 12,
        padding: 14,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#2e1a00",
        gap: 6,
      }}
    >
      {icon}
      <Text
        style={{
          color: "#9a7a5a",
          fontSize: 10,
          fontWeight: "700",
          letterSpacing: 1,
        }}
      >
        {label}
      </Text>
      <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800" }}>
        {value}
      </Text>
    </View>
  );
}

export default function BikeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    loadBike();
  }, [id]);

  const loadBike = async () => {
    try {
      const data = await fetchBikeById(id);
      setBike(data);
    } catch (err) {
      Alert.alert("Error", "Could not load bike details.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!bike) return;
    setAddingToCart(true);
    try {
      await addToCart(bike.id, 1, `${bike.engine}`);
      Alert.alert(
        "Added to Cart!",
        `${bike.name} has been added to your cart.`,
        [
          { text: "Continue Browsing", onPress: () => router.back() },
          { text: "Go to Cart", onPress: () => router.push("/(tabs)/cart") },
        ],
      );
    } catch (err: any) {
      Alert.alert("Error", err.message || "Could not add to cart.");
    } finally {
      setAddingToCart(false);
    }
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

  if (!bike) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#111008" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Hero Image ── */}
        <View style={{ height: 280, position: "relative" }}>
          <Image
            source={{ uri: bike.image }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 52,
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: "rgba(0,0,0,0.5)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Content ── */}
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: "#e87c00",
              fontSize: 11,
              fontWeight: "700",
              letterSpacing: 1.5,
              marginBottom: 6,
            }}
          >
            {bike.series}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 28,
              fontWeight: "900",
              letterSpacing: 0.5,
              lineHeight: 34,
            }}
          >
            {bike.name.toUpperCase()}
          </Text>
          <Text style={{ color: "#9a7a5a", fontSize: 13, marginTop: 8 }}>
            MSRP Starting at
          </Text>
          <Text
            style={{
              color: "#e87c00",
              fontSize: 30,
              fontWeight: "900",
              marginTop: 2,
            }}
          >
            {formatPrice(bike.price)}
          </Text>
          <Text
            style={{
              color: "#b0957a",
              fontSize: 14,
              lineHeight: 22,
              marginTop: 14,
            }}
          >
            {bike.description}
          </Text>

          {/* Stats */}
          <View style={{ flexDirection: "row", gap: 10, marginTop: 22 }}>
            <StatBox
              icon={
                <MaterialCommunityIcons
                  name="speedometer"
                  size={22}
                  color="#e87c00"
                />
              }
              label="TOP SPEED"
              value={bike.top_speed ?? "—"}
            />
            <StatBox
              icon={<Ionicons name="flash" size={22} color="#e87c00" />}
              label="TORQUE"
              value={bike.torque ?? "—"}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <StatBox
              icon={
                <FontAwesome5 name="weight-hanging" size={18} color="#e87c00" />
              }
              label="WEIGHT"
              value={bike.weight ?? "—"}
            />
            <StatBox
              icon={
                <MaterialCommunityIcons
                  name="engine"
                  size={22}
                  color="#e87c00"
                />
              }
              label="ENGINE"
              value={bike.engine ?? "—"}
            />
          </View>

          {/* Secure Your Build */}
          <View
            style={{
              backgroundColor: "#1e1200",
              borderRadius: 16,
              padding: 18,
              marginTop: 22,
              borderWidth: 1,
              borderColor: "#2e1a00",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "800" }}>
              Secure Your Build
            </Text>
            <Text
              style={{
                color: "#9a7a5a",
                fontSize: 13,
                marginTop: 4,
                marginBottom: 16,
              }}
            >
              Estimated delivery: 4-6 weeks · {bike.stock} in stock
            </Text>

            <TouchableOpacity
              onPress={handleAddToCart}
              disabled={addingToCart}
              activeOpacity={0.85}
              style={{
                backgroundColor: addingToCart ? "#a05500" : "#e87c00",
                borderRadius: 12,
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 10,
                shadowColor: "#e87c00",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 6,
              }}
            >
              <Ionicons name="cart" size={18} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "800",
                  letterSpacing: 1,
                }}
              >
                {addingToCart ? "ADDING..." : "ADD TO CART"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                borderWidth: 1,
                borderColor: "#3d2200",
                borderRadius: 12,
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Ionicons name="arrow-back" size={16} color="#9a7a5a" />
              <Text
                style={{
                  color: "#9a7a5a",
                  fontSize: 14,
                  fontWeight: "700",
                  letterSpacing: 0.5,
                }}
              >
                BACK TO BROWSE
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 14,
                paddingTop: 14,
                borderTopWidth: 1,
                borderTopColor: "#2e1a00",
              }}
            >
              <Text
                style={{
                  color: "#9a7a5a",
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 1,
                }}
              >
                SHARE GEAR
              </Text>
              <View style={{ flexDirection: "row", gap: 14 }}>
                <TouchableOpacity>
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color="#9a7a5a"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={20} color="#9a7a5a" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Engineering Highlights */}
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "900",
              letterSpacing: 1.5,
              marginTop: 28,
              marginBottom: 14,
            }}
          >
            ENGINEERING HIGHLIGHTS
          </Text>
          {ENGINEERING_HIGHLIGHTS.map((item) => (
            <View
              key={item.id}
              style={{
                borderRadius: 14,
                overflow: "hidden",
                marginBottom: 12,
                height: 160,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 14,
                  backgroundColor: "rgba(0,0,0,0.55)",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 15, fontWeight: "800" }}
                >
                  {item.title}
                </Text>
                <Text style={{ color: "#ccc", fontSize: 12, marginTop: 2 }}>
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </View>
  );
}
