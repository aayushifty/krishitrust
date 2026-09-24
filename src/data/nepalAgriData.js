// backend/data/nepalAgriData.js
// KrishiTrust - Agricultural Sponsoring, Transit Verification & Farmer Credit Platform

export const corridors = [
  {
    id: 'corridor-central',
    name: 'Central Agri Corridor (Prithvi Highway)',
    origin: 'Bharatpur, Chitwan',
    destination: 'Kalimati Vegetable Market, Kathmandu',
    distanceKm: 148,
    highway: 'Prithvi Highway',
    primaryCrops: ['Fresh Tomatoes', 'Bananas'],
    typicalTransitHours: 5.5,
    riskZone: 'Mugling - Kurintar (Rough Mountain Section)',
    waypoints: [
      { name: 'Bharatpur Farm Depot', coords: [27.6833, 84.4333] },
      { name: 'Ramnagar Checkpoint', coords: [27.7125, 84.4480] },
      { name: 'Mugling Junction', coords: [27.8597, 84.5556] },
      { name: 'Kurintar Weigh Bridge', coords: [27.8760, 84.6050] },
      { name: 'Malekhu River Crossing', coords: [27.8100, 84.8250] },
      { name: 'Galchhi Interchange', coords: [27.7830, 85.0120] },
      { name: 'Nagdhunga Valley Gate', coords: [27.6975, 85.2210] },
      { name: 'Kalimati Wholesale Market', coords: [27.6980, 85.3020] }
    ]
  },
  {
    id: 'corridor-western',
    name: 'Western Agri Corridor (Pokhara Highway)',
    origin: 'Pokhara Valley, Kaski',
    destination: 'Balkhu Market, Kathmandu',
    distanceKm: 204,
    highway: 'Prithvi Highway (NH04)',
    primaryCrops: ['Snow White Cauliflower', 'Cabbage', 'Organic Herbs'],
    typicalTransitHours: 6.8,
    riskZone: 'Dumre Road Repair Segment',
    waypoints: [
      { name: 'Pokhara Farmers Hub', coords: [28.2096, 83.9856] },
      { name: 'Kotre Post', coords: [28.1150, 84.0950] },
      { name: 'Damauli Bazaar', coords: [27.9730, 84.2810] },
      { name: 'Dumre Junction', coords: [27.9860, 84.4250] },
      { name: 'Mugling Transit', coords: [27.8597, 84.5556] },
      { name: 'Naubise', coords: [27.7160, 85.1950] },
      { name: 'Balkhu Market', coords: [27.6870, 85.2950] }
    ]
  },
  {
    id: 'corridor-mountain',
    name: 'Mountain Vegetable Corridor (Dhading)',
    origin: 'Benighat, Dhading',
    destination: 'Kalimati Terminal, Kathmandu',
    distanceKm: 82,
    highway: 'Prithvi Highway Link',
    primaryCrops: ['Red Potatoes', 'Ginger', 'Chili'],
    typicalTransitHours: 3.2,
    riskZone: 'Baireni Gradient',
    waypoints: [
      { name: 'Benighat Depot', coords: [27.8030, 84.7890] },
      { name: 'Gajuri Center', coords: [27.7950, 84.8780] },
      { name: 'Baireni Post', coords: [27.7850, 84.9540] },
      { name: 'Khanikhola Gate', coords: [27.7080, 85.2010] },
      { name: 'Kalimati Terminal', coords: [27.6980, 85.3020] }
    ]
  },
  {
    id: 'corridor-terai',
    name: 'Southern Terai Produce Corridor',
    origin: 'Birgunj Mandi, Parsa',
    destination: 'Kathmandu Wholesale Centers',
    distanceKm: 138,
    highway: 'Tribhuvan Highway',
    primaryCrops: ['Maldah Mangoes', 'Pulses', 'Mustard'],
    typicalTransitHours: 4.5,
    riskZone: 'Bhainse Hill Ascent',
    waypoints: [
      { name: 'Birgunj Depot', coords: [27.0128, 84.8774] },
      { name: 'Simara Cargo Hub', coords: [27.1620, 84.9750] },
      { name: 'Hetauda Bypass', coords: [27.4287, 85.0322] },
      { name: 'Bhainse Ascent', coords: [27.5250, 85.0850] },
      { name: 'Tikabhairab Transit', coords: [27.5990, 85.3120] },
      { name: 'Koteshwor Terminal', coords: [27.6770, 85.3480] }
    ]
  }
];

// 9 Stakeholder Accounts with complete Login ID & Passwords
export const stakeholderAccounts = [
  // 1. Farmers (Seeking Sponsorship / Loans)
  {
    id: 'farmer-bharat',
    email: 'bharat@krishitrust.com',
    password: 'kisan123',
    category: 'Farmer',
    role: 'Lead Farmer & Cooperative Head',
    name: 'Bharat Sharma',
    organization: 'Chitwan Kisan Bachat & Krishi Sahakari',
    kisanId: 'NP-CH-0941',
    district: 'Bharatpur, Chitwan',
    phone: '+977-9845012345',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    farmImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80',
    produceTypes: ['Srijana Hybrid Tomatoes', 'Malbhog Bananas'],
    activeShipmentId: 'KT-2026-N081',
    reliabilityScore: 94,
    sponsorshipCampaign: {
      title: 'Polyhouse & Drip Irrigation Expansion',
      goalAmountNPR: 500000,
      raisedAmountNPR: 380000,
      sponsorsCount: 3,
      neededFor: 'Installing climate-safe greenhouse polyhouses and solar drip irrigation for 15 smallholder families in Bharatpur.',
      status: 'Active Campaign (76% Funded)',
      verifiedTransitBatches: 18,
      spoilageRate: '1.2% (Very Low)'
    }
  },
  {
    id: 'farmer-sita',
    email: 'sita@krishitrust.com',
    password: 'kisan123',
    category: 'Farmer',
    role: 'Organic Vegetable Producer',
    name: 'Sita Gurung',
    organization: 'Kaski Organic Growers Consortium',
    kisanId: 'NP-KS-0322',
    district: 'Pokhara Valley, Kaski',
    phone: '+977-9806123456',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    farmImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
    produceTypes: ['Snow White Cauliflower', 'Broccoli', 'Organic Herbs'],
    activeShipmentId: 'KT-2026-N082',
    reliabilityScore: 88,
    sponsorshipCampaign: {
      title: 'Solar Cold-Storage Room at Farmgate',
      goalAmountNPR: 350000,
      raisedAmountNPR: 210000,
      sponsorsCount: 2,
      neededFor: 'Building a community solar precooling chamber so harvested vegetables stay fresh before highway transit to Kathmandu.',
      status: 'Active Campaign (60% Funded)',
      verifiedTransitBatches: 12,
      spoilageRate: '2.4% (Certified Organic)'
    }
  },
  {
    id: 'farmer-balaram',
    email: 'balaram@krishitrust.com',
    password: 'kisan123',
    category: 'Farmer',
    role: 'Highland Root Crop Specialist',
    name: 'Balaram Karki',
    organization: 'Dhading Krisak Vikas Sahakari',
    kisanId: 'NP-DH-1108',
    district: 'Benighat, Dhading',
    phone: '+977-9818901234',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    farmImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    produceTypes: ['Dhading Red Potatoes', 'Hill Ginger', 'Chili'],
    activeShipmentId: 'KT-2026-N083',
    reliabilityScore: 96,
    sponsorshipCampaign: {
      title: 'High-Yield Potato Seeds & Reusable Crates',
      goalAmountNPR: 200000,
      raisedAmountNPR: 200000,
      sponsorsCount: 4,
      neededFor: 'Replacing plastic sacks with reusable cushioned crates to eliminate potato bruising along the Prithvi Highway.',
      status: 'Fully Funded (100%)',
      verifiedTransitBatches: 24,
      spoilageRate: '0.8% (Top Performer)'
    }
  },

  // 2. Transporters & Commercial Drivers
  {
    id: 'driver-ramesh',
    email: 'ramesh@krishitrust.com',
    password: 'driver123',
    category: 'Transporter',
    role: 'Commercial Fleet Driver',
    name: 'Ramesh Shrestha',
    organization: 'Himalayan Cold Logistics',
    vehiclePlate: 'BA 2 KHA 4812',
    phone: '+977-9841289301',
    district: 'Kathmandu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    vehicleImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=80',
    assignedShipmentId: 'KT-2026-N081',
    driverScore: 92,
    driverMetrics: {
      tripsCompleted: 48,
      avgHighwaySpeed: '42 km/h',
      temperatureCompliance: '99.4%',
      safetyBonusEarnedNPR: 24000
    }
  },
  {
    id: 'driver-hari',
    email: 'hari@krishitrust.com',
    password: 'driver123',
    category: 'Transporter',
    role: 'Freight Truck Operator',
    name: 'Hari Thapa',
    organization: 'Annapurna Valley Freight',
    vehiclePlate: 'GA 1 KHA 9180',
    phone: '+977-9803112455',
    district: 'Pokhara',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    vehicleImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&auto=format&fit=crop&q=80',
    assignedShipmentId: 'KT-2026-N082',
    driverScore: 86,
    driverMetrics: {
      tripsCompleted: 36,
      avgHighwaySpeed: '38 km/h',
      temperatureCompliance: '96.2%',
      safetyBonusEarnedNPR: 18500
    }
  },
  {
    id: 'driver-sunil',
    email: 'sunil@krishitrust.com',
    password: 'driver123',
    category: 'Transporter',
    role: 'Reefer Truck Operator',
    name: 'Sunil Chaudhary',
    organization: 'Nepal Refrigerated Lines',
    vehiclePlate: 'NA 5 KHA 3120',
    phone: '+977-9865091223',
    district: 'Birgunj',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    vehicleImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
    assignedShipmentId: 'KT-2026-N084',
    driverScore: 80,
    driverMetrics: {
      tripsCompleted: 28,
      avgHighwaySpeed: '32 km/h',
      temperatureCompliance: '89.0%',
      safetyBonusEarnedNPR: 12000
    }
  },

  // 3. Sponsors, Microfinance & Insurance Institutions
  {
    id: 'sponsor-adbl',
    email: 'adbl@krishitrust.com',
    password: 'sponsor123',
    category: 'Sponsor',
    role: 'Chief Microfinance Officer',
    name: 'Agricultural Development Bank (ADBL)',
    leadOfficer: 'Prakash Adhikari',
    organization: 'ADBL Smallholder Agri-Lending Division',
    district: 'Kathmandu Central Office',
    phone: '+977-01-4262881',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    sponsorMetrics: {
      totalFundNPR: 5000000,
      allocatedFundNPR: 3450000,
      activeFarmersSponsored: 18,
      repaymentRate: '99.8%',
      focusArea: 'Collateral-free seasonal loans for verified produce cooperatives.'
    }
  },
  {
    id: 'sponsor-shikhar',
    email: 'shikhar@krishitrust.com',
    password: 'sponsor123',
    category: 'Sponsor',
    role: 'Agri-Insurance Director',
    name: 'Shikhar Agricultural Insurance',
    leadOfficer: 'Bina Manandhar',
    organization: 'Shikhar Insurance Co. Ltd.',
    district: 'Kathmandu',
    phone: '+977-01-4246101',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80',
    sponsorMetrics: {
      totalFundNPR: 3000000,
      allocatedFundNPR: 1800000,
      activeFarmersSponsored: 12,
      repaymentRate: '100%',
      focusArea: 'Automated transit insurance shields that pay farmers immediately if cargo spoils on the road.'
    }
  },
  {
    id: 'sponsor-sanakisan',
    email: 'sanakisan@krishitrust.com',
    password: 'sponsor123',
    category: 'Sponsor',
    role: 'Cooperative Sponsorship Lead',
    name: 'Sana Kisan Bikas Bank',
    leadOfficer: 'Nabin Silwal',
    organization: 'Small Farmers Development Bank',
    district: 'Kathmandu / Chitwan Desks',
    phone: '+977-01-4412389',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    sponsorMetrics: {
      totalFundNPR: 2500000,
      allocatedFundNPR: 1500000,
      activeFarmersSponsored: 9,
      repaymentRate: '99.5%',
      focusArea: 'Matching grants and low-interest equipment loans for vegetable growers.'
    }
  }
];

// Active Produce Shipments with simple, clear details
export const activeShipments = [
  {
    id: 'KT-2026-N081',
    batchCode: 'LOT-CHIT-TOM-812',
    crop: 'Fresh Hybrid Tomatoes',
    farmerId: 'farmer-bharat',
    farmerName: 'Bharat Sharma (Chitwan)',
    driverId: 'driver-ramesh',
    driverName: 'Ramesh Shrestha',
    vehiclePlate: 'BA 2 KHA 4812',
    sponsorId: 'sponsor-adbl',
    origin: 'Bharatpur, Chitwan',
    destination: 'Kalimati Market, Kathmandu',
    corridorId: 'corridor-central',
    cargoWeightKg: 2450,
    currentSpeedKmH: 42,
    currentTempC: 13.2,
    status: 'On the Road (Smooth Transit)',
    progressPercent: 68,
    currentLocationName: 'Near Kurintar, Prithvi Highway',
    reliabilityScore: 94,
    simpleCheckVerdict: 'Produce is safe and cool. Zero delay. Farmer loan approved.'
  },
  {
    id: 'KT-2026-N082',
    batchCode: 'LOT-POKH-CAUL-419',
    crop: 'Snow White Cauliflower',
    farmerId: 'farmer-sita',
    farmerName: 'Sita Gurung (Pokhara)',
    driverId: 'driver-hari',
    driverName: 'Hari Thapa',
    vehiclePlate: 'GA 1 KHA 9180',
    sponsorId: 'sponsor-shikhar',
    origin: 'Pokhara Valley, Kaski',
    destination: 'Balkhu Market, Kathmandu',
    corridorId: 'corridor-western',
    cargoWeightKg: 1800,
    currentSpeedKmH: 38,
    currentTempC: 8.5,
    status: 'On the Road (Caution on Rough Patch)',
    progressPercent: 55,
    currentLocationName: 'Approaching Mugling Bridge',
    reliabilityScore: 88,
    simpleCheckVerdict: 'Driver slowed down for rough road. Produce packaging intact.'
  },
  {
    id: 'KT-2026-N083',
    batchCode: 'LOT-DHAD-POT-102',
    crop: 'Dhading Red Potatoes',
    farmerId: 'farmer-balaram',
    farmerName: 'Balaram Karki (Dhading)',
    driverId: 'driver-ramesh',
    driverName: 'Bikash Tamang',
    vehiclePlate: 'BA 3 KHA 2241',
    sponsorId: 'sponsor-adbl',
    origin: 'Benighat, Dhading',
    destination: 'Kalimati Terminal, Kathmandu',
    corridorId: 'corridor-mountain',
    cargoWeightKg: 3200,
    currentSpeedKmH: 0,
    currentTempC: 18.1,
    status: 'Delivered Successfully',
    progressPercent: 100,
    currentLocationName: 'Kalimati Dock Gate 4',
    reliabilityScore: 96,
    simpleCheckVerdict: 'Delivered with 0 damage. Full payment released to farmer.'
  },
  {
    id: 'KT-2026-N084',
    batchCode: 'LOT-BIRG-MANG-508',
    crop: 'Maldah Export Mangoes',
    farmerId: 'farmer-bharat',
    farmerName: 'Md. Aslam Ansari (Parsa)',
    driverId: 'driver-sunil',
    driverName: 'Sunil Chaudhary',
    vehiclePlate: 'NA 5 KHA 3120',
    sponsorId: 'sponsor-shikhar',
    origin: 'Birgunj Mandi, Parsa',
    destination: 'Balkhu Fruit Market, Kathmandu',
    corridorId: 'corridor-terai',
    cargoWeightKg: 2900,
    currentSpeedKmH: 26,
    currentTempC: 14.1,
    status: 'Temperature Warning (Cooling Cut)',
    progressPercent: 78,
    currentLocationName: 'Bhainse Hill Road',
    reliabilityScore: 82,
    simpleCheckVerdict: 'Truck cooling unit lost power. Insurance covers loss so farmer is protected.'
  }
];

// Live Platform Sponsorship & Summary Metrics
export const platformMetrics = {
  totalFarmersHelped: 184,
  totalFundsSponsoredNPR: 6750000,
  activeShipmentsCount: 3,
  avgTransitSafeScore: 92,
  cropLossPreventedPercent: 68,
  participatingCooperatives: 26,
  partnerSponsorsList: [
    'Agricultural Development Bank (ADBL)',
    'Shikhar Agricultural Insurance',
    'Sana Kisan Bikas Bank'
  ]
};

// Simple Coordination Messages Feed
export const initialCommunications = [
  {
    id: 'MSG-01',
    timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    sender: 'Agricultural Development Bank (ADBL)',
    recipient: 'Bharat Sharma (Chitwan Farmer)',
    message: 'Namaste Bharat-ji, your tomato transit was verified safe (94% score). Your sponsorship loan of Rs. 3,80,000 has been approved.',
    type: 'Sponsorship Approved'
  },
  {
    id: 'MSG-02',
    timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    sender: 'Ramesh Shrestha (Driver, BA 2 KHA 4812)',
    recipient: 'Bharat Sharma (Farmer)',
    message: 'Road past Kurintar is clear. Crate cooling temperature is steady at 13.2°C. Arrival in Kathmandu around 8:30 PM.',
    type: 'Transit Update'
  },
  {
    id: 'MSG-03',
    timestamp: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    sender: 'Shikhar Agricultural Insurance',
    recipient: 'Sunil Chaudhary (Driver, NA 5 KHA 3120)',
    message: 'Alert: Reefer temperature rose above 14°C on Bhainse hill. Driver notified to restart cooling. Farmer is protected from penalty.',
    type: 'Safety Alert'
  }
];
