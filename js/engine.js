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
    text = text.replace(/\{name\}/g, this.state.player.name || '主人公');
    text = text.replace(/\{age\}/g, this.state.player.age || '??');
    text = text.replace(/\{position\}/g, this.getPosition());
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

  // ----- GAME OVER -----
  triggerGameOver(message) {
    App.showGameOver(message);
  },

  // ----- ENDING -----
  triggerEnding(title, message) {
    App.showEnding(title, message);
  },
};
