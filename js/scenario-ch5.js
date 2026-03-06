// ========== CHAPTER 5: 裏切り ==========
const Chapter5 = {
  scenes: {

    // ===== 場面1：水曜朝 — 暗号メモ解読パズル =====
    ch5_scene1: {
      chapterTitle: '第5章',
      chapterSub: '裏　切　り',
      location: '自宅',
      time: '水曜日 7:00',
      bg: 'bg-home-morning',
      content: [
        { type: 'narration', text: '水曜日の朝。\n昨夜の暗号メモを改めて見る。' },
        { type: 'narration', text: '「のもりぎらうはきずす」\n\n田中は文字を逆さまに書く癖があった。\n日記のパスワードもそうだった。' },
        {
          type: 'puzzle',
          id: 'ch5_cipher',
          question: '田中の暗号メモの解読',
          clues: [
            '暗号文: 「のもりぎらうはきずす」',
            '田中は文字を逆さまに書く癖があった',
          ],
          answer: ['すずきはうらぎりもの', 'すずきは裏切り者', '鈴木は裏切り者', '鈴木はうらぎりもの', '鈴木は裏切りもの', 'すずきは裏切りもの', 'すずきはうらぎり者'],
          hints: [
            '文字を後ろから順番に読んでみよう',
            'の→も→り→ぎ→ら→う→は→き→ず→す → すずきは…',
          ],
          wrongMessage: '解読できない…逆から読んでみよう',
          flags: { tanaka_memo_decoded: true },
          params: { investigation: 2 },
        },
        { type: 'narration', text: '「すずきはうらぎりもの」\n\n鈴木は裏切り者。' },
        { type: 'effect', name: 'shake' },
        { type: 'sfx', name: 'tensionSting' },
        {
          type: 'evidence',
          id: 'tanaka_coded_memo',
          name: '田中の暗号メモ',
          description: 'USBのmemoフォルダに隠されていた暗号メモ。解読すると「すずきはうらぎりもの」。田中は鈴木の裏切りに気づいていた。',
        },
        { type: 'narration', text: '田中は気づいていた。\n鈴木が佐藤側の人間だということに。' },
        { type: 'narration', text: 'そして田中は、このメモを残した。\n誰かが見つけることを祈って。' },
      ],
      next: 'ch5_scene2',
    },

    // ===== 場面2：水曜昼 — デッドマンスイッチの全容 =====
    ch5_scene2: {
      location: '自宅',
      time: '水曜日 12:00',
      bg: 'bg-home-morning',
      content: [
        { type: 'narration', text: '田中のデッドマンスイッチについて\n改めて調べてみる。' },
        { type: 'narration', text: '匿名メッセージの送信パターンを\n時系列で並べてみた。' },
        { type: 'narration', text: '1通目:「お前は嵌められている」─ 事件翌日\n2通目:「中村に聞け」─ 日曜深夜\n3通目:「にげろ」─ 月曜深夜\n4通目:「USBのmemoフォルダを見ろ」─ 火曜深夜' },
        { type: 'narration', text: '48時間ごとの自動送信。\n田中が生前にプログラムしたシステム。' },
        { type: 'narration', text: '田中は自分の死を予感していた。\nそして「万が一」に備えて\nこのシステムを作っていた。' },
        { type: 'text', speaker: '{name}', text: '田中……お前は最後まで\n戦っていたんだな……。' },
        {
          type: 'evidence',
          id: 'tanaka_dead_switch',
          name: '田中のデッドマンスイッチ',
          description: '田中が生前に作成した自動メッセージシステム。48時間ごとにチェックインしないと自動的に警告メッセージを送信。メッセージ内容は事前にプログラム済み。',
        },
        { type: 'narration', text: 'このシステムは田中の「保険」だった。\nUSBメモリ、暗号メモ、自動メッセージ──\n\n全て、真実を守るための装置だ。' },
      ],
      next: 'ch5_scene3',
    },

    // ===== 場面3：水曜夕方 — BAR K潜入 =====
    ch5_scene3: {
      location: '歓楽街',
      time: '水曜日 19:00',
      bg: 'bg-night-street',
      content: [
        { type: 'narration', text: '「BAR K」。\nネットで調べると、繁華街の裏通りにある\n小さなバーだった。' },
        { type: 'narration', text: '口コミは少ないが\n「常連向け」「紹介制」という\n情報がいくつかある。' },
        { type: 'narration', text: '看板もないビルの3階。\n重い扉を押して中に入る。' },
        { type: 'narration', text: '薄暗い店内。カウンターに数人の客。\n奥にはカーテンで仕切られた\nVIPルームがあるようだ。' },
        { type: 'text', speaker: 'バーテンダー', text: 'いらっしゃい。\n紹介はどちらから？' },
      ],
      choices: [
        {
          id: 'lighter',
          text: 'ライターを見せる',
          params: { boldness: 2 },
          next: 'ch5_scene3_lighter',
        },
        {
          id: 'shimizu',
          text: '「清水さんの紹介で」',
          condition: { evidence: 'shimizu_info' },
          params: { investigation: 2 },
          next: 'ch5_scene3_shimizu',
        },
        {
          id: 'casual',
          text: '「通りがかりです」ととぼける',
          params: { suspicion: 1 },
          next: 'ch5_scene3_casual',
        },
      ],
    },

    ch5_scene3_lighter: {
      location: 'BAR K',
      time: '水曜日 19:05',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'narration', text: 'ポケットから「BAR K」のライターを取り出した。' },
        { type: 'text', speaker: 'バーテンダー', text: '……ああ、うちのライターだな。\nどこで手に入れた？' },
        { type: 'text', speaker: '{name}', text: '知り合いに貰いました。\n良い店だと聞いたので。' },
        { type: 'text', speaker: 'バーテンダー', text: 'そうか。まあ座れ。\n何にする？' },
        { type: 'narration', text: '怪しまれてはいないようだ。\nカウンターに座り、ウイスキーを頼んだ。' },
      ],
      next: 'ch5_scene3_inside',
    },

    ch5_scene3_shimizu: {
      location: 'BAR K',
      time: '水曜日 19:05',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '清水さんの紹介で来ました。' },
        { type: 'text', speaker: 'バーテンダー', text: '清水さんの？\n……ああ、清水さんならよく来るな。\nどうぞ。' },
        { type: 'narration', text: 'すんなり通された。\n清水は常連らしい。' },
      ],
      next: 'ch5_scene3_inside',
    },

    ch5_scene3_casual: {
      location: 'BAR K',
      time: '水曜日 19:05',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '通りがかりなんですが……\n一杯飲めますか。' },
        { type: 'text', speaker: 'バーテンダー', text: '……まあ、いいだろう。\n座りな。' },
        { type: 'narration', text: '少し警戒されているが\n追い出されはしなかった。' },
      ],
      next: 'ch5_scene3_inside',
    },

    ch5_scene3_inside: {
      location: 'BAR K',
      time: '水曜日 19:30',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'narration', text: 'しばらく店内を観察する。\nVIPルームの奥から\nポーカーチップの音が聞こえる。\n\nここは賭博場でもあるようだ。' },
        { type: 'narration', text: 'バーテンダーに話を振ってみる。' },
        { type: 'text', speaker: '{name}', text: '実は「鈴木」って人を探してるんですが。\n常連だと聞いたんですけど。' },
        { type: 'text', speaker: 'バーテンダー', text: '鈴木？\n……ああ、鈴木か。最近来てないな。' },
        { type: 'text', speaker: 'バーテンダー', text: 'あいつは相当負け込んでたからな。\n清水さんから金を借りて\nそれもまた溶かして……。' },
        { type: 'text', speaker: 'バーテンダー', text: 'そういえば、鈴木の借金を\n上の人間が肩代わりしたって\n話を聞いたことがある。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'text', speaker: '{name}', text: '上の人間……？' },
        { type: 'text', speaker: 'バーテンダー', text: '会社の上司か何かだろ。\n「返済はいいから\n代わりにやることがある」って\n言われたらしい。' },
        { type: 'effect', name: 'shake' },
        {
          type: 'evidence',
          id: 'bar_k_testimony',
          name: 'BAR Kバーテンダーの証言',
          description: '鈴木はギャンブルで大きく負け込んでいた。鈴木の借金を「会社の上の人間」が肩代わりし、代わりに「やること」を要求された。',
        },
        { type: 'narration', text: '佐藤が鈴木の借金を肩代わりした。\n見返りに「仕事」をさせた。\n\n書類の偽造。そして──\n田中の殺害。' },
        { type: 'narration', text: '全てが繋がってきた。' },
      ],
      next: 'ch5_scene4',
    },

    // ===== 場面4：水曜夜 — 山本の独自調査 =====
    ch5_scene4: {
      location: '自宅',
      time: '水曜日 22:00',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: '自宅に戻ると、山本からメッセージが来ていた。' },
        {
          type: 'phone',
          appName: '山本とのトーク',
          messages: [
            { from: 'other', text: '高橋、大事な話がある', time: '21:30', senderName: '山本' },
            { from: 'other', text: '佐藤の件で独自に調べてたんだが…', time: '21:31', senderName: '山本' },
            { from: 'other', text: '佐藤と鈴木の通話記録を入手した', time: '21:32', senderName: '山本' },
            { from: 'other', text: '田中が殺される前後3日間で14回通話してる', time: '21:33', senderName: '山本' },
            { from: 'player', text: '14回…！？', time: '22:00' },
            { from: 'other', text: '異常だろ。普通の上司と部下の関係じゃない', time: '22:01', senderName: '山本' },
            { from: 'other', text: 'しかも殺害当日は5回。そのうち2回は深夜', time: '22:02', senderName: '山本' },
          ],
        },
        { type: 'sfx', name: 'tensionSting' },
        {
          type: 'evidence',
          id: 'suzuki_sato_calls',
          name: '鈴木と佐藤の通話記録',
          description: '田中殺害前後の3日間で14回の通話。殺害当日は5回（うち2回は深夜）。通常の業務関係では説明できない頻度。',
        },
        { type: 'narration', text: '田中の暗号メモ「鈴木は裏切り者」。\n鈴木の3000万の借金。\nBAR Kでの証言「上の人間が肩代わり」。\n佐藤との14回の通話。' },
        { type: 'narration', text: '全ての証拠が鈴木を指している。' },
      ],
      next: 'ch5_scene5',
    },

    // ===== 場面5：水曜深夜 — 黒田への報告と計画 =====
    ch5_scene5: {
      location: '自宅',
      time: '水曜日 23:30',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: '黒田に電話した。' },
        { type: 'text', speaker: '{name}', text: '黒田さん。\n鈴木が実行犯だと思います。' },
        { type: 'text', speaker: '黒田', text: '……根拠は。' },
        { type: 'text', speaker: '{name}', text: '田中がUSBに残したメモ。\n「鈴木は裏切り者」と書かれていた。\n佐藤との通話記録も異常です。\n殺害前後で14回。' },
        { type: 'text', speaker: '黒田', text: 'なるほど。\n通話記録とも一致する。\nだが…これだけでは状況証拠だ。' },
        { type: 'text', speaker: '黒田', text: '鈴木にはアリバイがない。\n田中が殺された金曜の夜、\n鈴木は「自宅にいた」と供述しているが\n裏付けが取れていない。' },
        { type: 'text', speaker: '黒田', text: '鈴木に自白させるか\n決定的な物証を見つける必要がある。' },
        { type: 'narration', text: '鈴木に近づく必要がある。\nだが相手はもう警戒しているはずだ。' },
        { type: 'text', speaker: '黒田', text: '明日の夜、鈴木を呼び出せるか。\n俺が近くで待機する。\n録音もする。' },
        { type: 'text', speaker: '{name}', text: '……やります。' },
        { type: 'narration', text: '覚悟を決めた。\n明日、鈴木と対峙する。\n\nどうやって鈴木の口を割らせるか──' },
      ],
      choices: [
        {
          id: 'plan_direct',
          text: '正面から問い詰める',
          params: { boldness: 2 },
          flags: { ch5_approach: 'direct' },
          next: 'ch5_scene5_plan',
        },
        {
          id: 'plan_trap',
          text: '罠を仕掛けて自白させる',
          params: { investigation: 2 },
          flags: { ch5_approach: 'trap' },
          next: 'ch5_scene5_plan',
        },
        {
          id: 'plan_emotion',
          text: '感情に訴えかける',
          params: { trust: 2 },
          flags: { ch5_approach: 'emotion' },
          next: 'ch5_scene5_plan',
        },
      ],
    },

    ch5_scene5_plan: {
      location: '自宅',
      time: '木曜日 0:00',
      bg: 'bg-home-evening',
      showTransition: false,
      content: [
        { type: 'narration', text: '計画を立てた。\n場所は田中と最後に会った公園。\n\n黒田は近くの車で待機。\n全ての会話を録音する。' },
        { type: 'narration', text: '鈴木には「田中のことで大事な話がある」\nとだけ伝える。' },
        { type: 'narration', text: '明日の夜。\n全てが決まる。' },
        { type: 'narration', text: '\n　　　　　── 第5章 終 ──' },
      ],
      choices: [
        {
          id: 'to_ch6',
          text: '第6章へ進む',
          next: 'ch6_scene1',
        },
      ],
    },
  },
};
