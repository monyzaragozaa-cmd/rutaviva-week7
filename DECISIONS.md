# RutaViva — Week 7 Decisions

## Build Decisions

- RutaViva focuses on one simulated colectivo corridor in Mexico City.
- The prototype is NOT a ride-hailing app.
- All route, location, report, and AI data used in the prototype is simulated.
- The driver can report a road hazard using text or a voice interaction.
- Geodata is represented through a simulated corridor and approximate report location.
- ML is represented through a lightweight simulated hazard classification and is clearly labeled as simulated AI.
- The prototype does not create an individual driver safety score.
- The prototype does not continuously track the driver.
- Driver-generated mobility data cannot silently become a surveillance or disciplinary tool.
- The driver sees what data WILL and WILL NOT be shared before submitting a report.
- The driver also sees who can access the report.

## Mechanical Test

The first Vercel deployment was tested through the complete reporting flow.

A previous test exposed a traffic-classification issue where an English traffic report such as “Traffic is backed up...” was not classified correctly. This was fixed and the build passed ESLint and the production build.

After the first deployment, the privacy language was also improved to explicitly state:

“Approximate report location only. RutaViva does not continuously track the driver.”

The fix was committed, pushed, and redeployed successfully.

## Persona Test

Synthetic persona: Carlos, 46, colectivo driver in Mexico City.

The test showed that the biggest usability and trust problem was language and tracking ambiguity. The interface was mainly in English even though the intended user is a Mexican colectivo driver. Terms such as “Active route” and “Live corridor” could also suggest continuous tracking.

Based on the Persona Test, the driver-facing experience was changed to Mexican Spanish and route labels were changed to clearer terms such as “Tramo de ejemplo” and “Corredor simulado.”

The protections remain explicit:
- Approximate report location only
- No continuous driver tracking
- No individual driver score
- Simulated AI clearly labeled
- Simulated data clearly labeled

## Tomorrow's First Move

Open the final Vercel production URL and run one final end-to-end check of the Spanish reporting flow before recording the demo video.