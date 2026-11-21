(function () {
  "use strict";

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Dämpad 3D-partikelbakgrund bakom produktmockupen (pausar vid reduced-motion)
  const canvas = document.getElementById("heroCanvas");
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (canvas && canvas.getContext && !reducedMotion) {
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = canvas.clientWidth || 420;
      canvas.height = canvas.clientHeight || 380;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: 36 }, (_, i) => ({
      a: (i / 36) * Math.PI * 2,
      r: 55 + (i % 5) * 24,
      speed: 0.003 + (i % 4) * 0.0015,
      phase: i * 0.7
    }));

    let t = 0;
    function draw() {
      t += 0.012;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      const pts = nodes.map((n) => {
        const ang = n.a + t * (n.speed * 100);
        const x = cx + Math.cos(ang) * n.r * (0.9 + 0.15 * Math.sin(t + n.phase));
        const y = cy + Math.sin(ang) * n.r * 0.65 * Math.cos(n.phase * 0.5 + t * 0.4);
        return { x, y };
      });

      ctx.strokeStyle = "rgba(13, 148, 136, 0.22)";
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          if (dx * dx + dy * dy < 5200) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach((p) => {
        ctx.fillStyle = "#0f4c81";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }
    draw();
  }

  // Exempelkalender
  let currentIndustry = "tandlakare";
  let currentDay = "idag";
  const slotsGrid = document.getElementById("slotsGrid");
  const demoFeedback = document.getElementById("demoFeedback");
  const STATUS_LABEL = { free: "Ledig", busy: "Upptagen", deal: "Sista minuten" };

  async function loadSlots() {
    if (!slotsGrid) return;
    try {
      const res = await fetch(`/api/demo/slots?industry=${encodeURIComponent(currentIndustry)}&day=${encodeURIComponent(currentDay)}`);
      const slots = await res.json();
      slotsGrid.innerHTML = "";

      slots.forEach((slot) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `slot-btn slot-${slot.status}`;
        if (slot.status === "busy") btn.disabled = true;

        const t = document.createElement("span");
        t.className = "slot-time";
        t.textContent = slot.time;

        const st = document.createElement("span");
        st.className = "slot-status";
        st.textContent = STATUS_LABEL[slot.status] || "";

        btn.appendChild(t);
        btn.appendChild(st);

        if (slot.status !== "busy") {
          const m = document.createElement("span");
          m.className = "slot-meta";
          m.textContent = `${slot.service}, ${slot.price}`;
          btn.appendChild(m);

          btn.addEventListener("click", async () => {
            const r = await fetch("/api/demo/book", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ industry: currentIndustry, day: currentDay, time: slot.time })
            });
            const data = await r.json();
            if (demoFeedback) {
              demoFeedback.textContent = data.message;
              demoFeedback.style.display = "block";
            }
          });
        }

        slotsGrid.appendChild(btn);
      });
    } catch {
      slotsGrid.textContent = "Kunde inte ladda exempelkalendern just nu.";
    }
  }

  document.querySelectorAll("[data-industry]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-industry]").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      currentIndustry = btn.getAttribute("data-industry") || "tandlakare";
      if (demoFeedback) demoFeedback.style.display = "none";
      loadSlots();
    });
  });

  document.querySelectorAll("[data-day]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-day]").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      currentDay = btn.getAttribute("data-day") || "idag";
      if (demoFeedback) demoFeedback.style.display = "none";
      loadSlots();
    });
  });

  loadSlots();

  // Dela din idé live & fråga AI-assistenten
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatLog = document.getElementById("chatLog");
  const sendIdeaBtn = document.getElementById("sendIdeaToForm");
  let lastCustomerIdea = "";

  async function askAssistant(text) {
    const q = text.trim();
    if (!q || !chatLog) return;
    lastCustomerIdea = q;

    const u = document.createElement("div");
    u.className = "chat-msg chat-user";
    u.textContent = q;
    chatLog.appendChild(u);

    let replyText = "Spännande idé! Vi kan anpassa bokning, kundchatt och mailsvar efter era behov.";
    try {
      const res = await fetch("/api/demo/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) replyText = data.reply;
      }
    } catch {
      // använd fallback-svaret ovan
    }

    const b = document.createElement("div");
    b.className = "chat-msg chat-bot";
    b.textContent = replyText;
    chatLog.appendChild(b);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      askAssistant(chatInput.value);
      chatInput.value = "";
    });
  }

  document.querySelectorAll("[data-idea]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const idea = chip.getAttribute("data-idea") || "";
      askAssistant(idea);
    });
  });

  if (sendIdeaBtn) {
    sendIdeaBtn.addEventListener("click", () => {
      const msgEl = document.getElementById("message");
      if (msgEl && lastCustomerIdea) {
        msgEl.value = lastCustomerIdea;
      }
      const contactSection = document.getElementById("kontakt");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Kontaktformulär med riktig felhantering & honeypot
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const website = (document.getElementById("website") || { value: "" }).value.trim();
      const payload = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        company: document.getElementById("company").value.trim(),
        industry: document.getElementById("industry").value,
        message: document.getElementById("message").value.trim(),
        gdprConsent: document.getElementById("gdprConsent").checked,
        consentVersion: "2026-11-21",
        consentAt: new Date().toISOString()
      };

      formStatus.className = "form-status";
      if (!payload.name || !payload.email || !payload.company || !payload.gdprConsent) {
        formStatus.textContent = "Fyll i namn, e-post, företag och godkänn integritetspolicyn.";
        formStatus.classList.add("error");
        return;
      }

      if (website) {
        formStatus.textContent = `Tack ${payload.name}! Vi hör av oss inom en arbetsdag.`;
        formStatus.classList.add("success");
        return;
      }

      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();
        formStatus.textContent = `Tack ${payload.name}! Vi hör av oss inom en arbetsdag.`;
        formStatus.classList.add("success");
        contactForm.reset();
      } catch {
        formStatus.textContent = "Förfrågan kunde inte skickas just nu. Försök igen om en stund, eller mejla oss på hej@nordicagent.se.";
        formStatus.classList.add("error");
      }
    });
  }
})();
