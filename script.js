const CONFIG = {
  recipientName: "Gửi Quỳnh Chii 🌸,",

  senderName: "— 1 người nào đó —",

  letterTitle: "Chúc Mừng Ngày 20/10 Quỳnh Chii Nhé! 🌸",

  polaroidCaption: "Quỳnh Chii xinh đẹp 💕",

  polaroidImage: "photo.jpg",

  letterParagraphs: [
    "Hôm nay là ngày 20/10 — một ngày thật đặc biệt để gửi gắm những điều ngọt ngào và dễ thương nhất đến cậu.  Với tớ, Cậu luôn là một cô gái vô cùng đặc biệt, ấm áp và đáng yêu.",
    "Cảm ơn Cậu vì đã luôn xuất hiện với nụ cười rạng rỡ, sự chân thành và nguồn năng lượng tích cực mà cậu mang đến cho mọi người. Có những ngày mệt mỏi, chỉ cần nhìn thấy nụ cười của Quỳnh Chii thôi là cũng đủ thấy cuộc sống này nhẹ nhõm và vui vẻ hơn rất nhiều rồi.",
    "Chúc Quỳnh Chii không chỉ riêng ngày 20/10 này, mà cả 365 ngày trong năm đều ngập tràn niềm vui, công việc thuận lợi và ước mơ nào cũng sớm cập bến nhé. Hãy luôn tự tin, yêu đời và luôn nhớ rằng cậu rất tuyệt vời, luôn xứng đáng với những điều hạnh phúc nhất trên thế giới này!"
  ],

  sweetQuote: "Chúc Quỳnh Chii một đời an thuyên :)), mỗi sớm mai thức dậy đều có lý do để mỉm cười, làm những điều mình thích và luôn được yêu thương theo cách trọn vẹn nhất!",

  closingWish: "Luôn xinh xắn, vui tươi và đáng yêu như bây giờ nha Quỳnh Chii! 🌷✨",

  typeSpeed: 30,

  musicUrl: "music.mp3",
  musicVolume: 0.55
};

document.addEventListener("DOMContentLoaded", () => {
  const elRecipient = document.getElementById("recipientName");
  const elSender = document.getElementById("senderName");
  const elPolaroidCaption = document.getElementById("polaroidCaptionText");
  const elPolaroidImg = document.getElementById("polaroidImg");
  const elSpotlightImg = document.getElementById("spotlightImg");
  const elSpotlightCaption = document.getElementById("spotlightCaptionText");
  const elMainTitle = document.getElementById("letterMainTitle");
  const elSweetQuote = document.getElementById("sweetQuoteText");
  const elClosingWish = document.getElementById("closingWishText");

  if (elRecipient) elRecipient.textContent = CONFIG.recipientName;
  if (elSender) elSender.textContent = CONFIG.senderName;
  if (elPolaroidCaption) elPolaroidCaption.textContent = CONFIG.polaroidCaption;
  if (elPolaroidImg && CONFIG.polaroidImage) elPolaroidImg.src = CONFIG.polaroidImage;
  if (elSpotlightImg && CONFIG.polaroidImage) elSpotlightImg.src = CONFIG.polaroidImage;
  if (elSpotlightCaption) elSpotlightCaption.textContent = CONFIG.polaroidCaption;
  if (elMainTitle) elMainTitle.textContent = CONFIG.letterTitle;
  if (elSweetQuote) elSweetQuote.textContent = `"${CONFIG.sweetQuote}"`;
  if (elClosingWish) elClosingWish.textContent = CONFIG.closingWish;
});

class LofiAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.step = 0;
    this.audioElement = null;

    if (CONFIG.musicUrl && CONFIG.musicUrl.trim() !== "") {
      try {
        this.audioElement = new Audio(CONFIG.musicUrl);
        this.audioElement.loop = true;
        this.audioElement.volume = CONFIG.musicVolume || 0.3;
      } catch (e) {
        console.warn("External audio fallback:", e);
      }
    }

    this.chords = [
      [349.23, 440.00, 523.25, 659.25],
      [329.63, 392.00, 493.88, 587.33],
      [293.66, 349.23, 440.00, 523.25],
      [261.63, 329.63, 392.00, 493.88]
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playSoftChime() {
    this.init();
    if (!this.ctx) return;
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.85);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.85);
      }, i * 75);
    });
  }

  playBoxPop() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(260, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(620, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playBoingSound() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(620, this.ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.32);
      gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    } catch (e) {}
  }

  playEnvelopeOpenSound() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.45);
  }

  playVictoryMelody() {
    this.init();
    if (!this.ctx) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 1.4);
      }, i * 90);
    });
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (this.audioElement) {
      this.audioElement.play().catch(() => {
        this.init();
        this.playLofiArpeggio();
      });
    } else {
      this.init();
      this.playLofiArpeggio();
    }
  }

  playLofiArpeggio() {
    if (!this.isPlaying || !this.ctx) return;

    const currentChord = this.chords[this.step % this.chords.length];

    currentChord.forEach((freq, noteIdx) => {
      setTimeout(() => {
        if (!this.isPlaying || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(CONFIG.musicVolume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 1.4);
      }, noteIdx * 280);
    });

    this.step++;
    this.timer = setTimeout(() => {
      this.playLofiArpeggio();
    }, 1800);
  }

  stop() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

const lofi = new LofiAudioEngine();

const audioBtn = document.getElementById("audioBtn");
const audioStatusText = document.getElementById("audioStatusText");

if (audioBtn) {
  audioBtn.addEventListener("click", () => {
    const isPlaying = lofi.toggle();
    if (isPlaying) {
      audioBtn.classList.add("playing");
      audioStatusText.textContent = "Đang phát 🎵";
    } else {
      audioBtn.classList.remove("playing");
      audioStatusText.textContent = "Bật nhạc 🎵";
    }
  });
}

function autoPlayOnTouch() {
  if (!lofi.isPlaying) {
    lofi.start();
    if (audioBtn) {
      audioBtn.classList.add("playing");
      audioStatusText.textContent = "Đang phát 🎵";
    }
  }
  document.removeEventListener("pointerdown", autoPlayOnTouch);
}
document.addEventListener("pointerdown", autoPlayOnTouch);

const canvas = document.getElementById("convergeCanvas");
const ctx = canvas.getContext("2d");

let cw = (canvas.width = window.innerWidth);
let ch = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight;
});

class FloralPetalParticle {
  constructor() {
    this.x = Math.random() * cw;
    this.y = -30 - Math.random() * (ch * 0.9);
    this.size = 14 + Math.random() * 16;
    this.speedY = 1.6 + Math.random() * 2.2;
    this.speedX = (Math.random() - 0.5) * 1.8;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 2.5;
    this.opacity = 0.75 + Math.random() * 0.25;

    this.type = Math.floor(Math.random() * 4);

    const hue = 340 + Math.floor(Math.random() * 20);
    this.color = `hsl(${hue}, 95%, ${72 + Math.floor(Math.random() * 18)}%)`;
    this.secondaryColor = `hsl(${hue}, 90%, 88%)`;

    this.isConverging = false;
    this.targetX = cw / 2;
    this.targetY = ch * 0.42;
    this.isDead = false;
  }

  update() {
    if (this.isDead) return;

    if (!this.isConverging) {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.02) * 1.2;
      this.rotation += this.rotSpeed;

      if (this.y > ch + 40) {
        this.y = -30;
        this.x = Math.random() * cw;
      }
    } else {
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      this.x += dx * 0.09;
      this.y += dy * 0.09;
      this.rotation += this.rotSpeed * 2.5;
      this.size *= 0.97;

      if (dist < 35 || this.size < 3) {
        this.isDead = true;
      }
    }
  }

  draw(c) {
    if (this.isDead) return;

    c.save();
    c.translate(this.x, this.y);
    c.rotate((this.rotation * Math.PI) / 180);
    c.globalAlpha = this.opacity;

    if (this.type === 0) {
      c.fillStyle = this.color;
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(this.size * 0.6, -this.size * 0.5, this.size, 0, 0, this.size);
      c.bezierCurveTo(-this.size, 0, -this.size * 0.6, -this.size * 0.5, 0, 0);
      c.fill();
    } else if (this.type === 1) {
      c.fillStyle = this.color;
      for (let i = 0; i < 5; i++) {
        c.save();
        c.rotate((i * Math.PI * 2) / 5);
        c.beginPath();
        c.ellipse(0, -this.size * 0.35, this.size * 0.25, this.size * 0.35, 0, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
      c.fillStyle = "#ffd166";
      c.beginPath();
      c.arc(0, 0, this.size * 0.18, 0, Math.PI * 2);
      c.fill();
    } else if (this.type === 2) {
      c.fillStyle = this.color;
      c.beginPath();
      c.arc(0, 0, this.size * 0.45, 0, Math.PI);
      c.lineTo(-this.size * 0.45, -this.size * 0.3);
      c.lineTo(0, -this.size * 0.1);
      c.lineTo(this.size * 0.45, -this.size * 0.3);
      c.closePath();
      c.fill();
    } else {
      const s = this.size * 0.4;
      c.fillStyle = this.color;
      c.beginPath();
      c.moveTo(0, s * 0.3);
      c.bezierCurveTo(-s, -s * 0.6, -s * 1.5, s * 0.4, 0, s * 1.4);
      c.bezierCurveTo(s * 1.5, s * 0.4, s, -s * 0.6, 0, s * 0.3);
      c.fill();
    }

    c.restore();
  }
}

const stormParticles = [];
const PARTICLE_COUNT = Math.min(100, Math.floor(window.innerWidth / 12));
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = new FloralPetalParticle();
  p.y = Math.random() * ch;
  stormParticles.push(p);
}

const assembledBouquet = document.getElementById("assembledBouquet");
let animationRunning = true;

function runFlowerStorm() {
  if (!animationRunning) return;
  ctx.clearRect(0, 0, cw, ch);

  let aliveCount = 0;
  for (let i = 0; i < stormParticles.length; i++) {
    stormParticles[i].update();
    stormParticles[i].draw(ctx);
    if (!stormParticles[i].isDead) aliveCount++;
  }

  requestAnimationFrame(runFlowerStorm);
}
runFlowerStorm();

setTimeout(() => {
  stormParticles.forEach((p) => {
    p.isConverging = true;
    p.targetX = cw / 2;
    p.targetY = ch * 0.36;
  });

  setTimeout(() => {
    assembledBouquet.classList.add("visible");
    lofi.playSoftChime();
    triggerCuteConfetti();
  }, 1200);
}, 1800);

const stageIntro = document.getElementById("stageIntro");
const stageMinigame = document.getElementById("stageMinigame");
const btnStartMinigame = document.getElementById("btnStartMinigame");

const mysteryBoxes = document.querySelectorAll(".mystery-box-item");
const boxHintMsg = document.getElementById("boxHintMsg");

if (btnStartMinigame) {
  btnStartMinigame.addEventListener("click", () => {
    stageIntro.classList.remove("active");
    stageMinigame.classList.add("active");
    lofi.playSoftChime();
  });
}

const petTeaseModal = document.getElementById("petTeaseModal");
const petTeaseBackdrop = document.getElementById("petTeaseBackdrop");
const petDialogueText = document.getElementById("petDialogueText");
const petAvatarImg = document.getElementById("petAvatarImg");
const petSubTitle = document.getElementById("petSubTitle");
const petMoodBadge = document.getElementById("petMoodBadge");
const btnPetRetry = document.getElementById("btnPetRetry");

const DIALOGUE_1 = "chọn lại hộp của mình điiiii :<";
const DIALOGUE_2 = "ơ bảo chọn hộp của mình đi chọn toii lam giiiii";

let isBoxSelected = false;
let wrongPicksCount = 0;

function closePetTeaseModal() {
  if (petTeaseModal) {
    petTeaseModal.classList.remove("active");
  }
}

if (btnPetRetry) btnPetRetry.addEventListener("click", closePetTeaseModal);
if (petTeaseBackdrop) petTeaseBackdrop.addEventListener("click", closePetTeaseModal);

mysteryBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (isBoxSelected) return;

    const boxType = box.getAttribute("data-box");

    if (boxType === "cat" || boxType === "dog") {
      box.classList.remove("teased");
      void box.offsetWidth;
      box.classList.add("teased");

      const dialogue = (wrongPicksCount === 0) ? DIALOGUE_1 : DIALOGUE_2;
      wrongPicksCount++;

      if (boxType === "cat") {
        petAvatarImg.src = "cat.jpg";
        petSubTitle.textContent = "Bé Mèo Meow 🐱";
        petMoodBadge.textContent = "🐾 :<";
      } else {
        petAvatarImg.src = "dog.jpg";
        petSubTitle.textContent = "Bé Cún Gâu Gâu 🐶";
        petMoodBadge.textContent = "🦴 Ơ kìa";
      }

      petDialogueText.textContent = dialogue;
      lofi.playBoingSound();

      petTeaseModal.classList.add("active");
      boxHintMsg.innerHTML = `<span style="color:#c9184a">Hihi bị mắng rùi! Hãy chọn đúng <strong>"Hộp Của Mình"</strong> nha...</span>`;
      return;
    }

    if (boxType === "correct") {
      isBoxSelected = true;
      box.classList.add("opening");
      lofi.playBoxPop();

      const rect = box.getBoundingClientRect();
      createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

      boxHintMsg.innerHTML = "🎉 <strong>Chính xác! Chiếc hộp chứa Bức Thư Yêu Thương!</strong>";
      triggerCuteConfetti();

      setTimeout(() => {
        launchFlyingEnvelopeAnimation();
      }, 700);
    }
  });
});

const flyingEnvelopeStage = document.getElementById("flyingEnvelopeStage");
const flyingEnvelope = document.getElementById("flyingEnvelope");

function launchFlyingEnvelopeAnimation() {
  stageMinigame.classList.remove("active");
  flyingEnvelopeStage.classList.add("active");

  lofi.playEnvelopeOpenSound();

  setTimeout(() => {
    flyingEnvelope.classList.add("opened");

    const rect = flyingEnvelope.getBoundingClientRect();
    createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }, 500);

  setTimeout(() => {
    flyingEnvelopeStage.classList.remove("active");
    openLetterWithAutoTypewriter();
  }, 1250);
}

const stageLetter = document.getElementById("stageLetter");
const typedContent = document.getElementById("typedContent");
const typewriterCursor = document.getElementById("typewriterCursor");
const sweetQuoteBox = document.getElementById("sweetQuoteBox");
const closingWishText = document.getElementById("closingWishText");
const signatureBox = document.getElementById("signatureBox");
const btnSkipType = document.getElementById("btnSkipType");
const btnCloseLetter = document.getElementById("btnCloseLetter");
const btnBackToIntro = document.getElementById("btnBackToIntro");
const btnShowerHearts = document.getElementById("btnShowerHearts");
const letterBackdrop = document.getElementById("letterBackdrop");

const spotlightOverlay = document.getElementById("qcPhotoSpotlightOverlay");
const spotlightCard = document.getElementById("qcPhotoSpotlightCard");
const cornerPhotoSlot = document.getElementById("qcCornerPhotoSlot");

let typingTimeout = null;
let isTypingComplete = false;
let photoTransitionTimer = null;

function openLetterWithAutoTypewriter() {
  stageLetter.classList.add("active");
  lofi.playVictoryMelody();
  triggerCuteConfetti();

  if (cornerPhotoSlot) {
    cornerPhotoSlot.classList.remove("revealed");
  }

  if (spotlightOverlay && spotlightCard) {
    spotlightCard.style.transition = "none";
    spotlightCard.style.transform = "scale(0.8) translateY(20px)";
    spotlightCard.style.opacity = "0";
    spotlightOverlay.style.backgroundColor = "";
    spotlightOverlay.classList.add("active");

    requestAnimationFrame(() => {
      spotlightCard.style.transition = "transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease";
      spotlightCard.style.transform = "scale(1) translateY(0)";
      spotlightCard.style.opacity = "1";
    });

    setTimeout(() => {
      const rect = spotlightCard.getBoundingClientRect();
      createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }, 380);

    if (photoTransitionTimer) clearTimeout(photoTransitionTimer);
    photoTransitionTimer = setTimeout(() => {
      animatePhotoToCorner();
    }, 1800);
  } else {
    startTypewriterEffect();
  }
}

function animatePhotoToCorner() {
  if (!spotlightCard || !cornerPhotoSlot) {
    startTypewriterEffect();
    return;
  }

  const startRect = spotlightCard.getBoundingClientRect();
  const endRect = cornerPhotoSlot.getBoundingClientRect();

  const dx = (endRect.left + endRect.width / 2) - (startRect.left + startRect.width / 2);
  const dy = (endRect.top + endRect.height / 2) - (startRect.top + startRect.height / 2);
  const scale = endRect.width / startRect.width;

  spotlightCard.style.transition = "transform 0.85s cubic-bezier(0.34, 1.35, 0.64, 1), opacity 0.85s ease";
  spotlightCard.style.transform = `translate(${dx}px, ${dy}px) scale(${scale}) rotate(3.5deg)`;

  if (spotlightOverlay) {
    spotlightOverlay.style.transition = "background-color 0.85s ease";
    spotlightOverlay.style.backgroundColor = "transparent";
  }

  setTimeout(() => {
    if (spotlightOverlay) {
      spotlightOverlay.classList.remove("active");
      spotlightOverlay.style.backgroundColor = "";
    }
    spotlightCard.style.transform = "";
    spotlightCard.style.transition = "";

    cornerPhotoSlot.classList.add("revealed");

    const cornerRect = cornerPhotoSlot.getBoundingClientRect();
    createHeartBurst(cornerRect.left + cornerRect.width / 2, cornerRect.top + cornerRect.height / 2);

    startTypewriterEffect();
  }, 850);
}

if (cornerPhotoSlot) {
  cornerPhotoSlot.addEventListener("click", () => {
    openSpotlightModal();
  });
}

function openSpotlightModal() {
  if (!spotlightOverlay || !spotlightCard) return;

  spotlightOverlay.style.backgroundColor = "";
  spotlightOverlay.classList.add("active");
  spotlightCard.style.transition = "none";
  spotlightCard.style.transform = "scale(0.85)";
  spotlightCard.style.opacity = "0";

  requestAnimationFrame(() => {
    spotlightCard.style.transition = "transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.35s ease";
    spotlightCard.style.transform = "scale(1)";
    spotlightCard.style.opacity = "1";
  });
}

if (spotlightOverlay) {
  spotlightOverlay.addEventListener("click", () => {
    closeSpotlightModal();
  });
}

function closeSpotlightModal() {
  if (!spotlightOverlay || !spotlightCard) return;

  spotlightCard.style.transition = "transform 0.35s ease, opacity 0.35s ease";
  spotlightCard.style.transform = "scale(0.85)";
  spotlightCard.style.opacity = "0";

  setTimeout(() => {
    spotlightOverlay.classList.remove("active");
    spotlightCard.style.transform = "";
  }, 350);
}

function startTypewriterEffect() {
  typedContent.innerHTML = "";
  typewriterCursor.style.display = "inline-block";
  sweetQuoteBox.classList.remove("visible");
  closingWishText.classList.remove("visible");
  signatureBox.classList.remove("visible");
  isTypingComplete = false;

  const paragraphs = CONFIG.letterParagraphs;
  let pIdx = 0;
  let charIdx = 0;

  let currentP = document.createElement("p");
  typedContent.appendChild(currentP);

  function typeNextChar() {
    if (isTypingComplete) return;

    if (pIdx < paragraphs.length) {
      const currentText = paragraphs[pIdx];

      if (charIdx < currentText.length) {
        currentP.textContent += currentText.charAt(charIdx);
        charIdx++;
        typingTimeout = setTimeout(typeNextChar, CONFIG.typeSpeed);
      } else {
        pIdx++;
        charIdx = 0;
        if (pIdx < paragraphs.length) {
          currentP = document.createElement("p");
          typedContent.appendChild(currentP);
          typingTimeout = setTimeout(typeNextChar, CONFIG.typeSpeed * 6);
        } else {
          finishTypewriter();
        }
      }
    }
  }

  typingTimeout = setTimeout(typeNextChar, 400);
}

function finishTypewriter() {
  isTypingComplete = true;
  if (typingTimeout) clearTimeout(typingTimeout);

  typewriterCursor.style.display = "none";

  sweetQuoteBox.classList.add("visible");
  closingWishText.classList.add("visible");
  signatureBox.classList.add("visible");

  triggerCuteConfetti();
}

if (btnSkipType) {
  btnSkipType.addEventListener("click", () => {
    isTypingComplete = true;
    if (typingTimeout) clearTimeout(typingTimeout);

    typedContent.innerHTML = "";
    CONFIG.letterParagraphs.forEach((pText) => {
      const p = document.createElement("p");
      p.textContent = pText;
      typedContent.appendChild(p);
    });

    finishTypewriter();
  });
}

function resetToIntro() {
  if (typingTimeout) clearTimeout(typingTimeout);
  if (photoTransitionTimer) clearTimeout(photoTransitionTimer);

  if (spotlightOverlay) {
    spotlightOverlay.classList.remove("active");
    spotlightOverlay.style.backgroundColor = "";
  }
  if (spotlightCard) {
    spotlightCard.style.transform = "";
    spotlightCard.style.transition = "";
  }
  if (cornerPhotoSlot) {
    cornerPhotoSlot.classList.remove("revealed");
  }

  if (petTeaseModal) {
    petTeaseModal.classList.remove("active");
  }

  stageLetter.classList.remove("active");
  flyingEnvelopeStage.classList.remove("active");
  stageMinigame.classList.remove("active");
  stageIntro.classList.add("active");

  isBoxSelected = false;
  wrongPicksCount = 0;
  mysteryBoxes.forEach((b) => {
    b.classList.remove("opening");
    b.classList.remove("teased");
  });
  flyingEnvelope.classList.remove("opened");
  boxHintMsg.textContent = "Chạm vào một chiếc hộp để mở quà nào...";
}

if (btnCloseLetter) btnCloseLetter.addEventListener("click", resetToIntro);
if (btnBackToIntro) btnBackToIntro.addEventListener("click", resetToIntro);
if (letterBackdrop) letterBackdrop.addEventListener("click", resetToIntro);

if (btnShowerHearts) {
  btnShowerHearts.addEventListener("click", () => {
    lofi.playSoftChime();
    triggerCuteConfetti();
  });
}

function triggerCuteConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#ff758f", "#ff4d6d", "#ffccd5", "#ffb3c6", "#ffffff"]
    });

    setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff758f", "#ffb3c6", "#ffccd5"]
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff758f", "#ffb3c6", "#ffccd5"]
      });
    }, 240);
  }
}

const heartContainer = document.getElementById("heartSparkleContainer");
const heartIcons = ["💕", "🌸", "💖", "🌷", "✨"];

function createHeartBurst(x, y) {
  const count = 5;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "heart-sparkle";
    el.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];

    const angle = (i * (360 / count) + Math.random() * 20) * (Math.PI / 180);
    const dist = 30 + Math.random() * 45;
    const dx = Math.cos(angle) * dist + "px";
    const dy = Math.sin(angle) * dist + "px";
    const rot = (Math.random() - 0.5) * 60 + "deg";

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--dx", dx);
    el.style.setProperty("--dy", dy);
    el.style.setProperty("--rot", rot);

    heartContainer.appendChild(el);
    setTimeout(() => el.remove(), 800);
  }
}

window.addEventListener("pointerdown", (e) => {
  if (e.target.closest("button") || e.target.closest(".audio-control") || e.target.closest(".mystery-box-item")) return;
  createHeartBurst(e.clientX, e.clientY);
});
