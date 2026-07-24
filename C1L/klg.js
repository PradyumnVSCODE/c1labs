const EngineeringAssets = {

rr_trent_xwb:{

id:"rr_trent_xwb",

name:"Rolls-Royce Trent XWB",

manufacturer:"Rolls-Royce",

industry:"Commercial Aviation",

category:"Aerospace",

criticality:"Extreme",

designLife:50000,

maintenanceInterval:750,

weight:7430,

power:"97,000 lbf",

temperature:{
min:-55,
max:1700
},

humiditySensitivity:18,

dustSensitivity:20,

saltSensitivity:96,

vibrationSensitivity:88,

pressureSensitivity:91,

materials:[
"Titanium",
"Nickel Superalloy",
"Ceramic Matrix Composite"
],

sensors:[

"Vibration",

"Oil Pressure",

"Oil Temperature",

"Bearing Temperature",

"Fuel Flow",

"Rotor Speed",

"Compressor Pressure",

"Exhaust Gas Temperature"

],

failureModes:[

"Compressor Blade Fatigue",

"Thermal Barrier Coating Loss",

"High Pressure Turbine Creep",

"Bearing Wear",

"Oil Contamination",

"Combustion Instability"

]

},

nvidia_h100:{

id:"nvidia_h100",

name:"NVIDIA H100",

manufacturer:"NVIDIA",

industry:"AI Computing",

category:"Semiconductor",

criticality:"High",

designLife:9,

maintenanceInterval:12,

weight:2.1,

power:"700 W",

temperature:{
min:0,
max:95
},

humiditySensitivity:72,

dustSensitivity:86,

saltSensitivity:35,

vibrationSensitivity:28,

pressureSensitivity:20,

materials:[
"Copper",
"Silicon",
"FR4",
"Aluminum"
],

sensors:[

"GPU Core",

"Hotspot",

"VRAM",

"Power Draw",

"Fan RPM",

"Board Temperature"

],

failureModes:[

"VRM Overheating",

"Solder Fatigue",

"Memory Degradation",

"Electromigration",

"Thermal Cycling"

]

}

};