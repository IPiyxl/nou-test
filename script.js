document.addEventListener('DOMContentLoaded', () => {
  let suma = 0;
  let logs = [];

  const sumaDisplay = document.getElementById('suma');
  const adaugaBtn = document.querySelector('.adauga');
  const retrageBtn = document.querySelector('.retragere');
  const overlay = document.getElementById('overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalForm = document.getElementById('modal-form');
  const submitBtn = document.getElementById('submit-btn');
  const numeInput = document.getElementById('nume');
  const callsignInput = document.getElementById('callsign');
  const scopInput = document.getElementById('scop');
  const sumaInput = document.getElementById('suma-input');
  const logsBtn = document.querySelector('.logs');
  const logsOverlay = document.getElementById('logs-overlay');
  const logsList = document.getElementById('logs-list');
  const closeLogsBtn = document.getElementById('close-logs-btn');

  let actiune = "adauga"; // sau "retrage"

  function actualizeazaAfisaj() {
    sumaDisplay.textContent = `${suma.toLocaleString('de-DE')}$`;
  }

  function deschideMeniu(tip) {
    overlay.style.display = "flex";
    actiune = tip;
    if (tip === "adauga") {
      modalTitle.textContent = "Adaugă bani";
      numeInput.placeholder = "Numele celui care depozitează";
      callsignInput.placeholder = "Call Sign-ul cui îi dai banii";
      scopInput.placeholder = "Scopul banilor";
      sumaInput.placeholder = "Suma";
      submitBtn.textContent = "Adaugă";
    } else {
      modalTitle.textContent = "Retrage bani";
      numeInput.placeholder = "Numele celui care retrage";
      callsignInput.placeholder = "Call Sign-ul celui care retrage";
      scopInput.placeholder = "Scopul retragerii";
      sumaInput.placeholder = "Suma";
      submitBtn.textContent = "Retrage";
    }
    modalForm.reset();
  }

  adaugaBtn.addEventListener('click', () => deschideMeniu("adauga"));
  retrageBtn.addEventListener('click', () => deschideMeniu("retrage"));

  // Închide meniul la click pe overlay (dar nu pe modal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sumaVal = Number(sumaInput.value);
    const callsignVal = callsignInput.value;
    if (
      !isNaN(sumaVal) && sumaVal > 0 &&
      callsignVal !== "" && !isNaN(Number(callsignVal))
    ) {
      let logEntry = {
        tip: actiune,
        nume: numeInput.value,
        callsign: callsignVal,
        scop: scopInput.value,
        suma: sumaVal,
        data: new Date().toLocaleString('ro-RO')
      };
      if (actiune === "adauga") {
        suma += sumaVal;
      } else {
        suma -= sumaVal;
      }
      logs.unshift(logEntry); // cel mai nou la început
      actualizeazaAfisaj();
      overlay.style.display = "none";
    } else {
      alert("Te rog introdu o sumă validă și un Call Sign numeric!");
    }
  });

  logsBtn.addEventListener('click', () => {
    logsOverlay.style.display = "flex";
    if (logs.length === 0) {
      logsList.innerHTML = "<em>Nu există loguri.</em>";
    } else {
      logsList.innerHTML = logs.map(log =>
        `<div style="margin-bottom:10px;">
          <b>${log.tip === "adauga" ? "Adăugare" : "Retragere"}</b> - 
          <b>Suma:</b> ${log.suma.toLocaleString('de-DE')}$<br>
          <b>Nume:</b> ${log.nume} | <b>Call Sign:</b> ${log.callsign}<br>
          <b>Scop:</b> ${log.scop}<br>
          <span style="font-size:12px;color:#aaa;">${log.data}</span>
        </div>`
      ).join('');
    }
  });

  closeLogsBtn.addEventListener('click', () => {
    logsOverlay.style.display = "none";
  });

  // Închide logs la click pe overlay
  logsOverlay.addEventListener('click', (e) => {
    if (e.target === logsOverlay) {
      logsOverlay.style.display = "none";
    }
  });

  actualizeazaAfisaj();
});
