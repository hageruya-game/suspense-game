// ========== CHAPTER 2: 捜査 ==========
const Chapter2 = {
  scenes: {

    // ===== 場面1：日曜朝 — 山本との密会（カフェ） =====
    ch2_scene1: {
      chapterTitle: '第2章',
      chapterSub: '捜　　査',
      location: 'カフェ「GRAIN」',
      time: '日曜日 9:00',
      bg: 'bg-cafe',
      content: [
        { type: 'narration', text: '日曜の朝。\n駅前のカフェに山本を呼び出した。' },
        { type: 'narration', text: '店内は休日の穏やかな空気に包まれている。\nだが自分の胸の中は嵐だ。' },
        { type: 'narration', text: '山本が来た。\n顔色が悪い。目の下にくまがある。\n昨夜は眠れなかったのだろう。' },
        { type: 'text', speaker: '山本', text: '……来てくれたか。' },
        { type: 'text', speaker: '{name}', text: 'ああ。話がある{nda}ろ。' },
        { type: 'narration', text: '山本はコーヒーカップを両手で握りしめながら\n周囲を何度も確認した。' },
        { type: 'text', speaker: '山本', text: '田中のこと…俺、知ってることがある。\nでも話したら…俺も危ないかもしれない。' },
        { type: 'text', speaker: '{name}', text: '……何を知ってるんだ。' },
        { type: 'narration', text: '山本が声を落とした。' },
        { type: 'text', speaker: '山本', text: '田中は…会社の経理で不正を見つけたんだ。\n架空の取引。数千万円規模の。' },
        { type: 'effect', name: 'shake' },
        { type: 'text', speaker: '山本', text: 'そしてその不正に…\n佐藤部長が関わっている。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'narration', text: '佐藤部長。\nあの妙に冷静だった男。\n「余計なことを言うな」と言った男。' },
        {
          type: 'evidence',
          id: 'yamamoto_testimony',
          name: '山本の証言',
          description: '「田中は経理の不正を発見した。佐藤部長が関わっている」という山本の証言。',
        },
        { type: 'text', speaker: '{name}', text: '……それを、どこまで確かめた。' },
        { type: 'text', speaker: '山本', text: '田中本人から聞いた。\n殺される1週間前に。\n「やばいものを見つけた」って。\nそれ以上は教えてくれなかったけど。' },
        {
          type: 'evidence',
          id: 'tanaka_trouble',
          name: '田中が「会社でやばいこと」を発見した証言',
          description: '山本経由。田中は殺される1週間前に「やばいものを見つけた」と語っていた。',
        },
        { type: 'narration', text: '田中は不正を見つけた。\nだから殺された。\n\nそして自分は、犯人に仕立て上げられようとしている。' },
      ],
      choices: [
        {
          id: 'cooperate',
          text: '「一緒に調べてくれ」',
          params: { boldness: 2 },
          flags: { ch2_scene1_choice: 'cooperate', yamamoto_ally: true },
          next: 'ch2_scene1_cooperate',
        },
        {
          id: 'info_only',
          text: '「情報だけでいい。巻き込みたくない」',
          params: { investigation: 2 },
          flags: { ch2_scene1_choice: 'info_only' },
          next: 'ch2_scene1_info_only',
        },
        {
          id: 'tell_kuroda',
          text: '「黒田刑事に全部話そう」',
          params: { trust: 2 },
          flags: { ch2_scene1_choice: 'tell_kuroda' },
          next: 'ch2_scene1_tell_kuroda',
        },
      ],
    },

    ch2_scene1_cooperate: {
      location: 'カフェ「GRAIN」',
      time: '日曜日 9:30',
      bg: 'bg-cafe',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '山本、頼む。\n一人じゃどうにもならない{nda}。\n一緒に調べてくれ。' },
        { type: 'narration', text: '山本は長い間黙っていた。\nコーヒーが冷めていく。' },
        { type: 'text', speaker: '山本', text: '……わかった。\n俺も、田中のこと放っておけない。' },
        { type: 'narration', text: '山本の目に覚悟が宿った。\n心強い味方を得た。' },
        { type: 'text', speaker: '山本', text: '田中のデスクに何か残ってるかもしれない。\n今日は日曜だ。オフィスには誰もいないはず。' },
        { type: 'text', speaker: '{name}', text: '……忍び込むのか。' },
        { type: 'text', speaker: '山本', text: 'ああ。俺が警備のシフトを確認する。\n午後なら行けるはずだ。' },
      ],
      next: 'ch2_scene2',
    },

    ch2_scene1_info_only: {
      location: 'カフェ「GRAIN」',
      time: '日曜日 9:30',
      bg: 'bg-cafe',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '情報だけでいい。\nお前を巻き込みたくない。' },
        { type: 'text', speaker: '山本', text: '……わかった。\nでも一つだけ。' },
        { type: 'text', speaker: '山本', text: '田中のデスク。\nあいつ、何かをUSBに保存してた。\n「保険だ」って言ってた。' },
        { type: 'narration', text: 'USBメモリ。\nそれが今も田中のデスクにあるなら──' },
        { type: 'text', speaker: '{name}', text: 'わかった。\n自分でなんとかする。' },
        { type: 'text', speaker: '山本', text: '……気をつけろよ。' },
      ],
      next: 'ch2_scene2',
    },

    ch2_scene1_tell_kuroda: {
      location: 'カフェ「GRAIN」',
      time: '日曜日 9:30',
      bg: 'bg-cafe',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '黒田刑事に全部話そう。\n警察に任せるべきだ。' },
        { type: 'text', speaker: '山本', text: '……大丈夫か？\n佐藤は会社じゃ力がある。\n警察にも知り合いがいるかもしれない。' },
        { type: 'text', speaker: '{name}', text: '黒田は信用できると思う。\nあの目は本物だ。' },
        { type: 'text', speaker: '山本', text: 'わかった。\nでも全部は話さないでくれ。\n俺の名前は出さないで。' },
        { type: 'narration', text: '山本の恐怖は本物だ。\n黒田に伝えるにしても、まずは証拠が必要だ。' },
        { type: 'text', speaker: '山本', text: 'それと…田中のデスクにUSBがあるかもしれない。\n「保険」だって言ってた。' },
      ],
      next: 'ch2_scene2',
    },

    // ===== 場面2：日曜昼 — 会社に忍び込む（ステルスアクション） =====
    ch2_scene2: {
      location: '□□商事 本社ビル',
      time: '日曜日 13:00',
      bg: 'bg-office-dark',
      content: [
        { type: 'narration', text: '日曜の午後。\n会社のビルは静まり返っている。' },
        { type: 'narration', text: '社員証で入館ゲートを通る。\n休日出勤は珍しくない。\nここまでは怪しまれない。' },
        { type: 'narration', text: 'だが田中のデスクがある経理部フロアは\n警備員が巡回している。' },
        { type: 'narration', text: '非常階段から3階へ。\nドアをそっと開ける。' },
        { type: 'sfx', name: 'doorCreak' },
        { type: 'narration', text: '薄暗いオフィス。\n非常灯の緑色の光だけが\n廊下を照らしている。' },
        { type: 'narration', text: '田中のデスクまでたどり着けるか──' },
      ],
      action: {
        id: 'ch2_stealth',
        type: 'stealth',
        onSuccess: {
          params: { investigation: 2 },
          evidence: [
            { id: 'usb_memory', name: 'USBメモリ「sato_keiri_2024」', description: '田中のデスクの引き出しに隠されていたUSBメモリ。ラベルに「sato_keiri_2024」と書かれている。' },
            { id: 'thursday_dinner', name: '田中と佐藤の木曜の食事', description: '田中のデスクの引き出しに入っていた領収書。殺害前日の木曜、高級レストランで佐藤と2人で食事。' },
          ],
          flags: { stealth_success: true },
          next: 'ch2_scene2_success',
        },
        onFailure: {
          params: { suspicion: 2 },
          flags: { stealth_success: false },
          next: 'ch2_scene2_fail',
        },
      },
    },

    ch2_scene2_success: {
      location: '□□商事 経理部フロア',
      time: '日曜日 13:15',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'narration', text: '警備員をやり過ごし、田中のデスクにたどり着いた。' },
        { type: 'narration', text: '引き出しを開ける。\nファイルの下に──あった。' },
        { type: 'narration', text: 'USBメモリ。\nラベルには手書きで\n「sato_keiri_2024」と書かれている。' },
        { type: 'sfx', name: 'evidence' },
        { type: 'narration', text: '佐藤の経理データ。\n田中が言っていた「保険」はこれだ。' },
        { type: 'narration', text: 'さらに引き出しの奥に\n小さな金庫が見える。\nダイヤル式のロックがかかっている。' },
        { type: 'narration', text: '金庫の表面にメモが貼ってある。\n「0714を思い出せ」\n\n……逆から読むのか？' },
        {
          type: 'puzzle',
          id: 'safe_code',
          question: '佐藤の金庫のロック解除',
          clues: [
            'メモ: 「0714を思い出せ」',
            '数字を逆順に並べ替えよ',
          ],
          answer: '4170',
          hints: [
            '0714を逆に読むと？',
            '4-1-7-0 → 4170',
          ],
          wrongMessage: 'ダイヤルが回らない…もう一度考えよう',
          evidence: [
            { id: 'intruder_watch', name: '侵入者の高級腕時計の目撃', description: '金庫の中にあった写真。高級腕時計をした人物が田中と会っている。' },
          ],
          params: { investigation: 2 },
          flags: { safe_opened: true },
        },
        { type: 'narration', text: '金庫が開いた。\n中には写真と領収書が入っている。' },
        { type: 'narration', text: '木曜日の日付。高級レストラン。\n「2名様」。\n殺される前日に、田中は佐藤と食事をしていた。' },
        { type: 'narration', text: '急いでポケットにねじ込み、来た道を戻る。\n誰にも見つからなかった。' },
      ],
      next: 'ch2_scene3',
    },

    ch2_scene2_fail: {
      location: '□□商事 本社ビル 1階',
      time: '日曜日 13:15',
      bg: 'bg-office-dark',
      showTransition: false,
      content: [
        { type: 'narration', text: '物音を立ててしまった。\n警備員がこちらに気づいた。' },
        { type: 'text', speaker: '警備員', text: 'おい、誰だ！\n……あんた、社員か？' },
        { type: 'text', speaker: '{name}', text: 'す、すみません。\n忘れ物を取りに来たんですが\n暗くてつまずいて…' },
        { type: 'text', speaker: '警備員', text: '休日は事前申請が必要ですよ。\n名前と所属を記録させてください。' },
        { type: 'narration', text: 'しぶしぶ記録される。\nこの記録が後から問題にならなければいいが。' },
        { type: 'narration', text: '田中のデスクには近づけなかった。\nだがここで諦めるわけにはいかない。' },
        {
          type: 'condition',
          condition: { flag: 'yamamoto_ally', value: true },
          then: 'ch2_scene2_fail_yamamoto',
          else: 'ch2_scene2_fail_solo',
        },
      ],
    },

    ch2_scene2_fail_yamamoto: {
      location: '—',
      time: '日曜日 14:00',
      bg: 'bg-cafe',
      showTransition: false,
      content: [
        { type: 'narration', text: '山本に連絡した。' },
        { type: 'text', speaker: '山本', text: '見つかったのか…\nわかった。俺が明日、別の方法で\n田中のデスクを調べてみる。' },
        { type: 'narration', text: '翌日、山本からメッセージが届いた。' },
        {
          type: 'phone',
          appName: '山本とのトーク',
          messages: [
            { from: 'other', text: 'USBあった。田中の引き出しの奥。', time: '月曜 8:30', senderName: '山本' },
            { from: 'other', text: 'ラベルに「sato_keiri_2024」って書いてある', time: '月曜 8:31', senderName: '山本' },
            { from: 'other', text: 'あと領収書も。木曜日のレストラン。佐藤と2名で。', time: '月曜 8:32', senderName: '山本' },
            { from: 'player', text: 'ありがとう。今夜会えるか', time: '月曜 8:35' },
          ],
        },
        {
          type: 'evidence',
          id: 'usb_memory',
          name: 'USBメモリ「sato_keiri_2024」',
          description: '田中のデスクの引き出しに隠されていたUSBメモリ。山本が回収。ラベルに「sato_keiri_2024」と書かれている。',
        },
        {
          type: 'evidence',
          id: 'thursday_dinner',
          name: '田中と佐藤の木曜の食事',
          description: '田中のデスクにあった領収書。殺害前日の木曜、高級レストランで佐藤と2人で食事。',
        },
      ],
      next: 'ch2_scene3',
    },

    ch2_scene2_fail_solo: {
      location: '自宅',
      time: '日曜日 14:00',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        { type: 'narration', text: '一旦引き下がる。\n別の方法を考えなければ。' },
        { type: 'narration', text: '夜になって、思い切って\n同僚の鈴木に連絡してみた。\n田中と一番仲が良かった男だ。' },
        {
          type: 'phone',
          appName: '鈴木とのトーク',
          messages: [
            { from: 'player', text: '突然すまない。田中のことで聞きたいことがある', time: '20:00' },
            { from: 'other', text: '…田中のこと？', time: '20:05', senderName: '鈴木' },
            { from: 'player', text: '田中のデスクにUSBがないか確認できないか', time: '20:06' },
            { from: 'other', text: 'わかった。明日見てみる', time: '20:10', senderName: '鈴木' },
          ],
        },
        { type: 'narration', text: '翌朝、鈴木からUSBメモリと領収書の写真が送られてきた。' },
        {
          type: 'evidence',
          id: 'usb_memory',
          name: 'USBメモリ「sato_keiri_2024」',
          description: '田中のデスクの引き出しに隠されていたUSBメモリ。鈴木が写真を撮影。ラベルに「sato_keiri_2024」と書かれている。',
        },
        {
          type: 'evidence',
          id: 'thursday_dinner',
          name: '田中と佐藤の木曜の食事',
          description: '田中のデスクにあった領収書。殺害前日の木曜、高級レストランで佐藤と2人で食事。',
        },
      ],
      next: 'ch2_scene3',
    },

    // ===== 場面3：日曜夕方 — 鈴木の証言 =====
    ch2_scene3: {
      location: '公園のベンチ',
      time: '日曜日 17:00',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: '同僚の鈴木と会うことにした。\n田中と一番仲が良かった男だ。' },
        { type: 'narration', text: '夕暮れの公園。\n人気のないベンチに二人で座る。' },
        { type: 'text', speaker: '鈴木', text: '……田中のこと、まだ信じられないよ。' },
        { type: 'text', speaker: '{name}', text: '鈴木。田中のことで聞きたいことがある。\n最近の田中の様子、何か気づいたことはないか。' },
        { type: 'narration', text: '鈴木は少し考えてから口を開いた。' },
        { type: 'text', speaker: '鈴木', text: '最後の1〜2週間は\n明らかに様子がおかしかった。\nいつもビクビクしてた。' },
        { type: 'text', speaker: '鈴木', text: 'それと…佐藤部長と\nやたら2人で話してたんだ。\n会議室で。ドア閉めて。' },
        { type: 'text', speaker: '鈴木', text: 'あと一度、田中が電話してるのを聞いた。\n「もうやめてくれ」って。\n相手は…わからない。' },
        {
          type: 'evidence',
          id: 'suzuki_witness',
          name: '鈴木の目撃証言',
          description: '田中は最後の2週間、怯えていた。佐藤部長と頻繁に2人で密会。「もうやめてくれ」と電話していた。',
        },
        { type: 'narration', text: '鈴木の証言は山本の話と一致する。\n田中は不正を見つけ、佐藤に追い詰められていた。' },
      ],
      choices: [
        {
          id: 'tell_all',
          text: '鈴木に全てを打ち明ける',
          params: { trust: 1, boldness: 1 },
          flags: { ch2_scene3_choice: 'tell_all', suzuki_ally: true },
          next: 'ch2_scene3_tell_all',
        },
        {
          id: 'hide_core',
          text: '核心は隠しておく',
          params: { investigation: 1 },
          flags: { ch2_scene3_choice: 'hide' },
          next: 'ch2_scene3_hide',
        },
      ],
    },

    ch2_scene3_tell_all: {
      location: '公園のベンチ',
      time: '日曜日 17:30',
      bg: 'bg-home-evening',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '鈴木…実は{I}、今こういう状況にいる。' },
        { type: 'narration', text: '偽造メッセージのこと。\n脅迫のこと。\n佐藤の不正のこと。\n全て打ち明けた。' },
        { type: 'text', speaker: '鈴木', text: '……マジかよ。\nお前、ハメられてるのか。' },
        { type: 'text', speaker: '鈴木', text: '佐藤部長が…\nいや、あの人ならやりかねない。\n社内での権力の使い方、異常だったからな。' },
        { type: 'text', speaker: '鈴木', text: '何かあったら俺に言えよ。\n田中の分まで、俺にできることはする。' },
        { type: 'narration', text: '鈴木が味方についた。\n田中のためにも、真相を暴く。' },
      ],
      next: 'ch2_scene4',
    },

    ch2_scene3_hide: {
      location: '公園のベンチ',
      time: '日曜日 17:30',
      bg: 'bg-home-evening',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: 'ありがとう。参考になった。\nもし他に何か思い出したら教えてくれ。' },
        { type: 'text', speaker: '鈴木', text: '……お前、何か隠してないか？' },
        { type: 'narration', text: '鈴木の目が鋭くなった。' },
        { type: 'text', speaker: '{name}', text: 'いや…ただ、田中のことが気になって。' },
        { type: 'text', speaker: '鈴木', text: '……そうか。\nまあ、何かあったら連絡くれ。' },
        { type: 'narration', text: '鈴木は少し距離を置いたようだった。\nこれ以上は踏み込んでこないだろう。' },
      ],
      next: 'ch2_scene4',
    },

    // ===== 場面4：日曜夜 — USBメモリの中身 =====
    ch2_scene4: {
      location: '自宅',
      time: '日曜日 22:00',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: '自宅に戻り、パソコンを開いた。' },
        { type: 'narration', text: 'USBメモリを差し込む。\nパスワードが要求された。' },
        { type: 'narration', text: '田中のデスクに貼ってあったメモを思い出す。\n「1, 1, 2, 3, 5, ?」\n\n何かの数列のようだ。' },
        {
          type: 'puzzle',
          id: 'usb_password',
          question: 'USBメモリのパスワード',
          clues: [
            '数列: 1, 1, 2, 3, 5, ?',
            '次の数字を入力せよ',
          ],
          answer: '8',
          hints: [
            'フィボナッチ数列：前の2つの数字を足すと次の数字になる',
            '3 + 5 = ?',
          ],
          wrongMessage: 'パスワードが違う…数列を解読しよう',
          params: { investigation: 1 },
        },
        { type: 'narration', text: 'ロックが解除された。\n中身は一つのフォルダ。「経理データ」。' },
        { type: 'narration', text: 'Excelファイルが数十個。\n開いてみると──' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '架空取引の帳簿だ。\n存在しない会社への発注書。\n水増しされた経費精算。' },
        { type: 'narration', text: '金額を足していく。\n3000万…5000万……\n合計で7000万円を超えている。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'narration', text: '全てのファイルに佐藤の承認印がある。\nこれは決定的な証拠だ。' },
        { type: 'narration', text: '田中はこれを見つけた。\nだから殺された。' },
        {
          type: 'evidence',
          id: 'sato_embezzlement',
          name: '佐藤の横領データ',
          description: 'USBメモリの中身。架空取引の帳簿データ。佐藤の承認印入り。総額7000万円超の横領の証拠。',
        },
        { type: 'narration', text: 'その時、スマホが鳴った。' },
        { type: 'sfx', name: 'phoneRing' },
        { type: 'narration', text: '画面に表示された名前は──「佐藤部長」。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '今、このタイミングで佐藤から？\n偶然か。それとも……' },
      ],
      choices: [
        {
          id: 'answer',
          text: '電話に出る',
          params: { boldness: 2 },
          flags: { ch2_scene4_choice: 'answer' },
          next: 'ch2_scene4_answer',
        },
        {
          id: 'ignore',
          text: '無視する',
          params: { investigation: 1 },
          flags: { ch2_scene4_choice: 'ignore' },
          next: 'ch2_scene4_ignore',
        },
        {
          id: 'record',
          text: '録音アプリを起動してから出る',
          params: { investigation: 3 },
          flags: { ch2_scene4_choice: 'record' },
          evidence: [{ id: 'sato_call_record', name: '佐藤との通話録音', description: '日曜夜の佐藤からの電話を録音。佐藤は「最近どうだ」と探りを入れてきた。声には余裕があった。' }],
          next: 'ch2_scene4_record',
        },
      ],
      timeLimit: 8,
    },

    ch2_scene4_answer: {
      location: '自宅',
      time: '日曜日 22:15',
      bg: 'bg-home-evening',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '……もしもし。' },
        { type: 'text', speaker: '佐藤', text: 'おう、{name}。夜遅くにすまんな。\n田中のことで色々大変だろう。\n体は大丈夫か？' },
        { type: 'narration', text: 'あの冷たい声が耳に刺さる。\n心配しているふりか。' },
        { type: 'text', speaker: '佐藤', text: '警察にはもう何度か話を聞かれたか？\nまあ、余計なことは言わなくていい。\n会社のことは会社で処理するから。' },
        { type: 'narration', text: '「余計なことは言うな」。\nまたこのセリフだ。\n\n佐藤は自分が何を知っているか\n探ろうとしている。' },
        { type: 'text', speaker: '{name}', text: '……はい、大丈夫です。' },
        { type: 'text', speaker: '佐藤', text: 'そうか。何かあったら言えよ。\nじゃあな。' },
        { type: 'narration', text: '通話が切れた。\n手が震えている。\n\nあの男は、どこまで知っているんだ。' },
      ],
      next: 'ch2_scene5',
    },

    ch2_scene4_ignore: {
      location: '自宅',
      time: '日曜日 22:15',
      bg: 'bg-home-evening',
      showTransition: false,
      content: [
        { type: 'narration', text: '電話に出なかった。\n今、佐藤と話すのは危険だ。\n声に動揺が出るかもしれない。' },
        { type: 'narration', text: '着信は30秒ほどで切れた。\n留守電も残されていない。' },
        { type: 'narration', text: '佐藤は何が目的だったのか。\n様子を探ろうとしていたのか。\n\n……警戒を強めなければ。' },
      ],
      next: 'ch2_scene5',
    },

    ch2_scene4_record: {
      location: '自宅',
      time: '日曜日 22:15',
      bg: 'bg-home-evening',
      showTransition: false,
      content: [
        { type: 'narration', text: '録音アプリを起動する。\n赤い録音ボタンを押してから、電話に出た。' },
        { type: 'text', speaker: '{name}', text: '……もしもし。' },
        { type: 'text', speaker: '佐藤', text: 'おう、{name}。夜遅くにすまんな。\n最近どうだ？色々大変だろう。' },
        { type: 'text', speaker: '佐藤', text: '田中のことは警察に任せておけ。\n余計なことに首を突っ込むなよ。\n会社のことは会社で処理する。' },
        { type: 'narration', text: '「余計なことに首を突っ込むな」。\n\nこれは忠告か。それとも脅しか。\n録音は続いている。' },
        { type: 'text', speaker: '{name}', text: 'はい…わかりました。' },
        { type: 'text', speaker: '佐藤', text: 'うん。まあ、しっかりやれよ。\nじゃあな。' },
        { type: 'narration', text: '通話が切れた。\n録音を確認する。\n\n佐藤の声は落ち着いていた。\n自信に満ちた声。\nそれが逆に不気味だ。' },
      ],
      next: 'ch2_scene5',
    },

    // ===== 場面5：月曜朝 — 黒田の再訪 =====
    ch2_scene5: {
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
          then: 'ch2_gameover_arrested',
          else: 'ch2_scene5_branch',
        },
      ],
    },

    ch2_scene5_branch: {
      location: '自宅',
      time: '月曜日 8:00',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        {
          type: 'condition',
          condition: { param: 'trust', gte: 4 },
          then: 'ch2_scene5_trust_high',
          else: 'ch2_scene5_trust_low',
        },
      ],
    },

    // === GAME OVER: 逮捕される ===
    ch2_gameover_arrested: {
      location: '自宅',
      time: '月曜日 8:05',
      bg: 'bg-interrogation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '黒田', text: '{name}さん。\n田中洋介さん殺害の容疑で\n話を聞かせてもらいたい。' },
        { type: 'narration', text: '黒田の後ろに、制服警官が2人。' },
        { type: 'text', speaker: '黒田', text: '署まで同行してもらう。\n任意だが…拒否はしない方がいい。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '疑惑を重ねすぎた。\n不審な行動が多すぎた。\n黒田はもう自分を信じていない。' },
        { type: 'narration', text: '取調室。\n証拠を並べられる。\n偽造メッセージ。防犯カメラ。\n不自然な行動の数々。' },
        { type: 'narration', text: '真犯人・佐藤は今も自由に\n笑っているだろう。\n\n自分は彼の完璧な替え玉にされた。' },
        { type: 'narration', text: '\n\n── BAD END ──\n「容疑者のまま」\n\n疑惑を払拭できなかった{name}は\n佐藤の思惑通り犯人に仕立て上げられた。' },
      ],
      choices: [
        {
          id: 'gameover_retry',
          text: 'ロードしてやり直す',
          next: null,
        },
      ],
    },

    ch2_scene5_trust_high: {
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
        {
          type: 'evidence',
          id: 'kuroda_info',
          name: '黒田からの捜査情報',
          description: '偽造メッセージは田中のスマホに直接インストールされた。犯人は田中と近しい人物。',
        },
        { type: 'narration', text: '黒田が味方になりつつある。\nここで佐藤のことを話すか──' },
      ],
      choices: [
        {
          id: 'show_evidence',
          text: 'USBのデータを見せる',
          params: { trust: 3 },
          flags: { ch2_scene5_choice: 'show_evidence', kuroda_has_evidence: true },
          next: 'ch2_scene5_show_evidence',
        },
        {
          id: 'solo',
          text: 'まだ自分で調べる',
          params: { boldness: 2, investigation: 1 },
          flags: { ch2_scene5_choice: 'solo' },
          next: 'ch2_scene5_solo',
        },
        {
          id: 'hint',
          text: '佐藤の名前だけ出す',
          params: { trust: 1, investigation: 1 },
          flags: { ch2_scene5_choice: 'hint' },
          next: 'ch2_scene5_hint',
        },
      ],
    },

    ch2_scene5_trust_low: {
      location: '自宅',
      time: '月曜日 8:05',
      bg: 'bg-home-morning',
      showTransition: false,
      content: [
        { type: 'text', speaker: '黒田', text: 'いくつか追加で確認したいことがある。\n署まで来てもらえるか。' },
        { type: 'narration', text: '黒田の目はまだ鋭い。\n自分を疑っている目だ。\nだが、完全に敵というわけでもない。' },
        { type: 'text', speaker: '黒田', text: '事件に進展があった。\nあの偽造メッセージだが\n田中のスマホに直接仕込まれた形跡が\nあることがわかった。' },
        { type: 'text', speaker: '黒田', text: '犯人は田中の知り合いだ。\nお前も含めてな。' },
        {
          type: 'evidence',
          id: 'kuroda_info',
          name: '黒田からの捜査情報',
          description: '偽造メッセージは田中のスマホに直接インストールされた。犯人は田中と近しい人物。',
        },
        { type: 'narration', text: '黒田はまだ自分を容疑者の一人として見ている。\nだが、情報をくれた。\nここで佐藤のことを話すか──' },
      ],
      choices: [
        {
          id: 'show_evidence',
          text: 'USBのデータを見せる',
          params: { trust: 3 },
          flags: { ch2_scene5_choice: 'show_evidence', kuroda_has_evidence: true },
          next: 'ch2_scene5_show_evidence',
        },
        {
          id: 'solo',
          text: 'まだ自分で調べる',
          params: { boldness: 2, investigation: 1 },
          flags: { ch2_scene5_choice: 'solo' },
          next: 'ch2_scene5_solo',
        },
        {
          id: 'hint',
          text: '佐藤の名前だけ出す',
          params: { trust: 1, investigation: 1 },
          flags: { ch2_scene5_choice: 'hint' },
          next: 'ch2_scene5_hint',
        },
      ],
    },

    ch2_scene5_show_evidence: {
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
      next: 'ch2_scene6',
    },

    ch2_scene5_solo: {
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
      next: 'ch2_scene6',
    },

    ch2_scene5_hint: {
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
      next: 'ch2_scene6',
    },

    // ===== 場面6：月曜夜 — 佐藤との対峙（QTEアクション） =====
    ch2_scene6: {
      location: '—',
      time: '月曜日 20:00',
      bg: 'bg-night-danger',
      content: [
        {
          type: 'condition',
          condition: { param: 'boldness', gte: 5 },
          then: 'ch2_scene6_bold',
          else: 'ch2_scene6_called',
        },
      ],
    },

    ch2_scene6_bold: {
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
      next: 'ch2_scene6_confrontation',
    },

    ch2_scene6_called: {
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
      next: 'ch2_scene6_confrontation',
    },

    ch2_scene6_confrontation: {
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
      action: {
        id: 'ch2_qte',
        type: 'qte',
        actions: [
          { text: '右から腕を掴まれる！', subtext: '← 左に振りほどけ！', direction: 'left', timeLimit: 2 },
          { text: '正面から殴りかかってくる！', subtext: '→ 右に避けろ！', direction: 'right', timeLimit: 1.8 },
          { text: '足を払われる！', subtext: '↑ ジャンプして避けろ！', direction: 'up', timeLimit: 1.5 },
          { text: '出口が見えた！', subtext: '● タップして走れ！', direction: 'tap', timeLimit: 2 },
        ],
        onSuccess: {
          params: { boldness: 2 },
          evidence: [{ id: 'sato_confession', name: '佐藤の自白録音', description: '対峙の際にスマホで密かに録音していた佐藤の発言。「田中が余計なことをした」「処理しただけだ」。' }],
          flags: { qte_success: true },
          next: 'ch2_scene6_qte_success',
        },
        onFailure: {
          params: { suspicion: 1 },
          flags: { qte_success: false },
          next: 'ch2_scene6_qte_fail',
        },
      },
    },

    ch2_scene6_qte_success: {
      location: '□□商事 本社ビル前',
      time: '月曜日 20:20',
      bg: 'bg-night-street',
      content: [
        { type: 'sfx', name: 'footsteps' },
        { type: 'narration', text: '振りほどいて走った。\n非常口から外に飛び出す。' },
        { type: 'narration', text: '夜の空気を思い切り吸い込む。\n追手は来ない。\nビルの中から佐藤の怒声だけが聞こえる。' },
        { type: 'narration', text: 'ポケットの中のスマホを確認する。\n……録音アプリは動いていた。' },
        { type: 'narration', text: '佐藤の自白。\n「田中が余計なことをした」\n「処理しただけだ」\n\n全て録音されている。' },
      ],
      next: 'ch2_scene7',
    },

    ch2_scene6_qte_fail: {
      location: '—',
      time: '月曜日 20:20',
      bg: 'bg-night-danger',
      content: [
        { type: 'narration', text: '掴まれた。\n男たちに押さえつけられる。' },
        { type: 'text', speaker: '佐藤', text: 'おとなしくしろ。\n痛い思いはさせたくない。' },
        { type: 'narration', text: 'その時──' },
        {
          type: 'condition',
          condition: { flag: 'suzuki_ally', value: true },
          then: 'ch2_scene6_rescue_suzuki',
          else: 'ch2_scene6_check_kuroda',
        },
      ],
    },

    // Check if Kuroda can rescue, or if it's game over
    ch2_scene6_check_kuroda: {
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
          then: 'ch2_scene6_rescue_kuroda',
          else: 'ch2_gameover_captured',
        },
      ],
    },

    // === GAME OVER: 佐藤に捕まる ===
    ch2_gameover_captured: {
      location: '—',
      time: '月曜日 20:30',
      bg: 'bg-night-danger',
      showTransition: false,
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

    ch2_scene6_rescue_suzuki: {
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
      next: 'ch2_scene7',
    },

    ch2_scene6_rescue_kuroda: {
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
      next: 'ch2_scene7',
    },

    // ===== 場面7：第2章エンディング — 真実の輪郭 =====
    ch2_scene7: {
      location: '自宅',
      time: '月曜日 深夜',
      effect: 'fadeIn',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: '深夜。自宅に戻った。' },
        { type: 'narration', text: '整理しよう。わかったことを。' },
        { type: 'narration', text: '佐藤は7000万円を横領していた。' },
        { type: 'narration', text: '田中がそれを発見した。' },
        { type: 'narration', text: '佐藤は田中を「処理」した。\n口封じのために。' },
        { type: 'narration', text: 'そして自分に罪を着せようとしている。' },
        { type: 'narration', text: '構図は見えてきた。\n佐藤が黒幕だ。' },
        { type: 'narration', text: 'だが──' },
        { type: 'text', speaker: '黒田', text: '佐藤には動機がある。\nだが直接手を下したとは限らない。' },
        { type: 'narration', text: '黒田の言葉が頭に残っている。' },
        { type: 'text', speaker: '黒田', text: '佐藤は指示した側だ。\n実行犯が別にいる。\nそしてそいつは\nまだお前の近くにいるかもしれない。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'narration', text: '実行犯。\n佐藤の命令で田中を殺した人間。\n\nそいつが、まだ自分の近くにいる──？' },
        { type: 'effect', name: 'shake' },
        {
          type: 'notification',
          title: '差出人不明',
          text: 'まだ終わっていない',
        },
        { type: 'narration', text: '……また、あの差出人不明のメッセージ。\nだが今回は奇妙な文字列が添えられている。' },
        {
          type: 'notification',
          title: '差出人不明',
          text: '62 43 76',
        },
        { type: 'narration', text: '「62 43 76」\n\n数字の暗号？\n電話のキーパッドに当てはめると\n読めるかもしれない。' },
        {
          type: 'puzzle',
          id: 'cipher_message',
          question: '暗号メッセージの解読',
          clues: [
            '暗号: 62 43 76',
            '電話キーパッド（2=abc 3=def 4=ghi 5=jkl 6=mno 7=pqrs 8=tuv 9=wxyz）',
            '日本語に変換せよ',
          ],
          answer: ['にげろ', 'ニゲロ'],
          hints: [
            '6=「な行」の2番目、4=「か行」の3番目、7=「ま行」の6番目…ではなく、電話キーパッドの配列をかな入力で考えてみよう',
            '6のキーの2回押し=に、4のキーの3回押し=げ、7のキーの6回押し=ろ',
          ],
          wrongMessage: '解読できない…もう一度考えてみよう',
          flags: { cipher_decoded: true },
        },
        { type: 'narration', text: '「にげろ」\n\n……逃げろ？\nこのメッセージの差出人は\n自分を助けようとしている？' },
        { type: 'narration', text: '佐藤か？\nそれとも、実行犯か？\nあるいは…まだ見えない第三者？\n\nその言葉が、暗い部屋に響く。' },
        { type: 'narration', text: '\n　　　　　── 第2章 終 ──' },
      ],
      choices: [
        {
          id: 'to_ch3',
          text: '第3章へ進む',
          next: 'ch3_scene1',
        },
      ],
    },
  },
};
