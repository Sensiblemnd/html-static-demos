const supportNote = document.querySelector("#support-note");
const readout = document.querySelector("#geo-readout");
const errorBox = document.querySelector("#geo-error");
const latOut = document.querySelector("#geo-lat");
const lngOut = document.querySelector("#geo-lng");
const accOut = document.querySelector("#geo-acc");

function showPosition(coords) {
  errorBox.hidden = true;
  readout.hidden = false;
  latOut.textContent = coords.latitude.toFixed(4);
  lngOut.textContent = coords.longitude.toFixed(4);
  accOut.textContent = `${Math.round(coords.accuracy)}m`;
}

function showError(message) {
  readout.hidden = true;
  errorBox.hidden = false;
  errorBox.textContent = message;
}

if (typeof HTMLGeolocationElement === "function") {
  supportNote.innerHTML =
    "<strong>Supported.</strong> The button below is the browser's own <code>&lt;geolocation&gt;</code> control, not a styled <code>&lt;button&gt;</code>.";

  const geo = document.querySelector("geolocation");
  geo.addEventListener("location", () => {
    if (geo.position) {
      showPosition(geo.position.coords);
    } else if (geo.error) {
      showError(geo.error.message);
    }
  });
} else {
  supportNote.innerHTML =
    "<strong>Not supported here.</strong> Falling back to the classic <code>navigator.geolocation</code> API behind a plain button, this is what every non-Chrome visitor sees, and likely what you see too, since this element is still origin-trial/flag-gated even on Chrome versions that ship it.";

  document.querySelector("#fallback-btn").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      (position) => showPosition(position.coords),
      (error) => showError(error.message),
    );
  });
}
