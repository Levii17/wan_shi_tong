// script.js – interactive features for "How the Internet Works" guide

// -------------------------------
// 1. Packet reassembly demo (Section 3)
// -------------------------------
let animating = false;

function animatePackets() {
  if (animating) return;
  animating = true;

  const pkts = document.querySelectorAll("#pkts .packet");
  const statusElem = document.getElementById("pkt-status");

  // Reset all packets
  pkts.forEach((p) => {
    p.classList.remove("arrived");
    p.style.opacity = "0.3";
  });
  statusElem.textContent = "🚀 Packets in transit via different routes...";

  // Simulate out-of-order arrival (sequence numbers 1..12 shuffled)
  // This order mimics real internet routing where packets take different paths
  const arrivalOrder = [0, 4, 7, 2, 9, 1, 5, 8, 3, 6, 10, 11]; // indices of packets 0-based

  let step = 0;
  const interval = setInterval(() => {
    if (step >= arrivalOrder.length) {
      clearInterval(interval);
      statusElem.textContent =
        "✅ All 12 packets arrived — browser reassembles them in correct sequence order.";
      animating = false;
      return;
    }
    const idx = arrivalOrder[step];
    pkts[idx].classList.add("arrived");
    pkts[idx].style.opacity = "1";
    step++;
  }, 220);
}

// Expose to global scope so inline onclick works
window.animatePackets = animatePackets;

// -------------------------------
// 2. Full journey stepper (Section 12)
// -------------------------------
const journeySteps = [
  {
    title: "You type netflix.com and press Enter",
    desc: "Your browser checks its own DNS cache first. If it has a record for netflix.com and it hasn't expired (TTL still valid), it skips straight to step 4. If not, the DNS lookup begins.",
  },
  {
    title: "DNS resolution — the relay race",
    desc: "Your OS cache → home router cache → ISP resolver cache. If all miss, the ISP resolver queries Root nameserver → .com TLD nameserver → Netflix's Authoritative nameserver, which returns the IP address (e.g. 52.94.237.74).",
  },
  {
    title: "TCP connection is established",
    desc: "Your browser initiates a three-way handshake with the Netflix server: SYN → SYN-ACK → ACK. This confirms the server is reachable before any real data is sent. With HTTP/3 (QUIC), this handshake is faster.",
  },
  {
    title: "TLS handshake — securing the connection",
    desc: "Your browser and the server exchange keys in milliseconds. The server sends its public key certificate. Your browser generates a session key, encrypts it with the server's public key, sends it. The server unlocks it with its private key. Both sides now share a symmetric session key.",
  },
  {
    title: "HTTP request is sent",
    desc: "Your browser sends an HTTPS GET request for the Netflix homepage. The request travels as packets through your Wi-Fi → modem → ISP → internet backbone → Netflix's load balancer → their servers.",
  },
  {
    title: "Server processes the request",
    desc: "Netflix's backend authenticates you (via your session cookie), queries databases for your account and personalised recommendations, and assembles the HTML response.",
  },
  {
    title: "Response travels back and is rendered",
    desc: "The HTML, CSS, and JS arrive as thousands of packets. Your browser reassembles them, parses the HTML, fetches additional assets (images, fonts, JS), runs JavaScript, and paints the final page on your screen. Total time: typically under 1 second.",
  },
];

let currentStepIndex = 0;

function renderStepper() {
  const panel = document.getElementById("spanel");
  const dotsContainer = document.getElementById("sdots");
  if (!panel || !dotsContainer) return;

  // Render content
  const step = journeySteps[currentStepIndex];
  panel.innerHTML = `
    <div class="stepper-title">${currentStepIndex + 1}. ${step.title}</div>
    <div class="stepper-desc">${step.desc}</div>
  `;

  // Render dots
  dotsContainer.innerHTML = journeySteps
    .map(
      (_, i) =>
        `<div class="sdot ${i === currentStepIndex ? "active" : ""}"></div>`,
    )
    .join("");
}

function stepNav(direction) {
  currentStepIndex =
    (currentStepIndex + direction + journeySteps.length) % journeySteps.length;
  renderStepper();
}

// Attach to global scope so buttons work with inline onclick
window.stepNav = stepNav;

// -------------------------------
// 3. Initialize stepper on page load
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderStepper();

  // Optional: smooth scrolling for anchor links (already handled by inline onclick)
  // Additional: if any dynamic CSS variables need enforcement, it's already fine.
});
