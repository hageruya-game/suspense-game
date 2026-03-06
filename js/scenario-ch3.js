// ========== CHAPTER 3: 疑惑 ==========
const Chapter3 = {
  scenes: {

    // ===== 場面1：月曜朝 — 黒田の再訪 =====
    ch3_scene1: {
      chapterTitle: '第3章',
      chapterSub: '疑　　惑',
      location: '自宅',
      time: '月曜日 8:00',
      bg: 'bg-home-morning',
      content: [
        { type: 'narration', text: '月曜の朝。\n出社前にドアベルが鳴った。' },
        { type: 'sfx', name: 'doorKnock' },
        { type: 'narration', text: 'ドアを開けると、黒田だった。\nだが今回は少し雰囲気が違う。' },
        {
          type: 'condition',
          condition: { param: 'suspicion', gte: 8 },
          then: 'ch3_gameover_arrested',
          else: 'ch3_scene1_branch',
        },
      ],
    },

    ch3_scene1_branch: {
      location: '自宅',
      time: '月曜日 8:00',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        {
          type: 'condition',
          condition: { param: 'trust', gte: 4 },
          then: 'ch3_scene1_trust_high',
          else: 'ch3_scene1_trust_low',
        },
      ],
    },

    // === GAME OVER: 逮捕される ===
    ch3_gameover_arrested: {
      location: '自宅',
      time: '月曜日 8:05',
      bg: 'bg-interrogation',
      showTransition: false,
      gameover: true,
      content: [
        { type: 'text', speaker: '黒田', text: '{name}さん。\n田中洋介さん殺害の容疑で\n話を聞かせてもらいたい。' },
        { type: 'narration', text: '黒田の後ろに、制服警官が2人。' },
        { type: 'text', speaker: '黒田', text: '署まで同行してもらう。\n任意だが…拒否はしない方がいい。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '疑惑を重ねすぎた。\n不審な行動が多すぎた。\n黒田はもう自分を信じていない。' },
        { type: 'narration', text: '取調室。\n証拠を並べられる。\n偽造メッセージ。防犯カメラ。\n不自然な行動の数々。' },
        { type: 'narration', text: '真犯人は今も自由に\n笑っているだろう。\n\n自分は完璧な替え玉にされた。' },
        { type: 'narration', text: '\n\n── BAD END ──\n「容疑者のまま」\n\n疑惑を払拭できなかった{name}は\n犯人に仕立て上げられた。' },
      ],
      choices: [
        {
          id: 'gameover_retry',
          text: 'ロードしてやり直す',
          next: null,
        },
      ],
    },

    ch3_scene1_trust_high: {
      location: '自宅',
      time: '月曜日 8:05',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        { type: 'text', speaker: '黒田', text: '……オフレコで話がしたい。\n中に入れてくれないか。' },
        { type: 'narration', text: '黒田の目に警戒はない。\nむしろ、何かを共有したいという色がある。' },
        { type: 'text', speaker: '黒田', text: '正直に言う。\n俺はお前が犯人じゃないと思い始めている。' },
        { type: 'text', speaker: '黒田', text: 'あの偽造メッセージ。\n技術的に調べたら、田中のスマホに\n直接インストールされた形跡があった。' },
        { type: 'text', speaker: '黒田', text: '犯人は田中の知り合いだ。\nそしてスマホを操作できるほど\n近い人間だ。' },
        { type: 'text', speaker: '黒田', text: 'それともう一つ。\n田中の部屋の鍵だが──\n施錠に不審な点がなかった。\nつまり犯人は合鍵を持っていた可能性がある。' },
        {
          type: 'evidence',
          id: 'kuroda_info',
          name: '黒田からの捜査情報',
          description: '偽造メッセージは田中のスマホに直接インストールされた。犯人は田中と近しい人物。部屋の施錠に不審な点なし＝合鍵の可能性。',
        },
        { type: 'narration', text: '合鍵。\n昨夜の野口の証言とも一致する。\n犯人は鍵を使って田中の部屋に入った。' },
        { type: 'narration', text: '黒田が味方になりつつある。\nここで持っている情報を共有するか──' },
      ],
      choices: [
        {
          id: 'show_evidence',
          text: 'USBのデータを見せる',
          params: { trust: 3 },
          flags: { ch3_scene1_choice: 'show_evidence', kuroda_has_evidence: true },
          next: 'ch3_scene1_show_evidence',
        },
        {
          id: 'solo',
          text: 'まだ自分で調べる',
          params: { boldness: 2, investigation: 1 },
          flags: { ch3_scene1_choice: 'solo' },
          next: 'ch3_scene1_solo',
        },
        {
          id: 'hint',
          text: '佐藤の名前だけ出す',
          params: { trust: 1, investigation: 1 },
          flags: { ch3_scene1_choice: 'hint' },
          next: 'ch3_scene1_hint',
        },
      ],
    },

    ch3_scene1_trust_low: {
      location: '自宅',
      time: '月曜日 8:05',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        { type: 'text', speaker: '黒田', text: 'いくつか追加で確認したいことがある。\n署まで来てもらえるか。' },
        { type: 'narration', text: '黒田の目はまだ鋭い。\n自分を疑っている目だ。\nだが、完全に敵というわけでもない。' },
        { type: 'text', speaker: '黒田', text: '事件に進展があった。\nあの偽造メッセージだが\n田中のスマホに直接仕込まれた形跡が\nあることがわかった。' },
        { type: 'text', speaker: '黒田', text: '犯人は田中の知り合いだ。\nお前も含めてな。' },
        { type: 'text', speaker: '黒田', text: 'それと、田中の部屋の鍵の件。\n施錠に異常がなかった。\n合鍵を持つ人間がいるということだ。' },
        {
          type: 'evidence',
          id: 'kuroda_info',
          name: '黒田からの捜査情報',
          description: '偽造メッセージは田中のスマホに直接インストールされた。犯人は田中と近しい人物。部屋の施錠に不審な点なし＝合鍵の可能性。',
        },
        { type: 'narration', text: '黒田はまだ自分を容疑者の一人として見ている。\nだが、情報をくれた。\nここで佐藤のことを話すか──' },
      ],
      choices: [
        {
          id: 'show_evidence',
          text: 'USBのデータを見せる',
          params: { trust: 3 },
          flags: { ch3_scene1_choice: 'show_evidence', kuroda_has_evidence: true },
          next: 'ch3_scene1_show_evidence',
        },
        {
          id: 'solo',
          text: 'まだ自分で調べる',
          params: { boldness: 2, investigation: 1 },
          flags: { ch3_scene1_choice: 'solo' },
          next: 'ch3_scene1_solo',
        },
        {
          id: 'hint',
          text: '佐藤の名前だけ出す',
          params: { trust: 1, investigation: 1 },
          flags: { ch3_scene1_choice: 'hint' },
          next: 'ch3_scene1_hint',
        },
      ],
    },

    ch3_scene1_show_evidence: {
      location: '自宅',
      time: '月曜日 8:20',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '黒田さん、これを見てください。' },
        { type: 'narration', text: 'パソコンの画面を見せた。\n佐藤の架空取引のデータ。\n7000万円の横領の証拠。' },
        { type: 'text', speaker: '黒田', text: '……これは。' },
        { type: 'narration', text: '黒田の表情が変わった。\n刑事の目になっている。' },
        { type: 'text', speaker: '黒田', text: 'これを田中が見つけて、\nそれで口封じに……\nなるほど、動機としては十分だ。' },
        { type: 'text', speaker: '黒田', text: 'このデータ、コピーさせてくれ。\n俺の方で裏を取る。' },
        { type: 'text', speaker: '黒田', text: '……{name}。お前、よくここまで調べたな。\n危険なことはこれ以上するなよ。\nここから先は警察の仕事だ。' },
        { type: 'narration', text: '黒田が動き出した。\nこれで流れは変わるはずだ。' },
      ],
      next: 'ch3_scene2',
    },

    ch3_scene1_solo: {
      location: '自宅',
      time: '月曜日 8:20',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: 'まだ…もう少し自分で調べたいことがあります。' },
        { type: 'text', speaker: '黒田', text: '……素人捜査は危険だぞ。\n巻き込まれるぞ。' },
        { type: 'text', speaker: '{name}', text: 'わかっています。\nでも、自分の疑いを晴らすためにも。' },
        { type: 'text', speaker: '黒田', text: 'そうか。\nだが何かあったらすぐに連絡しろ。\nこれは俺の個人の番号だ。' },
        {
          type: 'phone',
          appName: '連絡先',
          messages: [
            { from: 'system', text: '黒田 捜査一課 — 090-XXXX-XXXX が追加されました' },
          ],
        },
        { type: 'narration', text: '黒田の連絡先を手に入れた。\nまだ完全な味方ではないが\n最悪の場合の保険にはなる。' },
      ],
      next: 'ch3_scene2',
    },

    ch3_scene1_hint: {
      location: '自宅',
      time: '月曜日 8:20',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '一つだけ。\n佐藤部長のことを調べてもらえませんか。' },
        { type: 'text', speaker: '黒田', text: '佐藤…？\nお前の上司か。なぜだ。' },
        { type: 'text', speaker: '{name}', text: '田中と佐藤は最近頻繁に2人で会っていました。\n田中は怯えていた。\nそれだけです。' },
        { type: 'narration', text: '証拠は見せない。\nだが方向性だけ示す。' },
        { type: 'text', speaker: '黒田', text: '……なるほど。調べてみる。\nだが、根拠があるなら早く出せよ。' },
        { type: 'narration', text: '黒田は半信半疑だが、佐藤の名前は頭に入ったはずだ。' },
      ],
      next: 'ch3_scene2',
    },

    // ===== 場面2：月曜昼 — 中村綾の調査 =====
    ch3_scene2: {
      location: '□□商事 本社ビル',
      time: '月曜日 12:30',
      bg: 'bg-office-dark',
      content: [
        { type: 'narration', text: '昼休み。\n昨夜の匿名メッセージが頭から離れない。\n「中村に聞け」。' },
        { type: 'narration', text: '社内名簿で調べた。\n中村綾。営業企画部。3階。' },
        { type: 'narration', text: '階段を降りて営業企画部に向かう。\n見知らぬ部署の空気は少し居心地が悪い。' },
        { type: 'narration', text: '受付のそばに、一人の女性が座っていた。\n20代後半。落ち着いた雰囲気。\nネームプレートに「中村」の文字。' },
        { type: 'text', speaker: '{name}', text: '中村さん……ですか。\n少しお時間いただけますか。\n田中洋介さんのことで。' },
        { type: 'narration', text: '「田中」の名前を出した瞬間、\n中村の表情が凍りついた。' },
        { type: 'text', speaker: '中村', text: '……田中さん？\n存じ上げませんが。' },
        { type: 'narration', text: '嘘だ。\n目が泳いでいる。' },
      ],
      choices: [
        {
          id: 'show_diary',
          text: '田中の日記の内容を伝える',
          params: { investigation: 2 },
          next: 'ch3_scene2_diary',
        },
        {
          id: 'bluff',
          text: '「田中さんから聞いています」',
          params: { boldness: 1 },
          next: 'ch3_scene2_bluff',
        },
        {
          id: 'gentle',
          text: '「田中さんを守りたいんです」と優しく',
          params: { trust: 2 },
          next: 'ch3_scene2_gentle',
        },
      ],
    },

    ch3_scene2_diary: {
      location: '□□商事 給湯室',
      time: '月曜日 12:35',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'narration', text: '周囲の目を避けて、給湯室に移動した。' },
        { type: 'text', speaker: '{name}', text: '田中さんが日記を残していました。\n「中村さんを巻き込むわけにはいかない」と。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '中村の目に涙が浮かんだ。\n\nもう隠せないと悟ったようだ。' },
      ],
      next: 'ch3_scene2_confession',
    },

    ch3_scene2_bluff: {
      location: '□□商事 給湯室',
      time: '月曜日 12:35',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'narration', text: '周囲の目を避けて、給湯室に移動した。' },
        { type: 'text', speaker: '{name}', text: '田中さんから聞いています。\n中村さんのこと。' },
        { type: 'text', speaker: '中村', text: '……何を、聞いているんですか。' },
        { type: 'narration', text: '声が震えている。\n触れてはいけない核心に近づいている。' },
        { type: 'text', speaker: '{name}', text: '大切な人だった、と。' },
        { type: 'narration', text: '中村が両手で顔を覆った。' },
      ],
      next: 'ch3_scene2_confession',
    },

    ch3_scene2_gentle: {
      location: '□□商事 給湯室',
      time: '月曜日 12:35',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'narration', text: '周囲の目を避けて、給湯室に移動した。' },
        { type: 'text', speaker: '{name}', text: '田中さんを守りたいんです。\n犯人を見つけるために協力してほしい。' },
        { type: 'text', speaker: '中村', text: '……守る？\nもう……遅いじゃないですか。' },
        { type: 'narration', text: '中村の声が震えた。\n感情が堰を切ったように溢れ出す。' },
      ],
      next: 'ch3_scene2_confession',
    },

    ch3_scene2_confession: {
      location: '□□商事 給湯室',
      time: '月曜日 12:40',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'text', speaker: '中村', text: '……わかりました。話します。' },
        { type: 'text', speaker: '中村', text: '私と田中さんは……\n付き合っていました。\n社内の人には秘密にしていた。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'text', speaker: '中村', text: '部屋の合鍵も持っています。\n田中さんから預かったものです。' },
        { type: 'narration', text: '合鍵。\n黒田の捜査情報と野口の目撃証言が\n繋がり始める。' },
        { type: 'text', speaker: '{name}', text: '……合鍵を持っているのは\n中村さんだけですか。' },
        { type: 'text', speaker: '中村', text: 'はい。私だけのはず……です。\n他に渡していたとは聞いていません。' },
        { type: 'text', speaker: '中村', text: '最近の田中さんは様子がおかしかった。\n怯えていた。\n「一番信頼していた友人を\nもう信じられない」って……。' },
        { type: 'effect', name: 'shake' },
        { type: 'text', speaker: '{name}', text: '一番信頼していた友人……？' },
        { type: 'text', speaker: '中村', text: '名前は言わなかった。\nでも、ずっと一緒にいた親友のことだと\n思います。' },
        { type: 'narration', text: '一番信頼していた友人。\n田中の親友といえば──鈴木だ。\n\nだが今は推測にすぎない。' },
        { type: 'text', speaker: '中村', text: '田中さんは別れを切り出してきた。\n「巻き込みたくない」って。\n何かから私を守ろうとしていた。' },
        { type: 'text', speaker: '中村', text: '事件の後、怖くなって……\n田中さんとのメッセージを全部消しました。\n証拠を残したくなかったんです。' },
        { type: 'narration', text: '中村のメッセージ削除。\n一見すると証拠隠滅に見えるが\n怯えた恋人の行動としては理解できる。' },
        {
          type: 'evidence',
          id: 'nakamura_testimony',
          name: '中村綾の証言',
          description: '田中の秘密の恋人。合鍵を所持。田中は「一番信頼していた友人をもう信じられない」と語っていた。事件後にメッセージを全削除。',
        },
        {
          type: 'evidence',
          id: 'nakamura_key',
          name: '中村が持つ田中の部屋の合鍵',
          description: '田中から預けられた部屋の合鍵。中村の他に合鍵を持つ人物がいる可能性を示唆。',
        },
      ],
      choices: [
        {
          id: 'suspect_nakamura',
          text: '中村を疑う（嘘をついている可能性）',
          params: { investigation: 1 },
          flags: { suspected_nakamura: true },
          next: 'ch3_scene2_suspect',
        },
        {
          id: 'trust_nakamura',
          text: '中村を信じる',
          params: { trust: 1 },
          next: 'ch3_scene2_trust',
        },
      ],
    },

    ch3_scene2_suspect: {
      location: '□□商事 給湯室',
      time: '月曜日 12:50',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '中村さん。\n事件の夜、どこにいましたか。' },
        { type: 'text', speaker: '中村', text: '……社員研修旅行です。\n金曜の夜から日曜まで、箱根にいました。\n参加者名簿にも載っています。' },
        { type: 'narration', text: '社員研修。確認すれば裏が取れる。\nもし本当なら中村にはアリバイがある。\nだが今は確認する手段がない。' },
        { type: 'text', speaker: '{name}', text: 'わかりました。\n協力ありがとうございます。' },
      ],
      next: 'ch3_scene3',
    },

    ch3_scene2_trust: {
      location: '□□商事 給湯室',
      time: '月曜日 12:50',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '中村さん。\n田中さんのために\nあなたの証言は必ず役に立ちます。' },
        { type: 'text', speaker: '中村', text: '……ありがとうございます。\n田中さんの無念を晴らしてください。' },
        { type: 'text', speaker: '中村', text: 'あの……一つだけ。\n事件の夜、私は社員研修で箱根にいました。\nアリバイはあります。' },
        { type: 'narration', text: '自分から申し出てきた。\n信じてもいいのかもしれない。' },
      ],
      next: 'ch3_scene3',
    },

    // ===== 場面3：月曜夕方 — 匿名メッセージの発信元解析（パズル） =====
    ch3_scene3: {
      location: '自宅',
      time: '月曜日 18:00',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: '帰宅後、匿名メッセージのことを考える。' },
        { type: 'narration', text: '「中村に聞け」\nこのメッセージは誰が送っている？\n味方か、それとも敵か。' },
        { type: 'narration', text: '届いたメッセージの詳細情報を確認してみる。\nメッセージヘッダに手がかりがないか……' },
        { type: 'narration', text: 'メッセージのプロパティを開く。\n送信元の情報が暗号化されているが\nいくつかの手がかりが見える。' },
        { type: 'narration', text: '送信元デバイス: 「TY-OLD-PHONE」\n送信時刻パターン: 毎回ちょうど正時\n最初の送信: 田中が殺された翌日\n\n「TY」……田中洋介のイニシャルか？' },
        {
          type: 'puzzle',
          id: 'anonymous_trace',
          question: '匿名メッセージの発信元は？',
          clues: [
            'デバイス名: TY-OLD-PHONE',
            '「TY」= 田中洋介のイニシャル？',
            '送信は毎回ちょうど正時（自動送信の特徴）',
            '最初の送信は田中の死後',
          ],
          answer: ['田中の旧スマホ', '田中のスマホ', '田中の古いスマホ', 'たなかのスマホ', '田中のきゅうスマホ', 'たなかのきゅうスマホ', '田中の旧すまほ', '田中のふるいスマホ', '田中のスマートフォン', 'たなかの旧スマホ', '旧スマホ', 'きゅうスマホ', '田中の携帯', 'たなかのけいたい', '田中のきゅうけいたい', '田中の旧携帯'],
          hints: [
            'TY = Tanaka Yosuke。OLDは「旧い」という意味',
            '田中が生前にセットした自動送信システムでは？',
          ],
          wrongMessage: 'もう少し考えてみよう。「TY-OLD-PHONE」が何を意味するか……',
          flags: { anonymous_traced: true },
          params: { investigation: 2 },
        },
        { type: 'narration', text: '田中の旧スマホ。\n田中は自分が危険にさらされていることを\n知っていた。' },
        { type: 'narration', text: 'だから古いスマホに\n自動メッセージを仕込んでいた。\n\n毎日のチェックインが\n途絶えたら、自動的に警告を送る──\nデッドマンスイッチだ。' },
        {
          type: 'evidence',
          id: 'anonymous_sender_trace',
          name: '匿名メッセージの発信元',
          description: '匿名メッセージは田中の旧スマホ（TY-OLD-PHONE）からの自動送信。田中が生前にセットしたデッドマンスイッチ。',
        },
        { type: 'narration', text: '田中は死の危険を感じていた。\nだから保険をかけた。\n\nUSBメモリ。暗号メモ。\nそしてこの自動メッセージ。\n\n田中は最後まで戦っていたんだ。' },
      ],
      next: 'ch3_scene4',
    },

    // ===== 場面4：月曜夜 — 佐藤との対峙 =====
    ch3_scene4: {
      location: '—',
      time: '月曜日 20:00',
      bg: 'bg-night-danger',
      content: [
        {
          type: 'condition',
          condition: { param: 'boldness', gte: 5 },
          then: 'ch3_scene4_bold',
          else: 'ch3_scene4_called',
        },
      ],
    },

    ch3_scene4_bold: {
      location: '□□商事 本社ビル',
      time: '月曜日 20:00',
      bg: 'bg-confrontation',
      content: [
        { type: 'narration', text: '自ら佐藤のもとに乗り込んだ。\n残業中の佐藤を捕まえる。' },
        { type: 'narration', text: 'オフィスには二人きり。\n他の社員は全員帰宅している。' },
        { type: 'text', speaker: '{name}', text: '佐藤さん。\n田中のことで話があります。' },
        { type: 'text', speaker: '佐藤', text: '……何だ、こんな時間に。' },
        { type: 'text', speaker: '{name}', text: '架空取引のことです。\n7000万円。{I}は全部知っています。' },
        { type: 'narration', text: '佐藤の目が一瞬、氷のように冷たくなった。' },
      ],
      next: 'ch3_scene4_confrontation',
    },

    ch3_scene4_called: {
      location: '□□商事 地下駐車場',
      time: '月曜日 20:00',
      bg: 'bg-confrontation',
      content: [
        { type: 'narration', text: '佐藤から呼び出しがあった。' },
        {
          type: 'phone',
          appName: '佐藤部長',
          messages: [
            { from: 'other', text: '今から会社に来い。\n話がある。地下駐車場で待つ。', time: '19:30', senderName: '佐藤' },
          ],
        },
        { type: 'narration', text: '罠かもしれない。\nだが行かなければ何も進まない。' },
        { type: 'narration', text: '地下駐車場。薄暗い照明。\n佐藤の車の横に、佐藤が立っている。' },
        { type: 'text', speaker: '佐藤', text: 'よく来たな、{name}。\nお前、最近いろいろ嗅ぎ回ってるらしいな。' },
      ],
      next: 'ch3_scene4_confrontation',
    },

    ch3_scene4_confrontation: {
      location: '—',
      time: '月曜日 20:15',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '佐藤', text: '田中はな…余計なことをした。\nあいつが黙っていれば\n誰も不幸にならなかった。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'text', speaker: '{name}', text: '田中を殺した{nano}か。' },
        { type: 'text', speaker: '佐藤', text: '……殺す？\nそんな直接的なことはしないさ。\nただ「処理」しただけだ。' },
        { type: 'narration', text: '佐藤が本性を表した。\nその時──' },
        { type: 'narration', text: '背後から足音。\n振り返ると、スーツ姿の男が2人\n近づいてくる。' },
        { type: 'text', speaker: '佐藤', text: 'お前も田中と同じだ。\n余計なことに首を突っ込みすぎた。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '男たちが掴みかかってきた──！' },
      ],
      choices: [
        {
          id: 'present_usb',
          text: '「USBの証拠は既にコピーしてある。俺に手を出せば全てが公になる」',
          params: { boldness: 2 },
          evidence: [{ id: 'sato_confession', name: '佐藤の自白録音', description: '対峙の際にスマホで密かに録音していた佐藤の発言。「田中が余計なことをした」「処理しただけだ」。' }],
          flags: { qte_success: true },
          next: 'ch3_scene4_evidence_success',
        },
        {
          id: 'bluff',
          text: '「警察にはもう全て話した」（ハッタリ）',
          params: { suspicion: 1 },
          flags: { qte_success: false },
          next: 'ch3_scene4_bluff_fail',
        },
        {
          id: 'record',
          text: '黙ってスマホの録音を続ける（佐藤に喋らせる）',
          condition: { flag: 'ch2_scene4_choice', value: 'record' },
          params: { investigation: 2 },
          evidence: [{ id: 'sato_confession', name: '佐藤の自白録音', description: '対峙の際にスマホで密かに録音していた佐藤の発言。「田中が余計なことをした」「処理しただけだ」。' }],
          flags: { qte_success: true },
          next: 'ch3_scene4_evidence_success',
        },
      ],
      timeLimit: 12,
    },

    ch3_scene4_evidence_success: {
      location: '□□商事 本社ビル前',
      time: '月曜日 20:20',
      bg: 'bg-night-street',
      content: [
        { type: 'narration', text: '佐藤が動揺した隙に、出口に向かって走った。' },
        { type: 'sfx', name: 'footsteps' },
        { type: 'narration', text: '非常口から外に飛び出す。\n夜の空気を思い切り吸い込む。' },
        { type: 'narration', text: 'ポケットの中のスマホを確認する。\n……録音アプリは動いていた。' },
        { type: 'narration', text: '佐藤の自白。\n「田中が余計なことをした」\n「処理しただけだ」\n\n全て録音されている。' },
      ],
      next: 'ch3_scene5',
    },

    ch3_scene4_bluff_fail: {
      location: '—',
      time: '月曜日 20:20',
      bg: 'bg-night-danger',
      content: [
        { type: 'text', speaker: '佐藤', text: 'ハッタリだな。\n本当に話していたら\nとっくに俺のところに警察が来ている。' },
        { type: 'narration', text: '見抜かれた。\n佐藤が部下に目配せする。\n男たちに押さえつけられる。' },
        { type: 'text', speaker: '佐藤', text: 'おとなしくしろ。\n痛い思いはさせたくない。' },
        { type: 'narration', text: 'その時──' },
        {
          type: 'condition',
          condition: { flag: 'suzuki_ally', value: true },
          then: 'ch3_scene4_rescue_suzuki',
          else: 'ch3_scene4_check_kuroda',
        },
      ],
    },

    ch3_scene4_check_kuroda: {
      location: '—',
      time: '月曜日 20:22',
      bg: 'bg-night-danger',
      showTransition: false,
      content: [
        {
          type: 'condition',
          condition: { or: [
            { flag: 'kuroda_has_evidence', value: true },
            { param: 'trust', gte: 3 },
          ]},
          then: 'ch3_scene4_rescue_kuroda',
          else: 'ch3_gameover_captured',
        },
      ],
    },

    // === GAME OVER: 佐藤に捕まる ===
    ch3_gameover_captured: {
      location: '—',
      time: '月曜日 20:30',
      bg: 'bg-night-danger',
      showTransition: false,
      gameover: true,
      content: [
        { type: 'narration', text: '誰も来ない。\n助けは来なかった。' },
        { type: 'text', speaker: '佐藤', text: '余計なものを見たお前が悪い。\n田中と同じだ。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '意識が遠のいていく。\n暗闇が視界を覆う。' },
        { type: 'narration', text: '数日後。\nニュースが流れた。' },
        {
          type: 'notification',
          title: 'ニュース速報',
          text: '□□商事社員が行方不明　警察が捜索',
        },
        { type: 'narration', text: '{name}は消された。\n佐藤の不正は闇に葬られた。\n\n田中の無念を晴らすことは\n誰にもできなくなった。' },
        { type: 'narration', text: '\n\n── BAD END ──\n「消された者」\n\n味方を作れなかった代償は\nあまりにも大きかった。' },
      ],
      choices: [
        {
          id: 'gameover_retry',
          text: 'ロードしてやり直す',
          next: null,
        },
      ],
    },

    ch3_scene4_rescue_suzuki: {
      location: '—',
      time: '月曜日 20:25',
      bg: 'bg-night-danger',
      showTransition: false,
      content: [
        { type: 'sfx', name: 'doorKnock' },
        { type: 'text', speaker: '鈴木', text: 'おい！何やってるんだ！' },
        { type: 'narration', text: '鈴木が駆けつけた。\n残業で会社に残っていたのか。' },
        { type: 'text', speaker: '鈴木', text: '{name}！大丈夫か！\nおい、警察呼ぶぞ！' },
        { type: 'narration', text: '佐藤の部下たちが動揺した。\n鈴木がスマホを構えている。' },
        { type: 'text', speaker: '佐藤', text: 'ちっ……行くぞ。' },
        { type: 'narration', text: '佐藤たちは去っていった。\n鈴木のおかげで助かった。' },
        { type: 'text', speaker: '鈴木', text: 'お前…何してるんだよ。\nすぐ警察に連絡しろ。' },
      ],
      next: 'ch3_scene5',
    },

    ch3_scene4_rescue_kuroda: {
      location: '—',
      time: '月曜日 20:25',
      bg: 'bg-night-danger',
      showTransition: false,
      content: [
        { type: 'narration', text: '覚悟を決めた、その時──' },
        { type: 'sfx', name: 'footsteps' },
        { type: 'text', speaker: '黒田', text: 'そこまでだ。' },
        { type: 'narration', text: '黒田が現れた。\n別の刑事を連れている。' },
        { type: 'text', speaker: '黒田', text: '捜査一課の黒田だ。\n全員、動くな。' },
        { type: 'narration', text: '佐藤の表情が凍りつく。\n部下たちが手を離した。' },
        { type: 'text', speaker: '佐藤', text: '……これは社内の問題だ。\n警察に介入されるいわれはない。' },
        { type: 'text', speaker: '黒田', text: 'そうか。\nなら田中洋介の件についても\n聞かせてもらおうか、佐藤さん。' },
        { type: 'narration', text: '佐藤の目に、初めて動揺が走った。' },
      ],
      next: 'ch3_scene5',
    },

    // ===== 場面5：第3章エンディング — 本当の蛇 =====
    ch3_scene5: {
      location: '自宅',
      time: '月曜日 深夜',
      effect: 'fadeIn',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: '深夜。自宅に戻った。' },
        { type: 'narration', text: '整理しよう。わかったことを。' },
        { type: 'narration', text: '佐藤は7000万円を横領していた。\n田中がそれを発見し、口封じに殺された。' },
        { type: 'narration', text: '中村綾は田中の秘密の恋人だった。\n合鍵を持っていた。\n田中は中村を守ろうとしていた。' },
        { type: 'narration', text: '匿名メッセージは田中自身が仕込んだ\nデッドマンスイッチからの自動送信だった。\n田中は自分の死を予期していた。' },
        { type: 'narration', text: '構図は見えてきた。\n佐藤が黒幕だ。\n\nだが佐藤の最後の言葉が\n頭から離れない。' },
        { type: 'text', speaker: '佐藤', text: '田中を殺したのは俺じゃない。\n俺は金を動かしただけだ。' },
        { type: 'text', speaker: '佐藤', text: '本当の蛇はまだ自由だぞ。\nお前の足元でな。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'narration', text: '本当の蛇。\n実行犯は佐藤ではない──？\n\n佐藤は指示した側。\n実際に手を下した人間が\nまだ自由に動いている。' },
        { type: 'narration', text: 'そして田中の言葉。\n「一番信頼していた友人を\nもう信じられない」' },
        { type: 'narration', text: '田中の一番の親友は──\n鈴木健太だ。' },
        { type: 'effect', name: 'shake' },
        {
          type: 'notification',
          title: '差出人不明',
          text: 'にげろ',
        },
        { type: 'narration', text: 'また匿名メッセージ。\n田中の自動送信。\n\n「にげろ」\n\n……田中は逃げられなかった。\n自分は、この警告に応えなければならない。' },
        { type: 'narration', text: '容疑者は増えていく。\n野口。中村。佐藤。\nそして……鈴木。\n\n真実はまだ見えない。' },
        { type: 'narration', text: '\n　　　　　── 第3章 終 ──' },
      ],
      choices: [
        {
          id: 'to_ch4',
          text: '第4章へ進む',
          next: 'ch4_scene1',
        },
      ],
    },
  },
};
