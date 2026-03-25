import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { fetchBikes, formatPrice, type Bike } from "../../services/api";

const CATEGORIES = ["ALL", "SPORT", "CRUISER", "OFFROAD", "CITY", "TOURING"];

export default function AllBikesScreen() {
  const router = useRouter();
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    loadBikes();
  }, [activeCategory]);

  const loadBikes = async () => {
    setLoading(true);
    try {
      const data = await fetchBikes({
        category: activeCategory === "ALL" ? undefined : activeCategory,
      });
      setBikes(data);
    } catch (err) {
      console.error("Failed to load bikes:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = bikes.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#111008" }}>
      <StatusBar barStyle="light-content" backgroundColor="#111008" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Search ── */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1e1200",
            borderRadius: 50,
            marginHorizontal: 20,
            paddingHorizontal: 16,
            height: 48,
            borderWidth: 1,
            borderColor: "#2e1a00",
            marginTop: 52,
            marginBottom: 18,
          }}
        >
          <Ionicons
            name="search-outline"
            size={18}
            color="#9a7a5a"
            style={{ marginRight: 10 }}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search bikes..."
            placeholderTextColor="#5a4030"
            style={{ flex: 1, color: "#fff", fontSize: 14 }}
          />
        </View>

        {/* ── Category Chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            gap: 8,
            marginBottom: 20,
          }}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 50,
                backgroundColor: activeCategory === cat ? "#e87c00" : "#1e1200",
                borderWidth: 1,
                borderColor: activeCategory === cat ? "#e87c00" : "#2e1a00",
              }}
            >
              <Text
                style={{
                  color: activeCategory === cat ? "#fff" : "#9a7a5a",
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 0.5,
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Title ── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "800" }}>
            All Bikes
          </Text>
          <Text style={{ color: "#9a7a5a", fontSize: 13, marginTop: 3 }}>
            {loading ? "Loading..." : `${filtered.length} bikes found`}
          </Text>
        </View>

        {/* ── Grid ── */}
        {loading ? (
          <View style={{ alignItems: "center", paddingVertical: 60 }}>
            <ActivityIndicator size="large" color="#e87c00" />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 15,
              paddingBottom: 30,
            }}
          >
            {filtered.map((bike) => (
              <View key={bike.id} style={{ width: "50%" }}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/bike/[id]",
                      params: { id: bike.id },
                    })
                  }
                  activeOpacity={0.88}
                  style={{
                    backgroundColor: "#1e1200",
                    borderRadius: 14,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#2e1a00",
                    margin: 5,
                  }}
                >
                  <Image
                    source={{ uri: bike.image }}
                    style={{ width: "100%", height: 130, resizeMode: "cover" }}
                  />
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        color: "#9a7a5a",
                        fontSize: 10,
                        fontWeight: "700",
                        letterSpacing: 1,
                      }}
                    >
                      {bike.category}
                    </Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: "700",
                        marginTop: 3,
                      }}
                    >
                      {bike.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: "#e87c00",
                          fontSize: 13,
                          fontWeight: "700",
                        }}
                      >
                        {formatPrice(bike.price)}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <Ionicons name="star" size={11} color="#e87c00" />
                        <Text style={{ color: "#ccc", fontSize: 11 }}>
                          {bike.rating}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
