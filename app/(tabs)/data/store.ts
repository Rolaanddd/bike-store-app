// data/store.ts
// Central hardcoded data for MotoDrive app

export type Bike = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  series?: string;
  description?: string;
  topSpeed?: string;
  torque?: string;
  weight?: string;
  engine?: string;
  popular?: boolean;
};

export const BIKES: Bike[] = [
  {
    id: "1",
    name: "Apex RS 1000",
    category: "SPORT",
    price: 18450,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80",
    series: "HYPER-SPORT SERIES",
    description:
      "Experience the pinnacle of urban engineering. The Apex RS 1000 combines a 1000cc performance engine with a carbon-fiber frame for unmatched agility and raw power. Designed for those who demand authority on the pavement.",
    topSpeed: "185 MPH",
    torque: "115 NM",
    weight: "412 LBS",
    engine: "V-TWIN",
    popular: true,
  },
  {
    id: "2",
    name: "Night Rider 750",
    category: "CRUISER",
    price: 12900,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    series: "DARK SERIES",
    description:
      "The Night Rider 750 is built for those who own the road after dark. A 750cc twin-cylinder engine wrapped in blacked-out chrome delivers both presence and performance.",
    topSpeed: "145 MPH",
    torque: "95 NM",
    weight: "480 LBS",
    engine: "PARALLEL TWIN",
    popular: true,
  },
  {
    id: "3",
    name: "Thunder TR 450",
    category: "OFFROAD",
    price: 9200,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80",
    series: "TRAIL SERIES",
    description:
      "Dominate any terrain with the Thunder TR 450. Built with long-travel suspension and a high-torque 450cc single, this machine laughs at dirt, rocks, and everything in between.",
    topSpeed: "95 MPH",
    torque: "48 NM",
    weight: "265 LBS",
    engine: "SINGLE",
    popular: false,
  },
  {
    id: "4",
    name: "Volt Urban X",
    category: "CITY",
    price: 4800,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
    series: "URBAN SERIES",
    description:
      "The Volt Urban X is your perfect city companion. Lightweight, agile, and stylish — this electric-powered scooter cuts through traffic while keeping your carbon footprint at zero.",
    topSpeed: "75 MPH",
    torque: "40 NM",
    weight: "195 LBS",
    engine: "ELECTRIC",
    popular: false,
  },
  {
    id: "5",
    name: "Glider GT Ultra",
    category: "TOURING",
    price: 22500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80",
    series: "GRAND TOURING SERIES",
    description:
      "Built for the long haul. The Glider GT Ultra features a 1800cc boxer engine, full-dress touring fairing, and integrated navigation for those who ride thousands of miles without compromise.",
    topSpeed: "155 MPH",
    torque: "135 NM",
    weight: "890 LBS",
    engine: "BOXER TWIN",
    popular: false,
  },
  {
    id: "6",
    name: "Shadow R1 Extreme",
    category: "SPORT",
    price: 15700,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=600&q=80",
    series: "SHADOW SERIES",
    description:
      "Track-bred DNA meets street legality. The Shadow R1 Extreme packs a 998cc inline-four engine with MotoGP-derived aerodynamics into a machine that blurs the line between race bike and road bike.",
    topSpeed: "190 MPH",
    torque: "113 NM",
    weight: "395 LBS",
    engine: "INLINE-4",
    popular: false,
  },
  {
    id: "7",
    name: "Vulcan Overlord X",
    category: "CRUISER",
    price: 24999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=600&q=80",
    series: "HYPER-SPORT SERIES",
    description:
      "Experience the pinnacle of urban engineering. The Overlord X combines a 1200cc performance engine with a carbon-fiber frame for unmatched agility and raw power. Designed for those who demand authority on the pavement.",
    topSpeed: "185 MPH",
    torque: "115 NM",
    weight: "412 LBS",
    engine: "V-TWIN",
    popular: false,
  },
];

export type CartItem = {
  bike: Bike;
  quantity: number;
  variant: string;
};

export const INITIAL_CART: CartItem[] = [
  { bike: BIKES[0], quantity: 1, variant: "Matte Black • 1000cc" },
  { bike: BIKES[4], quantity: 1, variant: "Pearl White • 1800cc" },
];

export const ENGINEERING_HIGHLIGHTS = [
  {
    id: "eh1",
    title: "Titanium Exhaust",
    subtitle: "Heat-treated lightweight...",
    image:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&q=80",
  },
  {
    id: "eh2",
    title: "Digital Cockpit",
    subtitle: "Full-color TFT display with HUD...",
    image:
      "https://images.unsplash.com/photo-1558980394-4c7304d9c052?w=400&q=80",
  },
];

export const formatPrice = (price: number) =>
  "$" + price.toLocaleString("en-US");
