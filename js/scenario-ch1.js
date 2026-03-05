// ========== CHAPTER 1: 容疑者 ==========
const Chapter1 = {
  scenes: {

    // ===== 場面1：金曜夜 — 居酒屋前 =====
    ch1_scene1: {
      chapterTitle: '第1章',
      chapterSub: '容　疑　者',
      location: '居酒屋「灯火」前',
      time: '金曜日 19:30',
      bg: 'bg-night-street',
      content: [
        { type: 'narration', text: '金曜の夜。' },
        { type: 'narration', text: '同期の田中から「相談したいことがある」と\n飲みに誘われた。\n同じ会社の{position}同士、断る理由はなかった。' },
        { type: 'narration', text: '待ち合わせは19時。\nだが、もう30分が過ぎた。田中は来ない。' },
        {
          type: 'phone',
          appName: '田中とのトーク',
          messages: [
            { from: 'player', text: '着いたよ', time: '18:45' },
            { from: 'player', text: '遅くない？', time: '19:05' },
            { from: 'player', text: '電話するよ', time: '19:20' },
            { from: 'system', text: '田中に発信中... 応答なし' },
          ],
        },
        { type: 'sfx', name: 'phoneRing' },
        { type: 'narration', text: '電話は繋がらない。\nどうする？' },
      ],
      choices: [
        {
          id: 'wait',
          text: 'もう少し待つ',
          params: { suspicion: 0 },
          flags: { scene1_choice: 'wait' },
          next: 'ch1_scene1_wait',
        },
        {
          id: 'call_again',
          text: '田中に再度電話する',
          params: { suspicion: 1 },
          flags: { scene1_choice: 'call' },
          next: 'ch1_scene1_call',
        },
        {
          id: 'go_home',
          text: '田中の家に向かう',
          params: { suspicion: 3 },
          flags: { scene1_choice: 'go_home' },
          next: 'ch1_scene1_gohome',
        },
        {
          id: 'leave',
          text: '帰る',
          params: { suspicion: -1 },
          flags: { scene1_choice: 'leave' },
          evidence: [{ id: 'convenience_receipt', name: 'コンビニのレシート', description: '帰宅途中のコンビニのレシート。アリバイになる。' }],
          next: 'ch1_scene1_leave',
        },
      ],
    },

    ch1_scene1_wait: {
      location: '居酒屋「灯火」前',
      time: '金曜日 20:00',
      bg: 'bg-night-street',
      showTransition: false,
      content: [
        { type: 'narration', text: '20分が過ぎた。田中は来ない。' },
        { type: 'text', speaker: '店員', text: 'お連れ様は…？\nお席、もう少しお待ちになりますか？' },
        { type: 'narration', text: '一人で軽く飲んで、帰ることにした。\n\n田中に何かあったのだろうか。\n胸の奥に小さな不安が残った。' },
      ],
      next: 'ch1_scene2',
    },

    ch1_scene1_call: {
      location: '居酒屋「灯火」前',
      time: '金曜日 19:35',
      bg: 'bg-night-street',
      showTransition: false,
      content: [
        { type: 'sfx', name: 'phoneRing' },
        { type: 'narration', text: '再び発信する。応答なし。\n留守電に切り替わった。' },
        { type: 'text', speaker: '{name}', text: '田中、待ってる{dazo}。\n大丈夫か？何かあったら連絡くれ。' },
        { type: 'narration', text: '留守電を残した。\nこの留守電が後に「最後に田中に連絡した人物」の\n証拠として使われることになるとは\nこの時は知る由もなかった。' },
        { type: 'narration', text: 'しばらく待ったが、結局田中は現れなかった。\n帰宅する。' },
      ],
      next: 'ch1_scene2',
    },

    ch1_scene1_gohome: {
      location: '田中のマンション前',
      time: '金曜日 20:00',
      bg: 'bg-night-street',
      content: [
        { type: 'narration', text: '心配になって田中の家に向かった。' },
        { type: 'narration', text: '田中のマンション。\n部屋の電気は消えている。' },
        { type: 'sfx', name: 'doorKnock' },
        { type: 'narration', text: 'インターホンを押す。応答なし。\n何度か押すが、反応はない。' },
        { type: 'narration', text: '仕方なく帰宅した。\n\nだが、この行動が自分を追い詰めることになる。\nマンションの防犯カメラは、確実に自分の姿を\n捉えていた。' },
      ],
      next: 'ch1_scene2',
    },

    ch1_scene1_leave: {
      location: '帰宅途中のコンビニ',
      time: '金曜日 19:40',
      bg: 'bg-convenience',
      content: [
        { type: 'narration', text: '田中にも事情があるのだろう。\n帰ることにした。' },
        { type: 'narration', text: '帰り道、コンビニに寄って\n弁当とビールを買った。\nレシートをポケットにねじ込む。' },
        { type: 'narration', text: 'このレシートが後に\n自分を救う小さな証拠になるとは\n思いもしなかった。' },
      ],
      next: 'ch1_scene2',
    },

    // ===== 場面2：土曜朝 — 事件発覚 =====
    ch1_scene2: {
      location: '自宅',
      time: '土曜日 8:00',
      bg: 'bg-home-morning',
      content: [
        { type: 'narration', text: '翌朝。\nスマホのアラームで目が覚めた。' },
        {
          type: 'notification',
          title: 'ニュース速報',
          text: '○○区のマンションで男性が変死体で発見 事件の可能性',
        },
        { type: 'narration', text: '寝ぼけた頭で通知をタップする。\n記事を読んで、血の気が引いた。' },
        { type: 'narration', text: '住所。年齢。マンション名。\n全て田中のものだった。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '「室内に争った形跡があり、\n 玄関の施錠に不審な点はなかった」' },
        { type: 'narration', text: '施錠に不審な点がない。\nつまり、田中は自ら犯人を部屋に入れた。\n知り合いの犯行…？' },
        {
          type: 'evidence',
          id: 'fake_message',
          name: '偽造されたLINEメッセージ',
          description: '田中のスマホに残されていた主人公との不穏なやり取り。身に覚えがない。',
        },
        { type: 'narration', text: '頭が真っ白になる。\nどうする。' },
      ],
      choices: [
        {
          id: 'call_police',
          text: '警察に連絡する',
          params: { trust: 2, suspicion: -1 },
          flags: { scene2_choice: 'police' },
          next: 'ch1_scene2_police',
        },
        {
          id: 'call_sato',
          text: '上司の佐藤に電話する',
          params: { investigation: 1 },
          flags: { scene2_choice: 'sato' },
          next: 'ch1_scene2_sato',
        },
        {
          id: 'go_scene',
          text: '田中のマンションに向かう',
          params: { suspicion: 2, boldness: 2 },
          flags: { scene2_choice: 'scene' },
          next: 'ch1_scene2_goscene',
        },
        {
          id: 'freeze',
          text: 'しばらく動けない',
          params: { investigation: 1 },
          flags: { scene2_choice: 'freeze' },
          evidence: [{ id: 'non_caller', name: '非通知着信の記録', description: '土曜朝に届いた非通知着信。犯人が主人公の反応を探っていた。' }],
          next: 'ch1_scene2_freeze',
        },
      ],
    },

    ch1_scene2_police: {
      location: '自宅',
      time: '土曜日 8:30',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        { type: 'narration', text: '震える手で110番を押す。' },
        { type: 'text', speaker: '{name}', text: '昨夜、亡くなった田中さんと\n飲みに行く約束をしていました。\nでも田中は来なくて…' },
        { type: 'text', speaker: '警察', text: 'わかりました。\n詳しい話を聞かせていただけますか。\n署まで来ていただけますか？' },
        { type: 'narration', text: '自ら連絡した。これは正しい判断のはずだ。\n少なくとも、逃げている人間の行動ではない。' },
      ],
      next: 'ch1_scene3',
    },

    ch1_scene2_sato: {
      location: '自宅',
      time: '土曜日 8:30',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        { type: 'narration', text: '上司の佐藤に電話をかけた。' },
        { type: 'text', speaker: '佐藤', text: 'ああ、{name}か。\nどうした、休みの日に。' },
        { type: 'text', speaker: '{name}', text: '田中が…田中が死んだみたいです。\nニュースで…' },
        { type: 'narration', text: '佐藤の声は妙に冷静だった。' },
        { type: 'text', speaker: '佐藤', text: '落ち着け。\n警察には聞かれるまで余計なことを言うな。\n変に動くと面倒なことになる。' },
        { type: 'narration', text: '…なぜ、こんなに冷静なんだ。\n部下が殺されたかもしれないのに。\n\nそして「余計なことを言うな」とはどういう意味だ。' },
      ],
      next: 'ch1_scene3',
    },

    ch1_scene2_goscene: {
      location: '田中のマンション前',
      time: '土曜日 9:00',
      bg: 'bg-night-street',
      content: [
        { type: 'narration', text: '居てもたってもいられず、田中のマンションに向かった。' },
        { type: 'narration', text: '現場は警察のテープで封鎖されていた。\n野次馬が数人、遠巻きに見ている。' },
        { type: 'narration', text: '混じって見ていると、スーツ姿の刑事と目が合った。' },
        { type: 'text', speaker: '黒田', text: 'あんた、被害者の知り合い？' },
        { type: 'narration', text: '鋭い目。この男は見抜く目を持っている。\n直感的にそう思った。' },
      ],
      next: 'ch1_scene3',
    },

    ch1_scene2_freeze: {
      location: '自宅',
      time: '土曜日 8:30',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        { type: 'narration', text: '体が動かない。\n頭では理解しているのに、現実として受け入れられない。' },
        { type: 'narration', text: '30分ほど放心していた。\nそのとき、スマホが鳴った。' },
        { type: 'sfx', name: 'phoneRing' },
        { type: 'narration', text: '非通知着信。' },
        { type: 'narration', text: '……出る。' },
        { type: 'narration', text: '無言。\n3秒の沈黙の後、通話が切れた。' },
        { type: 'narration', text: '背筋が凍る。\nあれは何だったのか。\n\n…今はわからない。\nだが、この着信の記録は残しておくべきだ。' },
      ],
      next: 'ch1_scene3',
    },

    // ===== 場面3：土曜昼 — 黒田の聴取 =====
    ch1_scene3: {
      location: '—',
      time: '土曜日 12:00',
      bg: 'bg-interrogation',
      content: [
        { type: 'narration', text: 'どの道を選んでも\nこの男と会うことは避けられなかった。' },
        { type: 'narration', text: '捜査一課の刑事、黒田。' },
        { type: 'text', speaker: '黒田', text: '突然すみません。捜査一課の黒田です。\n{position}の{name}さんですね。\n田中洋介さんについてお話を伺いたい。' },
        { type: 'text', speaker: '黒田', text: '昨夜、田中さんと会う約束があったと\n聞いています。\n実際にはどうでしたか？' },
      ],
      choices: [
        {
          id: 'honest',
          text: '正直に全て話す（待っていたが来なかった）',
          params: { trust: 2 },
          flags: { scene3_choice: 'honest' },
          next: 'ch1_scene3_honest',
        },
        {
          id: 'vague',
          text: '曖昧に答える（約束はしていたが詳しくは…）',
          params: { suspicion: 1, trust: -1 },
          flags: { scene3_choice: 'vague' },
          next: 'ch1_scene3_vague',
        },
        {
          id: 'lie',
          text: '知らないふりをする（約束？していませんが）',
          params: { suspicion: 3, trust: -2 },
          flags: { scene3_choice: 'lie' },
          next: 'ch1_scene3_lie',
        },
      ],
    },

    ch1_scene3_honest: {
      location: '—',
      time: '土曜日 12:15',
      bg: 'bg-interrogation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '19時に居酒屋で待ち合わせをしていました。\nでも田中は来なかった。\n30分以上待って、帰りました。' },
        { type: 'narration', text: '黒田は頷きながらメモを取る。' },
        { type: 'text', speaker: '黒田', text: '正直に話してくれてありがたい。' },
        {
          type: 'condition',
          condition: { flag: 'scene1_choice', value: 'go_home' },
          then: 'ch1_scene3_camera',
          else: 'ch1_scene4',
        },
      ],
    },

    ch1_scene3_camera: {
      location: '—',
      time: '土曜日 12:20',
      bg: 'bg-interrogation',
      showTransition: false,
      content: [
        { type: 'narration', text: '黒田の目が鋭くなった。' },
        { type: 'text', speaker: '黒田', text: 'では、なぜ被害者のマンション前の防犯カメラに\nあなたが映っているんですか？' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '心臓が跳ねる。\nあの時、カメラに映っていたのか。' },
        { type: 'text', speaker: '{name}', text: '心配になって様子を見に行ったんです。\nでもインターホンに応答がなくて、帰りました。' },
        { type: 'text', speaker: '黒田', text: '……なるほど。' },
        { type: 'narration', text: '信じてくれただろうか。\n黒田の表情からは読み取れない。' },
      ],
      next: 'ch1_scene4',
    },

    ch1_scene3_vague: {
      location: '—',
      time: '土曜日 12:15',
      bg: 'bg-interrogation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '約束はしていたような…\n最近忙しくて、はっきり覚えていなくて…' },
        { type: 'narration', text: '黒田の目が鋭くなる。' },
        { type: 'text', speaker: '黒田', text: 'はっきり答えてもらえますか。\n人が亡くなっているんです。' },
        { type: 'narration', text: '曖昧な態度は、疑いを深めただけだった。' },
      ],
      next: 'ch1_scene4',
    },

    ch1_scene3_lie: {
      location: '—',
      time: '土曜日 12:15',
      bg: 'bg-interrogation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '約束？していませんが…\n昨夜は普通に家にいました。' },
        { type: 'narration', text: '黒田が手帳をめくる。' },
        { type: 'text', speaker: '黒田', text: '田中さんのスマホの通話履歴に\nあなたの番号がありますが。' },
        { type: 'narration', text: '嘘はすぐにバレた。\n最悪の選択だったかもしれない。' },
      ],
      next: 'ch1_scene4',
    },

    // ===== 場面4：爆弾投下 — 偽造メッセージ =====
    ch1_scene4: {
      location: '—',
      time: '土曜日 12:30',
      bg: 'bg-interrogation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '黒田', text: 'もう一つ確認させてください。\nこれに見覚えはありますか？' },
        { type: 'narration', text: '黒田がスマホの画面を見せてきた。' },
        {
          type: 'phone',
          appName: '【証拠品】田中のスマホ',
          messages: [
            { from: 'player', text: 'もう黙ってろよ', time: '水曜 22:15', senderName: '※あなたの名前で送信' },
            { from: 'player', text: '余計なこと言ったらどうなるかわかるよな', time: '水曜 22:16', senderName: '※あなたの名前で送信' },
            { from: 'other', text: 'わかった…すまん', time: '水曜 22:20', senderName: '田中' },
          ],
        },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'narration', text: '見覚えのないメッセージだった。\nこんなやり取りをした記憶は一切ない。' },
        { type: 'narration', text: '誰かが自分になりすまして送ったのか。\nそれとも田中のスマホに直接仕込まれたのか。' },
      ],
      choices: [
        {
          id: 'show_phone',
          text: '「これは偽物です。自分のスマホを見てください」',
          params: { trust: 1, investigation: 1 },
          flags: { scene4_choice: 'show_phone' },
          next: 'ch1_scene4_show',
        },
        {
          id: 'claim_fake',
          text: '「誰かが偽造したんだ」',
          params: { suspicion: 1 },
          flags: { scene4_choice: 'claim_fake' },
          next: 'ch1_scene4_claim',
        },
        {
          id: 'lawyer',
          text: '「弁護士を呼びたい」',
          params: { trust: -1, investigation: 2 },
          flags: { scene4_choice: 'lawyer' },
          next: 'ch1_scene4_lawyer',
        },
        {
          id: 'silent',
          text: '黙り込む',
          params: { suspicion: 2 },
          flags: { scene4_choice: 'silent' },
          next: 'ch1_scene4_silent',
        },
      ],
    },

    ch1_scene4_show: {
      location: '—',
      time: '土曜日 12:35',
      bg: 'bg-interrogation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '自分のスマホを見てください。\nこのやり取りは存在しません。' },
        { type: 'narration', text: 'スマホを見せる。確かにこのやり取りは存在しない。' },
        { type: 'text', speaker: '黒田', text: '片方だけ消すことも可能ですからね。' },
        { type: 'narration', text: 'そう言いながらも、黒田の眉がわずかに動いた。\n心の中に小さな疑問が生まれたのかもしれない。' },
      ],
      next: 'ch1_scene5',
    },

    ch1_scene4_claim: {
      location: '—',
      time: '土曜日 12:35',
      bg: 'bg-interrogation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '誰かが偽造した{nda}。\n{I}はこんなメッセージ送っていない。' },
        { type: 'text', speaker: '黒田', text: 'では誰がなぜ偽造するんですか？' },
        { type: 'narration', text: '動機を説明できない。\nまだ何もわかっていないのだから。\n\n証拠なしの主張は弱い。' },
      ],
      next: 'ch1_scene5',
    },

    ch1_scene4_lawyer: {
      location: '—',
      time: '土曜日 12:35',
      bg: 'bg-interrogation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '弁護士を呼びたいです。' },
        { type: 'text', speaker: '黒田', text: '任意の聴取ですので、もちろん構いません。\n今日のところはここまでにしましょう。' },
        { type: 'narration', text: '一旦帰宅できる。\n時間を稼いだ。\nだが黒田の目は\n「弁護士を呼ぶ人間は何か隠している」と\n言っていた。' },
      ],
      next: 'ch1_scene5',
    },

    ch1_scene4_silent: {
      location: '—',
      time: '土曜日 12:35',
      bg: 'bg-interrogation',
      showTransition: false,
      content: [
        { type: 'narration', text: '言葉が出ない。\n偽造された証拠を前に、何を言えばいいのか。' },
        { type: 'text', speaker: '黒田', text: '答えたくない、ということですか。' },
        { type: 'narration', text: '沈黙が疑惑を深めていく。\nわかっている。でも、言葉が見つからなかった。' },
      ],
      next: 'ch1_scene5',
    },

    // ===== 場面5：土曜夕方 — 一人の戦い =====
    ch1_scene5: {
      location: '自宅',
      time: '土曜日 17:00',
      effect: 'fadeIn',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: '警察は去った。\nだが確信した。' },
        { type: 'narration', text: '自分が、何者かにハメられている。' },
        { type: 'narration', text: '田中は何を「相談」しようとしていたのか。\nあの偽造メッセージは誰が作った。\nこのままでは逮捕される。' },
        {
          type: 'notification',
          title: '差出人不明',
          text: 'おとなしくしていれば悪いようにはしない',
        },
        { type: 'effect', name: 'shake' },
        {
          type: 'evidence',
          id: 'threat_message',
          name: '差出人不明の脅迫メッセージ',
          description: '「おとなしくしていれば悪いようにはしない」土曜の夕方に届いた。',
        },
        { type: 'narration', text: '誰だ。\nこのメッセージは誰が送ってきた。' },
      ],
      choices: [
        {
          id: 'reply',
          text: 'メッセージに返信する（「誰だ」）',
          params: { boldness: 2, suspicion: 1 },
          flags: { scene5_choice: 'reply' },
          next: 'ch1_scene5_reply',
        },
        {
          id: 'investigate',
          text: '無視して田中について調べ始める',
          params: { investigation: 3 },
          flags: { scene5_choice: 'investigate' },
          evidence: [{ id: 'tanaka_sns', name: '田中のSNS投稿の異変', description: '1ヶ月前から急に投稿が減っている。最後の投稿は会社の飲み会写真。佐藤が隣に映っている。' }],
          next: 'ch1_scene5_investigate',
        },
        {
          id: 'report',
          text: '警察にこのメッセージを報告する',
          params: { trust: 2 },
          flags: { scene5_choice: 'report' },
          next: 'ch1_scene5_report',
        },
        {
          id: 'yamamoto',
          text: '友人の山本に連絡する',
          params: { investigation: 2 },
          flags: { scene5_choice: 'yamamoto' },
          next: 'ch1_scene5_yamamoto',
        },
      ],
    },

    ch1_scene5_reply: {
      location: '自宅',
      time: '土曜日 17:10',
      bg: 'bg-home-evening',
      showTransition: false,
      content: [
        {
          type: 'phone',
          appName: 'メッセージ',
          messages: [
            { from: 'other', text: 'おとなしくしていれば悪いようにはしない', time: '17:00', senderName: '非通知' },
            { from: 'player', text: '誰だ', time: '17:05' },
            { from: 'system', text: '既読がついた' },
          ],
        },
        { type: 'narration', text: '既読はついた。だが返信はない。\n相手にこちらの反応を見せてしまった。\n\n焦りが募る。' },
      ],
      next: 'ch1_scene6',
    },

    ch1_scene5_investigate: {
      location: '自宅',
      time: '土曜日 17:30',
      bg: 'bg-home-evening',
      showTransition: false,
      content: [
        { type: 'narration', text: '脅しには乗らない。\n田中のことを調べる。それが今やるべきことだ。' },
        { type: 'narration', text: '田中のSNSを遡る。' },
        { type: 'narration', text: '1ヶ月前から急に投稿が減っている。\nそれまでは毎日のように何かを上げていたのに。' },
        { type: 'narration', text: '最後の投稿は2週間前。\n会社の飲み会の写真。' },
        { type: 'narration', text: '田中の隣に映っているのは…佐藤部長だ。\n二人とも笑っている。\nだが田中の笑顔はどこか固い。' },
        { type: 'narration', text: '1ヶ月前に何があった。\n田中は何を見つけたんだ。' },
      ],
      next: 'ch1_scene6',
    },

    ch1_scene5_report: {
      location: '自宅',
      time: '土曜日 17:30',
      bg: 'bg-home-evening',
      showTransition: false,
      content: [
        { type: 'narration', text: '黒田に電話をかけた。' },
        { type: 'text', speaker: '{name}', text: '脅迫メッセージが届きました。\n「おとなしくしていれば悪いようにはしない」と。' },
        { type: 'text', speaker: '黒田', text: 'スクリーンショットを送ってくれ。\n調べてみる。' },
        { type: 'narration', text: '黒田は興味を示したが\n「それだけでは何とも」という口ぶりだった。\n\nだが黒田の中で一つの疑問が生まれたはずだ。\n本当に犯人なら、なぜ脅迫を受ける？' },
      ],
      next: 'ch1_scene6',
    },

    ch1_scene5_yamamoto: {
      location: '自宅',
      time: '土曜日 17:15',
      bg: 'bg-home-evening',
      showTransition: false,
      content: [
        { type: 'narration', text: '信頼できる友人、山本に電話をかけた。' },
        { type: 'narration', text: '3コールで出た。だが声がおかしい。' },
        { type: 'text', speaker: '山本', text: 'あ…{name}か。\nどうした。' },
        { type: 'text', speaker: '{name}', text: '田中のこと聞いたか。\n{I}、警察に疑われてる。' },
        { type: 'narration', text: '沈黙。' },
        { type: 'text', speaker: '山本', text: '……今は関わらない方がいい。\n頼むから。' },
        { type: 'narration', text: '電話は不自然に切られた。\n山本は何かを知っている。\nそしてそれを話すことを恐れている。' },
      ],
      next: 'ch1_scene6',
    },

    // ===== 場面6：土曜夜 — 襲撃（アクション） =====
    ch1_scene6: {
      location: '自宅',
      time: '土曜日 21:00',
      bg: 'bg-night-danger',
      content: [
        { type: 'narration', text: '夜になった。\n疲れ果てて、ソファに座っていた。' },
        { type: 'narration', text: 'その時。\n玄関の外に、人の気配がした。' },
        { type: 'sfx', name: 'doorCreak' },
        { type: 'narration', text: 'ドアノブが…ゆっくり…回る音。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '誰かが入ってこようとしている。' },
      ],
      // Action part: Chase
      action: {
        id: 'ch1_chase',
        type: 'chase',
        duration: 12,
        onSuccess: {
          params: { boldness: 1 },
          next: 'ch1_scene6_escape_success',
        },
        onFailure: {
          params: { investigation: 1 },
          evidence: [{ id: 'chase_perfume', name: '追手の香水の匂い', description: '組み伏せられた際に感じた高級な香水の匂い。男性用。' }],
          next: 'ch1_scene6_escape_fail',
        },
      },
    },

    ch1_scene6_escape_success: {
      location: '路地裏',
      time: '土曜日 21:05',
      bg: 'bg-night-street',
      showTransition: false,
      content: [
        { type: 'sfx', name: 'footsteps' },
        { type: 'narration', text: '窓から飛び出し、路地を走った。\n追手を撒いた。' },
        { type: 'narration', text: '息を切らしてコンビニに駆け込む。\n蛍光灯の白い光が目に染みる。' },
        { type: 'narration', text: '追ってきた人物の顔は見えなかった。\nフードを被っていた。\n\nだが一つわかる。\n誰かが自分を消そうとしている。' },
      ],
      next: 'ch1_scene7',
    },

    ch1_scene6_escape_fail: {
      location: '自宅前',
      time: '土曜日 21:05',
      bg: 'bg-night-danger',
      showTransition: false,
      content: [
        { type: 'narration', text: '捕まった。\n組み伏せられる。' },
        { type: 'narration', text: 'だがその瞬間、通行人の声が聞こえた。\n追手はすぐに逃げていった。' },
        { type: 'narration', text: '顔は見えなかった。\nだが一つ、記憶に残るものがあった。' },
        { type: 'narration', text: '香水の匂い。\n高級な、男性用の香水。\nどこかで嗅いだことがある気がする。' },
      ],
      next: 'ch1_scene7',
    },

    // ===== 場面7：第1章エンディング =====
    ch1_scene7: {
      location: 'コンビニ',
      time: '土曜日 深夜',
      effect: 'fadeIn',
      bg: 'bg-convenience',
      content: [
        { type: 'narration', text: '田中は殺された。' },
        { type: 'narration', text: '自分はハメられている。' },
        { type: 'narration', text: '警察は自分を疑っている。' },
        { type: 'narration', text: '何者かが口封じに来た。' },
        { type: 'narration', text: '一つだけわかったことがある。\nこれは偶然じゃない。\n誰かが計画的にやっている。' },
        { type: 'narration', text: 'そして、田中が相談しようとしていた「何か」。\nそれが全ての鍵だ。' },
        {
          type: 'phone',
          appName: 'メッセージ',
          messages: [
            { from: 'other', text: '明日会えないか。\n話したいことがある。', time: '23:45', senderName: '山本' },
          ],
        },
        { type: 'narration', text: '山本が動いた。\n明日、何かが変わる。' },
        { type: 'narration', text: '\n　　　　　── 第1章 終 ──' },
      ],
      choices: [
        {
          id: 'to_ch2',
          text: '第2章へ進む',
          next: 'ch2_scene1',
        },
      ],
    },

  },
};
