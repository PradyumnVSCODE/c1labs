const assets = [


/* ===========================
AEROSPACE
=========================== */

{
name:"Rolls-Royce Trent XWB",
category:"Aerospace",
manufacturer:"Rolls-Royce",
life:"50,000 hrs",
criticality:"Extreme"
},

{
name:"GE9X Turbofan",
category:"Aerospace",
manufacturer:"GE Aerospace",
life:"45,000 hrs",
criticality:"Extreme"
},

{
name:"CFM LEAP-1A",
category:"Aerospace",
manufacturer:"CFM International",
life:"40,000 hrs",
criticality:"High"
},

{
name:"PW1100G",
category:"Aerospace",
manufacturer:"Pratt & Whitney",
life:"42,000 hrs",
criticality:"High"
},

{
name:"Safran Silvercrest",
category:"Aerospace",
manufacturer:"Safran",
life:"35,000 hrs",
criticality:"High"
},

{
name:"Honeywell TPE331",
category:"Aerospace",
manufacturer:"Honeywell",
life:"32,000 hrs",
criticality:"Medium"
},

{
name:"GE Catalyst",
category:"Aerospace",
manufacturer:"GE Aerospace",
life:"28,000 hrs",
criticality:"Medium"
},

{
name:"Rolls-Royce Pearl 700",
category:"Aerospace",
manufacturer:"Rolls-Royce",
life:"36,000 hrs",
criticality:"High"
},

/* ===========================
SEMICONDUCTOR
=========================== */

{
name:"NVIDIA H100",
category:"Semiconductor",
manufacturer:"NVIDIA",
life:"9 Years",
criticality:"High"
},

{
name:"NVIDIA Blackwell B200",
category:"Semiconductor",
manufacturer:"NVIDIA",
life:"10 Years",
criticality:"Extreme"
},

{
name:"AMD Instinct MI300X",
category:"Semiconductor",
manufacturer:"AMD",
life:"9 Years",
criticality:"High"
},

{
name:"Intel Xeon Granite Rapids",
category:"Semiconductor",
manufacturer:"Intel",
life:"8 Years",
criticality:"High"
},

{
name:"AMD EPYC Turin",
category:"Semiconductor",
manufacturer:"AMD",
life:"8 Years",
criticality:"High"
},

{
name:"ASML Twinscan NXE",
category:"Semiconductor",
manufacturer:"ASML",
life:"18 Years",
criticality:"Extreme"
},

{
name:"Applied Materials Producer GT",
category:"Semiconductor",
manufacturer:"Applied Materials",
life:"16 Years",
criticality:"High"
},

{
name:"Lam Research Etcher",
category:"Semiconductor",
manufacturer:"Lam Research",
life:"15 Years",
criticality:"High"
},

/* ===========================
AUTOMOTIVE
=========================== */

{
name:"Ferrari F140 V12",
category:"Automotive",
manufacturer:"Ferrari",
life:"250,000 km",
criticality:"High"
},

{
name:"Bugatti W16",
category:"Automotive",
manufacturer:"Bugatti",
life:"220,000 km",
criticality:"Extreme"
},

{
name:"Tesla Plaid Drive Unit",
category:"Automotive",
manufacturer:"Tesla",
life:"500,000 km",
criticality:"High"
},

{
name:"Koenigsegg Jesko V8",
category:"Automotive",
manufacturer:"Koenigsegg",
life:"240,000 km",
criticality:"Extreme"
},

{
name:"Cummins X15",
category:"Automotive",
manufacturer:"Cummins",
life:"1.6 Million km",
criticality:"High"
},

{
name:"Caterpillar C175",
category:"Automotive",
manufacturer:"Caterpillar",
life:"45,000 hrs",
criticality:"Extreme"
},

{
name:"Bosch ABS Control Unit",
category:"Automotive",
manufacturer:"Bosch",
life:"15 Years",
criticality:"Medium"
},

{
name:"ZF 8HP Transmission",
category:"Automotive",
manufacturer:"ZF",
life:"300,000 km",
criticality:"High"
}
];

const grid=document.getElementById("assetGrid");

const grouped={};

assets.forEach(asset=>{

if(!grouped[asset.category]){

grouped[asset.category]=[];

}

grouped[asset.category].push(asset);

});

Object.keys(grouped).forEach(category=>{

const title=document.createElement("div");

title.className="category-title";

title.innerHTML=`

${category}

<span class="asset-count">

${grouped[category].length}

</span>

`;

grid.appendChild(title);

grouped[category].forEach(asset=>{

const card=document.createElement("div");

card.className="asset-card";

card.innerHTML=`

<small>${asset.category}</small>

<h4>${asset.name}</h4>

<div>${asset.manufacturer}</div>

<div class="asset-spec">

<span>${asset.life}</span>

<span>${asset.criticality}</span>

</div>

`;

card.onclick=()=>{

document

.querySelectorAll(".asset-card")

.forEach(c=>c.classList.remove("active"));

card.classList.add("active");

showDossier(asset);

};

grid.appendChild(card);

});

});

const dossier=document.getElementById("assetDossier");

function showDossier(asset){

dossier.innerHTML=`

<div class="asset-dossier">

<div class="asset-header">

<div class="asset-title">

<h2>${asset.name}</h2>

<p>${asset.manufacturer}</p>

</div>

<div class="asset-risk">

${asset.criticality}

</div>

</div>

<div class="asset-grid2">

<div class="spec-card">

<small>Design Life</small>

<strong>${asset.life}</strong>

</div>

<div class="spec-card">

<small>Category</small>

<strong>${asset.category}</strong>

</div>

<div class="spec-card">

<small>Manufacturer</small>

<strong>${asset.manufacturer}</strong>

</div>

<div class="spec-card">

<small>Status</small>

<strong>Awaiting Configuration</strong>

</div>

</div>

<div class="failure-section">

<h3>Potential Failure Modes</h3>

<div class="failure-list">

<div class="failure-chip">Bearing Wear</div>

<div class="failure-chip">Thermal Fatigue</div>

<div class="failure-chip">Surface Corrosion</div>

<div class="failure-chip">Lubrication Loss</div>

<div class="failure-chip">Material Fatigue</div>

<div class="failure-chip">Seal Degradation</div>

</div>

</div>

<div class="failure-section">

<h3>Technical Specifications</h3>

<div class="tech-table">

<div class="tech-row">
<span>Operating State</span>
<strong>Nominal</strong>
</div>

<div class="tech-row">
<span>Health Index</span>
<strong>100%</strong>
</div>

<div class="tech-row">
<span>Monitoring</span>
<strong>Enabled</strong>
</div>

<div class="tech-row">
<span>Predictive Core</span>
<strong>Ready</strong>
</div>

<div class="tech-row">
<span>Simulation</span>
<strong>Pending</strong>
</div>

<div class="tech-row">
<span>Telemetry</span>
<strong>Connected</strong>
</div>

</div>

</div>

</div>

`;

}