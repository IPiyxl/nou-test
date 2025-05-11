function trimitePeDiscord(logEntry) {
  // ATENȚIE: Din browser, Discord va bloca această cerere din cauza CORS!
  // Pentru producție, folosește un backend intermediar.

  const webhookUrl = "https://discord.com/api/webhooks/1371061819879194674/IjNKNrn2yMxQRiJStNxjgcHQ5x0MVCyt3oqpi30dytFGX5ntlPuf4BMF3ZsQDmNgCm9p";

  const embed = {
    title: logEntry.tip === "adauga" ? "ADAUGARE" : "SCOATERE",
    color: logEntry.tip === "adauga" ? 0x1cb14f : 0x8b0019,
    fields: [
      { name: "Nume", value: logEntry.nume, inline: false },
      { name: "Callsign", value: `[${logEntry.callsign}]`, inline: false },
      { name: "Scop", value: logEntry.scop, inline: false },
      { name: "Suma", value: `${logEntry.suma.toLocaleString('de-DE')} RON`, inline: false },
      { name: "Data", value: logEntry.data, inline: false }
    ]
  };

  const mesaj = {
    embeds: [embed]
  };

  // Încearcă să trimiți direct (va funcționa doar dacă CORS nu blochează)
  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mesaj)
  }).then(r => {
    if (!r.ok) {
      alert("Mesajul nu a putut fi trimis pe Discord (CORS sau altă eroare)!");
    }
  }).catch(() => {
    alert("Mesajul nu a putut fi trimis pe Discord!");
  });
}