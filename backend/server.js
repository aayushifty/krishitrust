// backend/server.js
// KrishiTrust Backend API Server - Sponsoring & Farmer Transit Platform
import express from 'express';
import cors from 'cors';
import { 
  corridors, 
  stakeholderAccounts,
  activeShipments, 
  initialCommunications,
  platformMetrics 
} from './data/nepalAgriData.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory state
let liveAccounts = JSON.parse(JSON.stringify(stakeholderAccounts));
let liveShipments = JSON.parse(JSON.stringify(activeShipments));
let liveCommunications = JSON.parse(JSON.stringify(initialCommunications));
let liveMetrics = { ...platformMetrics };

// Primary vehicle telemetry stream & recent frames
let recentCANFrames = [
  { timestamp: new Date(Date.now() - 4000).toISOString(), canId: '0x18FEF100', dlc: 8, data: '00 2A 00 00 00 00 00 00', name: 'Cruise Control/Vehicle Speed (CCVS) - 42.0 km/h' },
  { timestamp: new Date(Date.now() - 3000).toISOString(), canId: '0x18F00400', dlc: 8, data: 'F0 71 0E 00 00 00 00 00', name: 'Electronic Engine Controller 1 (EEC1) - 1820 RPM' },
  { timestamp: new Date(Date.now() - 2000).toISOString(), canId: '0x18FEE600', dlc: 8, data: 'A4 04 00 00 00 00 00 00', name: 'Time/Date & Road Shock Sensor - 0.28G' },
  { timestamp: new Date(Date.now() - 1000).toISOString(), canId: '0x18FEAE00', dlc: 8, data: '84 00 00 00 00 00 00 00', name: 'Reefer Cargo Compartment Temp - 4.8°C' }
];

let currentCANState = {
  vehiclePlate: 'BA 2 KHA 4812',
  corridor: 'Chitwan → Kathmandu (Prithvi Highway)',
  protocol: 'ISO 15765-4 (CAN 2.0B / 500 kbps)',
  busLoadPercent: 28.4,
  engineRpm: 1820,
  vehicleSpeedKmH: 42.0,
  throttlePositionPercent: 32,
  engineCoolantTempC: 87.0,
  cargoReeferTempC: 4.8,
  cargoHumidityPercent: 82.0,
  chassisVibrationG: 0.28,
  shockEventsPeakCount: 2,
  fuelFlowLitersPerHour: 7.2,
  status: 'Safe Transit',
  farmerProtected: true,
  liabilityAttribution: 'Farmer Protected (100% Insulated)',
  lastUpdated: new Date().toISOString()
};

// 1. Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'KrishiTrust Sponsoring & Transit Engine',
    version: '2.2.0',
    canGateway: { status: 'ONLINE', bitrate: '500 kbps' }
  });
});

// 2. Metrics
app.get('/api/metrics', (req, res) => {
  res.json({
    success: true,
    data: {
      ...liveMetrics,
      currentCANState
    }
  });
});

// 3. Login Authentication for 9 Stakeholders
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }

  const account = liveAccounts.find(
    a => a.email.toLowerCase() === email.toLowerCase().trim() && a.password === password.trim()
  );

  if (!account) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password. Please use one of the demo credentials provided.' 
    });
  }

  res.json({
    success: true,
    message: `Logged in as ${account.name}`,
    user: account
  });
});

// 4. Accounts List
app.get('/api/accounts', (req, res) => {
  const { category } = req.query;
  let accounts = liveAccounts;
  if (category) {
    accounts = accounts.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }
  res.json({
    success: true,
    count: accounts.length,
    data: accounts
  });
});

app.get('/api/accounts/:id', (req, res) => {
  const account = liveAccounts.find(a => a.id.toLowerCase() === req.params.id.toLowerCase());
  if (!account) {
    return res.status(404).json({ success: false, message: 'Account not found' });
  }
  res.json({ success: true, data: account });
});

// 5. Sponsor a Farmer (The Core Feature!)
app.post('/api/sponsor', (req, res) => {
  const { farmerId, sponsorName, amountNPR, sponsorMessage } = req.body;
  if (!farmerId || !amountNPR) {
    return res.status(400).json({ success: false, message: 'Farmer ID and amount are required' });
  }

  const farmer = liveAccounts.find(a => a.id === farmerId && a.category === 'Farmer');
  if (!farmer) {
    return res.status(404).json({ success: false, message: 'Farmer not found' });
  }

  const amount = Number(amountNPR);
  if (farmer.sponsorshipCampaign) {
    farmer.sponsorshipCampaign.raisedAmountNPR += amount;
    farmer.sponsorshipCampaign.sponsorsCount += 1;
    if (farmer.sponsorshipCampaign.raisedAmountNPR >= farmer.sponsorshipCampaign.goalAmountNPR) {
      farmer.sponsorshipCampaign.status = 'Fully Funded (100%)';
    } else {
      const pct = Math.round((farmer.sponsorshipCampaign.raisedAmountNPR / farmer.sponsorshipCampaign.goalAmountNPR) * 100);
      farmer.sponsorshipCampaign.status = `Active Campaign (${pct}% Funded)`;
    }
  }

  // Update total platform funded
  liveMetrics.totalFundsSponsoredNPR += amount;

  // Dispatch live notification
  const notifyMsg = {
    id: `MSG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    sender: sponsorName || 'Verified Sponsor',
    recipient: `${farmer.name} (Farmer)`,
    message: sponsorMessage || `Congratulations! You received a sponsorship of Rs. ${amount.toLocaleString('en-IN')} for your campaign: ${farmer.sponsorshipCampaign?.title}.`,
    type: 'Sponsorship Grant'
  };
  liveCommunications.unshift(notifyMsg);

  res.status(200).json({
    success: true,
    message: `Successfully sponsored Rs. ${amount.toLocaleString('en-IN')} to ${farmer.name}!`,
    farmer
  });
});

// 6. Corridors
app.get('/api/corridors', (req, res) => {
  res.json({ success: true, data: corridors });
});

// 7. Shipments
app.get('/api/shipments', (req, res) => {
  res.json({ success: true, count: liveShipments.length, data: liveShipments });
});

// 8. Communications Feed
app.get('/api/communications', (req, res) => {
  res.json({ success: true, count: liveCommunications.length, data: liveCommunications });
});

app.post('/api/communications', (req, res) => {
  const { sender, recipient, message, type } = req.body;
  if (!sender || !message) {
    return res.status(400).json({ success: false, message: 'Sender and message required' });
  }
  const newMsg = {
    id: `MSG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    sender,
    recipient: recipient || 'All Parties',
    message,
    type: type || 'Direct Message'
  };
  liveCommunications.unshift(newMsg);
  res.status(201).json({ success: true, data: newMsg });
});

// 9. Telemetry Endpoints (GET & POST Injection)
app.get('/api/telemetry/can', (req, res) => {
  res.json({ 
    success: true, 
    currentState: currentCANState,
    recentFrames: recentCANFrames 
  });
});

app.post('/api/telemetry/can', (req, res) => {
  const { speed, vibrationG, cargoReeferTempC, decodedName, canId, data } = req.body;
  
  if (speed !== undefined) currentCANState.vehicleSpeedKmH = Number(speed);
  if (vibrationG !== undefined) currentCANState.chassisVibrationG = Number(vibrationG);
  if (cargoReeferTempC !== undefined) currentCANState.cargoReeferTempC = Number(cargoReeferTempC);
  currentCANState.lastUpdated = new Date().toISOString();

  // If shock load is critical (> 0.6G), flag carrier/road fault and protect farmer
  if (currentCANState.chassisVibrationG > 0.6) {
    currentCANState.status = 'High Road Shock Alert';
    currentCANState.shockEventsPeakCount += 1;
    currentCANState.liabilityAttribution = 'Carrier/Road Fault (Farmer Insulated 100%)';
    
    // Auto-create alert
    const shockAlert = {
      id: `ALT-${Date.now()}`,
      severity: 'Warning',
      type: `Highway Vibration Spike (${currentCANState.chassisVibrationG}G)`,
      shipmentId: 'SHIP-001 (Chitwan Organic Tomatoes)',
      timestamp: new Date().toISOString(),
      message: `CAN bus detected ${currentCANState.chassisVibrationG}G chassis shock surge at Mugling sector. Vehicle speed: ${currentCANState.vehicleSpeedKmH} km/h. Decoupled protocol active: Farmer Bharat Sharma protected against spoilage deduction.`,
      location: 'Prithvi Highway Km 104',
      actionTaken: 'Driver notified; Carrier liability logged into Kalimati Mandi clearance cert'
    };
    liveAlerts.unshift(shockAlert);
  } else if (currentCANState.cargoReeferTempC > 8.0) {
    currentCANState.status = 'Reefer Excursion Alert';
    currentCANState.liabilityAttribution = 'Carrier Compressor Fault (Farmer Insulated 100%)';

    const tempAlert = {
      id: `ALT-${Date.now()}`,
      severity: 'Watch',
      type: `Cold-Chain Temperature Excursion (${currentCANState.cargoReeferTempC}°C)`,
      shipmentId: 'SHIP-002 (Pokhara Crisp Broccoli)',
      timestamp: new Date().toISOString(),
      message: `Reefer compartment temperature rose to ${currentCANState.cargoReeferTempC}°C (Target: 4-6°C). Automated compressor override initiated. Farmer Sita Gurung liability insulated.`,
      location: 'Malekhu Transit Corridor',
      actionTaken: 'Compressor boost active; underwriter notified'
    };
    liveAlerts.unshift(tempAlert);
  } else {
    currentCANState.status = 'Safe Transit';
    currentCANState.liabilityAttribution = 'Nominal Transit (Farmer Score 98%)';
  }

  // Add frame to recent log
  recentCANFrames.unshift({
    timestamp: new Date().toISOString(),
    canId: canId || '0x18F0090B',
    dlc: 8,
    data: data || 'A0 12 00 00 00 00 00 00',
    name: decodedName || `CAN Packet: Speed ${currentCANState.vehicleSpeedKmH} km/h, Shock ${currentCANState.chassisVibrationG}G`
  });
  if (recentCANFrames.length > 12) recentCANFrames.pop();

  res.json({
    success: true,
    currentState: currentCANState,
    recentFrames: recentCANFrames
  });
});

// Hackathon Judge & Demo Simulation Endpoint
app.post('/api/hackathon/simulate', (req, res) => {
  const { action } = req.body;

  if (action === 'shock') {
    currentCANState.chassisVibrationG = 1.84;
    currentCANState.vehicleSpeedKmH = 56;
    currentCANState.status = 'High Road Shock Alert';
    currentCANState.shockEventsPeakCount += 1;
    currentCANState.liabilityAttribution = 'Carrier/Road Fault (Farmer Insulated 100%)';
    const shockAlert = {
      id: `ALT-${Date.now()}`,
      severity: 'Warning',
      type: '1.84G Mugling Pothole Shock Surge',
      shipmentId: 'SHIP-001 (Chitwan Organic Tomatoes)',
      timestamp: new Date().toISOString(),
      message: 'Direct CAN bus extracted 1.84G shock. Carrier speed was 56 km/h on rough gravel bend. Decoupling protocol activated: Zero deduction applied to Farmer Bharat Sharma.',
      location: 'Mugling - Kurintar Sector',
      actionTaken: 'Carrier transit fault flagged; Farmer credit score insulated 100%'
    };
    liveAlerts.unshift(shockAlert);
    return res.json({ success: true, message: '1.84G Shock Injected - Farmer Liability Decoupled!', currentState: currentCANState });
  }

  if (action === 'reefer') {
    currentCANState.cargoReeferTempC = 9.8;
    currentCANState.status = 'Reefer Excursion Alert';
    currentCANState.liabilityAttribution = 'Reefer Compressor Fault (Carrier Liable)';
    const tempAlert = {
      id: `ALT-${Date.now()}`,
      severity: 'Watch',
      type: 'Cold-Chain Breach (9.8°C)',
      shipmentId: 'SHIP-002 (Pokhara Crisp Broccoli)',
      timestamp: new Date().toISOString(),
      message: 'Reefer container interior temperature spiked to 9.8°C on Prithvi highway uphill climb. Farmer Sita Gurung insulated from transit spoilage liability.',
      location: 'Malekhu Bridge Approach',
      actionTaken: 'Carrier cooling fault recorded; Insurance claim auto-verified'
    };
    liveAlerts.unshift(tempAlert);
    return res.json({ success: true, message: 'Cold-chain excursion injected (9.8°C) - Farmer Insulated!', currentState: currentCANState });
  }

  if (action === 'quick-sponsor') {
    const farmer = liveAccounts.find(a => a.id === 'acc-farmer-1');
    if (farmer && farmer.sponsorshipCampaign) {
      farmer.sponsorshipCampaign.raisedAmountNPR += 50000;
      farmer.sponsorshipCampaign.sponsorsCount += 1;
      const pct = Math.min(Math.round((farmer.sponsorshipCampaign.raisedAmountNPR / farmer.sponsorshipCampaign.goalAmountNPR) * 100), 100);
      farmer.sponsorshipCampaign.status = `Active Campaign (${pct}% Funded)`;
      liveMetrics.totalFundsSponsoredNPR += 50000;
      
      const notifyMsg = {
        id: `MSG-${Date.now()}`,
        timestamp: new Date().toISOString(),
        sender: 'Agricultural Development Bank (ADBL)',
        recipient: `${farmer.name} (Farmer)`,
        message: `Direct Micro-Grant of Rs. 50,000 disbursed for Polyhouse & Drip Irrigation Expansion based on 98% safe transit record!`,
        type: 'Sponsorship Grant'
      };
      liveCommunications.unshift(notifyMsg);
    }
    return res.json({ success: true, message: 'Rs. 50,000 Micro-Loan disbursed by ADBL to Bharat Sharma!', farmer });
  }

  if (action === 'reset') {
    currentCANState.chassisVibrationG = 0.28;
    currentCANState.vehicleSpeedKmH = 42;
    currentCANState.cargoReeferTempC = 4.8;
    currentCANState.status = 'Safe Transit';
    currentCANState.liabilityAttribution = 'Nominal Transit (Farmer Score 98%)';
    return res.json({ success: true, message: 'CAN Telemetry reset to baseline safe parameters.', currentState: currentCANState });
  }

  res.status(400).json({ success: false, message: 'Unknown action' });
});

// 10. Operational & Road Risk Alerts
const liveAlerts = [
  {
    id: 'ALT-101',
    severity: 'Warning',
    type: 'High Vibration Shock on Prithvi Highway',
    shipmentId: 'SHIP-001 (Chitwan Organic Tomatoes)',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    message: 'CAN accelerometer detected 1.8G vertical acceleration surge at Mugling bend. Fragile crate integrity maintained, driver advised to decrease speed.',
    location: 'Mugling - Kurintar Sector (Km 104)',
    actionTaken: 'CAN Telemetry alert dispatched to driver console; shock threshold recorded in transit audit'
  },
  {
    id: 'ALT-102',
    severity: 'Watch',
    type: 'Reefer Temp Fluctuation',
    shipmentId: 'SHIP-002 (Pokhara Crisp Broccoli)',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    message: 'Reefer container interior temperature climbed from 4.2°C to 5.8°C during uphill crawl before Malekhu due to ambient heat.',
    location: 'Malekhu Bridge Approach',
    actionTaken: 'Automated CAN compressor boost activated; temperature stabilized to 4.5°C within 8 mins'
  },
  {
    id: 'ALT-103',
    severity: 'Info',
    type: 'Transit Checkpoint Verified',
    shipmentId: 'SHIP-003 (Dhading Red Potatoes)',
    timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
    message: 'Shipment successfully passed Nagdhunga entry toll. Zero tamper flags, cargo humidity steady at 78%.',
    location: 'Nagdhunga Checkpost, Kathmandu Border',
    actionTaken: 'Chain-of-custody handoff confirmed to Kalimati wholesale cooperative'
  }
];

app.get('/api/alerts', (req, res) => {
  res.json({ success: true, count: liveAlerts.length, data: liveAlerts });
});

// 11. Transit Certificates & Loan Reports
const liveReports = [
  {
    id: 'REP-2026-001',
    title: 'Bharat Sharma - Tomato Transit Quality Audit',
    period: 'Chitwan-Kathmandu Corridor (Sept 2026)',
    beneficiary: 'Chitwan Smallholder Organic Cooperative',
    leadFarmer: 'Bharat Sharma (Chitwan)',
    partnerFinancialInstitution: 'Agricultural Development Bank (ADBL)',
    crop: 'Greenhouse Tomatoes (3.2 Tons)',
    issuedDate: '2026-09-18',
    totalShipmentsMonitored: 42,
    avgHandlingIntegrityScore: '98.4%',
    financialTrustScore: 96,
    creditGrade: 'Tier-A (Prime Uncollateralized)',
    spoilageLossRate: '1.2%',
    recommendedLoanLimitNPR: 500000,
    transitScore: '98.4%',
    damageRate: '1.2%',
    underwriter: 'Agricultural Development Bank (ADBL)',
    loanStatus: 'Approved & Active (Rs. 1,50,000)',
    verifiedBy: 'KrishiTrust Automated CAN Telemetry Ledger & ADBL Underwriting',
    summary: 'Direct CAN bus telemetry confirmed vehicle BA 2 KHA 4812 maintained reefer temperatures between 4°C - 6°C across the Chitwan-Kathmandu transit. Zero transit liability attributed to farmer.'
  },
  {
    id: 'REP-2026-002',
    title: 'Sita Gurung - Organic Cabbage Cold-Chain Audit',
    period: 'Pokhara-Kathmandu Corridor (Sept 2026)',
    beneficiary: 'Annapurna Organic Vegetable Cluster',
    leadFarmer: 'Sita Gurung (Pokhara)',
    partnerFinancialInstitution: 'Shikhar Agricultural Insurance',
    crop: 'Crisp Broccoli & Cabbage (2.8 Tons)',
    issuedDate: '2026-09-17',
    totalShipmentsMonitored: 38,
    avgHandlingIntegrityScore: '96.8%',
    financialTrustScore: 92,
    creditGrade: 'Tier-A (Claim-Free Facility)',
    spoilageLossRate: '1.8%',
    recommendedLoanLimitNPR: 350000,
    transitScore: '96.8%',
    damageRate: '1.8%',
    underwriter: 'Shikhar Agricultural Insurance',
    loanStatus: 'Claim-Free Certified (Rs. 2,00,000 Facility)',
    verifiedBy: 'KrishiTrust Automated CAN Telemetry Ledger & Shikhar Claims Bureau',
    summary: 'Pokhara-Kathmandu transit completed with minimal mechanical vibration shocks. Farmer liability completely insulated against road delays.'
  },
  {
    id: 'REP-2026-003',
    title: 'Balaram Karki - Seed Potato Transit Certificate',
    period: 'Dhading-Kalimati Corridor (Sept 2026)',
    beneficiary: 'Dhading Hillside Seed Producers Cooperative',
    leadFarmer: 'Balaram Karki (Dhading)',
    partnerFinancialInstitution: 'Sana Kisan Bikas Bank',
    crop: 'Certified Seed Potatoes (4.5 Tons)',
    issuedDate: '2026-09-16',
    totalShipmentsMonitored: 54,
    avgHandlingIntegrityScore: '99.1%',
    financialTrustScore: 98,
    creditGrade: 'Tier-A (Preferred Micro-Grant)',
    spoilageLossRate: '0.4%',
    recommendedLoanLimitNPR: 250000,
    transitScore: '99.1%',
    damageRate: '0.4%',
    underwriter: 'Sana Kisan Bikas Bank',
    loanStatus: 'Micro-Loan Disbursed (Rs. 2,50,000)',
    verifiedBy: 'KrishiTrust Automated CAN Telemetry Ledger & Sana Kisan Credit Dept',
    summary: 'Dhading hillside to Mandi transit recorded pristine humidity levels. 100% payout released directly to farmer cooperative.'
  }
];

app.get('/api/reports', (req, res) => {
  res.json({ success: true, count: liveReports.length, data: liveReports });
});

app.listen(PORT, () => {
  console.log(`[KrishiTrust Backend] Active on port ${PORT}`);
  console.log(`[KrishiTrust Backend] Login & Sponsoring system ready`);
});
