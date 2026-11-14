
"use strict";

/*
  KATSHR SENSITIVITY
  This version uses a local device catalogue and transparent
  estimated settings. It does NOT perform live web searches.
  A verified online data service must be connected separately.
*/

const DEVICE_CATALOG = {
  "Samsung": [
    ["Galaxy A10s", "2019", "MediaTek Helio P22", "2–3 GB", "60 Hz", "720 × 1520"],
    ["Galaxy A12", "2020", "MediaTek Helio P35", "3–6 GB", "60 Hz", "720 × 1600"],
    ["Galaxy A13", "2022", "Exynos 850 / Helio G80", "3–6 GB", "60 Hz", "1080 × 2408"],
    ["Galaxy A14", "2023", "Exynos 850 / Dimensity 700", "4–8 GB", "60 Hz", "1080 × 2408"],
    ["Galaxy A15", "2023", "Helio G99 / Dimensity 6100+", "4–8 GB", "90 Hz", "1080 × 2340"],
    ["Galaxy A16", "2024", "Exynos 1330 / Helio G99", "4–8 GB", "90 Hz", "1080 × 2340"],
    ["Galaxy A25", "2023", "Exynos 1280", "6–8 GB", "120 Hz", "1080 × 2340"],
    ["Galaxy A35", "2024", "Exynos 1380", "6–8 GB", "120 Hz", "1080 × 2340"],
    ["Galaxy A55", "2024", "Exynos 1480", "8–12 GB", "120 Hz", "1080 × 2340"],
    ["Galaxy S21", "2021", "Exynos 2100 / Snapdragon 888", "8 GB", "120 Hz", "1080 × 2400"],
    ["Galaxy S22", "2022", "Exynos 2200 / Snapdragon 8 Gen 1", "8 GB", "120 Hz", "1080 × 2340"],
    ["Galaxy S23", "2023", "Snapdragon 8 Gen 2", "8–12 GB", "120 Hz", "1080 × 2340"],
    ["Galaxy S24", "2024", "Exynos 2400 / Snapdragon 8 Gen 3", "8–12 GB", "120 Hz", "1080 × 2340"],
    ["Galaxy S25", "2025", "Snapdragon 8 Elite", "12 GB", "120 Hz", "1080 × 2340"],
    ["Galaxy M14", "2023", "Exynos 1330", "4–6 GB", "90 Hz", "1080 × 2408"],
    ["Galaxy M15", "2024", "Dimensity 6100+", "4–6 GB", "90 Hz", "1080 × 2340"]
  ],
  "Apple": [
    ["iPhone 11", "2019", "Apple A13 Bionic", "4 GB", "60 Hz", "828 × 1792"],
    ["iPhone 12", "2020", "Apple A14 Bionic", "4–6 GB", "60 Hz", "1170 × 2532"],
    ["iPhone 13", "2021", "Apple A15 Bionic", "4–6 GB", "60 Hz", "1170 × 2532"],
    ["iPhone 14", "2022", "Apple A15 Bionic", "6 GB", "60 Hz", "1170 × 2532"],
    ["iPhone 15", "2023", "Apple A16 Bionic", "6 GB", "60 Hz", "1179 × 2556"],
    ["iPhone 16", "2024", "Apple A18", "8 GB", "60 Hz", "1179 × 2556"],
    ["iPhone 16 Pro", "2024", "Apple A18 Pro", "8 GB", "120 Hz", "1206 × 2622"],
    ["iPhone 17", "2025", "Apple A19", "غير مؤكد هنا", "حسب الموديل", "حسب الموديل"],
    ["iPhone 17 Pro", "2025", "Apple A19 Pro", "غير مؤكد هنا", "حسب الموديل", "حسب الموديل"]
  ],
  "Xiaomi": [
    ["Redmi 12", "2023", "MediaTek Helio G88", "4–8 GB", "90 Hz", "1080 × 2460"],
    ["Redmi 13", "2024", "MediaTek Helio G91 Ultra", "6–8 GB", "90 Hz", "1080 × 2460"],
    ["Redmi Note 12", "2023", "Snapdragon 685", "4–8 GB", "120 Hz", "1080 × 2400"],
    ["Redmi Note 13", "2024", "Snapdragon 685 / Dimensity 6080", "6–12 GB", "120 Hz", "1080 × 2400"],
    ["Redmi Note 14", "2025", "يختلف حسب النسخة", "حسب النسخة", "حسب النسخة", "حسب النسخة"],
    ["Xiaomi 13", "2023", "Snapdragon 8 Gen 2", "8–12 GB", "120 Hz", "1080 × 2400"],
    ["Xiaomi 14", "2024", "Snapdragon 8 Gen 3", "12–16 GB", "120 Hz", "1200 × 2670"],
    ["Xiaomi 15", "2025", "Snapdragon 8 Elite", "12–16 GB", "120 Hz", "1200 × 2670"]
  ],
  "POCO": [
    ["POCO M5", "2022", "MediaTek Helio G99", "4–6 GB", "90 Hz", "1080 × 2400"],
    ["POCO X5 Pro", "2023", "Snapdragon 778G", "6–8 GB", "120 Hz", "1080 × 2400"],
    ["POCO X6", "2024", "Snapdragon 7s Gen 2", "8–12 GB", "120 Hz", "1220 × 2712"],
    ["POCO X6 Pro", "2024", "Dimensity 8300 Ultra", "8–12 GB", "120 Hz", "1220 × 2712"],
    ["POCO F6", "2024", "Snapdragon 8s Gen 3", "8–12 GB", "120 Hz", "1200 × 2712"],
    ["POCO F7", "2025", "يختلف حسب النسخة", "حسب النسخة", "حسب النسخة", "حسب النسخة"]
  ],
  "Redmi": [
    ["Redmi 9A", "2020", "MediaTek Helio G25", "2–6 GB", "60 Hz", "720 × 1600"],
    ["Redmi 10", "2021", "MediaTek Helio G88", "4–6 GB", "90 Hz", "1080 × 2400"],
    ["Redmi 12C", "2023", "MediaTek Helio G85", "3–6 GB", "60 Hz", "720 × 1650"],
    ["Redmi 13C", "2023", "MediaTek Helio G85", "4–8 GB", "90 Hz", "720 × 1600"],
    ["Redmi A3", "2024", "MediaTek Helio G36", "3–6 GB", "90 Hz", "720 × 1650"]
  ],
  "Huawei": [
    ["P30 Lite", "2019", "Kirin 710", "4–8 GB", "60 Hz", "1080 × 2312"],
    ["P30 Pro", "2019", "Kirin 980", "6–8 GB", "60 Hz", "1080 × 2340"],
    ["Nova 9", "2021", "Snapdragon 778G", "8 GB", "120 Hz", "1080 × 2340"],
    ["Nova 11", "2023", "Snapdragon 778G", "8 GB", "120 Hz", "1080 × 2412"],
    ["Nova 12", "2024", "يختلف حسب النسخة", "حسب النسخة", "حسب النسخة", "حسب النسخة"]
  ],
  "HONOR": [
    ["X7b", "2023", "Snapdragon 680", "6–8 GB", "90 Hz", "1080 × 2412"],
    ["X8b", "2023", "Snapdragon 680", "8 GB", "90 Hz", "1080 × 2412"],
    ["X9b", "2023", "Snapdragon 6 Gen 1", "8–12 GB", "120 Hz", "1200 × 2652"],
    ["200", "2024", "Snapdragon 7 Gen 3", "8–12 GB", "120 Hz", "1200 × 2664"],
    ["Magic7 Pro", "2025", "Snapdragon 8 Elite", "12–16 GB", "120 Hz", "1280 × 2800"]
  ],
  "OPPO": [
    ["A58", "2023", "Helio G85 / Dimensity 700", "6–8 GB", "حسب النسخة", "1080 × 2400"],
    ["A78", "2023", "Snapdragon 680 / Dimensity 700", "8 GB", "90 Hz", "1080 × 2400"],
    ["Reno 10", "2023", "Dimensity 7050", "8 GB", "120 Hz", "1080 × 2412"],
    ["Reno 11", "2024", "Dimensity 7050", "8–12 GB", "120 Hz", "1080 × 2412"],
    ["Reno 12", "2024", "Dimensity 7300", "12 GB", "120 Hz", "1080 × 2412"]
  ],
  "Vivo": [
    ["Y21", "2021", "MediaTek Helio P35", "4 GB", "60 Hz", "720 × 1600"],
    ["Y22", "2022", "MediaTek Helio G85", "4–6 GB", "90 Hz", "720 × 1612"],
    ["Y27", "2023", "Helio G85 / Dimensity 6020", "6–8 GB", "حسب النسخة", "1080 × 2388"],
    ["V29", "2023", "Snapdragon 778G", "8–12 GB", "120 Hz", "1260 × 2800"],
    ["V30", "2024", "Snapdragon 7 Gen 3", "8–12 GB", "120 Hz", "1260 × 2800"]
  ],
  "Realme": [
    ["C55", "2023", "MediaTek Helio G88", "4–8 GB", "90 Hz", "1080 × 2400"],
    ["C67", "2023", "Snapdragon 685", "6–8 GB", "90 Hz", "1080 × 2400"],
    ["12 Pro", "2024", "Snapdragon 6 Gen 1", "8–12 GB", "120 Hz", "1080 × 2412"],
    ["13 Pro+", "2024", "Snapdragon 7s Gen 2", "8–12 GB", "120 Hz", "1264 × 2780"]
  ],
  "Infinix": [
    ["Hot 30", "2023", "MediaTek Helio G88", "4–8 GB", "90 Hz", "1080 × 2460"],
    ["Hot 40 Pro", "2023", "MediaTek Helio G99", "8 GB", "120 Hz", "1080 × 2460"],
    ["Hot 50 Pro+", "2024", "MediaTek Helio G100", "8 GB", "120 Hz", "1080 × 2436"],
    ["Note 30", "2023", "MediaTek Helio G99", "8 GB", "120 Hz", "1080 × 2460"],
    ["Note 40", "2024", "Helio G99 Ultimate", "8 GB", "120 Hz", "1080 × 2436"],
    ["GT 20 Pro", "2024", "Dimensity 8200 Ultimate", "8–12 GB", "144 Hz", "1080 × 2436"]
  ],
  "TECNO": [
    ["Spark 10", "2023", "MediaTek Helio G37", "4–8 GB", "90 Hz", "720 × 1612"],
    ["Spark 20", "2023", "MediaTek Helio G85", "4–8 GB", "90 Hz", "720 × 1612"],
    ["Spark 20 Pro", "2023", "MediaTek Helio G99", "8 GB", "120 Hz", "1080 × 2460"],
    ["Camon 20", "2023", "MediaTek Helio G85", "8 GB", "60 Hz", "1080 × 2400"],
    ["Camon 30", "2024", "Helio G99 Ultimate", "8–12 GB", "120 Hz", "1080 × 2436"],
    ["Pova 6 Pro", "2024", "Dimensity 6080", "8–12 GB", "120 Hz", "1080 × 2436"]
  ],
  "OnePlus": [
    ["Nord CE 3 Lite", "2023", "Snapdragon 695", "8 GB", "120 Hz", "1080 × 2400"],
    ["Nord 3", "2023", "Dimensity 9000", "8–16 GB", "120 Hz", "1240 × 2772"],
    ["Nord 4", "2024", "Snapdragon 7+ Gen 3", "8–16 GB", "120 Hz", "1240 × 2772"],
    ["OnePlus 12", "2024", "Snapdragon 8 Gen 3", "12–24 GB", "120 Hz", "1440 × 3168"],
    ["OnePlus 13", "2025", "Snapdragon 8 Elite", "12–24 GB", "120 Hz", "1440 × 3168"]
  ],
  "ZTE": [
    ["Blade A31", "2021", "Unisoc SC9863A", "2 GB", "60 Hz", "720 × 1600"],
    ["Blade A51", "2021", "Unisoc SC9863A", "2–3 GB", "60 Hz", "720 × 1600"],
    ["Blade V40", "2022", "يختلف حسب النسخة", "حسب النسخة", "حسب النسخة", "حسب النسخة"],
    ["Nubia Neo", "2023", "Unisoc T820", "8 GB", "120 Hz", "1080 × 2408"],
    ["RedMagic 9 Pro", "2023", "Snapdragon 8 Gen 3", "12–16 GB", "120 Hz", "1116 × 2480"],
    ["RedMagic 10 Pro", "2024", "Snapdragon 8 Elite", "12–24 GB", "144 Hz", "1216 × 2688"]
  ],
  "Motorola": [
    ["Moto G54", "2023", "Dimensity 7020", "8–12 GB", "120 Hz", "1080 × 2400"],
    ["Moto G84", "2023", "Snapdragon 695", "8–12 GB", "120 Hz", "1080 × 2400"],
    ["Edge 40", "2023", "Dimensity 8020", "8 GB", "144 Hz", "1080 × 2400"],
    ["Edge 50 Pro", "2024", "Snapdragon 7 Gen 3", "8–12 GB", "144 Hz", "1220 × 2712"]
  ],
  "Google": [
    ["Pixel 6", "2021", "Google Tensor", "8 GB", "90 Hz", "1080 × 2400"],
    ["Pixel 7", "2022", "Google Tensor G2", "8 GB", "90 Hz", "1080 × 2400"],
    ["Pixel 8", "2023", "Google Tensor G3", "8 GB", "120 Hz", "1080 × 2400"],
    ["Pixel 9", "2024", "Google Tensor G4", "12 GB", "120 Hz", "1080 × 2424"]
  ],
  "ASUS": [
    ["ROG Phone 7", "2023", "Snapdragon 8 Gen 2", "12–16 GB", "165 Hz", "1080 × 2448"],
    ["ROG Phone 8", "2024", "Snapdragon 8 Gen 3", "12–24 GB", "165 Hz", "1080 × 2400"],
    ["ROG Phone 9", "2024", "Snapdragon 8 Elite", "12–24 GB", "185 Hz", "1080 × 2400"]
  ],
  "Sony": [
    ["Xperia 1 V", "2023", "Snapdragon 8 Gen 2", "12 GB", "120 Hz", "1644 × 3840"],
    ["Xperia 1 VI", "2024", "Snapdragon 8 Gen 3", "12–16 GB", "120 Hz", "1080 × 2340"]
  ],
  "Nothing": [
    ["Phone (1)", "2022", "Snapdragon 778G+", "8–12 GB", "120 Hz", "1080 × 2400"],
    ["Phone (2)", "2023", "Snapdragon 8+ Gen 1", "8–12 GB", "120 Hz", "1080 × 2412"],
    ["Phone (2a)", "2024", "Dimensity 7200 Pro", "8–12 GB", "120 Hz", "1080 × 2412"],
    ["Phone (3a)", "2025", "Snapdragon 7s Gen 3", "8–12 GB", "120 Hz", "1080 × 2392"]
  ]
};

const $ = (id) => document.getElementById(id);

const brandSelect = $("brandSelect");
const modelSelect = $("modelSelect");
const modelSearch = $("modelSearch");
const searchResults = $("searchResults");
const modelHint = $("modelHint");
const generateBtn = $("generateBtn");
const analysisModal = $("analysisModal");
const resultModal = $("resultModal");
const toast = $("toast");

let selectedDevice = null;
let analysisTimers = [];
let toastTimer = null;
let lastFocusedElement = null;

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, " ")
    .trim();
}

function allDevices() {
  const devices = [];
  for (const [brand, models] of Object.entries(DEVICE_CATALOG)) {
    for (const model of models) {
      devices.push({
        brand,
        name: model[0],
        year: model[1],
        processor: model[2],
        ram: model[3],
        refresh: model[4],
        resolution: model[5]
      });
    }
  }
  return devices;
}

const deviceIndex = allDevices();

function setSelectOptions(select, options, placeholder) {
  select.replaceChildren();
  const first = document.createElement("option");
  first.value = "";
  first.textContent = placeholder;
  select.appendChild(first);

  for (const item of options) {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    select.appendChild(option);
  }
}

function initBrands() {
  const brands = Object.keys(DEVICE_CATALOG).sort((a, b) => a.localeCompare(b));
  setSelectOptions(
    brandSelect,
    brands.map((brand) => ({ value: brand, label: brand })),
    "اختر شركة هاتفك"
  );
}

function updateModels() {
  const brand = brandSelect.value;
  selectedDevice = null;
  generateBtn.disabled = true;

  if (!brand || !DEVICE_CATALOG[brand]) {
    modelSelect.disabled = true;
    setSelectOptions(modelSelect, [], "اختر الشركة أولًا");
    modelHint.textContent = "اختر الشركة لعرض الموديلات المتاحة.";
    return;
  }

  const models = DEVICE_CATALOG[brand];
  setSelectOptions(
    modelSelect,
    models.map((model, index) => ({
      value: String(index),
      label: model[0]
    })),
    "اختر موديل هاتفك"
  );

  modelSelect.disabled = false;
  modelHint.textContent = `توجد ${models.length} موديلات في القائمة المحلية لشركة ${brand}. هذه القائمة ليست سجلًا شاملًا لجميع هواتف الشركة.`;
}

function chooseDevice(brand, modelName) {
  const found = deviceIndex.find(
    (device) => device.brand === brand && device.name === modelName
  );

  if (!found) return;

  selectedDevice = { ...found };
  brandSelect.value = found.brand;
  updateModels();

  const models = DEVICE_CATALOG[found.brand];
  const index = models.findIndex((model) => model[0] === found.name);

  if (index >= 0) modelSelect.value = String(index);

  modelSearch.value = `${found.brand} ${found.name}`;
  searchResults.classList.add("hidden");
  generateBtn.disabled = false;
  modelHint.textContent = `تم اختيار ${found.brand} ${found.name}.`;
}

function renderSearchResults(query) {
  searchResults.replaceChildren();
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    searchResults.classList.add("hidden");
    return;
  }

  const matches = deviceIndex
    .filter((device) =>
      normalizeText(`${device.brand} ${device.name}`).includes(normalizedQuery)
    )
    .slice(0, 10);

  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "search-result";
    empty.textContent = "لم نجد هذا الموديل في القائمة المحلية. جرّب اسمًا أقصر.";
    searchResults.appendChild(empty);
    searchResults.classList.remove("hidden");
    return;
  }

  for (const device of matches) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-result";
    button.innerHTML = "";

    const name = document.createElement("span");
    name.textContent = `${device.brand} ${device.name}`;

    const detail = document.createElement("small");
    detail.textContent = `سنة ${device.year} · ${device.processor}`;

    button.append(name, detail);
    button.addEventListener("click", () => {
      chooseDevice(device.brand, device.name);
    });
    searchResults.appendChild(button);
  }

  searchResults.classList.remove("hidden");
}

function selectedStyle() {
  const checked = document.querySelector('input[name="gameStyle"]:checked');
  return checked ? checked.value : "balanced";
}

function updateStyleCards() {
  document.querySelectorAll(".style-option").forEach((label) => {
    const input = label.querySelector("input");
    label.classList.toggle("selected", Boolean(input && input.checked));
  });
}

function estimatePerformance(device) {
  const processor = normalizeText(device.processor);
  let score = 0;

  const powerfulTokens = [
    "snapdragon 8",
    "apple a",
    "dimensity 8",
    "dimensity 9",
    "exynos 2",
    "tensor g4",
    "tensor g3",
    "tensor g2"
  ];

  const midTokens = [
    "snapdragon 7",
    "snapdragon 6",
    "dimensity 7",
    "dimensity 6",
    "helio g99",
    "helio g100",
    "exynos 13",
    "exynos 14",
    "kirin 9"
  ];

  if (powerfulTokens.some((token) => processor.includes(token))) score += 3;
  else if (midTokens.some((token) => processor.includes(token))) score += 2;
  else score += 1;

  const ramMatch = String(device.ram).match(/^\s*(\d+)/);
  if (ramMatch) {
    const ram = Number(ramMatch[1]);
    if (ram >= 8) score += 2;
    else if (ram >= 4) score += 1;
  }

  const hzMatch = String(device.refresh).match(/(\d+)/);
  if (hzMatch && Number(hzMatch[1]) >= 90) score += 1;

  return Math.min(score, 6);
}

function calculateSuggestedSettings(device, style) {
  const performance = estimatePerformance(device);

  const profiles = {
    balanced: {
      general: 178,
      redDot: 172,
      scope2x: 160,
      scope4x: 145,
      sniper: 90,
      freeLook: 135
    },
    rush: {
      general: 190,
      redDot: 184,
      scope2x: 170,
      scope4x: 152,
      sniper: 88,
      freeLook: 145
    },
    precision: {
      general: 165,
      redDot: 158,
      scope2x: 148,
      scope4x: 132,
      sniper: 78,
      freeLook: 120
    }
  };

  const base = profiles[style] || profiles.balanced;
  const adjustment = performance >= 5 ? 3 : performance <= 2 ? -3 : 0;

  const settings = [
    { label: "General", key: "general", value: base.general },
    { label: "Red Dot", key: "redDot", value: base.redDot },
    { label: "2x Scope", key: "scope2x", value: base.scope2x },
    { label: "4x Scope", key: "scope4x", value: base.scope4x },
    { label: "Sniper Scope", key: "sniper", value: base.sniper },
    { label: "Free Look", key: "freeLook", value: base.freeLook }
  ];

  return settings.map((item) => ({
    ...item,
    value: Math.max(0, Math.min(200, item.value + adjustment))
  }));
}

function suggestDpi(device) {
  const performance = estimatePerformance(device);
  if (performance >= 5) return 480;
  if (performance >= 3) return 420;
  return 380;
}

function setAnalysisStep(id, state) {
  const element = $(id);
  if (!element) return;
  element.classList.remove("active", "done");
  if (state) element.classList.add(state);
}

function clearAnalysisTimers() {
  analysisTimers.forEach((timer) => clearTimeout(timer));
  analysisTimers = [];
}

function scheduleAnalysis() {
  clearAnalysisTimers();
  lastFocusedElement = document.activeElement;

  $("analysisTitle").textContent = "جاري تجهيز التحليل";
  $("analysisSubtitle").textContent = "يتم فحص المعلومات المتاحة...";
  $("progressBar").style.width = "0%";

  ["stepDevice", "stepSpecs", "stepSettings"].forEach((id) => {
    setAnalysisStep(id, "");
  });

  analysisModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  const phases = [
    {
      delay: 250,
      id: "stepDevice",
      progress: "28%",
      title: "التعرّف على موديل الجهاز",
      subtitle: "مراجعة الموديل المحدد في القائمة المحلية."
    },
    {
      delay: 850,
      id: "stepSpecs",
      progress: "62%",
      title: "مراجعة المواصفات المتاحة",
      subtitle: "قراءة البيانات المسجلة لهذا الموديل."
    },
    {
      delay: 1450,
      id: "stepSettings",
      progress: "100%",
      title: "حساب الإعدادات المقترحة",
      subtitle: "تجهيز نتيجة أولية قابلة للتجربة."
    }
  ];

  for (const phase of phases) {
    const timer = setTimeout(() => {
      setAnalysisStep(phase.id, "active");
      $("progressBar").style.width = phase.progress;
      $("analysisTitle").textContent = phase.title;
      $("analysisSubtitle").textContent = phase.subtitle;

      const previousIndex = phases.findIndex((item) => item.id === phase.id);
      for (let i = 0; i < previousIndex; i++) {
        setAnalysisStep(phases[i].id, "done");
      }
    }, phase.delay);
    analysisTimers.push(timer);
  }

  const finishTimer = setTimeout(() => {
    phases.forEach((phase) => setAnalysisStep(phase.id, "done"));
    analysisModal.classList.add("hidden");
    showResults();
  }, 2050);

  analysisTimers.push(finishTimer);
}

function addSpecBox(container, label, value) {
  const box = document.createElement("div");
  box.className = "spec-box";

  const title = document.createElement("span");
  title.textContent = label;

  const detail = document.createElement("strong");
  detail.textContent = value || "غير متوفر";

  box.append(title, detail);
  container.appendChild(box);
}

function renderSpecifications(device) {
  const container = $("specSummary");
  container.replaceChildren();

  addSpecBox(container, "المعالج", device.processor);
  addSpecBox(container, "الذاكرة", device.ram);
  addSpecBox(container, "الشاشة", device.refresh);
}

function renderSettings(settings) {
  const container = $("sensitivityList");
  container.replaceChildren();

  for (const setting of settings) {
    const row = document.createElement("div");
    row.className = "sense-row";

    const head = document.createElement("div");
    head.className = "sense-head";

    const label = document.createElement("span");
    label.textContent = setting.label;

    const value = document.createElement("strong");
    value.textContent = String(setting.value);

    head.append(label, value);

    const track = document.createElement("div");
    track.className = "sense-track";

    const fill = document.createElement("div");
    fill.className = "sense-fill";
    fill.style.width = `${setting.value / 200 * 100}%`;

    track.appendChild(fill);
    row.append(head, track);
    container.appendChild(row);
  }
}

function showResults() {
  if (!selectedDevice) {
    showToast("اختر هاتفك أولًا.");
    return;
  }

  const style = selectedStyle();
  const settings = calculateSuggestedSettings(selectedDevice, style);
  const dpi = suggestDpi(selectedDevice);

  $("resultDevice").textContent =
    `${selectedDevice.brand} ${selectedDevice.name}`;

  $("dpiValue").textContent = String(dpi);

  $("resultNotice").textContent =
    "هذه أرقام تجريبية مولدة بقواعد محلية، وليست بيانات جُمعت من الإنترنت أو إعدادات مختبرة على هذا الهاتف.";

  renderSpecifications(selectedDevice);
  renderSettings(settings);

  const status = $("sourceStatus");
  status.textContent =
    "المواصفات مأخوذة من قائمة مدمجة داخل الكود وليست متحققة آنيًا. لم يتم إجراء بحث على الإنترنت، وقيم الحساسية وDPI تقديرية. يجب ربط مصدر موثوق للتحقق من مواصفات الأجهزة وإظهار روابطه هنا.";

  resultModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  $("copyBtn").onclick = async () => {
    const text = [
      `Katshr Sensitivity`,
      `Device: ${selectedDevice.brand} ${selectedDevice.name}`,
      "",
      ...settings.map((item) => `${item.label}: ${item.value}`),
      `DPI (suggested): ${dpi}`,
      "",
      "Note: These are experimental suggestions, not verified settings."
    ].join("\n");

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        if (!copied) throw new Error("Clipboard unavailable");
      }
      showToast("تم نسخ الإعدادات.");
    } catch (error) {
      showToast("تعذر النسخ تلقائيًا. جرّب فتح الموقع عبر HTTPS.");
    }
  };
}

function closeModal(type) {
  const modal = type === "analysis" ? analysisModal : resultModal;
  modal.classList.add("hidden");

  if (analysisModal.classList.contains("hidden") &&
      resultModal.classList.contains("hidden")) {
    document.body.style.overflow = "";
  }

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

brandSelect.addEventListener("change", updateModels);

modelSelect.addEventListener("change", () => {
  const brand = brandSelect.value;
  const index = Number(modelSelect.value);

  if (!brand || modelSelect.value === "" || !DEVICE_CATALOG[brand][index]) {
    selectedDevice = null;
    generateBtn.disabled = true;
    return;
  }

  const modelName = DEVICE_CATALOG[brand][index][0];
  chooseDevice(brand, modelName);
});

modelSearch.addEventListener("input", () => {
  renderSearchResults(modelSearch.value);
});

modelSearch.addEventListener("focus", () => {
  if (modelSearch.value.trim()) renderSearchResults(modelSearch.value);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-wrap") &&
      !event.target.closest("#searchResults") &&
      !event.target.closest("#modelSearch")) {
    searchResults.classList.add("hidden");
  }
});

document.querySelectorAll('input[name="gameStyle"]').forEach((input) => {
  input.addEventListener("change", updateStyleCards);
});

generateBtn.addEventListener("click", () => {
  if (!selectedDevice) {
    showToast("اختر الشركة وموديل الهاتف أولًا.");
    return;
  }
  scheduleAnalysis();
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeModal(button.dataset.close));
});

$("newDeviceBtn").addEventListener("click", () => {
  closeModal("result");
  selectedDevice = null;
  brandSelect.value = "";
  updateModels();
  modelSelect.value = "";
  modelSearch.value = "";
  generateBtn.disabled = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!analysisModal.classList.contains("hidden")) closeModal("analysis");
  else if (!resultModal.classList.contains("hidden")) closeModal("result");
});

initBrands();
updateModels();
updateStyleCards();
