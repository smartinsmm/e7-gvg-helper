const STORAGE_KEY = 'gvgData_ui_v1';

const seedData = [
  {
    defense: ["Rinak", "Boss Arunka", "Empyrean Ilynav"],
    offenses: [
      ["Diene", "Fallen Cecilia", "Sylvan Sage Vivian"],
      ["Krau", "Straze", "New Moon Luna"],
      ["Frida", "Lidica", "Blood Blade Karin"]
    ]
  }
];

function getData() {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
  }
  return data;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function addOffense(defenseTeam, offenseTeam) {
  let data = getData();
  const idx = data.findIndex(d => arraysEqual(d.defense, defenseTeam));
  if (idx !== -1) {
    data[idx].offenses.push(offenseTeam);
  } else {
    data.push({ defense: defenseTeam, offenses: [offenseTeam] });
  }
  saveData(data);
}

function arraysEqual(a, b) {
  return Array.isArray(a) && Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val.toLowerCase() === b[index].toLowerCase());
}
