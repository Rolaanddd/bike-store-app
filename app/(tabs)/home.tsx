import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BIKES, formatPrice, type Bike } from "./data/store";

const { width } = Dimensions.get("window");

// ─── Popular Bike Card ───────────────────────────────────────────
function PopularCard({ bike, onPress }: { bike: Bike; onPress: () => void }) {
  const [liked, setLiked] = useState(false);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        width: width * 0.62,
        backgroundColor: "#1e1200",
        borderRadius: 16,
        marginRight: 14,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#2e1a00",
      }}
    >
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: bike.image }}
          style={{ width: "100%", height: 180, resizeMode: "cover" }}
        />
        <TouchableOpacity
          onPress={() => setLiked(!liked)}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: liked ? "#e87c00" : "rgba(0,0,0,0.5)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={17}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 12 }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "800" }}>
          {bike.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 6,
          }}
        >
          <Text style={{ color: "#e87c00", fontSize: 15, fontWeight: "700" }}>
            {formatPrice(bike.price)}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="star" size={13} color="#e87c00" />
            <Text style={{ color: "#ccc", fontSize: 13 }}>{bike.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Grid Card ───────────────────────────────────────────────────
function GridCard({ bike, onPress }: { bike: Bike; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.88}
      style={{
        flex: 1,
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
        <Text
          style={{
            color: "#e87c00",
            fontSize: 13,
            fontWeight: "700",
            marginTop: 4,
          }}
        >
          {formatPrice(bike.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── List Card ───────────────────────────────────────────────────
function ListCard({ bike, onPress }: { bike: Bike; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.88}
      style={{
        flexDirection: "row",
        backgroundColor: "#1e1200",
        borderRadius: 14,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#2e1a00",
        marginHorizontal: 20,
        marginBottom: 10,
      }}
    >
      <Image
        source={{ uri: bike.image }}
        style={{ width: 110, height: 90, resizeMode: "cover" }}
      />
      <View style={{ flex: 1, padding: 12, justifyContent: "center" }}>
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
            fontSize: 14,
            fontWeight: "700",
            marginTop: 2,
          }}
        >
          {bike.name}
        </Text>
        <Text
          style={{
            color: "#e87c00",
            fontSize: 14,
            fontWeight: "700",
            marginTop: 4,
          }}
        >
          {formatPrice(bike.price)}
        </Text>
      </View>
      <View style={{ justifyContent: "center", paddingRight: 14 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
          <Ionicons name="star" size={12} color="#e87c00" />
          <Text style={{ color: "#ccc", fontSize: 12 }}>{bike.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const popularBikes = BIKES.filter((b) => b.popular);

  const goToDetail = (bike: Bike) => {
    router.push({ pathname: "/(tabs)/bike/[id]", params: { id: bike.id } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#111008" }}>
      <StatusBar barStyle="light-content" backgroundColor="#111008" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Hero Banner ── */}
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 18,
            overflow: "hidden",
            height: 200,
            marginTop: 52,
            marginBottom: 28,
          }}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
            }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.38)",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 18,
            }}
          >
            <Text
              style={{
                color: "#e87c00",
                fontSize: 12,
                fontWeight: "700",
                letterSpacing: 1,
              }}
            >
              NEW SEASON
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "900",
                lineHeight: 28,
                marginTop: 4,
              }}
            >
              Explore Top{"\n"}Motorcycles
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 12,
                backgroundColor: "#e87c00",
                borderRadius: 50,
                paddingHorizontal: 22,
                paddingVertical: 9,
                alignSelf: "flex-start",
              }}
              onPress={() => router.push("/(tabs)/all-bikes")}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: "800",
                  letterSpacing: 1,
                }}
              >
                VIEW ALL
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Popular Bikes ── */}
        <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 4,
            }}
          >
            <View>
              <Text style={{ color: "#fff", fontSize: 19, fontWeight: "800" }}>
                Popular Bikes
              </Text>
              <Text style={{ color: "#9a7a5a", fontSize: 13, marginTop: 2 }}>
                Trending this week
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(tabs)/all-bikes")}>
              <Text
                style={{
                  color: "#e87c00",
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 0.5,
                }}
              >
                SEE MORE
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 4,
            paddingTop: 10,
          }}
          style={{ marginBottom: 28 }}
        >
          {popularBikes.map((bike) => (
            <PopularCard
              key={bike.id}
              bike={bike}
              onPress={() => goToDetail(bike)}
            />
          ))}
        </ScrollView>

        {/* ── All Bikes ── */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingHorizontal: 20,
            marginBottom: 14,
          }}
        >
          <View>
            <Text style={{ color: "#fff", fontSize: 19, fontWeight: "800" }}>
              All Bikes
            </Text>
            <Text style={{ color: "#9a7a5a", fontSize: 13, marginTop: 2 }}>
              Browse our full inventory
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              onPress={() => setViewMode("grid")}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                backgroundColor: viewMode === "grid" ? "#e87c00" : "#1e1200",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#2e1a00",
              }}
            >
              <Ionicons
                name="grid-outline"
                size={16}
                color={viewMode === "grid" ? "#fff" : "#9a7a5a"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode("list")}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                backgroundColor: viewMode === "list" ? "#e87c00" : "#1e1200",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#2e1a00",
              }}
            >
              <Ionicons
                name="list-outline"
                size={16}
                color={viewMode === "list" ? "#fff" : "#9a7a5a"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {viewMode === "grid" ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 15,
              paddingBottom: 30,
            }}
          >
            {BIKES.map((bike) => (
              <View key={bike.id} style={{ width: "50%" }}>
                <GridCard bike={bike} onPress={() => goToDetail(bike)} />
              </View>
            ))}
          </View>
        ) : (
          <View style={{ paddingBottom: 30 }}>
            {BIKES.map((bike) => (
              <ListCard
                key={bike.id}
                bike={bike}
                onPress={() => goToDetail(bike)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
