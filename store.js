function getData() {
    const data = localStorage.getItem("gvgData");
    return data ? JSON.parse(data) : [];
}

function saveData(data) {
    localStorage.setItem("gvgData", JSON.stringify(data));
}

function addAttack(defense, offense) {
    const data = getData();
    let existing = data.find(d => JSON.stringify(d.defense) === JSON.stringify(defense));

    if (!existing) {
        existing = { defense, offenses: [] };
        data.push(existing);
    }

    existing.offenses.push(offense);
    saveData(data);
}
