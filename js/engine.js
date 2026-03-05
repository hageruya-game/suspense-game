// ========== GAME ENGINE ==========
const Engine = {
  state: null,
  scenes: {},
  textQueue: [],
  isTyping: false,
  typeTimer: null,
  typeSpeed: 50, // ms per character
  currentTextIndex: 0,
  currentSceneData: null,
  timerInterval: null,

  // ----- INIT -----
  init() {
    this.state = SaveManager.getDefaultState();
    this.bindEvents();
    if (typeof SFX !== 'undefined') SFX.init();
  },

  bindEvents() {
    const textArea = document.getElementById('text-area');
    textArea.addEventListener('click', () => this.onTextTap());
    textArea.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.onTextTap();
    });
  },

  // ----- SCENE REGISTRATION -----
  registerScenes(sceneMap) {
    Object.assign(this.scenes, sceneMap);
  },

  // ----- SCENE PLAYBACK -----
  playScene(sceneId) {
    const scene = this.scenes[sceneId];
    if (!scene) {
      console.error('Scene not found:', sceneId);
      return;
    }

    this.state.currentScene = sceneId;
    this.currentSceneData = scene;
    this.currentTextIndex = 0;

    // Clear
    this.clearText();
    this.clearChoices();

    // Chapter title
    if (scene.chapterTitle) {
      this.showChapterTitle(scene.chapterTitle, scene.chapterSub, () => {
        this._startScene(scene);
      });
      return;
    }

    // Scene transition (when location/time changes)
    if (scene.location && scene.showTransition !== false) {
      this.showSceneTransition(scene.location, scene.time, () => {
        this._startScene(scene);
      });
      return;
    }

    this._startScene(scene);
  },

  _startScene(scene) {
    // Update header
    if (scene.location) {
      document.getElementById('scene-location').textContent = scene.location;
    }
    if (scene.time) {
      document.getElementById('scene-time').textContent = scene.time;
    }

    // Apply background
    const gameScreen = document.getElementById('screen-game');
    // Remove old bg classes
    gameScreen.className = gameScreen.className.replace(/bg-\S+/g, '').trim();
    if (scene.bg) {
      gameScreen.classList.add(scene.bg);
      // Start ambient sound matching the scene
      if (typeof SFX !== 'undefined') {
        const ambientMap = {
          'bg-night-street': 'night-street',
          'bg-home-morning': 'home-morning',
          'bg-home-evening': 'home-evening',
          'bg-interrogation': 'interrogation',
          'bg-night-danger': 'night-danger',
          'bg-convenience': 'convenience',
          'bg-cafe': 'cafe',
          'bg-office-dark': 'office-dark',
          'bg-confrontation': 'confrontation',
        };
        const ambient = ambientMap[scene.bg];
        if (ambient) SFX.startAmbient(ambient);
      }
    }

    // Apply effects
    if (scene.effect) {
      this.applyEffect(scene.effect);
    }

    // Process scene content
    this.processNext();
  },

  // ----- CHAPTER TITLE -----
  showChapterTitle(title, sub, callback) {
    const overlay = document.getElementById('chapter-title-overlay');
    const titleEl = document.getElementById('chapter-title-text');
    const subEl = document.getElementById('chapter-title-sub');

    titleEl.textContent = title;
    subEl.textContent = sub || '';

    // Reset animations
    titleEl.style.animation = 'none';
    subEl.style.animation = 'none';
    void titleEl.offsetWidth; // Force reflow
    titleEl.style.animation = '';
    subEl.style.animation = '';

    overlay.classList.add('active');
    if (typeof SFX !== 'undefined') SFX.chapter();

    setTimeout(() => {
      overlay.style.transition = 'opacity 1s ease';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.classList.remove('active');
        overlay.style.opacity = '';
        overlay.style.transition = '';
        callback();
      }, 1000);
    }, 3000);
  },

  // ----- SCENE TRANSITION -----
  showSceneTransition(location, time, callback) {
    const trans = document.getElementById('scene-transition');
    const locEl = document.getElementById('scene-transition-location');
    const timeEl = document.getElementById('scene-transition-time');

    locEl.textContent = location;
    timeEl.textContent = time || '';

    trans.classList.add('active');
    if (typeof SFX !== 'undefined') SFX.transition();
    // Trigger fade in
    requestAnimationFrame(() => {
      trans.classList.add('visible');
    });

    setTimeout(() => {
      trans.classList.remove('visible');
      setTimeout(() => {
        trans.classList.remove('active');
        callback();
      }, 600);
    }, 1500);
  },

  processNext() {
    const scene = this.currentSceneData;
    if (!scene || !scene.content) return;

    if (this.currentTextIndex >= scene.content.length) {
      // Scene content finished
      if (scene.showRank) {
        this.showRankScreen();
        return;
      }
      if (scene.choices) {
        this.showChoices(scene.choices, scene.timeLimit);
      } else if (scene.next) {
        this.playScene(scene.next);
      } else if (scene.action) {
        this.startAction(scene.action);
      }
      return;
    }

    const item = scene.content[this.currentTextIndex];

    switch (item.type) {
      case 'text':
        this.showText(item.speaker || '', item.text);
        break;
      case 'narration':
        this.showText('', item.text);
        break;
      case 'phone':
        this.showPhone(item.messages, item.appName);
        break;
      case 'notification':
        this.showNotification(item.title, item.text, item.onClose);
        break;
      case 'effect':
        this.applyEffect(item.name);
        this.currentTextIndex++;
        this.processNext();
        break;
      case 'sfx':
        if (typeof SFX !== 'undefined' && SFX[item.name]) SFX[item.name]();
        this.currentTextIndex++;
        this.processNext();
        break;
      case 'flag':
        this.state.flags[item.key] = item.value;
        this.currentTextIndex++;
        this.processNext();
        break;
      case 'condition':
        if (this.checkCondition(item.condition)) {
          if (item.then) {
            this.playScene(item.then);
            return;
          }
        } else {
          if (item.else) {
            this.playScene(item.else);
            return;
          }
        }
        this.currentTextIndex++;
        this.processNext();
        break;
      case 'puzzle':
        this.showPuzzle(item);
        break;
      case 'evidence':
        this.addEvidence(item.id, item.name, item.description);
        this.currentTextIndex++;
        this.processNext();
        break;
      case 'params':
        this.updateParams(item.changes);
        this.currentTextIndex++;
        this.processNext();
        break;
      default:
        this.currentTextIndex++;
        this.processNext();
    }
  },

  // ----- PLACEHOLDER HELPERS -----
  getPosition() {
    return '社員';
  },

  replacePlaceholders(text) {
    const isMale = this.state.player.gender !== 'female';
    text = text.replace(/\{name\}/g, this.state.player.name || '主人公');
    text = text.replace(/\{age\}/g, this.state.player.age || '??');
    text = text.replace(/\{position\}/g, this.getPosition());
    // Gender-aware pronouns and speech
    text = text.replace(/\{I\}/g, isMale ? '俺' : '私');
    text = text.replace(/\{my\}/g, isMale ? '俺の' : '私の');
    text = text.replace(/\{dayo\}/g, isMale ? 'だよ' : 'だよ');
    text = text.replace(/\{daze\}/g, isMale ? 'だぜ' : 'だわ');
    text = text.replace(/\{dazo\}/g, isMale ? 'だぞ' : 'だよ');
    text = text.replace(/\{kana\}/g, isMale ? 'かな' : 'かしら');
    text = text.replace(/\{nano\}/g, isMale ? 'なんだ' : 'なの');
    text = text.replace(/\{daro\}/g, isMale ? 'だろ' : 'でしょ');
    text = text.replace(/\{zo\}/g, isMale ? 'ぞ' : 'わよ');
    text = text.replace(/\{ka\}/g, isMale ? 'か' : 'かしら');
    text = text.replace(/\{nda\}/g, isMale ? 'んだ' : 'の');
    text = text.replace(/\{ore_watashi\}/g, isMale ? '俺' : '私');
    return text;
  },

  // ----- TEXT DISPLAY -----
  showText(speaker, text) {
    const speakerEl = document.getElementById('speaker-name');
    const contentEl = document.getElementById('text-content');
    const indicator = document.getElementById('text-indicator');

    // Replace placeholders
    text = this.replacePlaceholders(text);

    speaker = this.replacePlaceholders(speaker);
    speakerEl.textContent = speaker;
    contentEl.textContent = '';
    indicator.style.display = 'none';
    this.isTyping = true;

    let charIndex = 0;
    const chars = Array.from(text);

    clearInterval(this.typeTimer);
    this.typeTimer = setInterval(() => {
      if (charIndex < chars.length) {
        contentEl.textContent += chars[charIndex];
        charIndex++;
      } else {
        clearInterval(this.typeTimer);
        this.isTyping = false;
        indicator.style.display = 'block';
      }
    }, this.typeSpeed);
  },

  onTextTap() {
    if (this.isTyping) {
      // Skip typing animation
      clearInterval(this.typeTimer);
      const scene = this.currentSceneData;
      if (scene && scene.content && this.currentTextIndex < scene.content.length) {
        const item = scene.content[this.currentTextIndex];
        if (item.type === 'text' || item.type === 'narration') {
          let text = this.replacePlaceholders(item.text);
          document.getElementById('text-content').textContent = text;
        }
      }
      this.isTyping = false;
      document.getElementById('text-indicator').style.display = 'block';
    } else {
      // Advance to next
      if (typeof SFX !== 'undefined') SFX.advance();
      this.currentTextIndex++;
      this.processNext();
    }
  },

  clearText() {
    document.getElementById('speaker-name').textContent = '';
    document.getElementById('text-content').textContent = '';
    document.getElementById('text-indicator').style.display = 'none';
  },

  // ----- CHOICES -----
  showChoices(choices, timeLimit) {
    const area = document.getElementById('choices-area');
    area.innerHTML = '';

    // Filter choices by conditions
    const available = choices.filter(c => {
      if (!c.condition) return true;
      return this.checkCondition(c.condition);
    });

    // Timer bar
    if (timeLimit) {
      const timerDiv = document.createElement('div');
      timerDiv.className = 'choice-timer';
      const bar = document.createElement('div');
      bar.className = 'choice-timer-bar';
      bar.style.width = '100%';
      timerDiv.appendChild(bar);
      area.appendChild(timerDiv);

      // Animate timer
      requestAnimationFrame(() => {
        bar.style.transitionDuration = timeLimit + 's';
        bar.style.width = '0%';
      });

      // Timeout
      this.timerInterval = setTimeout(() => {
        if (available.length > 0) {
          const last = available[available.length - 1];
          this.selectChoice(last);
        }
      }, timeLimit * 1000);
    }

    available.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => {
        if (this.timerInterval) {
          clearTimeout(this.timerInterval);
          this.timerInterval = null;
        }
        this.selectChoice(choice);
      });
      area.appendChild(btn);
    });
  },

  selectChoice(choice) {
    if (typeof SFX !== 'undefined') SFX.select();
    // Record choice
    this.state.choiceHistory.push({
      scene: this.state.currentScene,
      choice: choice.id || choice.text,
      timestamp: Date.now(),
    });

    // Apply params
    if (choice.params) {
      this.updateParams(choice.params);
    }

    // Set flags
    if (choice.flags) {
      Object.assign(this.state.flags, choice.flags);
    }

    // Add evidence
    if (choice.evidence) {
      choice.evidence.forEach(e => this.addEvidence(e.id, e.name, e.description));
    }

    this.clearChoices();

    // Navigate
    if (choice.next) {
      this.playScene(choice.next);
    } else if (choice.action) {
      this.startAction(choice.action);
    } else {
      // No next scene — return to title
      App.showScreen('screen-title');
      App.checkContinue();
    }
  },

  clearChoices() {
    document.getElementById('choices-area').innerHTML = '';
    if (this.timerInterval) {
      clearTimeout(this.timerInterval);
      this.timerInterval = null;
    }
  },

  // ----- PHONE UI -----
  showPhone(messages, appName) {
    const overlay = document.getElementById('phone-overlay');
    const chat = document.getElementById('phone-chat');
    const header = document.getElementById('phone-app-name');
    const playerName = this.state.player.name || '自分';

    chat.innerHTML = '';
    if (appName) header.textContent = appName;

    overlay.classList.add('active');

    let msgIndex = 0;
    const showNextMsg = () => {
      if (msgIndex >= messages.length) {
        document.getElementById('phone-close').style.display = 'block';
        return;
      }
      const msg = messages[msgIndex];
      const wrapper = document.createElement('div');
      const isSent = msg.from === 'player';
      const isSystem = msg.from === 'system';

      if (isSystem) {
        wrapper.className = 'chat-msg system';
        wrapper.textContent = msg.text;
      } else {
        wrapper.className = 'chat-row ' + (isSent ? 'chat-row-sent' : 'chat-row-received');

        // Sender name label
        const nameLabel = document.createElement('div');
        nameLabel.className = 'chat-sender';
        nameLabel.textContent = isSent ? playerName : (msg.senderName || msg.from || '相手');
        wrapper.appendChild(nameLabel);

        // Message bubble
        const bubble = document.createElement('div');
        bubble.className = 'chat-msg ' + (isSent ? 'sent' : 'received');
        bubble.textContent = msg.text;
        if (msg.time) {
          const timeSpan = document.createElement('div');
          timeSpan.className = 'chat-time';
          timeSpan.textContent = msg.time;
          bubble.appendChild(timeSpan);
        }
        wrapper.appendChild(bubble);
      }

      chat.appendChild(wrapper);
      chat.scrollTop = chat.scrollHeight;
      if (typeof SFX !== 'undefined') SFX.message();
      msgIndex++;
      setTimeout(showNextMsg, 700);
    };

    document.getElementById('phone-close').style.display = 'none';
    document.getElementById('phone-close').onclick = () => {
      overlay.classList.remove('active');
      this.currentTextIndex++;
      this.processNext();
    };

    setTimeout(showNextMsg, 500);
  },

  // ----- NOTIFICATION -----
  showNotification(title, text) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.innerHTML = `<div class="notification-title">${title}</div><div>${text}</div>`;
    document.getElementById('screen-game').appendChild(notif);
    if (typeof SFX !== 'undefined') SFX.notification();

    notif.addEventListener('click', () => {
      notif.remove();
    });

    setTimeout(() => {
      if (notif.parentNode) {
        notif.remove();
      }
      this.currentTextIndex++;
      this.processNext();
    }, 3000);
  },

  // ----- EFFECTS -----
  applyEffect(name) {
    const gameScreen = document.getElementById('screen-game');
    switch (name) {
      case 'shake':
        gameScreen.classList.add('screen-shake');
        if (typeof SFX !== 'undefined') SFX.danger();
        setTimeout(() => gameScreen.classList.remove('screen-shake'), 500);
        break;
      case 'fadeIn':
        gameScreen.classList.add('fade-in');
        setTimeout(() => gameScreen.classList.remove('fade-in'), 1000);
        break;
      case 'fadeToBlack':
        gameScreen.classList.add('fade-to-black');
        setTimeout(() => {
          gameScreen.classList.remove('fade-to-black');
          gameScreen.style.opacity = '1';
        }, 1000);
        break;
    }
  },

  // ----- PARAMS -----
  updateParams(changes) {
    for (const [key, value] of Object.entries(changes)) {
      if (this.state.params[key] !== undefined) {
        this.state.params[key] += value;
        // Clamp to 0 minimum
        if (this.state.params[key] < 0) this.state.params[key] = 0;
      }
    }
  },

  // ----- EVIDENCE -----
  addEvidence(id, name, description) {
    if (!this.state.evidence.find(e => e.id === id)) {
      this.state.evidence.push({ id, name, description });
      if (typeof SFX !== 'undefined') SFX.evidence();
    }
  },

  showEvidenceBoard() {
    const list = document.getElementById('evidence-list');
    const overlay = document.getElementById('evidence-overlay');

    list.innerHTML = '';

    // All possible evidence
    const allEvidence = [
      { id: 'fake_message', name: '偽造されたLINEメッセージ' },
      { id: 'tanaka_trouble', name: '田中が「会社でやばいこと」を発見した証言' },
      { id: 'usb_memory', name: 'USBメモリ「sato_keiri_2024」' },
      { id: 'intruder_watch', name: '侵入者の高級腕時計の目撃' },
      { id: 'intruder_button', name: '高級スーツのボタン' },
      { id: 'car_number', name: '脅迫者の車のナンバー写真' },
      { id: 'thursday_dinner', name: '田中と佐藤の木曜の食事' },
      { id: 'suzuki_witness', name: '鈴木の目撃証言' },
      { id: 'kuroda_info', name: '黒田からの捜査情報' },
      { id: 'threat_message', name: '差出人不明の脅迫メッセージ' },
      { id: 'yamamoto_testimony', name: '山本の証言' },
      { id: 'tanaka_sns', name: '田中のSNS投稿の異変' },
      { id: 'non_caller', name: '非通知着信の記録' },
      { id: 'chase_perfume', name: '追手の香水の匂い' },
      { id: 'convenience_receipt', name: 'コンビニのレシート' },
      { id: 'sato_embezzlement', name: '佐藤の横領データ' },
      { id: 'sato_call_record', name: '佐藤との通話録音' },
      { id: 'sato_confession', name: '佐藤の自白録音' },
    ];

    allEvidence.forEach(ev => {
      const found = this.state.evidence.find(e => e.id === ev.id);
      const div = document.createElement('div');
      div.className = 'evidence-item' + (found ? ' found' : '');
      div.innerHTML = `<span class="evidence-icon">${found ? '■' : '□'}</span> ${found ? ev.name : '？？？'}`;
      list.appendChild(div);
    });

    overlay.classList.add('active');
  },

  // ----- CONDITIONS -----
  checkCondition(condition) {
    if (condition.flag) {
      return this.state.flags[condition.flag] === condition.value;
    }
    if (condition.param) {
      const val = this.state.params[condition.param];
      if (condition.gte !== undefined) return val >= condition.gte;
      if (condition.lte !== undefined) return val <= condition.lte;
      if (condition.gt !== undefined) return val > condition.gt;
      if (condition.lt !== undefined) return val < condition.lt;
    }
    if (condition.evidence) {
      return !!this.state.evidence.find(e => e.id === condition.evidence);
    }
    if (condition.and) {
      return condition.and.every(c => this.checkCondition(c));
    }
    if (condition.or) {
      return condition.or.some(c => this.checkCondition(c));
    }
    if (condition.not) {
      return !this.checkCondition(condition.not);
    }
    return false;
  },

  // ----- ACTION -----
  startAction(actionConfig) {
    if (typeof ActionEngine !== 'undefined') {
      ActionEngine.start(actionConfig, (result) => {
        this.state.actionResults[actionConfig.id] = result;
        // Apply result params
        if (result.success && actionConfig.onSuccess) {
          if (actionConfig.onSuccess.params) {
            this.updateParams(actionConfig.onSuccess.params);
          }
          if (actionConfig.onSuccess.evidence) {
            actionConfig.onSuccess.evidence.forEach(e =>
              this.addEvidence(e.id, e.name, e.description)
            );
          }
          if (actionConfig.onSuccess.flags) {
            Object.assign(this.state.flags, actionConfig.onSuccess.flags);
          }
          App.showScreen('screen-game');
          if (actionConfig.onSuccess.next) {
            this.playScene(actionConfig.onSuccess.next);
          }
        } else if (!result.success && actionConfig.onFailure) {
          if (actionConfig.onFailure.params) {
            this.updateParams(actionConfig.onFailure.params);
          }
          if (actionConfig.onFailure.evidence) {
            actionConfig.onFailure.evidence.forEach(e =>
              this.addEvidence(e.id, e.name, e.description)
            );
          }
          if (actionConfig.onFailure.flags) {
            Object.assign(this.state.flags, actionConfig.onFailure.flags);
          }
          App.showScreen('screen-game');
          if (actionConfig.onFailure.next) {
            this.playScene(actionConfig.onFailure.next);
          } else if (actionConfig.onFailure.gameover) {
            App.showGameOver(actionConfig.onFailure.gameover);
          }
        }
      });
    }
  },

  // ----- PUZZLE -----
  showPuzzle(puzzleData) {
    const overlay = document.getElementById('puzzle-overlay');
    const textEl = document.getElementById('puzzle-text');
    const cluesEl = document.getElementById('puzzle-clues');
    const hintEl = document.getElementById('puzzle-hint');
    const inputEl = document.getElementById('puzzle-input');
    const attemptsEl = document.getElementById('puzzle-attempts');
    const feedbackEl = document.getElementById('puzzle-feedback');
    const submitBtn = document.getElementById('puzzle-submit');

    // Initialize puzzle state
    let attempts = 0;
    let hintsUsed = 0;
    const maxHints = puzzleData.hints ? puzzleData.hints.length : 0;

    textEl.textContent = puzzleData.question || '';
    cluesEl.innerHTML = '';
    if (puzzleData.clues) {
      puzzleData.clues.forEach(clue => {
        const div = document.createElement('div');
        div.className = 'puzzle-clue-item';
        div.textContent = clue;
        cluesEl.appendChild(div);
      });
    }
    hintEl.textContent = '';
    hintEl.style.display = 'none';
    inputEl.value = '';
    attemptsEl.textContent = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'puzzle-feedback';

    overlay.classList.add('active');
    inputEl.focus();

    // Hint button (add dynamically)
    let hintBtn = document.getElementById('puzzle-hint-btn');
    if (!hintBtn) {
      hintBtn = document.createElement('button');
      hintBtn.id = 'puzzle-hint-btn';
      hintBtn.className = 'menu-btn puzzle-hint-btn';
      hintBtn.textContent = 'ヒント';
      submitBtn.parentNode.insertBefore(hintBtn, submitBtn.nextSibling);
    }
    hintBtn.style.display = maxHints > 0 ? 'inline-block' : 'none';
    hintBtn.textContent = `ヒント (${maxHints}残)`;

    const onHint = () => {
      if (hintsUsed < maxHints) {
        hintEl.textContent = puzzleData.hints[hintsUsed];
        hintEl.style.display = 'block';
        hintsUsed++;
        hintBtn.textContent = hintsUsed < maxHints ? `ヒント (${maxHints - hintsUsed}残)` : 'ヒントなし';
        if (hintsUsed >= maxHints) {
          hintBtn.disabled = true;
        }
      }
    };

    const onSubmit = () => {
      const answer = inputEl.value.trim();
      if (!answer) return;
      attempts++;
      attemptsEl.textContent = `試行回数: ${attempts}`;

      // Normalize answer for comparison
      const normalizedAnswer = answer.toLowerCase().replace(/\s/g, '');
      const correctAnswers = Array.isArray(puzzleData.answer) ? puzzleData.answer : [puzzleData.answer];
      const isCorrect = correctAnswers.some(a =>
        String(a).toLowerCase().replace(/\s/g, '') === normalizedAnswer
      );

      if (isCorrect) {
        feedbackEl.textContent = '正解！';
        feedbackEl.className = 'puzzle-feedback correct';
        if (typeof SFX !== 'undefined') SFX.success();

        // Record result
        this.state.puzzleResults[puzzleData.id] = {
          attempts: attempts,
          hintsUsed: hintsUsed,
          solved: true,
        };

        // Apply rewards
        if (puzzleData.evidence) {
          puzzleData.evidence.forEach(e => this.addEvidence(e.id, e.name, e.description));
        }
        if (puzzleData.flags) {
          Object.assign(this.state.flags, puzzleData.flags);
        }
        if (puzzleData.params) {
          this.updateParams(puzzleData.params);
        }

        // Clean up and advance
        setTimeout(() => {
          cleanup();
          overlay.classList.remove('active');
          this.currentTextIndex++;
          this.processNext();
        }, 1200);
      } else {
        feedbackEl.textContent = puzzleData.wrongMessage || '不正解...もう一度考えてみよう';
        feedbackEl.className = 'puzzle-feedback wrong';
        if (typeof SFX !== 'undefined') SFX.fail();
        inputEl.value = '';
        inputEl.focus();

        // Auto-show hint after 3 failed attempts
        if (attempts === 3 && hintsUsed === 0 && maxHints > 0) {
          onHint();
        }
      }
    };

    const onKeydown = (e) => {
      if (e.key === 'Enter') onSubmit();
    };

    // Bind events
    const newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    newSubmitBtn.addEventListener('click', onSubmit);

    const newHintBtn = hintBtn.cloneNode(true);
    hintBtn.parentNode.replaceChild(newHintBtn, hintBtn);
    newHintBtn.addEventListener('click', onHint);
    newHintBtn.disabled = maxHints <= 0;

    inputEl.addEventListener('keydown', onKeydown);

    const cleanup = () => {
      inputEl.removeEventListener('keydown', onKeydown);
    };
  },

  // ----- RANK EVALUATION -----
  calculateRank() {
    let score = 0;
    const details = {};

    // 1. パズル正解率 (max 25 points)
    const puzzleIds = Object.keys(this.state.puzzleResults);
    const totalPuzzles = 3;
    let puzzleScore = 0;
    if (puzzleIds.length > 0) {
      puzzleIds.forEach(id => {
        const r = this.state.puzzleResults[id];
        if (r.solved) {
          if (r.attempts === 1) puzzleScore += 25 / totalPuzzles;
          else if (r.attempts === 2) puzzleScore += 18 / totalPuzzles;
          else if (r.attempts === 3) puzzleScore += 12 / totalPuzzles;
          else puzzleScore += 5 / totalPuzzles;
        }
      });
    }
    puzzleScore = Math.round(puzzleScore);
    details.puzzle = { score: puzzleScore, max: 25, label: 'パズル正解率' };
    score += puzzleScore;

    // 2. ヒント未使用ボーナス (max 10 points)
    let hintBonus = 10;
    puzzleIds.forEach(id => {
      const r = this.state.puzzleResults[id];
      if (r.hintsUsed > 0) hintBonus -= r.hintsUsed * 2;
    });
    hintBonus = Math.max(0, hintBonus);
    details.hints = { score: hintBonus, max: 10, label: 'ヒント未使用ボーナス' };
    score += hintBonus;

    // 3. 証拠収集数 (max 25 points)
    const totalEvidence = 18;
    const collected = this.state.evidence.length;
    const evidenceScore = Math.round((collected / totalEvidence) * 25);
    details.evidence = { score: evidenceScore, max: 25, label: `証拠収集 (${collected}/${totalEvidence})` };
    score += evidenceScore;

    // 4. アクション成功率 (max 20 points)
    const actionIds = ['ch1_chase', 'ch2_stealth', 'ch2_qte'];
    let actionSuccesses = 0;
    let actionTotal = 0;
    actionIds.forEach(id => {
      if (this.state.actionResults[id]) {
        actionTotal++;
        if (this.state.actionResults[id].success) actionSuccesses++;
      }
    });
    const actionScore = actionTotal > 0 ? Math.round((actionSuccesses / actionTotal) * 20) : 10;
    details.action = { score: actionScore, max: 20, label: `アクション成功率 (${actionSuccesses}/${actionTotal})` };
    score += actionScore;

    // 5. BAD END回避 (max 10 points)
    const retries = this.state.retryCount || 0;
    const retryScore = Math.max(0, 10 - retries * 3);
    details.retry = { score: retryScore, max: 10, label: 'BAD END回避' };
    score += retryScore;

    // 6. 重要選択ボーナス (max 10 points)
    let choiceScore = 0;
    if (this.state.flags.ch2_scene4_choice === 'record') choiceScore += 4;
    if (this.state.flags.kuroda_has_evidence) choiceScore += 3;
    if (this.state.flags.yamamoto_ally) choiceScore += 3;
    details.choices = { score: choiceScore, max: 10, label: '重要選択の質' };
    score += choiceScore;

    // Determine rank
    let rank, title;
    if (score >= 90) { rank = 'S'; title = '天才探偵'; }
    else if (score >= 75) { rank = 'A'; title = '鋭い洞察者'; }
    else if (score >= 60) { rank = 'B'; title = '有能な調査員'; }
    else if (score >= 45) { rank = 'C'; title = '平凡な市民'; }
    else if (score >= 30) { rank = 'D'; title = '危うい容疑者'; }
    else { rank = 'E'; title = '操られた駒'; }

    return { score, rank, title, details };
  },

  // ----- GAME OVER -----
  triggerGameOver(message) {
    this.state.retryCount = (this.state.retryCount || 0) + 1;
    App.showGameOver(message);
  },

  // ----- ENDING -----
  triggerEnding(title, message) {
    App.showEnding(title, message);
  },

  // ----- RANK SCREEN -----
  showRankScreen() {
    const result = this.calculateRank();
    App.showRankScreen(result);
  },
};
