// store.js — stockage commun (localStorage)
const KEY = 'gvgData_v3';

const seed = [
  {
    defense: ["Rinak","Boss Arunka","Empyrean Ilynav"],
    offenses: [
      {
        team: ["Diene","Fallen Cecilia","Sylvan Sage Vivian"],
        text: "Barrière + Immunité pour temporiser Arunka, strip Ilynav si possible.",
        links: ["https://exemple1","https://exemple2","https://exemple3"]
      }
    ]
  }
];

const norm = s => s.trim().toLowerCase().replace(/\s+/g,' ');
const defKey = arr => [...arr].map(norm).sort().join("|");

function getData(){
  const raw = localStorage.getItem(KEY);
  if(!raw){ localStorage.setItem(KEY, JSON.stringify(seed)); return [...seed]; }
  try { return JSON.parse(raw); } catch { return [...seed]; }
}
function setData(arr){ localStorage.setItem(KEY, JSON.stringify(arr)); }

function findMatchup(defArr){
  const key = defKey(defArr);
  return getData().find(m => defKey(m.defense) === key) || null;
}

function upsertMatchup(defArr){
  const data = getData();
  const key = defKey(defArr);
  let idx = data.findIndex(m => defKey(m.defense) === key);
  if(idx === -1){
    data.push({ defense:[...defArr], offenses: [] });
    idx = data.length - 1;
  }
  setData(data);
  return idx;
}

function addOffense(defArr, teamArr, text='', links=[]){
  if(teamArr.length !== 3) throw new Error("Team offense = 3 héros");
  const data = getData();
  const idx = upsertMatchup(defArr);
  (data[idx].offenses ||= []).push({
    team:[...teamArr],
    text,
    links: links.filter(Boolean)
  });
  setData(data);
  return idx; // retourne l'index du matchup
}
