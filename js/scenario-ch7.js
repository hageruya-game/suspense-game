// ========== CHAPTER 7: 真相 ==========
const Chapter7 = {
  scenes: {

    // ===== 場面1：金曜 — 全容解明 =====
    ch7_scene1: {
      chapterTitle: '第7章',
      chapterSub: '真　　相',
      location: '警察署',
      time: '金曜日 14:00',
      bg: 'bg-interrogation',
      content: [
        { type: 'narration', text: '金曜日。\n鈴木が逮捕されて一夜が明けた。' },
        { type: 'narration', text: '警察署に呼ばれた。\n黒田が待っている。' },
        { type: 'text', speaker: '黒田', text: '鈴木が全面的に自供した。\n事件の全貌が明らかになった。' },
        { type: 'text', speaker: '黒田', text: '佐藤は3年前から横領を続けていた。\n架空取引で会社の金を抜き、\n個人口座に移していた。' },
        { type: 'text', speaker: '黒田', text: '鈴木はギャンブルの借金を抱えていた。\n佐藤はそれを知り、\n鈴木を協力者に取り込んだ。' },
        { type: 'text', speaker: '黒田', text: '借金の肩代わりと引き換えに\n書類偽造を手伝わせた。\n最初は小さな不正だった。' },
        { type: 'text', speaker: '黒田', text: '田中が不正に気づいたのは1ヶ月前。\n佐藤は最初、金で黙らせようとした。\nだが田中は拒否した。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'text', speaker: '黒田', text: '佐藤は鈴木に命令した。\n「田中を処理しろ」と。\n鈴木は追い詰められて従った。' },
        { type: 'narration', text: '鈴木は田中の「親友」として\n金曜の夜に田中を呼び出した。\nそして──' },
        { type: 'text', speaker: '黒田', text: '鈴木は田中の合鍵を\n中村から盗んでいた。\n中村が一度、田中の家に忘れた鍵を\n鈴木がコピーしていた。' },
        { type: 'narration', text: '合鍵の謎が解けた。\n中村は「自分だけ」と思っていたが\n鈴木がコピーしていたのだ。' },
        { type: 'text', speaker: '黒田', text: 'その後、佐藤と鈴木は\nお前に罪を着せる計画を立てた。\n偽造メッセージ。脅迫。全て。' },
        { type: 'text', speaker: '黒田', text: '鈴木がお前に情報を流していたのも\n計算のうちだ。\nお前を泳がせて、最終的に\n犯人に仕立てるためにな。' },
        { type: 'narration', text: '全てが繋がった。\n\n親友を裏切り、無実の人間に罪を着せる。\nそれが佐藤に操られた\n鈴木の役割だった。' },
        { type: 'text', speaker: '黒田', text: '{name}。\nお前のおかげで真相にたどり着けた。\n田中の無念を晴らせた。' },
        { type: 'text', speaker: '黒田', text: '……礼を言う。' },
        { type: 'narration', text: '黒田が深く頭を下げた。\nこの厳つい刑事が、こんな表情をするとは。' },
      ],
      next: 'ch7_scene2',
    },

    // ===== 場面2：金曜夕方 — 匿名メッセージの最後の謎 =====
    ch7_scene2: {
      location: '警察署 ロビー',
      time: '金曜日 16:00',
      bg: 'bg-interrogation',
      content: [
        { type: 'narration', text: '黒田と別れ、ロビーに降りると\n見覚えのある姿があった。' },
        { type: 'narration', text: '中村綾。\n目の下に隈があるが\n表情は凛としている。' },
        { type: 'text', speaker: '中村', text: '高橋さん。\n少しお時間、よろしいですか。' },
        { type: 'text', speaker: '中村', text: '……お話ししなければならないことがあります。' },
        { type: 'narration', text: '近くのカフェに移動した。' },
        { type: 'text', speaker: '中村', text: '実は……匿名メッセージの\n最後の1通を送ったのは、私です。' },
        { type: 'effect', name: 'shake' },
        { type: 'text', speaker: '{name}', text: '……「にげろ」を？' },
        { type: 'text', speaker: '中村', text: 'はい。田中さんの旧スマホを\n見つけたんです。\n田中さんの部屋を片付けている時に。' },
        { type: 'text', speaker: '中村', text: '自動送信システムが\n動いていることに気づきました。\n田中さんが最後に仕込んだメッセージも。' },
        { type: 'text', speaker: '中村', text: 'でも……それだけでは足りないと思った。\n高橋さんが危険にさらされていることは\nわかっていたから。' },
        { type: 'text', speaker: '中村', text: 'だから私は手動で一通、追加した。\n「にげろ」と。' },
        { type: 'narration', text: '中村が田中の旧スマホを取り出した。\n画面には自動送信のログが表示されている。\nそして最後の1件──手動送信の記録。' },
        { type: 'text', speaker: '中村', text: '田中さんを守れなかった。\nそれが……ずっと悔しくて。\nせめて、田中さんのために\n動いている人を守りたかった。' },
        { type: 'narration', text: '中村の目に涙が光っている。\n田中への想いが、この行動をさせた。' },
        { type: 'text', speaker: '{name}', text: '……ありがとう、中村さん。\nあのメッセージに助けられました。' },
        {
          type: 'evidence',
          id: 'anonymous_sender_revealed',
          name: '匿名メッセージの真の送信者',
          description: '「にげろ」のメッセージだけは田中の自動送信ではなく、中村が手動で送ったもの。田中を守れなかった償いとして。',
        },
      ],
      next: 'ch7_scene3',
    },

    // ===== 場面3：翌週 — エピローグ =====
    ch7_scene3: {
      location: '自宅',
      time: '翌週 月曜日',
      effect: 'fadeIn',
      bg: 'bg-home-morning',
      content: [
        { type: 'narration', text: '一週間が経った。' },
        {
          type: 'notification',
          title: 'ニュース',
          text: '□□商事横領事件 佐藤被告を殺人教唆で追起訴。実行犯の鈴木被告は殺人罪で起訴。',
        },
        { type: 'narration', text: '佐藤は横領と殺人教唆で起訴された。\n鈴木は殺人罪で起訴された。\n\n二人とも、もう戻ってこない。' },
        { type: 'narration', text: '{name}への容疑は完全に晴れた。\n会社は混乱しているが\n自分の居場所はまだある。' },
        { type: 'narration', text: '野口は、自分の証言が事件解決に\n貢献したことを警察から伝えられたという。\n少しだけ、前を向けたかもしれない。' },
        { type: 'narration', text: '中村は静かに会社を辞めた。\n「新しい場所でやり直す」と言っていた。\n田中との思い出を胸に。' },
      ],
      next: 'ch7_scene4',
    },

    // ===== 場面4：最後のパズル — 田中の手紙 =====
    ch7_scene4: {
      location: '自宅',
      time: '翌週 月曜日 夜',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: 'ふと、田中のUSBメモリを思い出した。\nまだ開いていないファイルがある。' },
        { type: 'narration', text: '「letter.enc」\n暗号化されたファイル。\nパスワードが必要だ。' },
        { type: 'narration', text: 'ファイル名に添えられたメモ。\n「これを開ける人は、全てを知った人だ。\n答えは犯人の名にある」' },
        {
          type: 'puzzle',
          id: 'ch7_letter',
          question: '田中の最後の手紙のパスワード',
          clues: [
            'ヒント: 「答えは犯人の名にある」',
            '田中は犯人が誰か知っていた',
          ],
          answer: ['すずき', 'すずきけんた', '鈴木', '鈴木健太', 'suzuki', 'suzukikenta', 'スズキ', 'スズキケンタ'],
          hints: [
            '田中は誰が犯人かわかっていた。暗号メモを思い出そう',
            '「すずきはうらぎりもの」──犯人の名は？',
          ],
          wrongMessage: '田中が知っていた犯人の名前を入力しよう',
          params: { investigation: 2 },
          flags: { tanaka_letter_opened: true },
        },
        { type: 'narration', text: 'ファイルが開いた。\n中には田中からの手紙が入っていた。' },
        { type: 'narration', text: '──────────────────' },
        { type: 'text', speaker: '田中（手紙）', text: 'この手紙を読んでいるということは\n俺はもういないのだろう。\nそして君は真実にたどり着いた。' },
        { type: 'text', speaker: '田中（手紙）', text: '俺は佐藤の不正を見つけた。\nそして、鈴木がその共犯者だと知った。\n信じたくなかった。あいつは親友だった。' },
        { type: 'text', speaker: '田中（手紙）', text: '俺は最後まで信じたかった。\n鈴木は操られているだけだと。\n本当は助けを求めているんじゃないかと。' },
        { type: 'text', speaker: '田中（手紙）', text: 'でも、もし俺に何かあった時のために\nこのUSBを残しておく。\nいつか誰かが見つけてくれることを祈って。' },
        { type: 'text', speaker: '田中（手紙）', text: 'この手紙を読んでいる君へ。\nありがとう。\n俺の代わりに真実を暴いてくれて。' },
        { type: 'text', speaker: '田中（手紙）', text: '人を信じることは\n裏切られるリスクを伴う。\nでも、信じることをやめたら\n俺たちは何のために生きているんだろう。' },
        { type: 'text', speaker: '田中（手紙）', text: '君は俺よりも強い。\nだから最後まで戦い抜けたんだ。\n\n──田中洋介' },
        { type: 'narration', text: '──────────────────' },
        {
          type: 'evidence',
          id: 'tanaka_last_letter',
          name: '田中の最後の手紙',
          description: 'USBに暗号化されていた田中からの手紙。「この手紙を読んでいる君へ。ありがとう。俺の代わりに真実を暴いてくれて」。',
        },
        { type: 'narration', text: '……。' },
        { type: 'narration', text: '画面が滲んで見えない。' },
      ],
      next: 'ch7_scene5',
    },

    // ===== 場面5：エンディング — 墓参り =====
    ch7_scene5: {
      location: '霊園',
      time: '翌週 日曜日',
      effect: 'fadeIn',
      bg: 'bg-home-morning',
      content: [
        {
          type: 'phone',
          appName: '山本とのトーク',
          messages: [
            { from: 'other', text: '日曜、田中の墓参り行かないか', time: '土曜 18:00', senderName: '山本' },
            { from: 'player', text: 'ああ。行こう', time: '土曜 18:05' },
          ],
        },
        { type: 'narration', text: '日曜日。\n秋晴れの空の下、霊園を歩く。' },
        { type: 'narration', text: '山本と二人、田中の墓の前に立った。' },
        { type: 'narration', text: '線香の煙が風に揺れる。' },
        { type: 'text', speaker: '山本', text: '……田中。\n真実は暴かれたぞ。\n高橋のおかげでな。' },
        { type: 'text', speaker: '山本', text: 'お前の残したもの、\n全部ちゃんと届いたから。\n安心しろ。' },
        { type: 'narration', text: '山本が目を赤くしている。\nこいつも、ずっと戦っていたんだ。' },
        { type: 'text', speaker: '{name}', text: '田中。\n……お前の手紙、読んだよ。' },
        { type: 'text', speaker: '{name}', text: '人を信じることは\n裏切られるリスクを伴う。\n……でも、信じることをやめなかったから\n{I}はここに立てている。' },
        { type: 'narration', text: '風が吹いた。\n墓前の花が揺れる。' },
        { type: 'narration', text: 'あの一週間。\n疑われ、脅され、追われた日々。\n\n自分は負けなかった。\n真実を掴み取った。' },
        { type: 'narration', text: '田中はもういない。\n鈴木ももういない。\n\nだが真実は明らかになった。\n田中の無念は晴らされた。' },
        { type: 'narration', text: '\n\n── 容疑者X ──\n\n　　　　　完' },
        { type: 'narration', text: '秘密のキーワード:\n\nHAGERUYA BANZAI' },
      ],
      choices: [
        {
          id: 'show_rank',
          text: '評価を見る',
          next: 'ch7_rank',
        },
      ],
    },

    // ===== ランク評価画面への遷移 =====
    ch7_rank: {
      location: '',
      time: '',
      showTransition: false,
      showRank: true,
      content: [
        { type: 'flag', key: 'game_cleared', value: true },
      ],
    },
  },
};
