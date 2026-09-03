const supportNote = document.querySelector("#support-note");
const preview = document.querySelector("#preview");
const errorBox = document.querySelector("#media-error");

function showStream(stream) {
  errorBox.hidden = true;
  preview.hidden = false;
  preview.srcObject = stream;
}

function showError(name) {
  preview.hidden = true;
  errorBox.hidden = false;
  errorBox.textContent = `Couldn't get camera/mic access: ${name}`;
}

if (typeof HTMLUserMediaElement === "function") {
  supportNote.innerHTML =
    "<strong>Supported.</strong> The button below is the browser's own <code>&lt;usermedia&gt;</code> control, not a styled <code>&lt;button&gt;</code>.";

  const media = document.querySelector("#media-ctrl");
  media.addEventListener("stream", () => {
    showStream(media.stream);
  });
  media.addEventListener("error", () => {
    showError(media.error?.name ?? "unknown error");
  });
} else {
  supportNote.innerHTML =
    "<strong>Not supported here.</strong> Falling back to the classic <code>navigator.mediaDevices.getUserMedia()</code> API behind a plain button, this is what every non-Chrome visitor sees, and likely what you see too, since this element is still origin-trial/flag-gated even on Chrome versions that ship it.";

  document.querySelector("#fallback-btn").addEventListener("click", async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      showStream(stream);
    } catch (error) {
      showError(error.name);
    }
  });
}
