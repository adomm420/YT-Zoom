// 🔎 YT-Zoom (YouTube Player Zoom Toggle)
// Version: 1.0.0
// Author: Mantas Adomavičius
// License: MIT

(() => {
  const video = document.querySelector("video.video-stream.html5-main-video");
  if (!video) return;

  const overlayId = "yt-zoom-overlay";
  const siblingId = "yt-zoom-sibling";

  const masthead = document.getElementById("masthead-container");
  const overlay = document.getElementById(overlayId);
  const sibling = document.getElementById(siblingId);
  const player = document.querySelector(".html5-video-player");
  const controls = document.querySelector(".ytp-chrome-bottom");
  const primary = document.getElementById("primary");
  const secondary = document.getElementById("secondary");

  // If already zoomed → reset everything
  if (video.dataset.zoomed === "true") {
    const target = document.querySelector(video.dataset.originalParent || ".html5-video-player");

    if (overlay && target) {
      overlay.removeChild(video);

      if (sibling && sibling.parentElement === target) {
        target.insertBefore(video, sibling);
        sibling.remove();
      } else {
        target.appendChild(video);
      }
      overlay.remove();
    }

    if (controls?.dataset.originalParent) {
      const orig = document.querySelector(controls.dataset.originalParent);
      if (orig) orig.appendChild(controls);
      delete controls.dataset.originalParent;
    }

    if (controls) {
      controls.style.position = "";
      controls.style.bottom = "";
      controls.style.left = "";
      controls.style.right = "";
      controls.style.zIndex = "";
    }

    if (masthead) masthead.style.visibility = "";

    [primary, secondary].forEach(el => {
      if (el && el.dataset.shifted === "1") {
        el.style.transform = "";
        delete el.dataset.shifted;
      }
    });

    video.removeAttribute("data-zoomed");
    video.removeAttribute("data-originalParent");
    video.style.transform = "";
    video.style.position = "";
    video.style.zIndex = "";
    video.style.transition = "";

    return;
  }

  // Otherwise → apply zoom
  const scale = 1.25;
  const marker = document.createElement("span");
  marker.id = siblingId;
  video.parentElement.insertBefore(marker, video);

  video.dataset.originalParent = ".html5-video-player";

  const wrap = document.createElement("div");
  wrap.id = overlayId;
  wrap.style.position = "fixed";
  wrap.style.top = "2px";
  wrap.style.left = "-132px";
  wrap.style.zIndex = "9999";
  wrap.style.pointerEvents = "none";
  wrap.style.transition = "transform 0.2s ease";
  wrap.style.transform = `scale(${scale})`;
  wrap.style.transformOrigin = "top left";

  marker.parentElement.insertBefore(wrap, marker);
  wrap.appendChild(video);

  video.style.position = "relative";
  video.style.zIndex = "10";
  video.style.transition = "transform 0.2s ease";
  video.dataset.zoomed = "true";

  if (controls) {
    controls.dataset.originalParent = ".html5-video-player";
    document.body.appendChild(controls);
    controls.style.position = "fixed";
    controls.style.bottom = "0";
    controls.style.left = "0";
    controls.style.right = "0";
    controls.style.zIndex = "10000";
  }

  [primary, secondary].forEach(el => {
    if (el) {
      el.style.transform = "translateY(50px)";
      el.dataset.shifted = "1";
    }
  });

  if (masthead) masthead.style.visibility = "hidden";
})();
