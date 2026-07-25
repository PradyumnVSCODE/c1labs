/* =====================================================
CONTINUUMONE V2
INDUSTRIAL INTELLIGENCE KNOWLEDGE CORE
===================================================== */



/* =====================================================
FAILURE MODE LIBRARY
===================================================== */

const FAILURE_MODES = {

    bearingWear: {
        name: "Bearing Wear",
        category: "Mechanical",
        severity: 8
    },

    lubricationFailure: {
        name: "Lubrication Failure",
        category: "Mechanical",
        severity: 9
    },

    thermalFatigue: {
        name: "Thermal Fatigue",
        category: "Thermal",
        severity: 9
    },

    corrosion: {
        name: "Corrosion",
        category: "Chemical",
        severity: 7
    },

    sealDegradation: {
        name: "Seal Degradation",
        category: "Mechanical",
        severity: 7
    },

    sensorDrift: {
        name: "Sensor Drift",
        category: "Instrumentation",
        severity: 6
    },

    shaftMisalignment: {
        name: "Shaft Misalignment",
        category: "Mechanical",
        severity: 8
    },

    overheating: {
        name: "Overheating",
        category: "Thermal",
        severity: 9
    },

    contamination: {
        name: "Contamination",
        category: "Operational",
        severity: 7
    },

    electricalShort: {
        name: "Electrical Short",
        category: "Electrical",
        severity: 10
    }

};



/* =====================================================
COMPONENT TYPE LIBRARY
===================================================== */

const COMPONENTS = {

    bearing: {

        name: "Bearing",

        family: "Rotating Equipment",

        failureModes: [
            "bearingWear",
            "lubricationFailure",
            "overheating"
        ]

    },

    rotor: {

        name: "Rotor",

        family: "Rotating Equipment",

        failureModes: [
            "shaftMisalignment",
            "thermalFatigue"
        ]

    },

    shaft: {

        name: "Shaft",

        family: "Mechanical",

        failureModes: [
            "shaftMisalignment",
            "thermalFatigue"
        ]

    },

    seal: {

        name: "Seal",

        family: "Fluid Containment",

        failureModes: [
            "sealDegradation",
            "contamination"
        ]

    },

    sensor: {

        name: "Sensor",

        family: "Instrumentation",

        failureModes: [
            "sensorDrift",
            "electricalShort"
        ]

    },

    actuator: {

        name: "Actuator",

        family: "Control Systems",

        failureModes: [
            "overheating",
            "electricalShort"
        ]

    },

    valve: {

        name: "Valve",

        family: "Fluid Control",

        failureModes: [
            "contamination",
            "sealDegradation"
        ]

    },

    pump: {

        name: "Pump",

        family: "Fluid Systems",

        failureModes: [
            "bearingWear",
            "shaftMisalignment"
        ]

    }

};



/* =====================================================
SUBSYSTEM TYPE LIBRARY
===================================================== */

const SUBSYSTEMS = {

    lubricationSystem: {

        name: "Lubrication System",

        components: [
            "pump",
            "seal",
            "valve",
            "sensor"
        ]

    },

    hydraulicSystem: {

        name: "Hydraulic System",

        components: [
            "pump",
            "valve",
            "actuator",
            "seal"
        ]

    },

    coolingSystem: {

        name: "Cooling System",

        components: [
            "pump",
            "valve",
            "sensor"
        ]

    },

    monitoringSystem: {

        name: "Monitoring System",

        components: [
            "sensor"
        ]

    }

};



/* =====================================================
ASSET TYPE LIBRARY
===================================================== */

const ASSET_TYPES = {

    jetEngine: {

        name: "Jet Engine",

        subsystems: [
            "lubricationSystem",
            "coolingSystem",
            "monitoringSystem"
        ]

    },

    gasTurbine: {

        name: "Gas Turbine",

        subsystems: [
            "lubricationSystem",
            "coolingSystem",
            "monitoringSystem"
        ]

    },

    semiconductorTool: {

        name: "Semiconductor Tool",

        subsystems: [
            "coolingSystem",
            "monitoringSystem"
        ]

    }

};



/* =====================================================
ASSET LIBRARY
===================================================== */

const ASSETS = {

    trentXWB: {

        name: "Rolls-Royce Trent XWB",

        manufacturer: "Rolls-Royce",

        type: "jetEngine"

    },

    geHA: {

        name: "GE HA Turbine",

        manufacturer: "GE Vernova",

        type: "gasTurbine"

    },

    twinscanNXE: {

        name: "ASML Twinscan NXE",

        manufacturer: "ASML",

        type: "semiconductorTool"

    }

};



/* =====================================================
GLOBAL EXPORT
===================================================== */

window.KLG = {

    FAILURE_MODES,

    COMPONENTS,

    SUBSYSTEMS,

    ASSET_TYPES,

    ASSETS

};
/* =====================================================
DEPENDENCY LIBRARY
===================================================== */

const DEPENDENCIES = {

    bearing: {

        upstream: [],

        downstream: [
            "shaft",
            "rotor"
        ]

    },

    shaft: {

        upstream: [
            "bearing"
        ],

        downstream: [
            "rotor"
        ]

    },

    rotor: {

        upstream: [
            "shaft",
            "bearing"
        ],

        downstream: []

    },

    seal: {

        upstream: [],

        downstream: [
            "pump",
            "valve"
        ]

    },

    sensor: {

        upstream: [],

        downstream: [
            "actuator"
        ]

    },

    actuator: {

        upstream: [
            "sensor"
        ],

        downstream: []

    },

    valve: {

        upstream: [
            "seal"
        ],

        downstream: []

    },

    pump: {

        upstream: [
            "seal"
        ],

        downstream: []

    }

};

/* =====================================================
HEALTH MODELS
===================================================== */

const HEALTH_MODELS = {

    bearing: {

        idealHealth: 100,

        warningThreshold: 75,

        criticalThreshold: 50

    },

    rotor: {

        idealHealth: 100,

        warningThreshold: 80,

        criticalThreshold: 55

    },

    shaft: {

        idealHealth: 100,

        warningThreshold: 80,

        criticalThreshold: 60

    },

    seal: {

        idealHealth: 100,

        warningThreshold: 70,

        criticalThreshold: 45

    },

    sensor: {

        idealHealth: 100,

        warningThreshold: 85,

        criticalThreshold: 60

    }

};
/* =====================================================
STRESS MODELS
===================================================== */

const STRESS_MODELS = {

    temperature: {

        name: "Temperature",

        unit: "°C",

        normalRange: [20, 80],

        warningRange: [80, 120],

        criticalRange: [120, 200]

    },

    vibration: {

        name: "Vibration",

        unit: "mm/s",

        normalRange: [0, 4],

        warningRange: [4, 8],

        criticalRange: [8, 20]

    },

    load: {

        name: "Load",

        unit: "%",

        normalRange: [0, 70],

        warningRange: [70, 90],

        criticalRange: [90, 120]

    },

    pressure: {

        name: "Pressure",

        unit: "bar",

        normalRange: [0, 100],

        warningRange: [100, 150],

        criticalRange: [150, 300]

    },

    runtime: {

        name: "Runtime",

        unit: "hours",

        normalRange: [0, 10000],

        warningRange: [10000, 30000],

        criticalRange: [30000, 100000]

    },

    maintenanceQuality: {

        name: "Maintenance Quality",

        unit: "score",

        normalRange: [80, 100],

        warningRange: [60, 80],

        criticalRange: [0, 60]

    },

    environmentSeverity: {

        name: "Environment Severity",

        unit: "score",

        normalRange: [0, 30],

        warningRange: [30, 70],

        criticalRange: [70, 100]

    }

};
/* =====================================================
COMPONENT STRESS PROFILES
===================================================== */

const COMPONENT_STRESS_PROFILES = {

    bearing: {

        primaryStressors: [
            "vibration",
            "load",
            "temperature"
        ]

    },

    rotor: {

        primaryStressors: [
            "vibration",
            "load"
        ]

    },

    shaft: {

        primaryStressors: [
            "load",
            "vibration"
        ]

    },

    seal: {

        primaryStressors: [
            "pressure",
            "temperature"
        ]

    },

    sensor: {

        primaryStressors: [
            "temperature",
            "environmentSeverity"
        ]

    },

    actuator: {

        primaryStressors: [
            "load",
            "temperature"
        ]

    },

    valve: {

        primaryStressors: [
            "pressure",
            "contamination"
        ]

    },

    pump: {

        primaryStressors: [
            "load",
            "vibration",
            "temperature"
        ]

    }

};
/* =====================================================
DEGRADATION PROFILES
===================================================== */

const DEGRADATION_PROFILES = {

    bearing: {

        baseWearRate: 1.0,

        vibrationMultiplier: 1.8,

        loadMultiplier: 1.5,

        temperatureMultiplier: 1.3

    },

    rotor: {

        baseWearRate: 0.8,

        vibrationMultiplier: 1.7,

        loadMultiplier: 1.6,

        temperatureMultiplier: 1.2

    },

    shaft: {

        baseWearRate: 0.7,

        vibrationMultiplier: 1.4,

        loadMultiplier: 1.8,

        temperatureMultiplier: 1.1

    },

    seal: {

        baseWearRate: 1.2,

        pressureMultiplier: 1.6,

        temperatureMultiplier: 1.4

    },

    sensor: {

        baseWearRate: 0.4,

        temperatureMultiplier: 1.3,

        environmentMultiplier: 1.5

    }

};
/* =====================================================
RELIABILITY PROFILES
===================================================== */

const RELIABILITY_PROFILES = {

    bearing: {

        designLifeHours: 50000,

        warningLifePercent: 70,

        criticalLifePercent: 90

    },

    rotor: {

        designLifeHours: 60000,

        warningLifePercent: 75,

        criticalLifePercent: 90

    },

    shaft: {

        designLifeHours: 70000,

        warningLifePercent: 75,

        criticalLifePercent: 90

    },

    seal: {

        designLifeHours: 25000,

        warningLifePercent: 65,

        criticalLifePercent: 85

    },

    sensor: {

        designLifeHours: 15000,

        warningLifePercent: 70,

        criticalLifePercent: 90

    }

};
/* =====================================================
PREDICTION KNOWLEDGE LAYER
===================================================== */

const FAILURE_PROPAGATION = {

    bearingWear: {

        nextFailures: [
            "shaftMisalignment",
            "rotorImbalance"
        ]

    },

    lubricationFailure: {

        nextFailures: [
            "bearingWear",
            "overheating"
        ]

    },

    thermalFatigue: {

        nextFailures: [
            "materialFracture"
        ]

    },

    sealDegradation: {

        nextFailures: [
            "contamination",
            "lubricationFailure"
        ]

    },

    sensorDrift: {

        nextFailures: [
            "controlInstability"
        ]

    }

};



/* =====================================================
FAILURE SIGNATURES
===================================================== */

const FAILURE_SIGNATURES = {

    bearingWear: {

        indicators: [
            "High Vibration",
            "Temperature Rise",
            "Noise Increase"
        ]

    },

    lubricationFailure: {

        indicators: [
            "Heat Increase",
            "Friction Increase",
            "Oil Pressure Drop"
        ]

    },

    thermalFatigue: {

        indicators: [
            "Repeated Thermal Cycling",
            "Micro Cracks",
            "Material Distortion"
        ]

    },

    sealDegradation: {

        indicators: [
            "Pressure Loss",
            "Leakage",
            "Fluid Contamination"
        ]

    }

};



/* =====================================================
RISK CLASSIFICATION
===================================================== */

const RISK_CLASSES = {

    low: {

        name: "Low Risk",

        min: 0,

        max: 25

    },

    moderate: {

        name: "Moderate Risk",

        min: 26,

        max: 50

    },

    high: {

        name: "High Risk",

        min: 51,

        max: 75

    },

    critical: {

        name: "Critical Risk",

        min: 76,

        max: 100

    }

};



/* =====================================================
MAINTENANCE ACTION LIBRARY
===================================================== */

const MAINTENANCE_ACTIONS = {

    inspectBearing: {

        name: "Inspect Bearing Assembly",

        priority: "High"

    },

    replaceSeal: {

        name: "Replace Seal Package",

        priority: "Medium"

    },

    rebalanceRotor: {

        name: "Rotor Rebalancing",

        priority: "High"

    },

    calibrateSensor: {

        name: "Sensor Calibration",

        priority: "Medium"

    },

    lubricationService: {

        name: "Lubrication Service",

        priority: "High"

    }

};



/* =====================================================
ENGINEERING RECOMMENDATION LIBRARY
===================================================== */

const RECOMMENDATIONS = {

    bearingWear: {

        actions: [
            "inspectBearing",
            "lubricationService"
        ]

    },

    lubricationFailure: {

        actions: [
            "lubricationService"
        ]

    },

    sealDegradation: {

        actions: [
            "replaceSeal"
        ]

    },

    sensorDrift: {

        actions: [
            "calibrateSensor"
        ]

    }

};



/* =====================================================
ENGINEERING REPORT TEMPLATES
===================================================== */

const REPORT_TYPES = {

    executive: {

        name: "Executive Report"

    },

    engineering: {

        name: "Engineering Report"

    },

    maintenance: {

        name: "Maintenance Report"

    },

    reliability: {

        name: "Reliability Report"

    }

};



/* =====================================================
OPERATING CONDITIONS
===================================================== */

const OPERATING_CONDITIONS = {

    nominal: {

        name: "Nominal Operation",

        stressMultiplier: 1.0

    },

    elevated: {

        name: "Elevated Operation",

        stressMultiplier: 1.25

    },

    severe: {

        name: "Severe Operation",

        stressMultiplier: 1.5

    },

    extreme: {

        name: "Extreme Operation",

        stressMultiplier: 2.0

    }

};



/* =====================================================
ENVIRONMENT LIBRARY
===================================================== */

const ENVIRONMENTS = {

    cleanroom: {

        name: "Cleanroom",

        severity: 10

    },

    industrial: {

        name: "Industrial",

        severity: 40

    },

    offshore: {

        name: "Offshore",

        severity: 70

    },

    desert: {

        name: "Desert",

        severity: 80

    },

    aerospace: {

        name: "Aerospace",

        severity: 60

    }

};
/* =====================================================
REMAINING USEFUL LIFE MODELS
===================================================== */

const RUL_MODELS = {

    bearing: {
        nominalLifeHours: 50000,
        degradationFactor: 1.0
    },

    rotor: {
        nominalLifeHours: 60000,
        degradationFactor: 0.9
    },

    shaft: {
        nominalLifeHours: 70000,
        degradationFactor: 0.8
    },

    seal: {
        nominalLifeHours: 25000,
        degradationFactor: 1.2
    },

    sensor: {
        nominalLifeHours: 15000,
        degradationFactor: 1.3
    }

};



/* =====================================================
FAILURE WINDOWS
===================================================== */

const FAILURE_WINDOWS = {

    healthy: {
        minHealth: 85,
        maxHealth: 100,
        classification: "Stable"
    },

    monitor: {
        minHealth: 70,
        maxHealth: 84,
        classification: "Monitor"
    },

    warning: {
        minHealth: 50,
        maxHealth: 69,
        classification: "Warning"
    },

    critical: {
        minHealth: 0,
        maxHealth: 49,
        classification: "Critical"
    }

};



/* =====================================================
INDUSTRIAL SENSOR LIBRARY
===================================================== */

const SENSOR_LIBRARY = {

    vibrationSensor: {
        measuredProperty: "Vibration",
        unit: "mm/s"
    },

    temperatureSensor: {
        measuredProperty: "Temperature",
        unit: "°C"
    },

    pressureSensor: {
        measuredProperty: "Pressure",
        unit: "bar"
    },

    flowSensor: {
        measuredProperty: "Flow Rate",
        unit: "L/min"
    },

    acousticSensor: {
        measuredProperty: "Acoustic Signature",
        unit: "dB"
    }

};



/* =====================================================
HEALTH INDICATOR LIBRARY
===================================================== */

const HEALTH_INDICATORS = {

    vibrationRise: {
        severity: 7
    },

    temperatureRise: {
        severity: 8
    },

    pressureLoss: {
        severity: 8
    },

    lubricationLoss: {
        severity: 9
    },

    efficiencyDrop: {
        severity: 6
    }

};



/* =====================================================
DEPENDENCY SEVERITY MATRIX
===================================================== */

const DEPENDENCY_SEVERITY = {

    low: {
        multiplier: 1.1
    },

    moderate: {
        multiplier: 1.3
    },

    high: {
        multiplier: 1.6
    },

    extreme: {
        multiplier: 2.0
    }

};



/* =====================================================
INTELLIGENCE REASONING TEMPLATES
===================================================== */

const REASONING_TEMPLATES = {

    bearingWear: {

        primaryDriver:
            "Elevated vibration and prolonged runtime",

        recommendation:
            "Inspect bearing assembly and evaluate lubrication condition"

    },

    lubricationFailure: {

        primaryDriver:
            "Loss of lubrication effectiveness",

        recommendation:
            "Perform lubrication service and contamination assessment"

    },

    thermalFatigue: {

        primaryDriver:
            "Repeated thermal cycling",

        recommendation:
            "Inspect affected components for crack initiation"

    },

    sealDegradation: {

        primaryDriver:
            "Pressure and thermal stress",

        recommendation:
            "Replace seal package and verify containment integrity"

    }

};



/* =====================================================
DIGITAL TWIN STATES
===================================================== */

const DIGITAL_TWIN_STATES = {

    nominal: {
        health: 100
    },

    degraded: {
        health: 75
    },

    warning: {
        health: 55
    },

    critical: {
        health: 30
    },

    failed: {
        health: 0
    }

};
/* =====================================================
INDUSTRIAL ASSET CATALOG
===================================================== */


const INDUSTRIAL_ASSETS = {


/* ===========================
AEROSPACE
=========================== */


trentXWB: {

    name:"Rolls-Royce Trent XWB",

    industry:"Aerospace",

    type:"jetEngine",

    subsystems:[
        "lubricationSystem",
        "coolingSystem",
        "monitoringSystem"
    ],

    criticality:"Extreme"

},


ge9x: {

    name:"GE9X Turbofan",

    industry:"Aerospace",

    type:"jetEngine",

    subsystems:[
        "lubricationSystem",
        "coolingSystem",
        "monitoringSystem"
    ],

    criticality:"Extreme"

},


cfmLeap: {

    name:"CFM LEAP Engine",

    industry:"Aerospace",

    type:"jetEngine",

    subsystems:[
        "lubricationSystem",
        "monitoringSystem"
    ],

    criticality:"High"

},


pw1100g: {

    name:"Pratt & Whitney PW1100G",

    industry:"Aerospace",

    type:"jetEngine",

    subsystems:[
        "lubricationSystem",
        "coolingSystem"
    ],

    criticality:"High"

},



/* ===========================
ENERGY
=========================== */


geHATurbine: {

    name:"GE HA Gas Turbine",

    industry:"Energy",

    type:"gasTurbine",

    subsystems:[
        "lubricationSystem",
        "coolingSystem",
        "monitoringSystem"
    ],

    criticality:"Extreme"

},


siemensSGT800: {

    name:"Siemens SGT-800",

    industry:"Energy",

    type:"gasTurbine",

    subsystems:[
        "coolingSystem",
        "monitoringSystem"
    ],

    criticality:"High"

},


windTurbineVestas: {

    name:"Vestas V236 Wind Turbine",

    industry:"Energy",

    type:"windTurbine",

    subsystems:[
        "lubricationSystem",
        "monitoringSystem"
    ],

    criticality:"High"

},



/* ===========================
SEMICONDUCTOR
=========================== */


asmlNXE: {

    name:"ASML Twinscan NXE",

    industry:"Semiconductor",

    type:"semiconductorTool",

    subsystems:[
        "coolingSystem",
        "monitoringSystem"
    ],

    criticality:"Extreme"

},


asmlEXE: {

    name:"ASML Twinscan EXE",

    industry:"Semiconductor",

    type:"semiconductorTool",

    subsystems:[
        "coolingSystem",
        "monitoringSystem"
    ],

    criticality:"Extreme"

},



/* ===========================
AUTOMOTIVE
=========================== */


teslaDriveUnit: {

    name:"Tesla Plaid Drive Unit",

    industry:"Automotive",

    type:"electricPowertrain",

    subsystems:[
        "coolingSystem",
        "monitoringSystem"
    ],

    criticality:"High"

},


cumminsX15: {

    name:"Cummins X15 Engine",

    industry:"Automotive",

    type:"combustionEngine",

    subsystems:[
        "lubricationSystem",
        "coolingSystem"
    ],

    criticality:"High"

},



/* ===========================
INDUSTRIAL
=========================== */


caterpillarC175: {

    name:"Caterpillar C175",

    industry:"Industrial",

    type:"heavyEngine",

    subsystems:[
        "lubricationSystem",
        "coolingSystem"
    ],

    criticality:"Extreme"

},


abbRobot: {

    name:"ABB Industrial Robot",

    industry:"Manufacturing",

    type:"roboticSystem",

    subsystems:[
        "monitoringSystem",
        "controlSystem"
    ],

    criticality:"Medium"

}


};
/* =====================================================
COMPONENT DEPENDENCY GRAPH
===================================================== */


const COMPONENT_DEPENDENCIES = {


bearing: {

    affects:[
        "shaft",
        "rotor"
    ],

    affectedBy:[
        "lubricationSystem",
        "temperature",
        "vibration"
    ],

    propagationRisk:"High"

},



shaft: {

    affects:[
        "rotor",
        "gearbox"
    ],

    affectedBy:[
        "bearing",
        "load",
        "vibration"
    ],

    propagationRisk:"High"

},



rotor: {

    affects:[
        "turbine",
        "compressor"
    ],

    affectedBy:[
        "shaft",
        "bearing"
    ],

    propagationRisk:"Extreme"

},



seal: {

    affects:[
        "fluidSystem",
        "lubricationSystem"
    ],

    affectedBy:[
        "pressure",
        "temperature"
    ],

    propagationRisk:"Medium"

},



pump: {

    affects:[
        "hydraulicSystem",
        "coolingSystem"
    ],

    affectedBy:[
        "bearing",
        "seal"
    ],

    propagationRisk:"High"

},



valve: {

    affects:[
        "fluidSystem"
    ],

    affectedBy:[
        "contamination",
        "seal"
    ],

    propagationRisk:"Medium"

},



sensor: {

    affects:[
        "controlSystem"
    ],

    affectedBy:[
        "temperature",
        "aging",
        "environment"
    ],

    propagationRisk:"Medium"

},



actuator: {

    affects:[
        "mechanicalSystem"
    ],

    affectedBy:[
        "sensor",
        "electricalSystem"
    ],

    propagationRisk:"High"

}



};



/* =====================================================
FAILURE CHAIN DEFINITIONS
===================================================== */


const FAILURE_CHAINS = {


bearingFailureChain: {


initialFailure:"bearingWear",


sequence:[

    "bearing",

    "shaft",

    "rotor",

    "systemEfficiencyLoss",

    "assetFailure"

]


},



lubricationFailureChain:{


initialFailure:"lubricationFailure",


sequence:[

    "lubricationSystem",

    "bearing",

    "shaft",

    "rotor",

    "assetFailure"

]


},



thermalFailureChain:{


initialFailure:"thermalFatigue",


sequence:[

    "thermalSystem",

    "materialDamage",

    "structuralFailure",

    "assetFailure"

]


}



};
/* =====================================================
SENSOR INTELLIGENCE LAYER
===================================================== */


const SENSOR_TYPES = {


vibrationSensor: {

    name:"Vibration Sensor",

    measures:[
        "vibration"
    ],

    unit:"mm/s",

    relatedFailures:[
        "bearingWear",
        "shaftMisalignment",
        "rotorImbalance"
    ]

},



temperatureSensor: {

    name:"Temperature Sensor",

    measures:[
        "temperature"
    ],

    unit:"°C",

    relatedFailures:[
        "thermalFatigue",
        "overheating",
        "lubricationFailure"
    ]

},



pressureSensor: {

    name:"Pressure Sensor",

    measures:[
        "pressure"
    ],

    unit:"bar",

    relatedFailures:[
        "sealDegradation",
        "valveSticking"
    ]

},



flowSensor: {

    name:"Flow Sensor",

    measures:[
        "flowRate"
    ],

    unit:"L/min",

    relatedFailures:[
        "pumpFailure",
        "blockage"
    ]

},



currentSensor: {

    name:"Electrical Current Sensor",

    measures:[
        "current"
    ],

    unit:"Ampere",

    relatedFailures:[
        "electricalShort",
        "motorDegradation"
    ]

},



acousticSensor: {

    name:"Acoustic Sensor",

    measures:[
        "soundSignature"
    ],

    unit:"dB",

    relatedFailures:[
        "bearingWear",
        "mechanicalDamage"
    ]

}



};



/* =====================================================
TELEMETRY CHANNELS
===================================================== */


const TELEMETRY_CHANNELS = {


temperatureChannel: {

    sensor:"temperatureSensor",

    samplingRate:"1Hz",

    dataType:"continuous"

},


vibrationChannel: {

    sensor:"vibrationSensor",

    samplingRate:"10Hz",

    dataType:"continuous"

},


pressureChannel: {

    sensor:"pressureSensor",

    samplingRate:"1Hz",

    dataType:"continuous"

},


electricalChannel: {

    sensor:"currentSensor",

    samplingRate:"5Hz",

    dataType:"continuous"

}



};



/* =====================================================
SENSOR HEALTH MODELS
===================================================== */


const SENSOR_HEALTH = {


healthy:{

    accuracy:100,

    status:"Operational"

},


degraded:{

    accuracy:85,

    status:"Reduced Accuracy"

},


failed:{

    accuracy:0,

    status:"Offline"

}



};



/* =====================================================
DATA QUALITY MODELS
===================================================== */


const DATA_QUALITY = {


excellent:{

    score:100,

    confidence:"Very High"

},


good:{

    score:80,

    confidence:"High"

},


limited:{

    score:60,

    confidence:"Medium"

},


poor:{

    score:30,

    confidence:"Low"

}



};



/* =====================================================
SENSOR TO FAILURE MAPPING
===================================================== */


const SENSOR_FAILURE_MAPPING = {


vibration:{

    primary:[
        "bearingWear",
        "shaftMisalignment",
        "rotorImbalance"
    ]

},


temperature:{

    primary:[
        "thermalFatigue",
        "overheating"
    ]

},


pressure:{

    primary:[
        "sealDegradation",
        "valveSticking"
    ]

},


current:{

    primary:[
        "electricalShort",
        "motorDegradation"
    ]

}



};
/* =====================================================
INDUSTRIAL PHYSICS MODELS
===================================================== */


const PHYSICS_MODELS = {


/* ===========================
THERMAL MODEL
=========================== */


thermalStress: {

    name:"Thermal Stress Model",

    inputs:[

        "temperature",

        "temperatureCycle",

        "materialType"

    ],

    effects:[

        "thermalFatigue",

        "materialDegradation"

    ]

},



/* ===========================
VIBRATION MODEL
=========================== */


vibrationModel: {

    name:"Vibration Degradation Model",

    inputs:[

        "vibrationLevel",

        "operatingSpeed",

        "alignment"

    ],

    effects:[

        "bearingWear",

        "shaftMisalignment",

        "rotorDamage"

    ]

},



/* ===========================
LOAD MODEL
=========================== */


mechanicalLoadModel: {

    name:"Mechanical Load Model",

    inputs:[

        "appliedLoad",

        "operatingHours",

        "loadCycles"

    ],

    effects:[

        "fatigueDamage",

        "wearAccumulation"

    ]

},



/* ===========================
LUBRICATION MODEL
=========================== */


lubricationModel: {

    name:"Lubrication Degradation Model",

    inputs:[

        "oilQuality",

        "temperature",

        "contaminationLevel"

    ],

    effects:[

        "frictionIncrease",

        "bearingWear",

        "overheating"

    ]

},



/* ===========================
CORROSION MODEL
=========================== */


corrosionModel: {

    name:"Corrosion Model",

    inputs:[

        "humidity",

        "chemicalExposure",

        "environmentSeverity"

    ],

    effects:[

        "materialLoss",

        "structuralWeakness"

    ]

},



/* ===========================
ELECTRICAL MODEL
=========================== */


electricalDegradationModel: {

    name:"Electrical Degradation Model",

    inputs:[

        "current",

        "voltage",

        "temperature"

    ],

    effects:[

        "insulationFailure",

        "electricalShort"

    ]

}



};



/* =====================================================
MATERIAL DATABASE
===================================================== */


const MATERIAL_PROPERTIES = {


titanium: {

    name:"Titanium Alloy",

    thermalResistance:"High",

    fatigueResistance:"High"

},



nickelAlloy: {

    name:"Nickel Superalloy",

    thermalResistance:"Extreme",

    fatigueResistance:"High"

},



steel: {

    name:"Industrial Steel",

    thermalResistance:"Medium",

    fatigueResistance:"Medium"

},



aluminum: {

    name:"Aluminum Alloy",

    thermalResistance:"Low",

    fatigueResistance:"Medium"

}



};



/* =====================================================
OPERATING LIMITS
===================================================== */


const OPERATING_LIMITS = {


bearing: {

    maximumTemperature:120,

    maximumVibration:8,

    maximumLoad:100

},



rotor: {

    maximumTemperature:500,

    maximumVibration:10,

    maximumLoad:120

},



seal: {

    maximumTemperature:180,

    maximumPressure:200

},



sensor: {

    maximumTemperature:150

}



};



/* =====================================================
DAMAGE ACCUMULATION MODELS
===================================================== */


const DAMAGE_MODELS = {


fatigueDamage: {

    mechanism:"Repeated Stress Cycles",

    affectedBy:[

        "load",

        "temperature",

        "vibration"

    ]

},



wearDamage: {

    mechanism:"Material Loss Over Time",

    affectedBy:[

        "friction",

        "lubrication",

        "runtime"

    ]

},



thermalDamage: {

    mechanism:"Temperature Cycling",

    affectedBy:[

        "temperature",

        "coolingEfficiency"

    ]

}



};
/* =====================================================
MAINTENANCE INTELLIGENCE LAYER
===================================================== */


const MAINTENANCE_TYPES = {


preventive: {

    name:"Preventive Maintenance",

    purpose:"Reduce probability of failure before occurrence",

    triggers:[

        "runtime",

        "age",

        "inspectionInterval"

    ]

},



predictive: {

    name:"Predictive Maintenance",

    purpose:"Schedule maintenance based on condition",

    triggers:[

        "healthIndex",

        "sensorData",

        "failureProbability"

    ]

},



corrective: {

    name:"Corrective Maintenance",

    purpose:"Restore failed equipment",

    triggers:[

        "componentFailure",

        "criticalRisk"

    ]

},



conditionBased: {

    name:"Condition Based Maintenance",

    purpose:"Maintenance based on equipment state",

    triggers:[

        "degradationLevel",

        "abnormalBehavior"

    ]

}



};



/* =====================================================
INSPECTION PROCEDURE LIBRARY
===================================================== */


const INSPECTION_PROCEDURES = {


bearingInspection: {

    name:"Bearing Inspection",

    components:[

        "bearing"

    ],

    checks:[

        "Vibration Analysis",

        "Temperature Measurement",

        "Lubrication Condition",

        "Surface Damage"

    ],

    detects:[

        "bearingWear",

        "lubricationFailure"

    ]

},



rotorInspection: {

    name:"Rotor Inspection",

    components:[

        "rotor"

    ],

    checks:[

        "Balance Condition",

        "Alignment",

        "Structural Integrity"

    ],

    detects:[

        "rotorImbalance",

        "shaftMisalignment"

    ]

},



sealInspection: {

    name:"Seal Inspection",

    components:[

        "seal"

    ],

    checks:[

        "Leak Detection",

        "Pressure Stability",

        "Material Condition"

    ],

    detects:[

        "sealDegradation"

    ]

},



electricalInspection: {

    name:"Electrical System Inspection",

    components:[

        "sensor",

        "actuator"

    ],

    checks:[

        "Current Analysis",

        "Signal Quality",

        "Insulation Condition"

    ],

    detects:[

        "electricalShort",

        "sensorDrift"

    ]

}



};



/* =====================================================
SERVICE INTERVAL MODELS
===================================================== */


const SERVICE_INTERVALS = {


bearing: {

    inspectionHours:5000,

    replacementHours:50000,

    priority:"High"

},



seal: {

    inspectionHours:3000,

    replacementHours:25000,

    priority:"Medium"

},



sensor: {

    inspectionHours:5000,

    replacementHours:15000,

    priority:"Medium"

},



rotor: {

    inspectionHours:10000,

    replacementHours:60000,

    priority:"Extreme"

}



};



/* =====================================================
MAINTENANCE PRIORITY ENGINE
===================================================== */


const MAINTENANCE_PRIORITY = {


critical: {

    riskRange:[80,100],

    action:"Immediate Inspection"

},



high: {

    riskRange:[60,79],

    action:"Schedule Maintenance"

},



medium: {

    riskRange:[30,59],

    action:"Monitor Condition"

},



low: {

    riskRange:[0,29],

    action:"Continue Operation"

}



};



/* =====================================================
REPLACEMENT STRATEGIES
===================================================== */


const REPLACEMENT_STRATEGIES = {


lifeBasedReplacement: {

    method:"Replace after design life",

    inputs:[

        "runtime",

        "age"

    ]

},



conditionBasedReplacement: {

    method:"Replace based on degradation",

    inputs:[

        "healthIndex",

        "damageLevel"

    ]

},



failureBasedReplacement: {

    method:"Replace after failure",

    inputs:[

        "failureState"

    ]

}



};



/* =====================================================
ENGINEERING ACTION DATABASE
===================================================== */


const ENGINEERING_ACTIONS = {


inspect: {

    name:"Detailed Inspection",

    category:"Assessment"

},



monitor: {

    name:"Increase Monitoring Frequency",

    category:"Observation"

},



lubricate: {

    name:"Lubrication Service",

    category:"Maintenance"

},



calibrate: {

    name:"Sensor Calibration",

    category:"Instrumentation"

},



replace: {

    name:"Component Replacement",

    category:"Repair"

},



rebalance: {

    name:"Dynamic Rebalancing",

    category:"Mechanical"

},



shutdown: {

    name:"Controlled Shutdown",

    category:"Safety"

}



};



/* =====================================================
FAILURE RESPONSE PLAYBOOKS
===================================================== */


const FAILURE_RESPONSE = {


bearingWear: {

    detect:[

        "vibrationRise",

        "temperatureRise"

    ],

    actions:[

        "monitor",

        "inspect",

        "lubricate"

    ]

},



sealDegradation: {

    detect:[

        "pressureLoss",

        "leakage"

    ],

    actions:[

        "inspect",

        "replace"

    ]

},



thermalFatigue: {

    detect:[

        "temperatureCycles",

        "materialDamage"

    ],

    actions:[

        "monitor",

        "shutdown",

        "inspect"

    ]

},



sensorDrift: {

    detect:[

        "signalDeviation"

    ],

    actions:[

        "calibrate"

    ]

}



};



/* =====================================================
MAINTENANCE KNOWLEDGE COMPLETE
===================================================== */
/* =====================================================
INDUSTRY EXPANSION PACK
===================================================== */


const INDUSTRY_DATABASE = {


aerospace: {

    name:"Aerospace",

    assetTypes:[

        "jetEngine",

        "aircraftSystem",

        "satelliteSystem"

    ],

    commonFailures:[

        "thermalFatigue",

        "bearingWear",

        "materialDegradation",

        "sensorDrift"

    ]

},



energy: {

    name:"Energy",

    assetTypes:[

        "gasTurbine",

        "windTurbine",

        "generator"

    ],

    commonFailures:[

        "thermalFatigue",

        "lubricationFailure",

        "rotorImbalance",

        "corrosion"

    ]

},



semiconductor: {

    name:"Semiconductor Manufacturing",

    assetTypes:[

        "lithographySystem",

        "etchingSystem",

        "depositionSystem"

    ],

    commonFailures:[

        "sensorDrift",

        "thermalFailure",

        "precisionLoss"

    ]

},



automotive: {

    name:"Automotive",

    assetTypes:[

        "combustionEngine",

        "electricPowertrain",

        "transmission"

    ],

    commonFailures:[

        "wearDamage",

        "thermalFatigue",

        "lubricationFailure"

    ]

},



manufacturing: {

    name:"Manufacturing",

    assetTypes:[

        "roboticSystem",

        "cncMachine",

        "assemblyLine"

    ],

    commonFailures:[

        "bearingWear",

        "motorFailure",

        "alignmentLoss"

    ]

}

};



/* =====================================================
EXPANDED ASSET CATALOG
===================================================== */


const EXPANDED_ASSETS = {


/* Aerospace */


boeing787: {

    name:"Boeing 787 Dreamliner",

    industry:"Aerospace",

    type:"aircraftSystem",

    criticality:"High"

},


airbusA350: {

    name:"Airbus A350",

    industry:"Aerospace",

    type:"aircraftSystem",

    criticality:"High"

},


f135Engine: {

    name:"Pratt & Whitney F135",

    industry:"Aerospace",

    type:"jetEngine",

    criticality:"Extreme"

},


satellitePlatform: {

    name:"Advanced Satellite Platform",

    industry:"Aerospace",

    type:"satelliteSystem",

    criticality:"Extreme"

},



/* Energy */


siemensSGT5: {

    name:"Siemens SGT5-8000H",

    industry:"Energy",

    type:"gasTurbine",

    criticality:"Extreme"

},


mitsubishiM501: {

    name:"Mitsubishi M501JAC",

    industry:"Energy",

    type:"gasTurbine",

    criticality:"Extreme"

},


vestasV236: {

    name:"Vestas V236-15MW",

    industry:"Energy",

    type:"windTurbine",

    criticality:"High"

},


nuclearGenerator: {

    name:"Nuclear Power Generator",

    industry:"Energy",

    type:"generator",

    criticality:"Extreme"

},



/* Semiconductor */


asmlHighNA: {

    name:"ASML High NA EUV",

    industry:"Semiconductor",

    type:"lithographySystem",

    criticality:"Extreme"

},


lamKiyo: {

    name:"Lam Research Kiyo Etcher",

    industry:"Semiconductor",

    type:"etchingSystem",

    criticality:"High"

},


appliedCentura: {

    name:"Applied Materials Centura",

    industry:"Semiconductor",

    type:"depositionSystem",

    criticality:"High"

},



/* Automotive */


bugattiW16: {

    name:"Bugatti W16",

    industry:"Automotive",

    type:"combustionEngine",

    criticality:"High"

},


ferrariF140: {

    name:"Ferrari F140 V12",

    industry:"Automotive",

    type:"combustionEngine",

    criticality:"High"

},


teslaPlaid: {

    name:"Tesla Plaid Drive Unit",

    industry:"Automotive",

    type:"electricPowertrain",

    criticality:"High"

},



/* Manufacturing */


fanucRobot: {

    name:"FANUC Industrial Robot",

    industry:"Manufacturing",

    type:"roboticSystem",

    criticality:"Medium"

},


siemensCNC: {

    name:"Siemens CNC Machine",

    industry:"Manufacturing",

    type:"cncMachine",

    criticality:"High"

}


};



/* =====================================================
ASSET COUNT METADATA
===================================================== */


const DATABASE_STATISTICS = {

    industries:5,

    assetCount:"Expandable",

    designGoal:
    "Thousands of industrial assets using shared engineering models"

};
/* =====================================================
CONTINUUMONE KNOWLEDGE GRAPH CORE
===================================================== */


/* =====================================================
KNOWLEDGE REGISTRY
===================================================== */


const KNOWLEDGE_REGISTRY = {


failures: FAILURE_MODES,

components: COMPONENTS,

subsystems: SUBSYSTEMS,

assetTypes: ASSET_TYPES,

assets: {

    ...ASSETS,

    ...INDUSTRIAL_ASSETS,

    ...EXPANDED_ASSETS

},


dependencies: COMPONENT_DEPENDENCIES,

stressModels: STRESS_MODELS,

degradationModels: DEGRADATION_PROFILES,

reliabilityModels: RELIABILITY_PROFILES,

sensorModels: SENSOR_TYPES,

maintenanceModels: MAINTENANCE_TYPES,

physicsModels: PHYSICS_MODELS

};



/* =====================================================
KNOWLEDGE SEARCH INDEX
===================================================== */


const KNOWLEDGE_INDEX = {


industries: [

    "Aerospace",

    "Energy",

    "Semiconductor",

    "Automotive",

    "Manufacturing"

],


componentFamilies:[

    "Mechanical",

    "Electrical",

    "Thermal",

    "Fluid",

    "Control",

    "Instrumentation"

],


failureCategories:[

    "Mechanical",

    "Thermal",

    "Electrical",

    "Chemical",

    "Operational"

]


};



/* =====================================================
KNOWLEDGE VALIDATION
===================================================== */


function validateKnowledgeCore(){


let errors=[];



if(!FAILURE_MODES){

    errors.push(
        "Failure database missing"
    );

}



if(!COMPONENTS){

    errors.push(
        "Component database missing"
    );

}



if(!ASSET_TYPES){

    errors.push(
        "Asset type database missing"
    );

}



if(errors.length===0){

    return {

        status:"VALID",

        message:
        "ContinuumOne Knowledge Core Ready"

    };

}



return {

    status:"ERROR",

    issues:errors

};


}



/* =====================================================
ASSET LOOKUP ENGINE
===================================================== */


function findAsset(assetName){


const database = {

    ...ASSETS,

    ...INDUSTRIAL_ASSETS,

    ...EXPANDED_ASSETS

};



for(let key in database){


if(
database[key].name
.toLowerCase()
.includes(assetName.toLowerCase())

){

return database[key];

}


}


return null;


}



/* =====================================================
COMPONENT LOOKUP ENGINE
===================================================== */


function findComponent(componentName){


for(let key in COMPONENTS){


if(
COMPONENTS[key].name
.toLowerCase()
.includes(componentName.toLowerCase())

){

return COMPONENTS[key];

}


}


return null;


}



/* =====================================================
FAILURE LOOKUP ENGINE
===================================================== */


function findFailure(failureName){


for(let key in FAILURE_MODES){


if(
FAILURE_MODES[key].name
.toLowerCase()
.includes(failureName.toLowerCase())

){

return FAILURE_MODES[key];

}


}


return null;


}



/* =====================================================
KNOWLEDGE CORE METADATA
===================================================== */


const CONTINUUMONE_CORE_INFO = {


version:"V2",

name:
"Predictive & Preventive Engineering Intelligence Platform",


purpose:
"Predict failures before they occur",


architecture:
"Industrial Reliability Knowledge Graph",


status:
"Foundation Complete"

};



/* =====================================================
FINAL GLOBAL EXPORT
===================================================== */


window.KLG = {


...KNOWLEDGE_REGISTRY,


KNOWLEDGE_INDEX,

VALIDATE:
validateKnowledgeCore,

FIND_ASSET:
findAsset,

FIND_COMPONENT:
findComponent,

FIND_FAILURE:
findFailure,

CORE_INFO:
CONTINUUMONE_CORE_INFO


};


/* =====================================================
END OF CONTINUUMONE KLG V2 FOUNDATION
===================================================== */
