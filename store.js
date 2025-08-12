// Local data store (seed + helpers)
const KEY = 'gvgData_ui_v1';

const seed = [
  {
    defense: ["Rinak","Boss Arunka","Empyrean Ilynav"],
    offenses: [
      {
        team: ["Diene","Fallen Cecilia","Sylvan Sage Vivian"],
        text: "Barrière + immunité pour temporiser Arunka, strip Ilynav si possible.",
        links: ["https://exemple1","https://exemple2","https://exemple3"]
      },
      { team: ["Krau","Straze","New Moon Luna"], text: "Burst sur Arunka.", links: [] },
      { team: ["Frida","Lidica","Blood Blade Karin"], text: "CR push + anti-barrière.", links: [] },
    ]
  }
];

const norm = s => s.trim().toLowerCase().replace(/\s+/g,' ');
const defKey = arr => [...arr].map(norm).sort().join("|");

function getData(){
  const raw = localStorage.getItem(KEY);
  if(!raw){ localStorage.setItem(KEY, JSON.stringify(seed)); return JSON.parse(JSON.stringify(seed)); }
  try { return JSON.parse(raw); } catch { return JSON.parse(JSON.stringify(seed)); }
}
function setData(arr){ localStorage.setItem(KEY, JSON.stringify(arr)); }

function upsertMatchup(defArr){
  const data = getData();
  const key = defKey(defArr);
  let idx = data.findIndex(m => defKey(m.defense) === key);
  if(idx === -1){ data.push({ defense:[...defArr], offenses: [] }); idx = data.length-1; }
  setData(data);
  return idx;
}
function addOffense(defArr, teamArr, text='', links=[]){
  if(teamArr.length!==3) throw new Error("Team offense = 3 héros");
  const data = getData();
  const idx = upsertMatchup(defArr);
  (data[idx].offenses ||= []).push({ team:[...teamArr], text, links: links.filter(Boolean) });
  setData(data);
  return { idx, teamIdx: data[idx].offenses.length-1 };
}
