# 🌾 KrishiTrust (कृषि ट्रष्ट)

<p align="center">
  <a href="https://krishitrust.vercel.app/"><img src="https://img.shields.io/badge/Live_Portal-krishitrust.vercel.app-10b981?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/CAN_2.0B-J1939-F59E0B?style=for-the-badge" alt="CAN Bus" />
  <img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  <b>Decoupling transit risk from farmer livelihoods through verifiable IoT telematics & transparent micro-sponsorship.</b><br />
  Empowering Nepali smallholders along the Prithvi Highway and mountain agricultural corridors.
</p>

<p align="center">
  👉 <a href="https://krishitrust.vercel.app/"><b>Explore the KrishiTrust Live Portal &rarr;</b></a>
</p>

---

## 🌻 The Human Story Behind KrishiTrust

In the fertile terraces of Chitwan, Dhading, and the Pokhara Valley, smallholder farmers pour their hearts into growing fresh tomatoes, organic cauliflowers, and seasonal crops. 

Yet their greatest vulnerability begins the moment their harvest leaves the farmgate. 

Along Nepal's treacherous highways (like the landslide-prone Prithvi Highway), refrigerated trucks face frequent breakdowns, harsh road vibrations, and prolonged traffic halts. Traditionally, when produce arrives spoiled or bruised at wholesale markets like Kalimati, **the smallholder farmer bears 100% of the financial loss**. Farmers who produced flawless harvest find their payments slashed through no fault of their own.

**KrishiTrust was built to change this reality.**

By combining **on-vehicle CAN-bus telemetry (J1939 ECU monitoring)** with **verifiable transit logging and micro-lending**, KrishiTrust objectively attributes damage to where it actually happened. If a refrigeration compressor fails or a vehicle suffers extreme road shocks in transit, the farmer is completely insulated from liability.

---

## 🚀 Core Features

### 1. 🛡️ Real-Time Liability Decoupling
- **Cold-Chain & Shock Auditing**: Monitors cargo compartment temperature, humidity, and 3-axis chassis vibration (G-force) in real time.
- **Smart Fault Attribution**: Automatically separates farmgate quality from in-transit mechanical failures. Farmers receive their full promised earnings, while carrier insurance handles transit breakdowns.

### 2. 🤝 Transparent Farmer Micro-Sponsoring
- Direct peer-to-peer and diaspora sponsorship marketplace.
- Verified smallholders (like Bharat Sharma in Chitwan or Sita Gurung in Pokhara) receive transparent seasonal working capital without predatory middlemen loan rates.
- Sponsors track crop growth milestones, harvest dates, and transit journeys live on the map.

### 3. 🗺️ Live Mountain Corridor GIS Map
- Real-time tracking of active agricultural shipments navigating the Prithvi Highway, Western Corridor, and Mountain feeder roads.
- Waypoint-by-waypoint risk index alerting drivers and cooperatives before entering vulnerable landslide or congestion zones.

### 4. 👥 Multi-Stakeholder Unified Portal
Built for every participant in the agricultural ecosystem:
- **Farmers**: Harvest batch registration, verifiable credit scores, and instant payment protection.
- **Fleet Operators / Drivers**: Vehicle telematics diagnostics, trip performance logs, and cold-chain compliance proof.
- **Cooperative Leads & Buyers**: Automated digital gate receipts and transparent quality audits.
- **Sponsors & Financial Institutions**: Low-risk agricultural lending backed by verifiable telemetry data.

### 5. 🎯 Interactive 3D Hackathon Presentation Deck
- Built-in presentation engine accessible via the `/presentation` route or press `Alt + P` / `Ctrl + Shift + P` from anywhere in the app.
- Features dynamic 3D visual cards, animated supply-chain walkthroughs, and financial projections.

---

## 🖥️ Live Portal Quick-Access Roles

On the login page, you can experience the platform from any stakeholder perspective with one-click demo credentials:

| Stakeholder Role | Representative User | Focus Area |
| :--- | :--- | :--- |
| **Smallholder Farmer** | Bharat Sharma (Chitwan) | Batch KT-94, Polyhouse analytics, crop protection |
| **Organic Farmer** | Sita Gurung (Pokhara) | High-value organic certification, direct sponsorship |
| **Fleet Captain / Driver** | Ramesh Shrestha (Truck BA 2 KHA 4812) | Real-time J1939 CAN engine data, reefer temperature |
| **Impact Sponsor** | Himalayan Agri Ventures | Micro-loan portfolio, disbursement escrow tracking |
| **Wholesale Buyer** | Kalimati Central Market | Digital consignment inspection & liability clearance |

---

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Mapping & GIS**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Visualizations**: [Chart.js](https://www.chartjs.org/) & [Lucide Icons](https://lucide.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) for the pitch presentation
- **Backend & Telemetry**: Node.js, Express, CAN 2.0B / J1939 Telematics Ingestion Service
- **Hosting**: Deployed on [Vercel](https://vercel.com/) with client-side SPA routing

---

## 📦 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/aayushbhatta230-ux/krishitrust.git
cd krishitrust
```

### 2. Install dependencies & launch
```bash
# Install frontend packages
npm install

# Start Vite local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. (Optional) Run the telemetry backend
```bash
cd backend
npm install
npm run dev
```

---

## 🌍 The Vision Ahead

KrishiTrust is more than software—it's a commitment to fair trade, dignifying agricultural labor, and building resilient food supply chains in developing mountain economies. 

We envision a future where no Nepali farmer loses their harvest income to bad roads or faulty transit machinery.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
