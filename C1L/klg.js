/* ============================================================
   CONTINUUMONE :: KNOWLEDGE LAYER (klg.js)
   Engineering asset database, failure profiles, metadata.
   NO UI. NO rendering. NO event handlers. Data + pure lookups only.
   ============================================================ */

/* ---------- Category metadata ---------- */
const CONTINUUM_CATEGORIES = {
  aerospace: {
    id: "aerospace",
    label: "Aerospace",
    icon: "AE",
    description: "Turbofan, turboprop and rotorcraft propulsion systems."
  },
  semiconductor: {
    id: "semiconductor",
    label: "Semiconductor",
    icon: "SC",
    description: "High-density compute, lithography and power-delivery silicon."
  },
  automotive: {
    id: "automotive",
    label: "Automotive",
    icon: "AU",
    description: "High-performance internal combustion and electric drive units."
  },
  industrial: {
    id: "industrial",
    label: "Industrial Machinery",
    icon: "IM",
    description: "Rotating and reciprocating equipment in continuous-process service."
  },
  energy: {
    id: "energy",
    label: "Energy Infrastructure",
    icon: "EN",
    description: "Generation, storage and grid-interface hardware."
  }
};

/* ---------- Shared failure-mode archetypes ----------
   Referenced by id from each asset. weight = relative base likelihood (0-1),
   sensitivity = { temp, load, vibration, maintenance, environment, utilization }
   each 0-1, indicating how strongly that operating variable drives this mode. */
const FAILURE_MODE_LIBRARY = {
  thermal_fatigue: {
    id: "thermal_fatigue",
    label: "Thermal Fatigue",
    description: "Cyclic thermal expansion/contraction causing microcrack propagation in high-temperature sections.",
    weight: 0.22,
    sensitivity: { temp: 0.9, load: 0.4, vibration: 0.1, maintenance: 0.3, environment: 0.3, utilization: 0.5 }
  },
  bearing_degradation: {
    id: "bearing_degradation",
    label: "Bearing Degradation",
    description: "Progressive spalling and race wear from lubrication breakdown and cyclic loading.",
    weight: 0.18,
    sensitivity: { temp: 0.3, load: 0.6, vibration: 0.7, maintenance: 0.8, environment: 0.2, utilization: 0.5 }
  },
  blade_erosion: {
    id: "blade_erosion",
    label: "Blade / Airfoil Erosion",
    description: "Particulate ingestion and surface wear reducing aerodynamic efficiency and structural margin.",
    weight: 0.15,
    sensitivity: { temp: 0.2, load: 0.5, vibration: 0.3, maintenance: 0.4, environment: 0.9, utilization: 0.6 }
  },
  electromigration: {
    id: "electromigration",
    label: "Electromigration",
    description: "Metal-ion migration under sustained current density leading to interconnect voiding.",
    weight: 0.2,
    sensitivity: { temp: 0.8, load: 0.7, vibration: 0.0, maintenance: 0.1, environment: 0.2, utilization: 0.7 }
  },
  thermal_runaway: {
    id: "thermal_runaway",
    label: "Thermal Runaway",
    description: "Self-reinforcing temperature rise from insufficient heat dissipation under sustained load.",
    weight: 0.16,
    sensitivity: { temp: 0.95, load: 0.8, vibration: 0.05, maintenance: 0.2, environment: 0.4, utilization: 0.6 }
  },
  gate_oxide_wearout: {
    id: "gate_oxide_wearout",
    label: "Gate Oxide Wearout",
    description: "Time-dependent dielectric breakdown from sustained electric field stress.",
    weight: 0.12,
    sensitivity: { temp: 0.6, load: 0.6, vibration: 0.0, maintenance: 0.05, environment: 0.1, utilization: 0.8 }
  },
  fatigue_cracking: {
    id: "fatigue_cracking",
    label: "Fatigue Cracking",
    description: "Cyclic stress-driven crack initiation and growth at geometric stress concentrations.",
    weight: 0.2,
    sensitivity: { temp: 0.3, load: 0.85, vibration: 0.6, maintenance: 0.4, environment: 0.3, utilization: 0.6 }
  },
  seal_degradation: {
    id: "seal_degradation",
    label: "Seal / Gasket Degradation",
    description: "Elastomer hardening and extrusion leading to fluid loss and contamination ingress.",
    weight: 0.14,
    sensitivity: { temp: 0.6, load: 0.3, vibration: 0.4, maintenance: 0.7, environment: 0.5, utilization: 0.4 }
  },
  corrosion: {
    id: "corrosion",
    label: "Corrosion",
    description: "Electrochemical material loss accelerated by moisture, salinity or chemical exposure.",
    weight: 0.17,
    sensitivity: { temp: 0.2, load: 0.1, vibration: 0.1, maintenance: 0.6, environment: 0.9, utilization: 0.2 }
  },
  cell_degradation: {
    id: "cell_degradation",
    label: "Cell Capacity Degradation",
    description: "Irreversible electrochemical capacity loss from cycling and calendar aging.",
    weight: 0.19,
    sensitivity: { temp: 0.7, load: 0.6, vibration: 0.1, maintenance: 0.2, environment: 0.3, utilization: 0.85 }
  },
  gearbox_wear: {
    id: "gearbox_wear",
    label: "Gearbox Tooth Wear",
    description: "Surface pitting and micropitting under sustained contact stress and lubrication limits.",
    weight: 0.18,
    sensitivity: { temp: 0.3, load: 0.7, vibration: 0.6, maintenance: 0.7, environment: 0.3, utilization: 0.5 }
  },
  insulation_breakdown: {
    id: "insulation_breakdown",
    label: "Winding Insulation Breakdown",
    description: "Dielectric insulation aging from thermal cycling and partial discharge activity.",
    weight: 0.15,
    sensitivity: { temp: 0.7, load: 0.6, vibration: 0.2, maintenance: 0.4, environment: 0.4, utilization: 0.6 }
  },
  cavitation: {
    id: "cavitation",
    label: "Cavitation Damage",
    description: "Vapor bubble collapse eroding wetted surfaces under low-pressure flow conditions.",
    weight: 0.16,
    sensitivity: { temp: 0.2, load: 0.6, vibration: 0.5, maintenance: 0.4, environment: 0.2, utilization: 0.6 }
  },
  brake_fade: {
    id: "brake_fade",
    label: "Friction Material Fade",
    description: "Thermal degradation of friction surfaces reducing braking coefficient under sustained load.",
    weight: 0.1,
    sensitivity: { temp: 0.8, load: 0.7, vibration: 0.2, maintenance: 0.5, environment: 0.2, utilization: 0.4 }
  },
  inverter_stress: {
    id: "inverter_stress",
    label: "Power Inverter Thermal Stress",
    description: "Solder-joint and die-attach fatigue in power electronics from thermal cycling.",
    weight: 0.13,
    sensitivity: { temp: 0.85, load: 0.7, vibration: 0.2, maintenance: 0.2, environment: 0.3, utilization: 0.6 }
  }
};

/* ---------- Asset database ---------- */
const CONTINUUM_ASSETS = [
  /* ===================== AEROSPACE ===================== */
  {
    id: "ae-trent-xwb",
    category: "aerospace",
    name: "Trent XWB",
    manufacturer: "Rolls-Royce",
    designation: "Trent XWB-84",
    designLife: 40000,
    designLifeUnit: "flight hours",
    criticality: "Flight-Critical",
    description: "Three-shaft high-bypass turbofan purpose-built for the Airbus A350, optimized for high thermal efficiency and low specific fuel consumption.",
    failureModes: ["thermal_fatigue", "blade_erosion", "bearing_degradation"],
    baselineHealth: 91,
    maintenanceProfile: "On-condition monitoring with borescope inspection at 3,000 FH intervals; full shop visit interval ~12,000 FH.",
    ratedOutput: "97,000 lbf thrust"
  },
  {
    id: "ae-ge9x",
    category: "aerospace",
    name: "GE9X",
    manufacturer: "GE Aerospace",
    designation: "GE9X-105B1A",
    designLife: 38000,
    designLifeUnit: "flight hours",
    criticality: "Flight-Critical",
    description: "Largest and most fuel-efficient jet engine in production, powering the Boeing 777X with advanced ceramic matrix composite hot-section components.",
    failureModes: ["thermal_fatigue", "blade_erosion", "fatigue_cracking"],
    baselineHealth: 93,
    maintenanceProfile: "CMC hot-section on-condition inspection; predictive borescope cadence at 2,500 FH.",
    ratedOutput: "105,000 lbf thrust"
  },
  {
    id: "ae-pw1100g",
    category: "aerospace",
    name: "PW1100G-JM",
    manufacturer: "Pratt & Whitney",
    designation: "PurePower GTF",
    designLife: 30000,
    designLifeUnit: "flight hours",
    criticality: "Flight-Critical",
    description: "Geared turbofan for the Airbus A320neo family, using an epicyclic gear system to decouple fan and low-pressure turbine speeds.",
    failureModes: ["gearbox_wear", "bearing_degradation", "thermal_fatigue"],
    baselineHealth: 84,
    maintenanceProfile: "Enhanced gearbox oil-debris monitoring; accelerated shop-visit program active on early-build units.",
    ratedOutput: "24,000-33,000 lbf thrust"
  },
  {
    id: "ae-cfm-leap",
    category: "aerospace",
    name: "LEAP-1B",
    manufacturer: "CFM International",
    designation: "LEAP-1B28",
    designLife: 32000,
    designLifeUnit: "flight hours",
    criticality: "Flight-Critical",
    description: "Advanced single-aisle turbofan with CMC turbine shrouds and 3D-woven composite fan blades, powering the Boeing 737 MAX.",
    failureModes: ["blade_erosion", "thermal_fatigue", "bearing_degradation"],
    baselineHealth: 89,
    maintenanceProfile: "High-pressure turbine blade on-condition inspection at 2,000 FH in sand/dust environments.",
    ratedOutput: "29,300 lbf thrust"
  },

  /* ===================== SEMICONDUCTOR ===================== */
  {
    id: "sc-nvidia-blackwell",
    category: "semiconductor",
    name: "Blackwell B200",
    manufacturer: "NVIDIA",
    designation: "GB100",
    designLife: 43800,
    designLifeUnit: "operating hours",
    criticality: "Mission-Critical",
    description: "Dual-die 208B-transistor AI accelerator with 10 TB/s die-to-die interconnect, deployed in dense datacenter training clusters.",
    failureModes: ["thermal_runaway", "electromigration", "gate_oxide_wearout"],
    baselineHealth: 96,
    maintenanceProfile: "Continuous telemetry via NVLink diagnostics; liquid-cooling loop inspection at 4,380 hr intervals.",
    ratedOutput: "1,000W TDP / 20 PFLOPS FP4"
  },
  {
    id: "sc-nvidia-h100",
    category: "semiconductor",
    name: "H100 SXM5",
    manufacturer: "NVIDIA",
    designation: "GH100",
    designLife: 43800,
    designLifeUnit: "operating hours",
    criticality: "Mission-Critical",
    description: "Hopper-architecture datacenter GPU with transformer engine acceleration, widely deployed in large-scale training infrastructure.",
    failureModes: ["thermal_runaway", "electromigration", "gate_oxide_wearout"],
    baselineHealth: 94,
    maintenanceProfile: "HBM3 ECC scrub monitoring; airflow/cooling audit at quarterly intervals.",
    ratedOutput: "700W TDP / 67 TFLOPS FP64"
  },
  {
    id: "sc-asml-twinscan",
    category: "semiconductor",
    name: "TWINSCAN EXE:5200",
    manufacturer: "ASML",
    designation: "High-NA EUV",
    designLife: 87600,
    designLifeUnit: "operating hours",
    criticality: "Mission-Critical",
    description: "High-NA extreme ultraviolet lithography system enabling sub-2nm process nodes through 0.55 NA anamorphic optics.",
    failureModes: ["thermal_fatigue", "electromigration"],
    baselineHealth: 90,
    maintenanceProfile: "Plasma source optics recalibration at 500 hr; mirror contamination inspection continuous via in-situ metrology.",
    ratedOutput: "220 wafers/hr throughput"
  },
  {
    id: "sc-amd-mi300",
    category: "semiconductor",
    name: "Instinct MI300X",
    manufacturer: "AMD",
    designation: "CDNA 3",
    designLife: 43800,
    designLifeUnit: "operating hours",
    criticality: "Mission-Critical",
    description: "Chiplet-based accelerator combining CDNA 3 compute dies and 192GB HBM3 for large-model inference and training workloads.",
    failureModes: ["thermal_runaway", "gate_oxide_wearout", "electromigration"],
    baselineHealth: 95,
    maintenanceProfile: "Infinity Fabric link-integrity monitoring; thermal interface inspection at annual service interval.",
    ratedOutput: "750W TDP / 1.3 TB HBM bandwidth"
  },

  /* ===================== AUTOMOTIVE ===================== */
  {
    id: "au-ferrari-v12",
    category: "automotive",
    name: "F140 V12",
    manufacturer: "Ferrari",
    designation: "F140HC",
    designLife: 3000,
    designLifeUnit: "operating hours",
    criticality: "Performance-Critical",
    description: "Naturally aspirated 6.5L V12 producing 830 hp at 9,500 rpm, hand-assembled for Ferrari's flagship performance platform.",
    failureModes: ["fatigue_cracking", "bearing_degradation", "seal_degradation"],
    baselineHealth: 88,
    maintenanceProfile: "Valve clearance inspection at 12,000 mi; full engine-out service at 60,000 mi.",
    ratedOutput: "830 hp @ 9,500 rpm"
  },
  {
    id: "au-tesla-drive",
    category: "automotive",
    name: "Drive Unit 3D6",
    manufacturer: "Tesla",
    designation: "Tri-Motor",
    designLife: 12000,
    designLifeUnit: "operating hours",
    criticality: "Performance-Critical",
    description: "Permanent-magnet and induction motor combination delivering independent torque vectoring across three axles.",
    failureModes: ["inverter_stress", "bearing_degradation", "cell_degradation"],
    baselineHealth: 92,
    maintenanceProfile: "Coolant loop inspection at 25,000 mi; over-the-air inverter diagnostics continuous.",
    ratedOutput: "1,020 hp combined"
  },
  {
    id: "au-bugatti-w16",
    category: "automotive",
    name: "W16 Quad-Turbo",
    manufacturer: "Bugatti",
    designation: "8.0L W16",
    designLife: 2500,
    designLifeUnit: "operating hours",
    criticality: "Performance-Critical",
    description: "Quad-turbocharged 8.0L W16 engine with four camshafts and 64 valves, engineered for sustained operation beyond 400 km/h.",
    failureModes: ["thermal_fatigue", "fatigue_cracking", "seal_degradation"],
    baselineHealth: 85,
    maintenanceProfile: "Turbo shaft inspection at 6,000 mi; full service interval at 9,300 mi given extreme thermal loading.",
    ratedOutput: "1,578 hp @ 7,000 rpm"
  },

  /* ===================== INDUSTRIAL MACHINERY ===================== */
  {
    id: "im-ge-frame9",
    category: "industrial",
    name: "9HA.02 Gas Turbine",
    manufacturer: "GE Vernova",
    designation: "9HA.02",
    designLife: 100000,
    designLifeUnit: "operating hours",
    criticality: "Production-Critical",
    description: "Heavy-duty industrial gas turbine for combined-cycle power generation, rated above 61% combined-cycle efficiency.",
    failureModes: ["thermal_fatigue", "blade_erosion", "bearing_degradation"],
    baselineHealth: 87,
    maintenanceProfile: "Combustion inspection at 8,000 EOH; hot-gas-path inspection at 24,000 EOH.",
    ratedOutput: "571 MW"
  },
  {
    id: "im-sulzer-pump",
    category: "industrial",
    name: "HPcp Centrifugal Pump",
    manufacturer: "Sulzer",
    designation: "HPcp Series",
    designLife: 60000,
    designLifeUnit: "operating hours",
    criticality: "Process-Critical",
    description: "Multistage centrifugal pump for high-pressure boiler feedwater applications in thermal power plants.",
    failureModes: ["cavitation", "bearing_degradation", "seal_degradation"],
    baselineHealth: 90,
    maintenanceProfile: "Vibration trending monthly; mechanical seal replacement at 26,000 hr.",
    ratedOutput: "3,200 m3/h @ 180 bar"
  },
  {
    id: "im-atlas-compressor",
    category: "industrial",
    name: "ZH+ Centrifugal Compressor",
    manufacturer: "Atlas Copco",
    designation: "ZH+ 6000",
    designLife: 70000,
    designLifeUnit: "operating hours",
    criticality: "Process-Critical",
    description: "Oil-free centrifugal compressor for high-volume industrial air supply with integrated variable-speed drive.",
    failureModes: ["bearing_degradation", "seal_degradation", "corrosion"],
    baselineHealth: 93,
    maintenanceProfile: "Bearing oil analysis quarterly; full overhaul at 50,000 hr.",
    ratedOutput: "6,000 m3/min"
  },
  {
    id: "im-kuka-robot",
    category: "industrial",
    name: "KR QUANTEC Robotic Arm",
    manufacturer: "KUKA",
    designation: "KR 240 R2900",
    designLife: 50000,
    designLifeUnit: "operating hours",
    criticality: "Production-Critical",
    description: "Six-axis industrial robot for high-payload welding and material-handling applications in automotive assembly lines.",
    failureModes: ["gearbox_wear", "bearing_degradation"],
    baselineHealth: 95,
    maintenanceProfile: "Gearbox lubrication check every 10,000 cycles; axis calibration at annual interval.",
    ratedOutput: "240 kg payload"
  },

  /* ===================== ENERGY INFRASTRUCTURE ===================== */
  {
    id: "en-vestas-turbine",
    category: "energy",
    name: "V236-15.0 MW",
    manufacturer: "Vestas",
    designation: "V236-15.0",
    designLife: 175200,
    designLifeUnit: "operating hours",
    criticality: "Generation-Critical",
    description: "Offshore wind turbine with 236m rotor diameter, designed for high-capacity-factor operation in harsh marine environments.",
    failureModes: ["gearbox_wear", "bearing_degradation", "corrosion", "insulation_breakdown"],
    baselineHealth: 89,
    maintenanceProfile: "Condition-monitoring system continuous; blade inspection via drone at 6-month interval.",
    ratedOutput: "15.0 MW"
  },
  {
    id: "en-tesla-megapack",
    category: "energy",
    name: "Megapack 2XL",
    manufacturer: "Tesla Energy",
    designation: "Megapack 2XL",
    designLife: 87600,
    designLifeUnit: "operating hours",
    criticality: "Generation-Critical",
    description: "Grid-scale lithium-ion battery storage system integrating cells, inverters and thermal management in a single enclosure.",
    failureModes: ["cell_degradation", "thermal_runaway", "inverter_stress"],
    baselineHealth: 91,
    maintenanceProfile: "Cell balancing telemetry continuous; thermal management fluid service at annual interval.",
    ratedOutput: "3.9 MWh / 1 MW"
  },
  {
    id: "en-siemens-transformer",
    category: "energy",
    name: "8DN9 GIS Transformer",
    manufacturer: "Siemens Energy",
    designation: "8DN9 Power Transformer",
    designLife: 262800,
    designLifeUnit: "operating hours",
    criticality: "Generation-Critical",
    description: "Gas-insulated power transformer for high-voltage substation interconnection, rated for continuous grid-load service.",
    failureModes: ["insulation_breakdown", "corrosion"],
    baselineHealth: 86,
    maintenanceProfile: "Dissolved gas analysis quarterly; SF6 pressure monitoring continuous.",
    ratedOutput: "500 MVA / 400 kV"
  },
  {
    id: "en-siemens-hvdc",
    category: "energy",
    name: "HVDC PLUS Converter",
    manufacturer: "Siemens Energy",
    designation: "HVDC PLUS VSC",
    designLife: 219000,
    designLifeUnit: "operating hours",
    criticality: "Generation-Critical",
    description: "Voltage-source converter station for high-voltage DC transmission, enabling long-distance and offshore grid interconnection.",
    failureModes: ["inverter_stress", "insulation_breakdown", "electromigration"],
    baselineHealth: 88,
    maintenanceProfile: "IGBT module thermal imaging quarterly; capacitor bank inspection annually.",
    ratedOutput: "2,000 MW"
  }
];

/* ---------- Pure lookup helpers (no rendering) ---------- */
function klgGetAssetById(id) {
  return CONTINUUM_ASSETS.find(function (a) { return a.id === id; }) || null;
}

function klgGetAssetsByCategory(categoryId) {
  return CONTINUUM_ASSETS.filter(function (a) { return a.category === categoryId; });
}

function klgGetFailureMode(modeId) {
  return FAILURE_MODE_LIBRARY[modeId] || null;
}

function klgGetFailureModesForAsset(asset) {
  return asset.failureModes.map(klgGetFailureMode).filter(Boolean);
}

function klgSearchAssets(query) {
  var q = (query || "").trim().toLowerCase();
  if (!q) return CONTINUUM_ASSETS.slice();
  return CONTINUUM_ASSETS.filter(function (a) {
    return a.name.toLowerCase().indexOf(q) !== -1 ||
      a.manufacturer.toLowerCase().indexOf(q) !== -1 ||
      a.designation.toLowerCase().indexOf(q) !== -1 ||
      a.category.toLowerCase().indexOf(q) !== -1;
  });
}
