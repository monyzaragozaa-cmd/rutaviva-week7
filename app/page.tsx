"use client";

import { useState } from "react";

type ReportStep = "compose" | "review" | "sent";
type Category = "Road hazard" | "Infrastructure" | "Traffic" | "Other";

const MAX_REPORT_LENGTH = 240;
const sampleVoiceReport = "Hay un bache grande en el carril derecho antes del cruce.";

function classifyReport(report: string): Category {
  const text = report.toLocaleLowerCase();

  if (/bache|hoyo|pothole|derrumbe|piedra|obst[aá]culo|inundaci[oó]n/.test(text)) {
    return "Road hazard";
  }
  if (/luz|sem[aá]foro|se[nñ]al|banqueta|puente|infraestructura|alcantarilla/.test(text)) {
    return "Infrastructure";
  }
  if (/tr[aá]fico|traffic|congesti[oó]n|congestion|backed up|slow traffic|choque|accidente|fila|atasco/.test(text)) {
    return "Traffic";
  }
  return "Other";
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
      setError("Add a short description before continuing.");
      return;
    }
    if (trimmedReport.length > MAX_REPORT_LENGTH) {
      setError(`Keep your report under ${MAX_REPORT_LENGTH} characters.`);
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
        <a className="brand" href="#home" aria-label="RutaViva home">
          <span className="brand-mark"><PinIcon /></span>
          <span>Ruta<span>Viva</span></span>
        </a>
        <div className="topbar-meta">
          <span className="demo-pill"><span /> Simulated route</span>
          <button className="help-button" type="button" aria-label="About RutaViva" title="About this prototype">i</button>
        </div>
      </header>

      <div className="dashboard" id="home">
        <section className="welcome-copy" aria-labelledby="welcome-title">
          <div className="eyebrow"><span className="eyebrow-line" /> COLECTIVO CORRIDOR · CDMX</div>
          <h1 id="welcome-title">A safer route<br />starts <em>with us.</em></h1>
          <p>Share what’s happening on the road. Your report helps a coordinator spot hazards, without tracking you.</p>
        </section>

        <section className="route-section" aria-labelledby="route-title">
          <div className="section-heading">
            <div>
              <div className="section-kicker">YOUR CORRIDOR</div>
              <h2 id="route-title">Insurgentes Sur</h2>
            </div>
            <span className="route-tag"><span className="route-tag-dot" /> Active route</span>
          </div>

          <div className="map-frame" role="img" aria-label="Simulated map of the Insurgentes Sur colectivo corridor with an approximate hazard area near Colonia Roma">
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
            <div className="approx-zone"><span className="approx-pulse" /><PinIcon /><span>Approx. area</span></div>
            <div className="map-compass" aria-hidden="true">N <span>↑</span></div>
            <div className="map-caption"><span className="caption-dot" /> Live corridor <span className="caption-divider" /> Not your location</div>
          </div>

          <div className="route-summary">
            <div className="summary-start"><span className="stop-dot start-dot" /><div><strong>Av. Insurgentes Sur</strong><small>North corridor</small></div></div>
            <span className="summary-rule" aria-hidden="true" />
            <div className="summary-end"><span className="stop-dot end-dot" /><div><strong>Col. Roma</strong><small>South corridor</small></div></div>
            <span className="route-distance">SIMULATED</span>
          </div>
        </section>

        <aside className="privacy-note">
          <span className="privacy-icon"><ShieldIcon /></span>
          <div><strong>Your report. Your choice.</strong><p>Nothing is sent until you review and agree.</p></div>
          <span className="note-arrow" aria-hidden="true">↗</span>
        </aside>

        <button className="report-button" type="button" onClick={openReport}>
          <span className="report-button-icon" aria-hidden="true">+</span>
          <span>Report a road risk</span>
          <span className="report-button-arrow" aria-hidden="true">→</span>
        </button>
        <p className="below-cta-note">No account. No driver tracking. Just a safer corridor.</p>
      </div>

      <footer className="app-footer"><span>RutaViva <b>·</b> Driver Data Control</span><span>Prototype · all data simulated</span></footer>

      {step && (
        <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeReport(); }}>
          <section className="report-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <div className="dialog-topline"><span className="dialog-brand"><span className="brand-mark small-mark"><PinIcon /></span> RutaViva</span><button className="close-button" type="button" onClick={closeReport} aria-label="Close report">×</button></div>
            {step === "compose" && (
              <>
                <div className="dialog-step">01 <span /> REPORT A ROAD RISK</div>
                <h2 id="dialog-title">What’s happening<br />on the road?</h2>
                <p className="dialog-intro">A few words are enough. We’ll attach an approximate area, not your live location.</p>
                <div className="mode-switch" role="group" aria-label="Report input method">
                  <button type="button" className={inputMode === "text" ? "mode-option selected" : "mode-option"} onClick={() => setInputMode("text")}>Write a report</button>
                  <button type="button" className={inputMode === "voice" ? "mode-option selected" : "mode-option"} onClick={() => { setInputMode("voice"); setReport(sampleVoiceReport); setError(""); }}>Use voice</button>
                </div>
                {inputMode === "voice" && <div className="voice-notice"><span className="voice-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span><span><strong>Simulated voice capture</strong><small>Example transcription added. Edit it before continuing.</small></span></div>}
                <label className="report-label" htmlFor="report-text">Your report <span>Required</span></label>
                <textarea id="report-text" value={report} maxLength={280} onChange={(event) => { setReport(event.target.value); setError(""); }} placeholder="For example: deep pothole in the right lane near the crossing…" />
                <div className="input-meta"><span className={report.length > MAX_REPORT_LENGTH ? "length-count over-limit" : "length-count"}>{report.length}/{MAX_REPORT_LENGTH} characters</span><span>Don’t include names or plates</span></div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <div className="location-preview"><span className="location-preview-icon"><PinIcon /></span><span><strong>Approximate location attached</strong><small>Av. Insurgentes Sur · Col. Roma · simulated</small></span><span className="approx-label">Approx.</span></div>
                <p className="tracking-note">Approximate report location only. RutaViva does not continuously track the driver.</p>
                <div className="classification"><span className="classification-mark">AI</span><span><strong>Simulated AI classification</strong><small>{report.trim() ? category : "Category appears when you add a report"}</small></span><span className="category-chip">{report.trim() ? category : "Pending"}</span></div>
                <div className="dialog-actions"><button className="text-button" type="button" onClick={closeReport}>Cancel</button><button className="primary-button" type="button" onClick={continueToReview}>Review privacy <span aria-hidden="true">→</span></button></div>
              </>
            )}
            {step === "review" && (
              <>
                <div className="dialog-step">02 <span /> YOUR DATA, YOUR CHOICE</div>
                <h2 id="dialog-title">Review before<br />you share.</h2>
                <p className="dialog-intro">This is exactly what will be sent with your anonymous report.</p>
                <div className="review-report"><span className="review-label">YOUR REPORT</span><p>“{report.trim()}”</p><span className="review-category">{category} <small>· Simulated AI classification</small></span></div>
                <div className="data-columns">
                  <section className="data-list share-list"><h3><span>+</span> THIS REPORT WILL SHARE</h3><ul><li>Approximate location</li><li>Hazard category</li><li>Approximate time</li></ul></section>
                  <section className="data-list private-list"><h3><span>−</span> THIS REPORT WILL NOT SHARE</h3><ul><li>Driver name</li><li>Individual speed</li><li>Complete route history</li><li>Driver safety score</li></ul></section>
                </div>
                <div className="access-row"><span className="access-icon"><ShieldIcon /></span><span><small>WHO CAN ACCESS THIS?</small><strong>Route safety coordinator</strong><em>They review reports before any public safety claim.</em></span></div>
                <label className="consent-check"><input type="checkbox" checked={consented} onChange={(event) => setConsented(event.target.checked)} /><span className="custom-check" aria-hidden="true">✓</span><span>I understand what will be shared and choose to send this report.</span></label>
                <div className="dialog-actions"><button className="text-button" type="button" onClick={closeReport}>Cancel report</button><button className="primary-button" type="button" onClick={submitReport} disabled={!consented}>Send anonymous safety report <span aria-hidden="true">→</span></button></div>
              </>
            )}
            {step === "sent" && (
              <div className="confirmation-state">
                <div className="confirmation-icon"><ShieldIcon /></div>
                <div className="dialog-step">REPORT RV-042 <span /> SIMULATED</div>
                <h2 id="dialog-title">Thanks for looking<br />out for the route.</h2>
                <p className="dialog-intro">Your anonymous report is with the route safety coordinator. No driver profile was created.</p>
                <div className="status-card"><span className="status-indicator" /><span><strong>Received · pending human review</strong><small>A coordinator will verify the hazard before it is shared.</small></span></div>
                <div className="sent-summary"><span>{category}</span><span>Approx. Col. Roma</span><span>Time · approximate</span></div>
                <button className="primary-button full-button" type="button" onClick={closeReport}>Back to route <span aria-hidden="true">→</span></button>
                <p className="confirmation-footnote">Simulation only · Nothing was sent to a real coordinator.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}