// ========== SOUND EFFECTS & AMBIENT (Web Audio API) ==========
const SFX = {
  ctx: null,
  enabled: true,
  volume: 0.35,
  ambientNode: null,
  ambientGain: null,
  ambientType: null,

  init() {
    const unlock = () => {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.value = 0;
        this.ambientGain.connect(this.ctx.destination);
      }
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
    };
    document.addEventListener('click', unlock);
    document.addEventListener('touchstart', unlock);
  },

  _ensure() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0;
      this.ambientGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  },

  // --- Vibration helper (smartphone) ---
  vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  },

  // ==========================================
  // AMBIENT SOUND SYSTEM (per scene bg)
  // ==========================================
  _createNoise(duration) {
    const sr = this.ctx.sampleRate;
    const len = sr * duration;
    const buf = this.ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  },

  startAmbient(type) {
    if (!this.enabled) return;
    if (this.ambientType === type) return; // already playing
    this._ensure();
    this.stopAmbient();
    this.ambientType = type;

    switch (type) {
      case 'night-street': this._ambientNightStreet(); break;
      case 'home-morning': this._ambientHomeMorning(); break;
      case 'home-evening': this._ambientHomeEvening(); break;
      case 'interrogation': this._ambientInterrogation(); break;
      case 'night-danger': this._ambientNightDanger(); break;
      case 'convenience': this._ambientConvenience(); break;
      case 'chase': this._ambientChase(); break;
      default: break;
    }
  },

  stopAmbient() {
    if (this.ambientNode) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
        const node = this.ambientNode;
        setTimeout(() => { try { node.stop(); } catch(e) {} }, 600);
      } catch(e) {}
      this.ambientNode = null;
    }
    this.ambientType = null;
    // Reset gain chain
    if (this.ctx && this.ambientGain) {
      this.ambientGain.disconnect();
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0;
      this.ambientGain.connect(this.ctx.destination);
    }
  },

  // Night street: crickets + distant traffic
  _ambientNightStreet() {
    const t = this.ctx.currentTime;
    // Wind-like filtered noise
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._createNoise(10);
    noise.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 300;
    lp.Q.value = 0.5;
    noise.connect(lp);
    lp.connect(this.ambientGain);
    this.ambientGain.gain.setValueAtTime(0, t);
    this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.12, t + 1.5);
    noise.start();
    this.ambientNode = noise;

    // Cricket-like chirps
    this._startCrickets();
  },

  _cricketInterval: null,
  _startCrickets() {
    this._stopCrickets();
    this._cricketInterval = setInterval(() => {
      if (!this.ctx || this.ambientType !== 'night-street') { this._stopCrickets(); return; }
      const t = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = 4000 + Math.random() * 1000;
        const s = t + i * 0.08;
        g.gain.setValueAtTime(this.volume * 0.03, s);
        g.gain.exponentialRampToValueAtTime(0.001, s + 0.04);
        osc.start(s);
        osc.stop(s + 0.04);
      }
    }, 2000 + Math.random() * 3000);
  },
  _stopCrickets() {
    if (this._cricketInterval) { clearInterval(this._cricketInterval); this._cricketInterval = null; }
  },

  // Home morning: quiet room tone + distant birds
  _ambientHomeMorning() {
    const t = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._createNoise(8);
    noise.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 200;
    noise.connect(lp);
    lp.connect(this.ambientGain);
    this.ambientGain.gain.setValueAtTime(0, t);
    this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.06, t + 1);
    noise.start();
    this.ambientNode = noise;
  },

  // Home evening: deeper room tone, clock ticking feel
  _ambientHomeEvening() {
    const t = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._createNoise(8);
    noise.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 150;
    noise.connect(lp);
    lp.connect(this.ambientGain);
    this.ambientGain.gain.setValueAtTime(0, t);
    this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.08, t + 1);
    noise.start();
    this.ambientNode = noise;

    this._startClock();
  },

  _clockInterval: null,
  _startClock() {
    this._stopClock();
    this._clockInterval = setInterval(() => {
      if (!this.ctx || (this.ambientType !== 'home-evening' && this.ambientType !== 'interrogation')) {
        this._stopClock(); return;
      }
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 2400;
      g.gain.setValueAtTime(this.volume * 0.025, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
      osc.start(t);
      osc.stop(t + 0.02);
    }, 1000);
  },
  _stopClock() {
    if (this._clockInterval) { clearInterval(this._clockInterval); this._clockInterval = null; }
  },

  // Interrogation: fluorescent hum + silence
  _ambientInterrogation() {
    const t = this.ctx.currentTime;
    // 50Hz fluorescent hum
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 100;
    const g = this.ctx.createGain();
    osc.connect(g);
    g.connect(this.ambientGain);
    this.ambientGain.gain.setValueAtTime(0, t);
    this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.04, t + 1);
    osc.start();
    this.ambientNode = osc;
    this._startClock();
  },

  // Night danger: tense low drone
  _ambientNightDanger() {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 45;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 80;
    const g = this.ctx.createGain();
    osc.connect(lp);
    lp.connect(g);
    g.connect(this.ambientGain);
    this.ambientGain.gain.setValueAtTime(0, t);
    this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.15, t + 1);
    osc.start();
    this.ambientNode = osc;

    // Heartbeat loop
    this._startHeartbeatLoop();
  },

  _heartbeatInterval: null,
  _startHeartbeatLoop() {
    this._stopHeartbeatLoop();
    this._heartbeatInterval = setInterval(() => {
      if (!this.ctx || (this.ambientType !== 'night-danger' && this.ambientType !== 'chase')) {
        this._stopHeartbeatLoop(); return;
      }
      this.heartbeat();
    }, 1200);
  },
  _stopHeartbeatLoop() {
    if (this._heartbeatInterval) { clearInterval(this._heartbeatInterval); this._heartbeatInterval = null; }
  },

  // Convenience: quiet hum + faint buzz
  _ambientConvenience() {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 120;
    const g = this.ctx.createGain();
    osc.connect(g);
    g.connect(this.ambientGain);
    this.ambientGain.gain.setValueAtTime(0, t);
    this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.03, t + 0.8);
    osc.start();
    this.ambientNode = osc;
  },

  // Chase: tense + heartbeat
  _ambientChase() {
    const t = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._createNoise(6);
    noise.loop = true;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 400;
    bp.Q.value = 0.8;
    noise.connect(bp);
    bp.connect(this.ambientGain);
    this.ambientGain.gain.setValueAtTime(0, t);
    this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.1, t + 0.5);
    noise.start();
    this.ambientNode = noise;
    this._startHeartbeatLoop();
  },

  // ==========================================
  // ONE-SHOT SOUND EFFECTS
  // ==========================================

  // Text advance (soft)
  advance() {
    if (!this.enabled) return;
    this._ensure();
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 440;
    g.gain.setValueAtTime(this.volume * 0.1, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  },

  // Choice select
  select() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.linearRampToValueAtTime(780, t + 0.08);
    g.gain.setValueAtTime(this.volume * 0.18, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
    this.vibrate(30);
  },

  // Phone notification (realistic double buzz)
  notification() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    // Buzz vibration sound
    for (let i = 0; i < 2; i++) {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.type = 'square';
      osc.frequency.value = 150;
      const s = t + i * 0.2;
      g.gain.setValueAtTime(this.volume * 0.12, s);
      g.gain.exponentialRampToValueAtTime(0.001, s + 0.12);
      osc.start(s);
      osc.stop(s + 0.12);
    }
    // Higher notification chime
    const chime = this.ctx.createOscillator();
    const cg = this.ctx.createGain();
    chime.connect(cg);
    cg.connect(this.ctx.destination);
    chime.type = 'sine';
    chime.frequency.setValueAtTime(1047, t + 0.05);
    chime.frequency.setValueAtTime(1319, t + 0.15);
    cg.gain.setValueAtTime(this.volume * 0.12, t + 0.05);
    cg.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    chime.start(t + 0.05);
    chime.stop(t + 0.35);

    this.vibrate([80, 60, 80]);
  },

  // Shake / danger (deep rumble + vibration)
  danger() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    // Deep rumble
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.5);
    g.gain.setValueAtTime(this.volume * 0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.start(t);
    osc.stop(t + 0.5);
    // Impact sub
    const sub = this.ctx.createOscillator();
    const sg = this.ctx.createGain();
    sub.connect(sg);
    sg.connect(this.ctx.destination);
    sub.type = 'sine';
    sub.frequency.value = 50;
    sg.gain.setValueAtTime(this.volume * 0.35, t);
    sg.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    sub.start(t);
    sub.stop(t + 0.3);

    this.vibrate([100, 30, 100, 30, 80]);
  },

  // Chapter title (cinematic low pad)
  chapter() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc1.connect(g);
    osc2.connect(g);
    osc3.connect(g);
    g.connect(this.ctx.destination);
    osc1.type = 'sine'; osc1.frequency.value = 82.4;  // E2
    osc2.type = 'sine'; osc2.frequency.value = 123.5; // B2
    osc3.type = 'sine'; osc3.frequency.value = 164.8; // E3
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(this.volume * 0.18, t + 0.8);
    g.gain.linearRampToValueAtTime(this.volume * 0.12, t + 2);
    g.gain.exponentialRampToValueAtTime(0.001, t + 3.5);
    osc1.start(t); osc2.start(t); osc3.start(t);
    osc1.stop(t + 3.5); osc2.stop(t + 3.5); osc3.stop(t + 3.5);
    this.vibrate(200);
  },

  // Scene transition (wind whoosh)
  transition() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    const buf = this._createNoise(0.8);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(3000, t);
    bp.frequency.exponentialRampToValueAtTime(150, t + 0.6);
    bp.Q.value = 0.8;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(this.volume * 0.18, t + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.ctx.destination);
    src.start(t);
    src.stop(t + 0.8);
  },

  // Phone message pop
  message() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.06);
    g.gain.setValueAtTime(this.volume * 0.1, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.start(t);
    osc.stop(t + 0.08);
    this.vibrate(15);
  },

  // Evidence found (distinctive chime)
  evidence() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    const notes = [523, 659, 784];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const s = t + i * 0.12;
      g.gain.setValueAtTime(this.volume * 0.15, s);
      g.gain.exponentialRampToValueAtTime(0.001, s + 0.35);
      osc.start(s);
      osc.stop(s + 0.35);
    });
    this.vibrate([40, 40, 40]);
  },

  // Action success
  success() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const s = t + i * 0.1;
      g.gain.setValueAtTime(this.volume * 0.18, s);
      g.gain.exponentialRampToValueAtTime(0.001, s + 0.3);
      osc.start(s);
      osc.stop(s + 0.3);
    });
  },

  // Action fail
  fail() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.linearRampToValueAtTime(60, t + 0.6);
    g.gain.setValueAtTime(this.volume * 0.22, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc.start(t);
    osc.stop(t + 0.6);
    this.vibrate([150, 50, 150]);
  },

  // Heartbeat
  heartbeat() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 55;
      const s = t + i * 0.2;
      g.gain.setValueAtTime(this.volume * 0.25, s);
      g.gain.exponentialRampToValueAtTime(0.001, s + 0.15);
      osc.start(s);
      osc.stop(s + 0.15);
    }
    this.vibrate([60, 80, 60]);
  },

  // Door knock
  doorKnock() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const buf = this._createNoise(0.05);
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      const hp = this.ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 800;
      const g = this.ctx.createGain();
      const s = t + i * 0.25;
      g.gain.setValueAtTime(this.volume * 0.3, s);
      g.gain.exponentialRampToValueAtTime(0.001, s + 0.06);
      src.connect(hp);
      hp.connect(g);
      g.connect(this.ctx.destination);
      src.start(s);
      src.stop(s + 0.06);
      // Low thud
      const osc = this.ctx.createOscillator();
      const og = this.ctx.createGain();
      osc.connect(og);
      og.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 80;
      og.gain.setValueAtTime(this.volume * 0.3, s);
      og.gain.exponentialRampToValueAtTime(0.001, s + 0.1);
      osc.start(s);
      osc.stop(s + 0.1);
    }
    this.vibrate([50, 100, 50, 100, 50]);
  },

  // Door creak (for intruder scene)
  doorCreak() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.linearRampToValueAtTime(500, t + 0.3);
    osc.frequency.linearRampToValueAtTime(280, t + 0.6);
    osc.frequency.linearRampToValueAtTime(450, t + 0.9);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'bandpass';
    lp.frequency.value = 600;
    lp.Q.value = 5;
    osc.disconnect();
    osc.connect(lp);
    lp.connect(g);
    g.gain.setValueAtTime(this.volume * 0.08, t);
    g.gain.linearRampToValueAtTime(this.volume * 0.12, t + 0.4);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1);
    osc.start(t);
    osc.stop(t + 1);
    this.vibrate(80);
  },

  // Phone ring (calling someone)
  phoneRing() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    for (let r = 0; r < 2; r++) {
      const base = t + r * 0.6;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc1.connect(g);
      osc2.connect(g);
      g.connect(this.ctx.destination);
      osc1.type = 'sine'; osc1.frequency.value = 440;
      osc2.type = 'sine'; osc2.frequency.value = 480;
      g.gain.setValueAtTime(this.volume * 0.08, base);
      g.gain.setValueAtTime(0, base + 0.4);
      osc1.start(base);
      osc2.start(base);
      osc1.stop(base + 0.4);
      osc2.stop(base + 0.4);
    }
  },

  // Footsteps (running)
  footsteps() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const buf = this._createNoise(0.04);
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 600 + Math.random() * 200;
      const g = this.ctx.createGain();
      const s = t + i * 0.3;
      g.gain.setValueAtTime(this.volume * 0.15, s);
      g.gain.exponentialRampToValueAtTime(0.001, s + 0.06);
      src.connect(lp);
      lp.connect(g);
      g.connect(this.ctx.destination);
      src.start(s);
      src.stop(s + 0.06);
    }
  },

  // Tension sting (sudden reveal)
  tensionSting() {
    if (!this.enabled) return;
    this._ensure();
    const t = this.ctx.currentTime;
    // Dissonant chord
    const freqs = [233, 277, 311]; // Bb3 C#4 Eb4
    freqs.forEach(f => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.value = f;
      g.gain.setValueAtTime(this.volume * 0.12, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(2000, t);
      lp.frequency.exponentialRampToValueAtTime(200, t + 1.5);
      osc.disconnect();
      osc.connect(lp);
      lp.connect(g);
      osc.start(t);
      osc.stop(t + 1.5);
    });
    this.vibrate(120);
  },
};
