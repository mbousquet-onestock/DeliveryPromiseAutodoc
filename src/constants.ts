export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export const MOCK_ITEMS = [
  {
    id: "1001197600003",
    title: "NK Brake disc",
    price: 10.00,
    type: "Multi",
    image: "https://cdn.onestock-retail.com/assets/demo/automotive/11616466.jpg",
  },
  {
    id: "100110200000",
    title: "BILSTEIN - B6 Performance shock absorber",
    price: 76.00,
    type: "Multi",
    image: "https://cdn.onestock-retail.com/assets/demo/automotive/11610354.jpg",
  },
  {
    id: "100112340000",
    title: "Booster NOCO Genius GB70 2000 A 12V",
    price: 22.00,
    type: "Multi",
    image: "https://cdn.onestock-retail.com/assets/demo/automotive/11616240.jpg",
  },
  {
    id: "1001198400008",
    title: "EURASTEEL M5 spare wheel kit",
    price: 13.00,
    type: "Multi",
    image: "https://cdn.onestock-retail.com/assets/demo/automotive/11619090.jpg",
  },
  {
    id: "1001200100001",
    title: "Engine oil TOTAL Quartz Ineo ECS 5W30 P...",
    price: 22.00,
    type: "Multi",
    image: "https://cdn.onestock-retail.com/assets/demo/automotive/11607379.jpg",
  },
  {
    id: "100120010000",
    title: "VARTA SILVER dynamic Starter battery",
    price: 13.00,
    type: "Multi",
    image: "https://cdn.onestock-retail.com/assets/demo/automotive/11619392.jpg",
  }
];

export interface Route {
  to: string;
  cost: number;
  carbon: string;
  transitHours?: number;
  transitDays?: number;
  cutoffs?: string[];
  cutoff?: string;
  carrier?: string;
  direct?: boolean;
}

export interface Supplier {
  name: string;
  itemId: string | null;
  purchasePrice: number;
  routes: Route[];
}

export interface Hub {
  name: string;
  routes: Route[];
}

export const SUPPLIER_DATA: Supplier[] = [
  // Supplier 1
  {
    name: "Supplier 1",
    itemId: "1001197600003",
    purchasePrice: 10,
    routes: [
      { to: "Main Warehouse", cost: 2, carbon: "200g", transitHours: 6, cutoffs: ["11:00", "16:00", "20:00"] },
      { to: "Supplier 2", cost: 2.99, carbon: "200g", transitHours: 12, cutoffs: ["11:00", "16:00", "20:00"] },
    ]
  },
  {
    name: "Supplier 1",
    itemId: "1001198400008",
    purchasePrice: 9.5,
    routes: [
      { to: "Main Warehouse", cost: 2, carbon: "200g", transitHours: 6, cutoffs: ["11:00", "16:00", "20:00"] },
      { to: "Supplier 2", cost: 2.99, carbon: "200g", transitHours: 12, cutoffs: ["11:00", "16:00", "20:00"] },
    ]
  },
  {
    name: "Supplier 1",
    itemId: "100120010000",
    purchasePrice: 13,
    routes: [
      { to: "Main Warehouse", cost: 2, carbon: "200g", transitHours: 6, cutoffs: ["11:00", "16:00", "20:00"] },
      { to: "Supplier 2", cost: 2.99, carbon: "200g", transitHours: 12, cutoffs: ["11:00", "16:00", "20:00"] },
    ]
  },
  // Supplier 2
  {
    name: "Supplier 2",
    itemId: null,
    purchasePrice: 0,
    routes: [
      { to: "France", cost: 7.99, carbon: "500g", transitDays: 2, cutoff: "18:00", carrier: "UPS", direct: true }
    ]
  },
  {
    name: "Supplier 2",
    itemId: "100112340000",
    purchasePrice: 21,
    routes: [
      { to: "France", cost: 7.99, carbon: "500g", transitDays: 2, cutoff: "18:00", carrier: "UPS", direct: true }
    ]
  },
  {
    name: "Supplier 2",
    itemId: "1001198400008",
    purchasePrice: 12,
    routes: [
      { to: "France", cost: 7.99, carbon: "500g", transitDays: 2, cutoff: "18:00", carrier: "UPS", direct: true }
    ]
  },
  {
    name: "Supplier 2",
    itemId: "100120010000",
    purchasePrice: 14,
    routes: [
      { to: "France", cost: 7.99, carbon: "500g", transitDays: 2, cutoff: "18:00", carrier: "UPS", direct: true }
    ]
  },
  // Supplier 3
  {
    name: "Supplier 3",
    itemId: "1001197600003",
    purchasePrice: 11,
    routes: [
      { to: "Main Warehouse", cost: 0.99, carbon: "500g", transitHours: 12, cutoffs: ["11:00", "16:00", "20:00"] }
    ]
  },
  {
    name: "Supplier 3",
    itemId: "1001198400008",
    purchasePrice: 11,
    routes: [
      { to: "Main Warehouse", cost: 0.99, carbon: "500g", transitHours: 12, cutoffs: ["11:00", "16:00", "20:00"] }
    ]
  },
  {
    name: "Supplier 3",
    itemId: "1001200100001",
    purchasePrice: 22,
    routes: [
      { to: "Main Warehouse", cost: 0.99, carbon: "500g", transitHours: 12, cutoffs: ["11:00", "16:00", "20:00"] }
    ]
  },
  // Main Warehouse as Supplier
  {
    name: "Main Warehouse",
    itemId: "100110200000",
    purchasePrice: 76,
    routes: [
      { to: "France", cost: 9.99, carbon: "500g", transitDays: 2, cutoff: "18:00", carrier: "UPS", direct: true },
      { to: "Germany", cost: 7.99, carbon: "500g", transitDays: 1, cutoff: "18:00", carrier: "UPS", direct: true },
      { to: "Italy", cost: 9.99, carbon: "500g", transitDays: 3, cutoff: "18:00", carrier: "UPS", direct: true },
    ]
  },
  {
    name: "Main Warehouse",
    itemId: "100112340000",
    purchasePrice: 22,
    routes: [
      { to: "France", cost: 9.99, carbon: "500g", transitDays: 2, cutoff: "18:00", carrier: "UPS", direct: true },
      { to: "Germany", cost: 7.99, carbon: "500g", transitDays: 1, cutoff: "18:00", carrier: "UPS", direct: true },
      { to: "Italy", cost: 9.99, carbon: "500g", transitDays: 3, cutoff: "18:00", carrier: "UPS", direct: true },
    ]
  },
  {
    name: "Main Warehouse",
    itemId: "1001198400008",
    purchasePrice: 13,
    routes: [
      { to: "France", cost: 9.99, carbon: "500g", transitDays: 2, cutoff: "18:00", carrier: "UPS", direct: true },
      { to: "Germany", cost: 7.99, carbon: "500g", transitDays: 1, cutoff: "18:00", carrier: "UPS", direct: true },
      { to: "Italy", cost: 9.99, carbon: "500g", transitDays: 3, cutoff: "18:00", carrier: "UPS", direct: true },
    ]
  }
];

export const HUB_DATA: Hub[] = [
  {
    name: "Main Warehouse",
    routes: [
      { to: "France", cost: 9.99, carbon: "500g", transitDays: 2, cutoff: "18:00", carrier: "UPS" },
      { to: "Germany", cost: 7.99, carbon: "500g", transitDays: 1, cutoff: "18:00", carrier: "UPS" },
      { to: "Italy", cost: 9.99, carbon: "500g", transitDays: 3, cutoff: "18:00", carrier: "UPS" },
    ]
  }
];
