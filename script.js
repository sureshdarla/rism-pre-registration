const scriptURL = "https://script.google.com/macros/s/AKfycbx1Q_df69a0702oVDnc8E0mUQYsz37wpZ2qj52Z14CfT0axedjLOz-ehMq1tdaW2nTd/exec";


// Load YouTube Iframe API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

var player;

// YouTube API Ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player("bgVideo", {
    events: {
      'onReady': onPlayerReady
    }
  });
}

// Autoplay muted
function onPlayerReady() {
  player.mute();
  player.setVolume(0);
}

/* ----------------------------------------
   PROGRAM LIST OPTIONS
---------------------------------------- */
const PROGRAM_OPTIONS = {
  UG: [
    "B.Tech – Computer Science & Artificial Intelligence",
    "B.Tech – Electrical Sciences",
    "B.Tech – Aerospace Engineering",
    "Bachelors of Business Adminstration - BBA(Hons) ",
    "Not sure yet / Just exploring"
  ],
  PG: [
    // "M.Tech – Computer Science and Artificial Intelligence",
    // "M.Tech – Electrical Sciences",
    // "M.Tech – Aerospace Engineering",
    "Master of Business Adminstration - MBA"
  ]
  // ,
  // PhD: [
  //   "PhD – Business Adminstration",
  //   "PhD – Electrical Sciences",
  //   "PhD – Computer Science and Artificial Intelligence",
  //   "PhD – Aerospace Engineering"
  // ]
};

/* ----------------------------------------
   QUALIFICATION STATUS OPTIONS
---------------------------------------- */
const STATUS_OPTIONS = {
  UG: [
    "12th / II PUC – Appearing",
    "12th / II PUC – Completed"
  ],
  PG: [
    "UG – Appearing (Final Semester)",
    "UG – Completed"
  ],
  PhD: [
    "PG / Masters – Appearing (Final Semester)",
    "PG / Masters – Completed"
  ]
};

/* ----------------------------------------
   INDIA STATES
---------------------------------------- */
const INDIA_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha",
  "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal"
];

/* ----------------------------------------
   COUNTRY LIST
---------------------------------------- */
const COUNTRY_LIST = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina",
  "Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados",
  "Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana",
  "Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon",
  "Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo (Congo-Brazzaville)","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic",
  "Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini (Swaziland)",
  "Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece",
  "Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Holy See","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia",
  "Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali",
  "Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
  "Montenegro","Morocco","Mozambique","Myanmar (Burma)","Namibia","Nauru","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan",
  "Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines",
  "Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles",
  "Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa",
  "South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago",
  "Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom",
  "United States of America","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];


/* ----------------------------------------
   MAIN LOGIC
---------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

  const levelSelect = document.getElementById("level");
  const programSelect = document.getElementById("program");
  const gradeSelect = document.getElementById("grade");
  const gradeLabel = document.getElementById("gradeLabel");
  const employmentField = document.getElementById("employmentField");

  const nationalitySelect = document.getElementById("nationality");
  const stateField = document.getElementById("stateField");
  const countryField = document.getElementById("countryField");
  const stateSelect = document.getElementById("state");
  const countrySelect = document.getElementById("country");

  function loadOptions(selectElem, list) {
    selectElem.innerHTML = `<option value="">Select one</option>`;
    list.forEach(item => {
      let opt = document.createElement("option");
      opt.value = item;
      opt.textContent = item;
      selectElem.appendChild(opt);
    });
  }

  /* LEVEL LOGIC */
  levelSelect.addEventListener("change", () => {
    const level = levelSelect.value;

    programSelect.innerHTML = `<option value="">Select one</option>`;
    gradeSelect.innerHTML = `<option value="">Select one</option>`;

    PROGRAM_OPTIONS[level]?.forEach(p => {
      let op = document.createElement("option");
      op.value = p;
      op.textContent = p;
      programSelect.appendChild(op);
    });

    STATUS_OPTIONS[level]?.forEach(s => {
      let op = document.createElement("option");
      op.value = s;
      op.textContent = s;
      gradeSelect.appendChild(op);
    });

    if (level === "PhD") {
      employmentField.style.display = "block";
    } else {
      employmentField.style.display = "none";
    }
  });

  /* NATIONALITY LOGIC */
  nationalitySelect.addEventListener("change", () => {
    if (nationalitySelect.value === "Indian") {
      stateField.style.display = "block";
      countryField.style.display = "none";
      loadOptions(stateSelect, INDIA_STATES);
      countrySelect.value = ""; // Clear country value when state is shown
    } else if (nationalitySelect.value === "NRI" || nationalitySelect.value === "OCI" || nationalitySelect.value === "International") {
      stateField.style.display = "none";
      countryField.style.display = "block";
      loadOptions(countrySelect, COUNTRY_LIST);
      stateSelect.value = ""; // Clear state value when country is shown
    } else {
      // Handle default/empty case if needed
      stateField.style.display = "none";
      countryField.style.display = "none";
      stateSelect.value = "";
      countrySelect.value = "";
    }
  });

  // Run nationality logic on load (fixes state/country missing!)
  nationalitySelect.dispatchEvent(new Event("change"));

  /* FORM SUBMIT */
  const form = document.getElementById("preRegForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // --- ⭐ FIX APPLIED HERE ⭐ ---
    const currentNationality = nationalitySelect.value;
    
    let submissionState = "";
    let submissionCountry = "";

    if (currentNationality === "Indian") {
      submissionState = stateSelect.value;
    } else if (currentNationality === "NRI" || currentNationality === "OCI" || currentNationality === "International") {
      submissionCountry = countrySelect.value;
    }
    // --- ⭐ END FIX ⭐ ---

const formData = {
  name: document.getElementById("name").value,
  city: document.getElementById("city").value,
  gender: document.getElementById("gender").value,   // ⭐ NEW FIELD
  email: document.getElementById("email").value,
  phone: document.getElementById("phone").value,
  level: levelSelect.value,
  program: programSelect.value,
  grade: gradeSelect.value,
  employment: document.getElementById("employment")?.value || "",
  nationality: currentNationality,
  state: submissionState,
  country: submissionCountry,
  mode: document.getElementById("mode").value,
  hear: document.getElementById("hear").value,
  questions: document.getElementById("questions").value
};


    console.log("Submitting:", formData);

// ... inside form.addEventListener("submit", async (e) => { ...

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(formData)
      });

      // Check if the response status is OK (200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "success") {
        window.location.href = "wel-thank.html";
        form.reset();
      } else if (result.status === "error" && result.message) { 
            // This checks for the specific error status and message
            if (result.message.includes("Duplicate entry")) {
                alert("🛑 Registration Failed: " + result.message);
            } else {
                alert("Failed to submit. Error: " + result.message);
            }
      } else {
        alert("Failed to submit. Try again.");
      }
    } catch (error) {
      alert("Error submitting the form: " + error.message);
    }
  }); // <-- End of event listener

  /* SOUND BUTTON */
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  soundToggleBtn.addEventListener("click", () => {
    if (player.isMuted()) {
      player.unMute();
      player.setVolume(100);
      soundToggleBtn.innerHTML = "🔇 Mute Sound";
    } else {
      player.mute();
      soundToggleBtn.innerHTML = "🔊 Enable Sound";
    }
  });

  /* MINIMIZE TOGGLE */
const toggleBtn = document.getElementById("toggleForm");
const formCard = document.querySelector(".form-card");

if (toggleBtn && formCard) {
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    formCard.classList.toggle("collapsed");

    toggleBtn.textContent =
      formCard.classList.contains("collapsed") ? "+ Expand" : "− Minimize";
  });

  formCard.addEventListener("click", () => {
    if (formCard.classList.contains("collapsed")) {
      formCard.classList.remove("collapsed");
      toggleBtn.textContent = "− Minimize";
    }
  });
}

// FORCE RUN NATIONALITY LOGIC AFTER DOM is ready
setTimeout(() => {
  nationalitySelect.dispatchEvent(new Event("change"));
  console.log("Nationality logic initialized");
}, 200);


});

