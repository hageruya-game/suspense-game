// ========== CHAPTER 4: 暗躍 ==========
const Chapter4 = {
  scenes: {

    // ===== 場面1：火曜朝 — 佐藤逮捕のニュース =====
    ch4_scene1: {
      chapterTitle: '第4章',
      chapterSub: '暗　　躍',
      location: '自宅',
      time: '火曜日 7:00',
      bg: 'bg-home-morning',
      content: [
        { type: 'narration', text: '火曜日の朝。\n目が覚めるとスマホが鳴り続けている。' },
        { type: 'sfx', name: 'phoneRing' },
        {
          type: 'notification',
          title: 'ニュース速報',
          text: '□□商事 佐藤部長を横領容疑で逮捕',
        },
        { type: 'narration', text: '佐藤が逮捕された。\n横領の証拠が警察に渡ったのだ。' },
        {
          type: 'phone',
          appName: '山本とのトーク',
          messages: [
            { from: 'other', text: 'ニュース見たか！佐藤が逮捕されたぞ！', time: '7:05', senderName: '山本' },
            { from: 'player', text: 'ああ、見た。やっとだ', time: '7:06' },
            { from: 'other', text: 'でも…田中を殺した犯人はまだ捕まってない', time: '7:08', senderName: '山本' },
            { from: 'player', text: '……そうだな', time: '7:10' },
          ],
        },
        { type: 'narration', text: '佐藤は横領の黒幕だった。\nだが佐藤自身が言った──\n「田中を殺したのは俺じゃない」。' },
        { type: 'narration', text: '黒田から電話が来た。' },
        { type: 'text', speaker: '黒田', text: '佐藤を逮捕した。\n横領については決定的な証拠が揃った。' },
        { type: 'text', speaker: '黒田', text: 'だが田中殺害の件は\nまだ佐藤を起訴できていない。\n佐藤は「自分はやっていない」の一点張りだ。' },
        { type: 'text', speaker: '黒田', text: '田中が殺された金曜の夜。\n佐藤は接待でホテルにいた。\n複数の証人がいる。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '佐藤にアリバイがある。\n指示を出した側──実行犯は別にいる。' },
      ],
      next: 'ch4_scene2',
    },

    // ===== 場面2：火曜昼 — 清水太郎の登場 =====
    ch4_scene2: {
      location: '□□商事 本社ビル前',
      time: '火曜日 12:00',
      bg: 'bg-office-dark',
      content: [
        { type: 'flag', key: 'met_shimizu', value: true },
        { type: 'narration', text: '昼休み。会社の前のベンチで弁当を食べていると\n知らない男が近づいてきた。' },
        { type: 'narration', text: '40代。がっしりした体格。\n高そうなスーツにサングラス。\nどことなく堅気ではない雰囲気。' },
        { type: 'text', speaker: '清水', text: 'ちょっといいか。\n□□商事の{name}さんだろ。' },
        { type: 'text', speaker: '{name}', text: '……どちら様ですか。' },
        { type: 'text', speaker: '清水', text: '清水太郎。\n鈴木の知り合いだ。\nまあ……金融関係の仕事をしている。' },
        { type: 'narration', text: '金融関係。\nその風貌からして、正規の金融ではないだろう。' },
        { type: 'text', speaker: '清水', text: '鈴木のことで話がある。\nあいつ、3000万の借金がある。\nうちから借りてる。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'text', speaker: '清水', text: '佐藤が捕まった今、\n鈴木は返済の当てがなくなった。\n困ってるのはこっちなんだよ。' },
        { type: 'text', speaker: '清水', text: '鈴木と連絡が取れない。\nお前、同僚だろ。\n居場所を知らないか。' },
        {
          type: 'evidence',
          id: 'shimizu_info',
          name: '清水太郎の情報',
          description: '闇金の取り立て屋。鈴木には3000万円の借金がある。佐藤の逮捕で鈴木の返済が滞っている。',
        },
      ],
      choices: [
        {
          id: 'refuse',
          text: '「知りません」と断る',
          params: { investigation: 1 },
          next: 'ch4_scene2_refuse',
        },
        {
          id: 'probe',
          text: '田中との関係を聞く',
          params: { investigation: 2 },
          flags: { shimizu_probed: true },
          next: 'ch4_scene2_probe',
        },
        {
          id: 'threaten',
          text: '「警察に通報しますよ」',
          params: { boldness: 2, suspicion: 1 },
          next: 'ch4_scene2_threaten',
        },
      ],
    },

    ch4_scene2_refuse: {
      location: '□□商事 本社ビル前',
      time: '火曜日 12:10',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: 'すみません、知りません。' },
        { type: 'text', speaker: '清水', text: '……そうか。\nまあいい。見つけたら伝えてくれ。\n「清水が探してる」とな。' },
        { type: 'narration', text: '清水は名刺を置いて去っていった。\n名刺には「清水商事 代表」とだけ書いてある。' },
        { type: 'narration', text: '鈴木に3000万の借金。\nギャンブルか。\nそれが佐藤に利用される理由になった？' },
      ],
      next: 'ch4_scene3',
    },

    ch4_scene2_probe: {
      location: '□□商事 本社ビル前',
      time: '火曜日 12:10',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '清水さん。田中洋介という名前に\n心当たりはありますか。' },
        { type: 'text', speaker: '清水', text: '田中？　ああ、殺されたってやつか。\n鈴木に連絡が取れなくて\nその番号に電話したことならある。' },
        { type: 'text', speaker: '清水', text: 'だがそれだけだ。\n田中とは何の関係もない。' },
        { type: 'narration', text: '田中の通話履歴に清水の番号があった\n理由がわかった。\n鈴木への取り立てのついでだ。' },
        { type: 'text', speaker: '清水', text: '一つ言っておくが、\n俺は殺しなんかしねえよ。\n金を回収するのが仕事だ。\n死んだら金は返ってこない。' },
        { type: 'narration', text: '合理的ではある。\n清水は容疑者というより\n鈴木の借金の裏付けをする存在だ。' },
      ],
      next: 'ch4_scene3',
    },

    ch4_scene2_threaten: {
      location: '□□商事 本社ビル前',
      time: '火曜日 12:10',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '警察に通報しますよ。' },
        { type: 'text', speaker: '清水', text: 'おいおい。\n俺は何も悪いことはしてない。\n金を貸して返してもらうだけだ。' },
        { type: 'text', speaker: '清水', text: 'まあいい。\n鈴木を見つけたら連絡くれ。\nこれ以上事を荒立てたくないんでね。' },
        { type: 'narration', text: '清水は去っていった。\n闇金の取り立て屋。\n鈴木の借金は3000万。\n\n佐藤が鈴木を操る理由が見えてきた。' },
      ],
      next: 'ch4_scene3',
    },

    // ===== 場面3：火曜午後 — 野口・中村のアリバイ確認 =====
    ch4_scene3: {
      location: '喫茶店',
      time: '火曜日 15:00',
      bg: 'bg-cafe',
      content: [
        { type: 'narration', text: '黒田に連絡を取った。\n野口と中村のアリバイを確認してほしいと。' },
        { type: 'narration', text: '1時間後、黒田から返信が来た。' },
        {
          type: 'phone',
          appName: '黒田とのトーク',
          messages: [
            { from: 'other', text: '野口健二のアリバイ確認した', time: '14:30', senderName: '黒田' },
            { from: 'other', text: '事件当夜、パチンコ店に長時間滞在。防犯カメラで確認済み。犯行時刻のアリバイ成立', time: '14:31', senderName: '黒田' },
            { from: 'other', text: '中村綾も確認。社員研修の参加記録あり。箱根のホテルのチェックイン記録で裏取れた', time: '14:32', senderName: '黒田' },
            { from: 'player', text: '二人ともシロということですか', time: '14:35' },
            { from: 'other', text: 'ああ。少なくとも実行犯ではない', time: '14:36', senderName: '黒田' },
          ],
        },
        { type: 'narration', text: '野口──パチンコ店のカメラでアリバイ確認。\n中村──社員研修に参加。ホテルの記録で確認。' },
        { type: 'narration', text: '二人とも事件当夜のアリバイが成立した。\n容疑者リストから外れる。' },
        {
          type: 'evidence',
          id: 'noguchi_alibi_confirmed',
          name: '野口のアリバイ確認',
          description: '事件当夜、パチンコ店に長時間滞在。防犯カメラで確認済み。野口は実行犯ではない。',
        },
        {
          type: 'evidence',
          id: 'nakamura_alibi_confirmed',
          name: '中村のアリバイ確認',
          description: '事件当夜、社員研修で箱根に滞在。ホテルのチェックイン記録で確認済み。中村は実行犯ではない。',
        },
        { type: 'narration', text: '野口、中村、佐藤──\n三人ともアリバイがある。\n\n実行犯は彼らではない。\n残る容疑者は……' },
      ],
      next: 'ch4_scene4',
    },

    // ===== 場面4：火曜夕方 — 鈴木の不審な行動 =====
    ch4_scene4: {
      location: '□□商事 オフィス',
      time: '火曜日 17:30',
      bg: 'bg-office-dark',
      content: [
        { type: 'narration', text: '退社時間。\n鈴木がやけに話しかけてくる。' },
        { type: 'text', speaker: '鈴木', text: 'なあ{name}。\n佐藤が逮捕されたけど……\nお前、警察に何か話したのか？' },
        { type: 'text', speaker: '鈴木', text: '黒田って刑事と会ってたろ。\n何を聞かれたんだ？' },
        { type: 'narration', text: '妙に詮索してくる。\nいつもの鈴木とは違う。\n焦っている？' },
      ],
      choices: [
        {
          id: 'deflect',
          text: '適当にはぐらかす',
          params: { investigation: 1 },
          flags: { ch4_suzuki_response: 'deflect' },
          next: 'ch4_scene4_deflect',
        },
        {
          id: 'test',
          text: '「鈴木のことも聞かれたよ」と探りを入れる',
          params: { boldness: 2 },
          flags: { ch4_suzuki_response: 'test' },
          next: 'ch4_scene4_test',
        },
        {
          id: 'honest',
          text: '正直に答える',
          params: { trust: 1 },
          flags: { ch4_suzuki_response: 'honest' },
          next: 'ch4_scene4_honest',
        },
      ],
    },

    ch4_scene4_deflect: {
      location: '□□商事 オフィス',
      time: '火曜日 17:35',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: 'いや、大したことは話してないよ。\n形式的な確認ばっかりで。' },
        { type: 'text', speaker: '鈴木', text: '……そうか。\nそれならいいんだけど。' },
        { type: 'narration', text: '鈴木は安心したようだが\n目の奥にまだ不安の色がある。' },
      ],
      next: 'ch4_scene4_phone',
    },

    ch4_scene4_test: {
      location: '□□商事 オフィス',
      time: '火曜日 17:35',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '……実は、鈴木のことも聞かれたよ。' },
        { type: 'effect', name: 'shake' },
        { type: 'text', speaker: '鈴木', text: '……俺のこと？\n何を聞かれたんだ。' },
        { type: 'narration', text: '声が上ずっている。\n明らかに動揺している。' },
        { type: 'text', speaker: '{name}', text: '田中との関係とか。\n最近の様子とか。' },
        { type: 'text', speaker: '鈴木', text: '……ふーん。\nまあ、同僚だからな。当然か。' },
        { type: 'narration', text: '平静を装っているが\n額にうっすら汗が浮いている。' },
      ],
      next: 'ch4_scene4_phone',
    },

    ch4_scene4_honest: {
      location: '□□商事 オフィス',
      time: '火曜日 17:35',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '佐藤の横領のこととか、\n田中が怯えてたこととか。\nそのあたりだよ。' },
        { type: 'text', speaker: '鈴木', text: '……そうか。\n横領のこと、やっぱり知ってたんだな。' },
        { type: 'text', speaker: '鈴木', text: '大変だったな。\nまあ、もう佐藤は捕まったし\n落ち着くだろ。' },
        { type: 'narration', text: '何かを確認するような口調だった。\n自分が何をどこまで知っているか\n探っているようにも見える。' },
      ],
      next: 'ch4_scene4_phone',
    },

    ch4_scene4_phone: {
      location: '□□商事 廊下',
      time: '火曜日 17:40',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'narration', text: '鈴木が席を立ち、廊下に出て行った。\n電話をかけるようだ。' },
        { type: 'narration', text: '気になる。\n鈴木の後を追うか──' },
      ],
      choices: [
        {
          id: 'follow',
          text: 'こっそり後をつける',
          params: { investigation: 2, suspicion: 1 },
          flags: { suzuki_call_overheard: true },
          next: 'ch4_scene4_follow',
        },
        {
          id: 'stay',
          text: 'やめておく',
          params: { trust: 1 },
          next: 'ch4_scene4_stay',
        },
      ],
    },

    ch4_scene4_follow: {
      location: '□□商事 非常階段',
      time: '火曜日 17:42',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'narration', text: '足音を殺して廊下を進む。\n鈴木は非常階段の踊り場にいた。' },
        { type: 'narration', text: '壁の陰に隠れ、耳を澄ます。' },
        { type: 'text', speaker: '鈴木', text: '……ああ、処理する。\nもう少し待ってくれ。' },
        { type: 'text', speaker: '鈴木', text: '佐藤がパクられた。\n証拠が……いや、まだ大丈夫だ。\n俺のところまでは来てない。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'text', speaker: '鈴木', text: '{name}が嗅ぎ回ってる。\nあいつが何を知ってるか……\nいや、まだ確認できてない。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '自分の名前が出た。\n鈴木は誰かに自分のことを報告している。' },
        {
          type: 'evidence',
          id: 'suzuki_suspicious_call',
          name: '鈴木の不審な電話',
          description: '鈴木が誰かに電話。「処理する」「嗅ぎ回ってる」「俺のところまでは来てない」と話していた。',
        },
        { type: 'narration', text: '「処理する」。\n佐藤と同じ言葉を使った。\n\n鈴木は何を「処理」しようとしている──' },
        { type: 'narration', text: '鈴木が振り返りそうになった。\n急いで壁の陰に隠れる。\n\n……見つからなかった。' },
      ],
      next: 'ch4_scene5',
    },

    ch4_scene4_stay: {
      location: '□□商事 オフィス',
      time: '火曜日 17:45',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'narration', text: 'やめておこう。\n今は下手に動くべきではない。' },
        { type: 'narration', text: '5分後、鈴木が戻ってきた。\n少し青ざめている。' },
        { type: 'text', speaker: '鈴木', text: '……ああ、すまん。\nちょっと用事があってな。\n先に帰るわ。' },
        { type: 'narration', text: '鈴木は足早に去っていった。\n何の電話だったのか気になるが\n確認する術はない。' },
      ],
      next: 'ch4_scene5',
    },

    // ===== 場面5：火曜深夜 — 第2の夜襲 =====
    ch4_scene5: {
      location: '自宅付近の路地',
      time: '火曜日 23:00',
      bg: 'bg-night-danger',
      content: [
        { type: 'narration', text: '帰り道。\n暗い路地を歩いていると──' },
        { type: 'sfx', name: 'footsteps' },
        { type: 'narration', text: 'また。\n背後に気配。\n今度は野口ではない。\n複数の足音だ。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '振り返ると、黒いジャケットの男が2人。\n佐藤の残党か──！' },
        { type: 'text', speaker: '男A', text: 'おとなしくしろ。\n余計なことを喋るな、と言われたろ。' },
      ],
      choices: [
        {
          id: 'fight',
          text: '抵抗する',
          params: { boldness: 3 },
          flags: { ch4_attack_response: 'fight' },
          next: 'ch4_scene5_fight',
        },
        {
          id: 'run',
          text: '全力で走って逃げる',
          params: { investigation: 1 },
          flags: { ch4_attack_response: 'run', ch4_attack_survived: true },
          next: 'ch4_scene5_run',
        },
        {
          id: 'call',
          text: '黒田に電話しながら叫ぶ',
          params: { trust: 2 },
          flags: { ch4_attack_response: 'call', ch4_attack_survived: true },
          next: 'ch4_scene5_call',
        },
      ],
      timeLimit: 6,
    },

    ch4_scene5_fight: {
      location: '自宅付近の路地',
      time: '火曜日 23:05',
      bg: 'bg-night-danger',
      showTransition: false,
      content: [
        { type: 'narration', text: '男の腕を振り払い、反撃した。\nだが相手は二人。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '殴られた。\n地面に叩きつけられる。' },
        { type: 'text', speaker: '男A', text: '次はないぞ。\nこれ以上首を突っ込むな。' },
        { type: 'narration', text: '男たちが去っていく。\n地面に何か落ちた。\n\n……ライター。\n「BAR K」と刻印されている。' },
        {
          type: 'evidence',
          id: 'bar_lighter',
          name: 'BAR Kのライター',
          description: '襲撃者が落としたライター。「BAR K」と刻印。賭博場のものか。',
        },
        { type: 'narration', text: '痛む体を起こす。\nBAR K。聞いたことがない名前だ。\nだがこのライターが手がかりになるかもしれない。' },
        { type: 'flag', key: 'ch4_attack_survived', value: true },
      ],
      next: 'ch4_scene6',
    },

    ch4_scene5_run: {
      location: '自宅付近の路地',
      time: '火曜日 23:05',
      bg: 'bg-night-danger',
      showTransition: false,
      content: [
        { type: 'narration', text: '全力で走った。\n暗い路地を駆け抜ける。' },
        { type: 'sfx', name: 'footsteps' },
        { type: 'narration', text: '角を曲がり、マンションのエントランスに\n飛び込んだ。\n\n追手は来ない。振り切った。' },
        { type: 'narration', text: '息を整える。\n走っている最中に\n地面で何かを蹴った。' },
        { type: 'narration', text: 'ポケットに入れていた。\nライターだ。\n「BAR K」と刻印されている。\n追手が落としたのだろう。' },
        {
          type: 'evidence',
          id: 'bar_lighter',
          name: 'BAR Kのライター',
          description: '襲撃者が落としたライター。「BAR K」と刻印。賭博場のものか。',
        },
        { type: 'narration', text: 'BAR K。\n聞いたことがない名前だが\n手がかりになるかもしれない。' },
      ],
      next: 'ch4_scene6',
    },

    ch4_scene5_call: {
      location: '自宅付近の路地',
      time: '火曜日 23:05',
      bg: 'bg-night-danger',
      showTransition: false,
      content: [
        { type: 'narration', text: 'ポケットのスマホを掴み、\n黒田の番号を呼び出しながら叫んだ。' },
        { type: 'text', speaker: '{name}', text: '警察！！今電話してる！！' },
        { type: 'narration', text: '男たちが一瞬ためらった。' },
        { type: 'text', speaker: '男A', text: 'ちっ……引くぞ。' },
        { type: 'narration', text: '男たちは走って逃げた。\n\n地面にライターが落ちている。\n追手が落としていったもの。\n「BAR K」と刻印。' },
        {
          type: 'evidence',
          id: 'bar_lighter',
          name: 'BAR Kのライター',
          description: '襲撃者が落としたライター。「BAR K」と刻印。賭博場のものか。',
        },
        { type: 'narration', text: '黒田に事情を説明した。\n黒田は巡回を強化すると言ってくれた。' },
        { type: 'narration', text: 'BAR K。\nこの名前がどこに繋がるのか──' },
      ],
      next: 'ch4_scene6',
    },

    // ===== 場面6：第4章エンディング — USBのmemoフォルダ =====
    ch4_scene6: {
      location: '自宅',
      time: '水曜日 1:00',
      effect: 'fadeIn',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: '深夜。眠れない体を引きずりながら\nパソコンを開く。' },
        { type: 'sfx', name: 'phoneRing' },
        {
          type: 'notification',
          title: '差出人不明',
          text: 'USBのmemoフォルダを見ろ',
        },
        { type: 'narration', text: 'また匿名メッセージ。\n田中の自動送信システム。\n\n「memoフォルダ」──\n田中のUSBにそんなフォルダがあったか？' },
        { type: 'narration', text: 'USBを差し込み、確認する。\n「経理データ」フォルダの他に\n「memo」という隠しフォルダがある。\n\n前に見た「diary」とは別だ。' },
        { type: 'narration', text: '中にはテキストファイルが一つ。\n暗号化されたメモ。\n文字がバラバラに並んでいる。' },
        { type: 'narration', text: '「のもりぎらうはきずす」\n\n……また田中の暗号か。' },
        { type: 'narration', text: '今日はもう限界だ。\nこのメモの解読は明日にしよう。' },
        { type: 'narration', text: '佐藤は逮捕された。だが実行犯はまだ自由。\n野口と中村のアリバイは確認された。\n清水という闇金の男が現れた。\n鈴木の借金は3000万円。' },
        { type: 'narration', text: 'そして今夜もまた襲われた。\n「BAR K」のライター。\n田中の暗号メモ。' },
        { type: 'narration', text: '点と点が繋がり始めている。\nだがまだ──全ては見えない。' },
        { type: 'narration', text: '\n　　　　　── 第4章 終 ──' },
      ],
      choices: [
        {
          id: 'to_ch5',
          text: '第5章へ進む',
          next: 'ch5_scene1',
        },
      ],
    },
  },
};
