/* 
  📄  YT‑Zoom — YouTube Player Zoom (Bookmarklet Source)
  🔧  Version:   1.0.0.2
  📅  Updated:   2025-09-09
  👤  Author:    Mantas Adomavičius
  🧠  Description:
       Skeleton bump — no functional changes from v1.0.0.1. Still zooms the YouTube HTML5 player by 1.25× using a fixed overlay while
       keeping controls visible and the page usable. Click again to restore.
  📝  Notes:
       • Built for standard watch pages: youtube.com/watch?v=... 
       • Behavior may vary if other extensions modify the player/layout.
       • Bookmarklets are limited on iOS Safari.
*/

(function YT_Zoom_Bookmarklet() {
	"use strict";

	/* SECTION: Configuration & Selectors */
	const CONFIG = {
		SCALE: 1.25,
		OFFSET_TOP: 2,
		OFFSET_LEFT: -132,
		TRANSITION: "transform 0.2s ease",
		Z_INDEX_WRAP: 9999,
		Z_INDEX_CONTROLS: 10000
	};

	const IDS = {
		OVERLAY: "yt-zoom-overlay",
		SIBLING: "yt-zoom-sibling"
	};

	const SEL = {
		VIDEO: "video.video-stream.html5-main-video",
		PLAYER: ".html5-video-player",
		CONTROLS: ".ytp-chrome-bottom",
		MASTHEAD: "masthead-container",
		PRIMARY: "primary",
		SECONDARY: "secondary"
	};

	const $ = (q, root = document) => root.querySelector(q);
	const byId = (id) => document.getElementById(id);

	const video     = $(SEL.VIDEO);
	const player    = $(SEL.PLAYER);
	const controls  = $(SEL.CONTROLS);
	const masthead  = byId(SEL.MASTHEAD);
	const primary   = byId(SEL.PRIMARY);
	const secondary = byId(SEL.SECONDARY);

	if (!video) return;

	/* SECTION: Toggle-Off (Restore) */
	if (video.dataset.zoomed === "true") {
		const overlay  = byId(IDS.OVERLAY);
		const sibling  = byId(IDS.SIBLING);
		const target   = $(video.dataset.originalParent || SEL.PLAYER);

		if (overlay && target) {
			try { overlay.removeChild(video); } catch {}
			if (sibling && sibling.parentElement === target) {
				target.insertBefore(video, sibling);
				sibling.remove();
			} else {
				target.appendChild(video);
			}
			overlay.remove();
		}

		if (controls && controls.dataset.originalParent) {
			const orig = $(controls.dataset.originalParent);
			if (orig) orig.appendChild(controls);
			delete controls.dataset.originalParent;
		}

		if (controls) {
			controls.style.position = "";
			controls.style.bottom   = "";
			controls.style.left     = "";
			controls.style.right    = "";
			controls.style.zIndex   = "";
		}

		if (masthead) masthead.style.visibility = "";

		[primary, secondary].forEach((el) => {
			if (el && el.dataset.shifted === "1") {
				el.style.transform = "";
				delete el.dataset.shifted;
			}
		});

		video.removeAttribute("data-zoomed");
		video.removeAttribute("data-originalParent");
		video.style.transform  = "";
		video.style.position   = "";
		video.style.zIndex     = "";
		video.style.transition = "";

		return;
	}

	/* SECTION: Toggle-On (Apply Zoom Overlay) */
	const marker = document.createElement("span");
	marker.id = IDS.SIBLING;
	video.parentElement.insertBefore(marker, video);
	video.dataset.originalParent = SEL.PLAYER;

	const wrap = document.createElement("div");
	wrap.id = IDS.OVERLAY;
	wrap.style.position       = "fixed";
	wrap.style.top            = CONFIG.OFFSET_TOP + "px";
	wrap.style.left           = CONFIG.OFFSET_LEFT + "px";
	wrap.style.zIndex         = String(CONFIG.Z_INDEX_WRAP);
	wrap.style.pointerEvents  = "none";
	wrap.style.transition     = CONFIG.TRANSITION;
	wrap.style.transform      = `scale(${CONFIG.SCALE})`;
	wrap.style.transformOrigin = "top left";

	marker.parentElement.insertBefore(wrap, marker);
	wrap.appendChild(video);

	video.style.position   = "relative";
	video.style.zIndex     = "10";
	video.style.transition = CONFIG.TRANSITION;
	video.dataset.zoomed   = "true";

	if (controls) {
		controls.dataset.originalParent = SEL.PLAYER;
		document.body.appendChild(controls);
		controls.style.position = "fixed";
		controls.style.bottom   = "0";
		controls.style.left     = "0";
		controls.style.right    = "0";
		controls.style.zIndex   = String(CONFIG.Z_INDEX_CONTROLS);
	}

	[primary, secondary].forEach((el) => {
		if (el) {
			el.style.transform = "translateY(50px)";
			el.dataset.shifted = "1";
		}
	});

	if (masthead) masthead.style.visibility = "hidden";
})();