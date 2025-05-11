function sendToWebhook(entry) {
  const embed = {
    title: entry.tip === "adauga" ? "ADAUGARE" : "SCOATERE",
    color: entry.tip === "adauga" ? 0x00ff00 : 0xff0000,
    fields: [
      { name: "Nume", value: entry.nume },
      { name: "Callsign", value: `[${entry.callsign}]` },
      { name: "Scop", value: entry.scop },
      { name: "Suma", value: `${entry.suma} RON` },
      { name: "Data", value: entry.data }
    ]
  };

  fetch("/api/trimiteDiscord", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] })
  }).then(res => {
    if (!res.ok) console.warn("Eroare la trimitere.");
  });
}
