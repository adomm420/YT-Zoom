# 🔎 YT-Zoom v1.0.0.2 (YouTube Player Zoom — Bookmarklet)

**YT-Zoom** is a tiny bookmarklet that **zooms** the YouTube HTML5 video player, shifting the page layout out of the way so you can focus on the video without going full-screen. Run it again to **toggle back**.

It works on standard watch pages (e.g., `youtube.com/watch?v=...`).

---

## ✨ What it does
- Scales the video by **1.25×** using a fixed overlay at the top-left.  
- Temporarily moves YouTube’s **player controls** to the bottom of the window so they stay visible.  
- Hides the **masthead** (top bar) and nudges the **primary/secondary columns** down a bit.  
- **Second click toggles it off** — everything goes back exactly where it was.  

The script is **stateful**: it remembers where the video and controls came from and restores them on exit.  

---

## 🔧 Installation (Bookmarklet)
1. Create a new bookmark in your browser.  
2. Set the **Name** to `YT-Zoom`.  
3. Copy the code below and paste it into the **URL / Location** field of the bookmark.  

```text
javascript:(()=>{const v=document.querySelector('video.video-stream.html5-main-video');if(!v)return;const oId='yt-zoom-overlay',sId='yt-zoom-sibling',masthead=document.getElementById('masthead-container'),overlay=document.getElementById(oId),sibling=document.getElementById(sId),player=document.querySelector('.html5-video-player'),controls=document.querySelector('.ytp-chrome-bottom'),primary=document.getElementById('primary'),secondary=document.getElementById('secondary');if(v.dataset.zoomed==='true'){const target=document.querySelector(v.dataset.originalParent||'.html5-video-player');if(overlay&&target){overlay.removeChild(v);if(sibling&&sibling.parentElement===target){target.insertBefore(v,sibling);sibling.remove();}else{target.appendChild(v);}overlay.remove();}if(controls?.dataset.originalParent){const orig=document.querySelector(controls.dataset.originalParent);if(orig)orig.appendChild(controls);delete controls.dataset.originalParent;}if(controls){controls.style.position='';controls.style.bottom='';controls.style.left='';controls.style.right='';controls.style.zIndex='';}if(masthead)masthead.style.visibility='';[primary,secondary].forEach(el=>{if(el&&el.dataset.shifted==='1'){el.style.transform='';delete el.dataset.shifted;}});v.removeAttribute('data-zoomed');v.removeAttribute('data-originalParent');v.style.transform='';v.style.position='';v.style.zIndex='';v.style.transition='';return;}const scale=1.25,marker=document.createElement('span');marker.id=sId;v.parentElement.insertBefore(marker,v);v.dataset.originalParent='.html5-video-player';const wrap=document.createElement('div');wrap.id=oId;wrap.style.position='fixed';wrap.style.top='2px';wrap.style.left='-132px';wrap.style.zIndex='9999';wrap.style.pointerEvents='none';wrap.style.transition='transform 0.2s ease';wrap.style.transform=`scale(${scale})`;wrap.style.transformOrigin='top left';marker.parentElement.insertBefore(wrap,marker);wrap.appendChild(v);v.style.position='relative';v.style.zIndex='10';v.style.transition='transform 0.2s ease';v.dataset.zoomed='true';if(controls){controls.dataset.originalParent='.html5-video-player';document.body.appendChild(controls);controls.style.position='fixed';controls.style.bottom='0';controls.style.left='0';controls.style.right='0';controls.style.zIndex='10000';}[primary,secondary].forEach(el=>{if(el){el.style.transform='translateY(50px)';el.dataset.shifted='1';}});if(masthead)masthead.style.visibility='hidden';})();
```

> **Tip:** Some browsers require keeping the `javascript:` prefix for bookmarklets to work.  

---

## ▶️ Usage
- Open a YouTube video page.  
- Click your **YT-Zoom** bookmark.  
- Click again to **toggle off**.  

**Keyboard/mouse controls:** YouTube’s native shortcuts (Space, K, J/L, M, etc.) all work. The overlay is pointer-events: none, so clicking the video behaves as usual.  

---

## 🧠 How it works
- Finds the `<video>` element.  
- Inserts a **marker** and moves the video into a **scaled overlay**.  
- Reparents the **control bar** to `document.body` so it stays visible.  
- Hides the masthead and shifts columns down.  
- Restores all original positions on toggle-off.  

---

## ⚠️ Notes & Compatibility
- Built for modern YouTube layouts. DOM updates may require tweaks.  
- Works on desktop Chrome/Edge/Brave/Firefox. Limited support on iOS Safari.  
- Other extensions that modify YouTube’s player may affect behavior.  

---

## 🧪 Troubleshooting
- **Nothing happens:** Ensure you’re on a standard `youtube.com/watch?v=...` page with the video loaded.  
- **Controls misplaced:** Toggle off, reload, and try again.  
- **Blocked bookmarklet:** Some browsers block JS on certain pages; allow pop-ups/JS for YouTube.  

---

## 📝 Changelog
- **v1.0.0.2** — Skeleton bump (no functional changes).  
- **v1.0.0.1** — Initial release (with build number): 1.25× zoom, pinned controls, masthead hide, layout shift, full toggle restore.  

## 👤 Author
**Mantas Adomavičius**  
MIT License
