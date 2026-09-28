"use client";

import { useState } from "react";

type ReportStep = "compose" | "review" | "sent";
type Category = "Peligro vial" | "Infraestructura" | "Tráfico" | "Otro";

const MAX_REPORT_LENGTH = 240;
const sampleVoiceReport = "Hay un bache grande en el carril derecho antes del cruce.";

function classifyReport(report: string): Category {
  const text = report.toLocaleLowerCase();

  if (/bache|hoyo|pothole|derrumbe|piedra|obst[aá]culo|inundaci[oó]n/.test(text)) {
    return "Peligro vial";
  }
  if (/luz|sem[aá]foro|se[nñ]al|banqueta|puente|infraestructura|alcantarilla/.test(text)) {
    return "Infraestructura";
  }
  if (/tr[aá]fico|traffic|congesti[oó]n|congestion|backed up|slow traffic|choque|accidente|fila|atasco/.test(text)) {
    return "Tráfico";
  }
  return "Otro";
}

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M12 3 19 6v5c0 4.7-3 8-7 10-4-2-7-5.3-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function Home() {
  const [step, setStep] = useState<ReportStep | null>(null);
  const [report, setReport] = useState("");
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");
  const [error, setError] = useState("");
  const [consented, setConsented] = useState(false);

  const category = classifyReport(report);

  function openReport() {
    setReport("");
    setError("");
    setConsented(false);
    setInputMode("text");
    setStep("compose");
  }

  function closeReport() {
    setStep(null);
    setReport("");
    setError("");
    setConsented(false);
  }

  function continueToReview() {
    const trimmedReport = report.trim();

    if (!trimmedReport) {
      setError("Escribe una breve descripción para continuar.");
      return;
    }
    if (trimmedReport.length > MAX_REPORT_LENGTH) {
      setError(`Tu reporte debe tener menos de ${MAX_REPORT_LENGTH} caracteres.`);
      return;
    }

    setError("");
    setStep("review");
  }

  function submitReport() {
    if (!consented) return;
    setStep("sent");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Inicio de RutaViva">
          <span className="brand-mark"><PinIcon /></span>
          <span>Ruta<span>Viva</span></span>
        </a>
        <div className="topbar-meta">
          <span className="demo-pill"><span /> Ruta simulada</span>
          <button className="help-button" type="button" aria-label="Acerca de RutaViva" title="Acerca de este prototipo">i</button>
        </div>
      </header>

      <div className="dashboard" id="home">
        <section className="welcome-copy" aria-labelledby="welcome-title">
          <div className="eyebrow"><span className="eyebrow-line" /> CORREDOR DE COLECTIVO · CDMX</div>
          <h1 id="welcome-title">Una ruta más<br />segura <em>entre todos.</em></h1>
          <p>Cuéntanos qué pasa en el camino. Tu reporte ayuda a coordinación a detectar riesgos, sin rastrearte.</p>
        </section>

        <section className="route-section" aria-labelledby="route-title">
          <div className="section-heading">
            <div>
              <div className="section-kicker">CORREDOR SIMULADO</div>
              <h2 id="route-title">Insurgentes Sur</h2>
            </div>
            <span className="route-tag"><span className="route-tag-dot" /> Tramo de ejemplo</span>
          </div>

          <div className="map-frame" role="img" aria-label="Mapa simulado del corredor de colectivo Insurgentes Sur, con una zona de riesgo aproximada cerca de la colonia Roma">
            <div className="map-grid" />
            <div className="map-block block-one" /><div className="map-block block-two" />
            <div className="map-block block-three" /><div className="map-block block-four" />
            <div className="map-block block-five" /><div className="map-block block-six" />
            <div className="map-park park-one" /><div className="map-park park-two" />
            <span className="street-label street-one">AV. INSURGENTES SUR</span>
            <span className="street-label street-two">AV. CHAPULTEPEC</span>
            <span className="map-neighborhood">ROMA NORTE</span>
            <span className="map-neighborhood neighborhood-two">CONDESA</span>
            <svg className="route-line" viewBox="0 0 640 320" preserveAspectRatio="none" aria-hidden="true">
              <path className="route-shadow" d="M115 32 C135 76 152 90 172 112 S199 148 232 158 S280 160 310 196 S363 236 404 242 S479 235 520 287" />
              <path className="route-stroke" d="M115 32 C135 76 152 90 172 112 S199 148 232 158 S280 160 310 196 S363 236 404 242 S479 235 520 287" />
              <circle className="route-stop" cx="115" cy="32" r="5" />
              <circle className="route-stop" cx="310" cy="196" r="5" />
              <circle className="route-stop" cx="520" cy="287" r="5" />
            </svg>
            <div className="map-pin start-pin"><span /></div>
            <div className="map-pin end-pin"><span /></div>
            <div className="approx-zone"><span className="approx-pulse" /><PinIcon /><span>Zona aprox.</span></div>
            <div className="map-compass" aria-hidden="true">N <span>↑</span></div>
            <div className="map-caption"><span className="caption-dot" /> Corredor simulado <span className="caption-divider" /> No es tu ubicación</div>
          </div>

          <div className="route-summary">
            <div className="summary-start"><span className="stop-dot start-dot" /><div><strong>Av. Insurgentes Sur</strong><small>Tramo norte</small></div></div>
            <span className="summary-rule" aria-hidden="true" />
            <div className="summary-end"><span className="stop-dot end-dot" /><div><strong>Col. Roma</strong><small>Tramo sur</small></div></div>
            <span className="route-distance">SIMULADO</span>
          </div>
        </section>

        <aside className="privacy-note">
          <span className="privacy-icon"><ShieldIcon /></span>
          <div><strong>Tu reporte. Tú decides.</strong><p>No se envía nada hasta que lo revises y aceptes.</p></div>
          <span className="note-arrow" aria-hidden="true">↗</span>
        </aside>

        <button className="report-button" type="button" onClick={openReport}>
          <span className="report-button-icon" aria-hidden="true">+</span>
          <span>Reportar un riesgo vial</span>
          <span className="report-button-arrow" aria-hidden="true">→</span>
        </button>
        <p className="below-cta-note">Sin cuenta ni rastreo continuo del conductor. Solo un corredor más seguro.</p>
      </div>

      <footer className="app-footer"><span>RutaViva <b>·</b> Control de datos del conductor</span><span>Prototipo · todos los datos son simulados</span></footer>

      {step && (
        <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeReport(); }}>
          <section className="report-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <div className="dialog-topline"><span className="dialog-brand"><span className="brand-mark small-mark"><PinIcon /></span> RutaViva</span><button className="close-button" type="button" onClick={closeReport} aria-label="Cerrar reporte">×</button></div>
            {step === "compose" && (
              <>
                <div className="dialog-step">01 <span /> REPORTAR UN RIESGO VIAL</div>
                <h2 id="dialog-title">¿Qué pasa<br />en el camino?</h2>
                <p className="dialog-intro">Con unas palabras basta. Agregaremos una zona aproximada, no tu ubicación en tiempo real.</p>
                <div className="mode-switch" role="group" aria-label="Forma de escribir el reporte">
                  <button type="button" className={inputMode === "text" ? "mode-option selected" : "mode-option"} onClick={() => setInputMode("text")}>Escribir reporte</button>
                  <button type="button" className={inputMode === "voice" ? "mode-option selected" : "mode-option"} onClick={() => { setInputMode("voice"); setReport(sampleVoiceReport); setError(""); }}>Usar voz</button>
                </div>
                {inputMode === "voice" && <div className="voice-notice"><span className="voice-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span><span><strong>Simulación de reporte por voz</strong><small>Agregamos una transcripción de ejemplo. Puedes editarla antes de continuar.</small></span></div>}
                <label className="report-label" htmlFor="report-text">Tu reporte <span>Obligatorio</span></label>
                <textarea id="report-text" value={report} maxLength={280} onChange={(event) => { setReport(event.target.value); setError(""); }} placeholder="Por ejemplo: hay un bache profundo en el carril derecho, cerca del cruce…" />
                <div className="input-meta"><span className={report.length > MAX_REPORT_LENGTH ? "length-count over-limit" : "length-count"}>{report.length}/{MAX_REPORT_LENGTH} caracteres</span><span>No incluyas nombres ni placas</span></div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <div className="location-preview"><span className="location-preview-icon"><PinIcon /></span><span><strong>Ubicación aproximada del reporte</strong><small>Av. Insurgentes Sur · Col. Roma · simulada</small></span><span className="approx-label">Aprox.</span></div>
                <p className="tracking-note">Solo se comparte una ubicación aproximada del reporte. RutaViva no rastrea continuamente al conductor.</p>
                <div className="classification"><span className="classification-mark">IA</span><span><strong>Clasificación de IA simulada</strong><small>{report.trim() ? category : "Agrega un reporte para ver la categoría"}</small></span><span className="category-chip">{report.trim() ? category : "Pendiente"}</span></div>
                <div className="dialog-actions"><button className="text-button" type="button" onClick={closeReport}>Cancelar</button><button className="primary-button" type="button" onClick={continueToReview}>Revisar privacidad <span aria-hidden="true">→</span></button></div>
              </>
            )}
            {step === "review" && (
              <>
                <div className="dialog-step">02 <span /> TUS DATOS, TÚ DECIDES</div>
                <h2 id="dialog-title">Revisa antes<br />de compartir.</h2>
                <p className="dialog-intro">Esto es exactamente lo que se enviará con tu reporte anónimo.</p>
                <div className="review-report"><span className="review-label">TU REPORTE</span><p>“{report.trim()}”</p><span className="review-category">{category} <small>· Clasificación de IA simulada</small></span></div>
                <div className="data-columns">
                  <section className="data-list share-list"><h3><span>+</span> ESTE REPORTE COMPARTIRÁ</h3><ul><li>Ubicación aproximada</li><li>Categoría del riesgo</li><li>Hora aproximada</li></ul></section>
                  <section className="data-list private-list"><h3><span>−</span> ESTE REPORTE NO COMPARTIRÁ</h3><ul><li>Nombre del conductor</li><li>Velocidad individual</li><li>Historial completo de ruta</li><li>Calificación de seguridad del conductor</li></ul></section>
                </div>
                <div className="access-row"><span className="access-icon"><ShieldIcon /></span><span><small>¿QUIÉN PUEDE VERLO?</small><strong>Coordinación de seguridad de la ruta</strong><em>Verificará el reporte antes de compartir información pública sobre el riesgo.</em></span></div>
                <label className="consent-check"><input type="checkbox" checked={consented} onChange={(event) => setConsented(event.target.checked)} /><span className="custom-check" aria-hidden="true">✓</span><span>Entiendo qué datos se compartirán y elijo enviar este reporte.</span></label>
                <div className="dialog-actions"><button className="text-button" type="button" onClick={closeReport}>Cancelar reporte</button><button className="primary-button" type="button" onClick={submitReport} disabled={!consented}>Enviar reporte anónimo <span aria-hidden="true">→</span></button></div>
              </>
            )}
            {step === "sent" && (
              <div className="confirmation-state">
                <div className="confirmation-icon"><ShieldIcon /></div>
                <div className="dialog-step">REPORTE RV-042 <span /> SIMULADO</div>
                <h2 id="dialog-title">Gracias por cuidar<br />la ruta.</h2>
                <p className="dialog-intro">Tu reporte anónimo llegó a coordinación de seguridad. No se creó un perfil del conductor.</p>
                <div className="status-card"><span className="status-indicator" /><span><strong>Recibido · pendiente de revisión humana</strong><small>Coordinación verificará el riesgo antes de compartirlo.</small></span></div>
                <div className="sent-summary"><span>{category}</span><span>Zona aprox. · Col. Roma</span><span>Hora aproximada</span></div>
                <button className="primary-button full-button" type="button" onClick={closeReport}>Volver al corredor <span aria-hidden="true">→</span></button>
                <p className="confirmation-footnote">Simulación: no se envió nada a una coordinación real.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}