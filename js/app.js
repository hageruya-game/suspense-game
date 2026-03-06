// ========== APP CONTROLLER ==========
const App = {
  init() {
    Engine.init();
    this.bindUI();
    this.checkContinue();

    // Register all scenarios
    if (typeof Chapter1 !== 'undefined') {
      Engine.registerScenes(Chapter1.scenes);
    }
    if (typeof Chapter2 !== 'undefined') {
      Engine.registerScenes(Chapter2.scenes);
    }
    if (typeof Chapter3 !== 'undefined') {
      Engine.registerScenes(Chapter3.scenes);
    }
    if (typeof Chapter4 !== 'undefined') {
      Engine.registerScenes(Chapter4.scenes);
    }
    if (typeof Chapter5 !== 'undefined') {
      Engine.registerScenes(Chapter5.scenes);
    }
    if (typeof Chapter6 !== 'undefined') {
      Engine.registerScenes(Chapter6.scenes);
    }
    if (typeof Chapter7 !== 'undefined') {
      Engine.registerScenes(Chapter7.scenes);
    }
  },

  bindUI() {
    // Title screen
    document.getElementById('btn-new-game').addEventListener('click', () => {
      this.showScreen('screen-tutorial');
    });
    document.getElementById('btn-continue').addEventListener('click', () => {
      const state = SaveManager.load();
      if (state) {
        Engine.state = state;
        this.showScreen('screen-game');
        Engine.playScene(state.currentScene);
      }
    });

    // Name & Gender input -> Tutorial
    document.getElementById('player-name').addEventListener('input', (e) => {
      Engine.state.player.name = e.target.value.trim();
      this._checkCreateReady();
    });

    document.querySelectorAll('.gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        Engine.state.player.gender = btn.dataset.gender;
        this._checkCreateReady();
      });
    });

    document.getElementById('btn-go-tutorial').addEventListener('click', () => {
      this.showScreen('screen-tutorial');
    });

    // Tutorial -> Game start
    document.getElementById('btn-start').addEventListener('click', () => {
      this.showScreen('screen-game');
      Engine.playScene('ch1_scene1');
    });

    // Game menu
    document.getElementById('game-menu-btn').addEventListener('click', () => {
      document.getElementById('game-menu').classList.add('active');
    });
    document.getElementById('btn-close-menu').addEventListener('click', () => {
      document.getElementById('game-menu').classList.remove('active');
    });
    document.getElementById('btn-save').addEventListener('click', () => {
      if (SaveManager.save(Engine.state)) {
        document.getElementById('game-menu').classList.remove('active');
        this.showToast('セーブしました');
      }
    });
    document.getElementById('btn-load').addEventListener('click', () => {
      const state = SaveManager.load();
      if (state) {
        Engine.state = state;
        document.getElementById('game-menu').classList.remove('active');
        Engine.playScene(state.currentScene);
        this.showToast('ロードしました');
      }
    });
    document.getElementById('btn-evidence').addEventListener('click', () => {
      document.getElementById('game-menu').classList.remove('active');
      Engine.showEvidenceBoard();
    });
    document.getElementById('btn-close-evidence').addEventListener('click', () => {
      document.getElementById('evidence-overlay').classList.remove('active');
    });
    document.getElementById('btn-back-title').addEventListener('click', () => {
      document.getElementById('game-menu').classList.remove('active');
      if (typeof SFX !== 'undefined') SFX.stopAmbient();
      this.showScreen('screen-title');
      this.checkContinue();
    });

    // Game over
    document.getElementById('btn-retry').addEventListener('click', () => {
      const state = SaveManager.load();
      if (state) {
        Engine.state = state;
        this.showScreen('screen-game');
        Engine.playScene(state.currentScene);
      } else {
        this.showScreen('screen-title');
      }
    });
    document.getElementById('btn-gameover-title').addEventListener('click', () => {
      this.showScreen('screen-title');
      this.checkContinue();
    });

    // Ending
    document.getElementById('btn-ending-title').addEventListener('click', () => {
      this.showScreen('screen-title');
      this.checkContinue();
    });

    // Rank screen
    document.getElementById('btn-rank-replay').addEventListener('click', () => {
      SaveManager.deleteSave();
      Engine.init();
      this.showScreen('screen-game');
      Engine.playScene('ch1_scene1');
    });
    document.getElementById('btn-rank-title').addEventListener('click', () => {
      this.showScreen('screen-title');
      this.checkContinue();
    });
  },

  checkContinue() {
    const btn = document.getElementById('btn-continue');
    btn.style.display = SaveManager.hasSave() ? 'block' : 'none';
  },

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  },

  showGameOver(message) {
    if (typeof SFX !== 'undefined') SFX.stopAmbient();
    document.getElementById('gameover-message').textContent = message || '';
    this.showScreen('screen-gameover');
  },

  showEnding(title, message) {
    if (typeof SFX !== 'undefined') SFX.stopAmbient();
    document.getElementById('ending-title').textContent = title;
    document.getElementById('ending-message').textContent = message;
    this.showScreen('screen-ending');
  },

  _checkCreateReady() {
    const hasName = Engine.state.player.name && Engine.state.player.name.length > 0;
    const hasGender = Engine.state.player.gender && Engine.state.player.gender.length > 0;
    document.getElementById('btn-go-tutorial').disabled = !(hasName && hasGender);
  },

  showRankScreen(result) {
    if (typeof SFX !== 'undefined') SFX.stopAmbient();

    const letterEl = document.getElementById('rank-letter');
    const titleEl = document.getElementById('rank-title');
    const scoreEl = document.getElementById('rank-score-total');
    const detailsEl = document.getElementById('rank-details');

    letterEl.textContent = result.rank;
    letterEl.className = 'rank-letter rank-' + result.rank;
    titleEl.textContent = '「' + result.title + '」';
    scoreEl.textContent = '総合スコア: ' + result.score + ' / 100';

    detailsEl.innerHTML = '';
    for (const key of Object.keys(result.details)) {
      const d = result.details[key];
      const row = document.createElement('div');
      row.className = 'rank-detail-row';
      row.innerHTML = `<span class="rank-detail-label">${d.label}</span><span class="rank-detail-score">${d.score} / ${d.max}</span>`;
      detailsEl.appendChild(row);
    }

    this.showScreen('screen-rank');
    if (typeof SFX !== 'undefined') SFX.chapter();
  },

  showToast(text) {
    const toast = document.createElement('div');
    toast.className = 'notification';
    toast.textContent = text;
    toast.style.top = 'auto';
    toast.style.bottom = '2rem';
    document.getElementById('screen-game').appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  },
};

// Start
document.addEventListener('DOMContentLoaded', () => App.init());
