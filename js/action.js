// ========== ACTION ENGINE ==========
// 映画的アクション演出エンジン
// アーケードゲームではなく、緊迫感のあるナラティブアクション
const ActionEngine = {
  canvas: null,
  ctx: null,
  callback: null,
  config: null,
  isRunning: false,

  start(config, callback) {
    this.config = config;
    this.callback = callback;
    this.canvas = document.getElementById('action-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.isRunning = true;

    App.showScreen('screen-action');
    document.getElementById('action-timer').textContent = '';
    document.getElementById('action-instruction').textContent = '';
    if (typeof SFX !== 'undefined') SFX.startAmbient('chase');

    switch (config.type) {
      case 'chase':
        this.runCinematicChase(config);
        break;
      case 'stealth':
        this.runCinematicStealth(config);
        break;
      case 'qte':
        this.runCinematicQTE(config);
        break;
      default:
        this.callback({ success: true });
    }
  },

  // ========================================
  // CINEMATIC CHASE - 映画的逃走シーン
  // ========================================
  async runCinematicChase(config) {
    const W = this.canvas.width;
    const H = this.canvas.height;

    // Scene sequence - narrative + quick decisions
    const scenes = [
      {
        type: 'intro',
        text: '窓から飛び出した。\n冷たい夜の空気が肺を刺す。',
        subtext: '背後でドアが蹴破られる音がした。',
        duration: 2500,
      },
      {
        type: 'narration',
        text: '路地裏を走る。\n足音が二つ。自分のものと、もう一つ。',
        duration: 2000,
      },
      {
        type: 'decision',
        text: '分かれ道だ。',
        subtext: 'どちらに逃げる？',
        timeLimit: 3,
        options: [
          { text: '← 狭い路地へ', direction: 'left' },
          { text: '大通りへ →', direction: 'right' },
        ],
        correct: 'left', // 狭い路地の方が撒ける
      },
      {
        type: 'result_success',
        text: '狭い路地に身を滑り込ませた。\n追手の足音が一瞬止まる。',
        failText: '大通りに出た。だが開けた場所は不利だ。\n追手の影が迫る。',
        duration: 2000,
      },
      {
        type: 'narration',
        text: '息を殺して走り続ける。\n心臓の音が耳の奥で響いている。',
        duration: 2000,
      },
      {
        type: 'reflex',
        text: 'ゴミ箱が倒れてくる！',
        subtext: 'スワイプで避けろ！',
        direction: 'right',
        timeLimit: 2,
      },
      {
        type: 'narration',
        text: '間一髪。\nまだ追ってきている。',
        duration: 1800,
      },
      {
        type: 'decision',
        text: 'フェンスが立ちはだかる。',
        subtext: '',
        timeLimit: 2.5,
        options: [
          { text: '乗り越える', direction: 'up' },
          { text: '横の隙間を抜ける', direction: 'right' },
        ],
        correct: 'right',
      },
      {
        type: 'result_success',
        text: '隙間に体をねじ込む。\n追手には通れない幅だ。',
        failText: 'フェンスによじ登る。\nだが追手も続いてくる。',
        duration: 2000,
      },
      {
        type: 'reflex',
        text: '足元に段差！',
        subtext: 'タップしてジャンプ！',
        direction: 'tap',
        timeLimit: 1.8,
      },
      {
        type: 'narration',
        text: '背後の足音が…遠ざかっていく。\n撒いた…のか？',
        duration: 2500,
      },
    ];

    let successCount = 0;
    let totalDecisions = 0;

    for (const scene of scenes) {
      if (!this.isRunning) return;

      switch (scene.type) {
        case 'intro':
          await this.showCinematicText(scene.text, scene.subtext, scene.duration, 'dramatic');
          break;

        case 'narration':
          await this.showCinematicText(scene.text, scene.subtext || '', scene.duration, 'normal');
          break;

        case 'decision':
          totalDecisions++;
          if (typeof SFX !== 'undefined') SFX.heartbeat();
          await this.showPrepare('― 選択 ―', 'タップで選べ', 800);
          const choice = await this.showDecision(scene);
          if (choice === scene.correct) {
            successCount++;
          }
          // Show result
          const resultScene = scenes[scenes.indexOf(scene) + 1];
          if (resultScene && resultScene.type === 'result_success') {
            if (choice === scene.correct) {
              await this.showCinematicText(resultScene.text, '', resultScene.duration, 'success');
            } else {
              await this.showCinematicText(resultScene.failText, '', resultScene.duration, 'danger');
            }
          }
          break;

        case 'result_success':
          // Already handled by decision
          break;

        case 'reflex': {
          totalDecisions++;
          const dirText = scene.direction === 'left' ? '← 左へ避けろ'
            : scene.direction === 'right' ? '→ 右へ避けろ'
            : scene.direction === 'up' ? '↑ 上へ避けろ'
            : '● タップ準備';
          const actionHint = scene.direction === 'tap' ? 'タップで反応！' : 'スワイプで回避！';
          await this.showPrepare(dirText, actionHint, 800);
          const reflexOk = await this.showReflex(scene);
          if (reflexOk) successCount++;
          break;
        }
      }
    }

    // Final result
    const success = successCount >= Math.ceil(totalDecisions * 0.5);
    if (typeof SFX !== 'undefined') {
      SFX.stopAmbient();
      success ? SFX.success() : SFX.fail();
    }
    await this.showCinematicResult(success);
    this.callback({ success });
  },

  // ========================================
  // CINEMATIC STEALTH - 映画的潜入シーン
  // ========================================
  async runCinematicStealth(config) {
    const scenes = [
      {
        type: 'intro',
        text: '無人のオフィスに忍び込んだ。\n非常灯だけが薄暗い廊下を照らしている。',
        duration: 2500,
      },
      {
        type: 'listen',
        text: '足音が聞こえる。\n廊下の左側から近づいてくる。',
        dangerDirection: 'left',
        options: ['左の部屋', '正面の通路', '右の部屋'],
        timeLimit: 4,
      },
      {
        type: 'narration',
        text: '息を潜める。\n足音が通り過ぎていく…',
        duration: 2000,
      },
      {
        type: 'listen',
        text: '再び足音。\n今度は正面から。',
        dangerDirection: 'center',
        options: ['左の部屋', '正面の通路', '右の部屋'],
        timeLimit: 3.5,
      },
      {
        type: 'narration',
        text: '目的のデスクまであと少し。',
        duration: 1500,
      },
      {
        type: 'listen',
        text: 'ドアが開く音。\n右側の部屋から誰かが出てきた。',
        dangerDirection: 'right',
        options: ['左の部屋', '正面の通路', '右の部屋'],
        timeLimit: 3,
      },
    ];

    let successCount = 0;
    let totalRounds = 0;

    for (const scene of scenes) {
      if (!this.isRunning) return;

      switch (scene.type) {
        case 'intro':
        case 'narration':
          await this.showCinematicText(scene.text, '', scene.duration, 'stealth');
          break;

        case 'listen':
          totalRounds++;
          await this.showPrepare('― 隠れろ ―', 'タップで選べ', 800);
          const safe = await this.showStealthChoice(scene);
          if (safe) successCount++;
          break;
      }
    }

    const success = successCount >= Math.ceil(totalRounds * 0.5);
    if (typeof SFX !== 'undefined') SFX.stopAmbient();
    if (success) {
      await this.showCinematicText('見つからずにやり過ごした。\n田中のデスクに辿り着く。', '', 2500, 'success');
    } else {
      await this.showCinematicText('物音を立ててしまった。\n侵入者がこちらに気づいた…！', '', 2500, 'danger');
    }
    this.callback({ success });
  },

  // ========================================
  // CINEMATIC QTE
  // ========================================
  async runCinematicQTE(config) {
    const actions = config.actions || [
      { text: '拳が飛んでくる！', subtext: '← 左に避けろ！', direction: 'left' },
      { text: 'ナイフが振り下ろされる！', subtext: '→ 右に避けろ！', direction: 'right' },
      { text: '体勢を崩した隙に！', subtext: 'タップして掴め！', direction: 'tap' },
    ];

    let successCount = 0;

    await this.showCinematicText('', '', 500, 'normal');

    for (const action of actions) {
      if (!this.isRunning) return;
      const qteDir = action.direction === 'left' ? '← 左へ'
        : action.direction === 'right' ? '→ 右へ'
        : action.direction === 'up' ? '↑ 上へ'
        : '● タップ';
      const qteHint = action.direction === 'tap' ? 'タップで反応！' : 'スワイプで回避！';
      await this.showPrepare(qteDir, qteHint, 800);
      const ok = await this.showReflex({
        text: action.text,
        subtext: action.subtext,
        direction: action.direction,
        timeLimit: action.timeLimit || 2,
      });
      if (ok) successCount++;
      await this.delay(500);
    }

    const success = successCount >= Math.ceil(actions.length * 0.5);
    this.callback({ success });
  },

  // ========================================
  // RENDERING HELPERS
  // ========================================

  // Cinematic text display
  showCinematicText(text, subtext, duration, mood) {
    return new Promise(resolve => {
      const W = this.canvas.width;
      const H = this.canvas.height;
      const ctx = this.ctx;

      // Background based on mood
      const bgColors = {
        normal: '#080810',
        dramatic: '#0a0508',
        danger: '#120508',
        success: '#050a08',
        stealth: '#050810',
      };
      ctx.fillStyle = bgColors[mood] || '#080810';
      ctx.fillRect(0, 0, W, H);

      // Ambient effect
      if (mood === 'danger') {
        ctx.fillStyle = 'rgba(150, 20, 20, 0.05)';
        ctx.fillRect(0, 0, W, H);
      }

      // Main text - typed out effect
      ctx.textAlign = 'center';
      const lines = text.split('\n');
      const lineHeight = 32;
      const startY = H / 2 - (lines.length * lineHeight) / 2;

      let charCount = 0;
      const totalChars = lines.reduce((sum, l) => sum + l.length, 0);
      const charInterval = Math.min(50, (duration * 0.6) / totalChars);

      const typeInterval = setInterval(() => {
        ctx.fillStyle = bgColors[mood] || '#080810';
        ctx.fillRect(0, 0, W, H);

        if (mood === 'danger') {
          ctx.fillStyle = 'rgba(150, 20, 20, 0.05)';
          ctx.fillRect(0, 0, W, H);
        }

        // Side accent line
        const accentColors = {
          normal: '#333',
          dramatic: '#c0392b',
          danger: '#c0392b',
          success: '#2d5a27',
          stealth: '#1a3a5a',
        };
        ctx.fillStyle = accentColors[mood] || '#333';
        ctx.fillRect(W * 0.08, startY - 20, 2, lines.length * lineHeight + 20);

        let drawn = 0;
        ctx.fillStyle = mood === 'danger' ? '#e8a0a0' : mood === 'success' ? '#a0d0a0' : '#d0d0d0';
        ctx.font = '17px sans-serif';

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const charsToShow = Math.max(0, Math.min(line.length, charCount - drawn));
          const visibleText = line.substring(0, charsToShow);
          ctx.fillText(visibleText, W / 2, startY + i * lineHeight);
          drawn += line.length;
        }

        charCount++;

        if (charCount > totalChars + 5) {
          clearInterval(typeInterval);

          // Show subtext
          if (subtext) {
            ctx.fillStyle = '#666';
            ctx.font = '13px sans-serif';
            ctx.fillText(subtext, W / 2, startY + lines.length * lineHeight + 25);
          }
        }
      }, charInterval);

      setTimeout(() => {
        clearInterval(typeInterval);
        resolve();
      }, duration);
    });
  },

  // Decision prompt with two options
  showDecision(scene) {
    return new Promise(resolve => {
      const W = this.canvas.width;
      const H = this.canvas.height;
      const ctx = this.ctx;

      ctx.fillStyle = '#080810';
      ctx.fillRect(0, 0, W, H);

      // Pulsing danger border
      let frame = 0;
      const pulseInterval = setInterval(() => {
        frame++;
        const alpha = 0.1 + Math.sin(frame * 0.15) * 0.05;
        ctx.fillStyle = '#080810';
        ctx.fillRect(0, 0, W, H);

        // Side danger glow
        ctx.fillStyle = `rgba(192, 57, 43, ${alpha})`;
        ctx.fillRect(0, 0, 4, H);
        ctx.fillRect(W - 4, 0, 4, H);

        // Text
        ctx.textAlign = 'center';
        ctx.fillStyle = '#e0e0e0';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(scene.text, W / 2, H * 0.3);

        if (scene.subtext) {
          ctx.fillStyle = '#888';
          ctx.font = '14px sans-serif';
          ctx.fillText(scene.subtext, W / 2, H * 0.37);
        }

        // Timer bar
        const elapsed = frame * 30;
        const ratio = Math.max(0, 1 - elapsed / (scene.timeLimit * 1000));
        ctx.fillStyle = '#1a1a2a';
        ctx.fillRect(W * 0.1, H * 0.43, W * 0.8, 4);
        ctx.fillStyle = ratio > 0.3 ? '#c0392b' : '#ff2222';
        ctx.fillRect(W * 0.1, H * 0.43, W * 0.8 * ratio, 4);

        // Option buttons
        scene.options.forEach((opt, i) => {
          const btnY = H * 0.52 + i * 70;
          const isHover = false;
          ctx.fillStyle = 'rgba(255,255,255,0.03)';
          ctx.strokeStyle = '#444';
          ctx.lineWidth = 1;
          ctx.fillRect(W * 0.1, btnY, W * 0.8, 55);
          ctx.strokeRect(W * 0.1, btnY, W * 0.8, 55);

          ctx.fillStyle = '#d0d0d0';
          ctx.font = '16px sans-serif';
          ctx.fillText(opt.text, W / 2, btnY + 33);
        });
      }, 30);

      // Touch handler
      let resolved = false;
      const onTap = (e) => {
        if (resolved) return;
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        const ty = touch.clientY - rect.top;

        scene.options.forEach((opt, i) => {
          const btnY = H * 0.52 + i * 70;
          if (ty > btnY && ty < btnY + 55) {
            resolved = true;
            clearInterval(pulseInterval);
            cleanup();

            // Flash feedback
            ctx.fillStyle = opt.direction === scene.correct
              ? 'rgba(0,100,50,0.2)' : 'rgba(100,20,20,0.2)';
            ctx.fillRect(0, 0, W, H);
            if (typeof SFX !== 'undefined') {
              opt.direction === scene.correct ? SFX.select() : SFX.fail();
            }

            setTimeout(() => resolve(opt.direction), 400);
          }
        });
      };

      this.canvas.addEventListener('touchstart', onTap);
      this.canvas.addEventListener('click', onTap);

      const cleanup = () => {
        this.canvas.removeEventListener('touchstart', onTap);
        this.canvas.removeEventListener('click', onTap);
      };

      // Timeout - auto-fail
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          clearInterval(pulseInterval);
          cleanup();
          resolve('timeout');
        }
      }, scene.timeLimit * 1000);
    });
  },

  // Reflex action (swipe/tap)
  showReflex(scene) {
    return new Promise(resolve => {
      const W = this.canvas.width;
      const H = this.canvas.height;
      const ctx = this.ctx;

      // Flash warning
      ctx.fillStyle = '#120508';
      ctx.fillRect(0, 0, W, H);

      // Danger flash
      let flash = 3;
      const flashInterval = setInterval(() => {
        ctx.fillStyle = flash % 2 === 0 ? 'rgba(192,57,43,0.15)' : 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, W, H);
        flash--;
        if (flash <= 0) clearInterval(flashInterval);
      }, 100);

      setTimeout(() => {
        ctx.fillStyle = '#0a0508';
        ctx.fillRect(0, 0, W, H);

        // Warning text
        ctx.textAlign = 'center';
        ctx.fillStyle = '#c0392b';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(scene.text, W / 2, H * 0.35);

        // Direction indicator
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 36px sans-serif';
        const dirSymbol = scene.direction === 'left' ? '←'
          : scene.direction === 'right' ? '→'
          : scene.direction === 'up' ? '↑' : '●';
        ctx.fillText(dirSymbol, W / 2, H * 0.5);

        ctx.fillStyle = '#aaa';
        ctx.font = '15px sans-serif';
        ctx.fillText(scene.subtext, W / 2, H * 0.6);

        // Timer bar
        const startTime = Date.now();
        const barLoop = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const ratio = Math.max(0, 1 - elapsed / (scene.timeLimit * 1000));
          ctx.fillStyle = '#0a0508';
          ctx.fillRect(W * 0.1, H * 0.67, W * 0.8, 6);
          ctx.fillStyle = ratio > 0.3 ? '#c0392b' : '#ff2222';
          ctx.fillRect(W * 0.1, H * 0.67, W * 0.8 * ratio, 6);
        }, 30);

        let resolved = false;
        let startX = 0;

        const onStart = (e) => {
          const touch = e.touches ? e.touches[0] : e;
          startX = touch.clientX;
        };
        const onEnd = (e) => {
          if (resolved) return;
          const touch = e.changedTouches ? e.changedTouches[0] : e;
          const dx = touch.clientX - startX;

          let correct = false;
          if (scene.direction === 'left' && dx < -30) correct = true;
          else if (scene.direction === 'right' && dx > 30) correct = true;
          else if (scene.direction === 'up' && dx < 10 && dx > -10) correct = true; // Swipe up approximation
          else if (scene.direction === 'tap' && Math.abs(dx) < 20) correct = true;

          resolved = true;
          clearInterval(barLoop);
          cleanup();

          // Feedback
          ctx.fillStyle = correct ? 'rgba(0,80,40,0.3)' : 'rgba(120,20,20,0.3)';
          ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = correct ? '#4a90d9' : '#c0392b';
          ctx.font = 'bold 22px sans-serif';
          ctx.fillText(correct ? '回避成功！' : '回避失敗...', W / 2, H * 0.82);
          if (typeof SFX !== 'undefined') { correct ? SFX.success() : SFX.fail(); }

          setTimeout(() => resolve(correct), 800);
        };

        this.canvas.addEventListener('touchstart', onStart);
        this.canvas.addEventListener('touchend', onEnd);
        this.canvas.addEventListener('mousedown', onStart);
        this.canvas.addEventListener('mouseup', onEnd);

        const cleanup = () => {
          this.canvas.removeEventListener('touchstart', onStart);
          this.canvas.removeEventListener('touchend', onEnd);
          this.canvas.removeEventListener('mousedown', onStart);
          this.canvas.removeEventListener('mouseup', onEnd);
        };

        // Timeout
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            clearInterval(barLoop);
            cleanup();

            ctx.fillStyle = 'rgba(120,20,20,0.3)';
            ctx.fillRect(0, 0, W, H);
            ctx.fillStyle = '#c0392b';
            ctx.font = 'bold 22px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('間に合わなかった...', W / 2, H * 0.82);

            setTimeout(() => resolve(false), 800);
          }
        }, scene.timeLimit * 1000);
      }, 400);
    });
  },

  // Stealth hide choice
  showStealthChoice(scene) {
    return new Promise(resolve => {
      const W = this.canvas.width;
      const H = this.canvas.height;
      const ctx = this.ctx;

      ctx.fillStyle = '#050810';
      ctx.fillRect(0, 0, W, H);

      // Atmospheric text
      ctx.textAlign = 'center';
      ctx.fillStyle = '#a0a0b0';
      ctx.font = '16px sans-serif';
      const lines = scene.text.split('\n');
      lines.forEach((line, i) => {
        ctx.fillText(line, W / 2, H * 0.2 + i * 28);
      });

      // Danger direction indicator
      const dangerMap = { left: '◀ 左から', center: '▲ 正面から', right: '▶ 右から' };
      ctx.fillStyle = '#c0392b';
      ctx.font = '14px sans-serif';
      ctx.fillText(dangerMap[scene.dangerDirection] || '', W / 2, H * 0.2 + lines.length * 28 + 15);

      // Hide options
      const options = scene.options;
      const dangerIndex = scene.dangerDirection === 'left' ? 0
        : scene.dangerDirection === 'center' ? 1 : 2;

      // Timer
      const startTime = Date.now();
      const barLoop = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const ratio = Math.max(0, 1 - elapsed / (scene.timeLimit * 1000));
        ctx.fillStyle = '#050810';
        ctx.fillRect(W * 0.1, H * 0.39, W * 0.8, 4);
        ctx.fillStyle = ratio > 0.3 ? '#1a3a5a' : '#c0392b';
        ctx.fillRect(W * 0.1, H * 0.39, W * 0.8 * ratio, 4);
      }, 30);

      options.forEach((opt, i) => {
        const btnY = H * 0.45 + i * 70;
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.strokeStyle = '#1a2a3a';
        ctx.lineWidth = 1;
        ctx.fillRect(W * 0.1, btnY, W * 0.8, 55);
        ctx.strokeRect(W * 0.1, btnY, W * 0.8, 55);
        ctx.fillStyle = '#a0b0c0';
        ctx.font = '15px sans-serif';
        ctx.fillText(opt, W / 2, btnY + 33);
      });

      let resolved = false;
      const onTap = (e) => {
        if (resolved) return;
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        const ty = touch.clientY - rect.top;

        options.forEach((opt, i) => {
          const btnY = H * 0.45 + i * 70;
          if (ty > btnY && ty < btnY + 55) {
            resolved = true;
            clearInterval(barLoop);
            cleanup();

            const safe = i !== dangerIndex;

            // Show result
            ctx.fillStyle = safe ? 'rgba(0,60,40,0.3)' : 'rgba(100,20,20,0.3)';
            ctx.fillRect(W * 0.1, btnY, W * 0.8, 55);

            // Highlight danger
            const dangerBtnY = H * 0.45 + dangerIndex * 70;
            ctx.strokeStyle = '#c0392b';
            ctx.lineWidth = 2;
            ctx.strokeRect(W * 0.1, dangerBtnY, W * 0.8, 55);

            ctx.fillStyle = safe ? '#4a90d9' : '#c0392b';
            ctx.font = 'bold 18px sans-serif';
            ctx.fillText(safe ? '...やり過ごした' : '見つかった！', W / 2, H * 0.88);
            if (typeof SFX !== 'undefined') { safe ? SFX.select() : SFX.danger(); }

            setTimeout(() => resolve(safe), 1200);
          }
        });
      };

      this.canvas.addEventListener('touchstart', onTap);
      this.canvas.addEventListener('click', onTap);

      const cleanup = () => {
        this.canvas.removeEventListener('touchstart', onTap);
        this.canvas.removeEventListener('click', onTap);
      };

      // Timeout
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          clearInterval(barLoop);
          cleanup();
          ctx.fillStyle = 'rgba(100,20,20,0.3)';
          ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = '#c0392b';
          ctx.font = 'bold 18px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('隠れるのが間に合わなかった...', W / 2, H * 0.88);
          setTimeout(() => resolve(false), 1200);
        }
      }, scene.timeLimit * 1000);
    });
  },

  // Final result screen
  showCinematicResult(success) {
    return new Promise(resolve => {
      const W = this.canvas.width;
      const H = this.canvas.height;
      const ctx = this.ctx;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, W, H);

      // Fade in result
      let opacity = 0;
      const fadeIn = setInterval(() => {
        opacity += 0.03;
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, W, H);

        ctx.globalAlpha = Math.min(1, opacity);
        ctx.textAlign = 'center';

        if (success) {
          ctx.fillStyle = '#4a90d9';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText('逃走成功', W / 2, H / 2 - 20);
          ctx.fillStyle = '#888';
          ctx.font = '14px sans-serif';
          ctx.fillText('追手を撒いた。しばらくは安全だ。', W / 2, H / 2 + 20);
        } else {
          ctx.fillStyle = '#c0392b';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText('捕まった', W / 2, H / 2 - 20);
          ctx.fillStyle = '#888';
          ctx.font = '14px sans-serif';
          ctx.fillText('だが通行人の声で追手は逃げた。', W / 2, H / 2 + 20);
        }

        ctx.globalAlpha = 1;

        if (opacity >= 1) {
          clearInterval(fadeIn);
          setTimeout(resolve, 2000);
        }
      }, 30);
    });
  },

  // Prepare phase - brief operation guide before action
  showPrepare(title, hint, duration) {
    return new Promise(resolve => {
      const W = this.canvas.width;
      const H = this.canvas.height;
      const ctx = this.ctx;

      const startTime = Date.now();
      const fadeDuration = 200;

      const draw = () => {
        const elapsed = Date.now() - startTime;
        const fadeIn = Math.min(1, elapsed / fadeDuration);
        const fadeOut = elapsed > duration - fadeDuration
          ? Math.max(0, 1 - (elapsed - (duration - fadeDuration)) / fadeDuration)
          : 1;
        const alpha = Math.min(fadeIn, fadeOut);

        ctx.fillStyle = '#080810';
        ctx.fillRect(0, 0, W, H);

        ctx.globalAlpha = alpha;
        ctx.textAlign = 'center';

        // Title
        ctx.fillStyle = '#c0392b';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText(title, W / 2, H * 0.42);

        // Hint
        ctx.fillStyle = '#aaa';
        ctx.font = '16px sans-serif';
        ctx.fillText(hint, W / 2, H * 0.55);

        ctx.globalAlpha = 1;

        if (elapsed < duration) {
          requestAnimationFrame(draw);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(draw);
    });
  },

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
};
