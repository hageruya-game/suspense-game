// ========== SAVE / LOAD SYSTEM ==========
const SaveManager = {
  SAVE_KEY: 'suspense_game_save',

  getDefaultState() {
    return {
      player: { name: '高橋', gender: 'male' },
      currentScene: null,
      chapter: 1,
      params: {
        investigation: 0, // 調査力
        trust: 0,         // 信頼度
        boldness: 0,      // 大胆さ
        suspicion: 0,      // 疑惑度
      },
      evidence: [],         // 入手した証拠のIDリスト
      flags: {},            // ストーリーフラグ
      choiceHistory: [],    // 選択履歴
      actionResults: {},    // アクションパートの結果
      puzzleResults: {},    // パズル結果（試行回数・ヒント使用）
      retryCount: 0,        // BAD ENDリトライ回数
    };
  },

  save(state) {
    try {
      const data = JSON.stringify(state);
      localStorage.setItem(this.SAVE_KEY, data);
      return true;
    } catch (e) {
      console.error('Save failed:', e);
      return false;
    }
  },

  load() {
    try {
      const data = localStorage.getItem(this.SAVE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (e) {
      console.error('Load failed:', e);
      return null;
    }
  },

  hasSave() {
    return localStorage.getItem(this.SAVE_KEY) !== null;
  },

  deleteSave() {
    localStorage.removeItem(this.SAVE_KEY);
  },
};
