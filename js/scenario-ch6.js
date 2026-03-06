// ========== CHAPTER 6: 対峙 ==========
const Chapter6 = {
  scenes: {

    // ===== 場面1：木曜夜 — 準備 =====
    ch6_scene1: {
      chapterTitle: '第6章',
      chapterSub: '対　　峙',
      location: '自宅',
      time: '木曜日 19:00',
      bg: 'bg-home-evening',
      content: [
        { type: 'narration', text: '木曜日の夜。\n\n録音アプリの動作を確認する。\nスマホをジャケットの内ポケットに入れた。' },
        { type: 'narration', text: '黒田からメッセージ。' },
        {
          type: 'phone',
          appName: '黒田とのトーク',
          messages: [
            { from: 'other', text: '公園の南側に車を停める。こちらの準備はできている', time: '18:50', senderName: '黒田' },
            { from: 'other', text: '無理はするなよ。危険を感じたらすぐに合図しろ。大声を出せばこちらが動く', time: '18:51', senderName: '黒田' },
            { from: 'player', text: 'わかりました', time: '19:00' },
          ],
        },
        { type: 'narration', text: '鈴木にメッセージを送った。' },
        {
          type: 'phone',
          appName: '鈴木とのトーク',
          messages: [
            { from: 'player', text: '鈴木。田中のことで大事な話がある。今夜会えないか', time: '19:05' },
            { from: 'other', text: '……わかった。どこで？', time: '19:10', senderName: '鈴木' },
            { from: 'player', text: '駅前の公園。20時に', time: '19:11' },
            { from: 'other', text: 'わかった', time: '19:15', senderName: '鈴木' },
          ],
        },
        { type: 'narration', text: '舞台は整った。\n録音アプリを起動する。' },
        { type: 'narration', text: '家を出る前に、もう一度\n集めた証拠を確認する。\n\nどの証拠をどの順番で突きつけるか。\nそれが勝負を分ける。' },
      ],
      next: 'ch6_scene2',
    },

    // ===== 場面2：木曜夜 — 公園での対面 =====
    ch6_scene2: {
      location: '公園',
      time: '木曜日 20:00',
      bg: 'bg-night-danger',
      content: [
        { type: 'narration', text: '夜の公園。\n街灯に照らされたベンチ。' },
        { type: 'narration', text: 'ポケットの中のスマホで\n録音アプリが動いている。\n\n黒田は近くの車の中で待機している。' },
        { type: 'sfx', name: 'footsteps' },
        { type: 'narration', text: '鈴木が来た。\nいつもの穏やかな表情。\n\nだがその裏に何が隠れているのか\n今の自分は知っている。' },
        { type: 'text', speaker: '鈴木', text: 'よう、{name}。\n話って何だ？' },
        {
          type: 'condition',
          condition: { flag: 'ch5_approach', value: 'direct' },
          then: 'ch6_scene2_direct',
          else: 'ch6_scene2_branch',
        },
      ],
    },

    ch6_scene2_branch: {
      location: '公園',
      time: '木曜日 20:05',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        {
          type: 'condition',
          condition: { flag: 'ch5_approach', value: 'trap' },
          then: 'ch6_scene2_trap',
          else: 'ch6_scene2_emotion',
        },
      ],
    },

    ch6_scene2_direct: {
      location: '公園',
      time: '木曜日 20:05',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '鈴木。\n単刀直入に聞く。' },
        { type: 'text', speaker: '{name}', text: '田中を殺したのはお前か。' },
        { type: 'narration', text: '鈴木の表情が凍りついた。\n一瞬だが、確かに動揺が走った。' },
        { type: 'text', speaker: '鈴木', text: '……何を言ってるんだ。\n俺と田中は親友だぞ。' },
      ],
      next: 'ch6_scene3',
    },

    ch6_scene2_trap: {
      location: '公園',
      time: '木曜日 20:05',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '佐藤が逮捕されて安心してるだろ。' },
        { type: 'text', speaker: '鈴木', text: 'ああ、まあな。\nこれで田中の件も解決に向かうだろ。' },
        { type: 'text', speaker: '{name}', text: '実はな。\n佐藤が取り調べで「ある名前」を出したらしい。' },
        { type: 'narration', text: '嘘だ。だが鈴木の反応を見る。' },
        { type: 'text', speaker: '鈴木', text: '……名前？\n誰の。' },
        { type: 'narration', text: '声が微かに震えている。' },
        { type: 'text', speaker: '{name}', text: 'お前の名前だよ、鈴木。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '鈴木の顔から血の気が引いた。' },
        { type: 'text', speaker: '鈴木', text: '嘘だ…あいつがそんなことを……' },
        { type: 'narration', text: '動揺している。\n「あいつがそんなことを」──\n佐藤との関係を否定しなかった。' },
      ],
      next: 'ch6_scene3',
    },

    ch6_scene2_emotion: {
      location: '公園',
      time: '木曜日 20:05',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '鈴木。\n田中のこと、覚えてるか。' },
        { type: 'text', speaker: '鈴木', text: '……何を当たり前のことを。\n毎日思い出してるよ。' },
        { type: 'text', speaker: '{name}', text: '田中は最後まで\nお前のことを親友だと思ってた。\n中村さんにそう言ってた。' },
        { type: 'narration', text: '鈴木の目に痛みが走った。' },
        { type: 'text', speaker: '{name}', text: 'でも同時に──\n「一番信頼していた友人を\nもう信じられない」とも言ってた。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '鈴木が息を呑んだ。' },
      ],
      next: 'ch6_scene3',
    },

    // ===== 場面3：証拠提示ラウンド =====
    ch6_scene3: {
      location: '公園',
      time: '木曜日 20:10',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'narration', text: '鈴木の仮面にヒビが入り始めた。\nここからが勝負だ。\n\n証拠を突きつけて追い詰める。' },
      ],
      choices: [
        {
          id: 'evidence_calls',
          text: '「佐藤との通話記録──14回。説明できるか？」',
          condition: { evidence: 'suzuki_sato_calls' },
          params: { investigation: 2 },
          flags: { ch6_evidence_1: 'calls' },
          next: 'ch6_scene3_calls',
        },
        {
          id: 'evidence_memo',
          text: '「田中がメモを残していた。"鈴木は裏切り者"」',
          condition: { evidence: 'tanaka_coded_memo' },
          params: { boldness: 2 },
          flags: { ch6_evidence_1: 'memo' },
          next: 'ch6_scene3_memo',
        },
        {
          id: 'evidence_debt',
          text: '「3000万の借金。清水から聞いた」',
          condition: { evidence: 'shimizu_info' },
          params: { investigation: 1 },
          flags: { ch6_evidence_1: 'debt' },
          next: 'ch6_scene3_debt',
        },
      ],
      timeLimit: 15,
    },

    ch6_scene3_calls: {
      location: '公園',
      time: '木曜日 20:12',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '佐藤との通話記録がある。\n田中が殺される前後3日間で14回。\n殺害当日は5回。うち2回は深夜。' },
        { type: 'text', speaker: '鈴木', text: '……それは。仕事の話だ。' },
        { type: 'text', speaker: '{name}', text: '深夜2時に仕事の電話か？\n田中が死んだ夜に？' },
        { type: 'narration', text: '鈴木の顔が歪んだ。\n言い逃れが苦しくなっている。' },
      ],
      next: 'ch6_scene4',
    },

    ch6_scene3_memo: {
      location: '公園',
      time: '木曜日 20:12',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '田中がメモを残していた。\n暗号で書かれていたが、解読した。' },
        { type: 'text', speaker: '{name}', text: '「すずきはうらぎりもの」。\n田中はお前の裏切りに気づいていた。' },
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '鈴木の顔から完全に血の気が引いた。' },
        { type: 'text', speaker: '鈴木', text: '……田中が、そんなものを……' },
      ],
      next: 'ch6_scene4',
    },

    ch6_scene3_debt: {
      location: '公園',
      time: '木曜日 20:12',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: 'お前、3000万の借金があるだろ。\n清水太郎から聞いた。' },
        { type: 'text', speaker: '鈴木', text: '……清水と会ったのか。' },
        { type: 'text', speaker: '{name}', text: '佐藤がお前の借金を肩代わりした。\nその代わりに「仕事」をさせた。\n違うか？' },
        { type: 'narration', text: '鈴木の手が震えている。' },
      ],
      next: 'ch6_scene4',
    },

    // ===== 場面4：証拠提示ラウンド2 =====
    ch6_scene4: {
      location: '公園',
      time: '木曜日 20:15',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'narration', text: '鈴木の動揺は隠せない。\nもう一押しだ。' },
      ],
      choices: [
        {
          id: 'evidence_bar',
          text: '「BAR Kで聞いた。"上の人間が借金を肩代わり"」',
          condition: { evidence: 'bar_k_testimony' },
          params: { investigation: 2 },
          flags: { ch6_evidence_2: 'bar' },
          next: 'ch6_scene4_bar',
        },
        {
          id: 'evidence_perfume',
          text: '「あの夜の追手の香水──お前と同じ匂いだ」',
          condition: { evidence: 'chase_perfume' },
          params: { investigation: 2 },
          flags: { ch6_evidence_2: 'perfume' },
          next: 'ch6_scene4_perfume',
        },
        {
          id: 'evidence_phone_overheard',
          text: '「"処理する"──お前が電話で言ったのを聞いた」',
          condition: { flag: 'suzuki_call_overheard', value: true },
          params: { boldness: 3 },
          flags: { ch6_evidence_2: 'phone' },
          next: 'ch6_scene4_phone',
        },
        {
          id: 'evidence_witness',
          text: '「事件の夜、田中の部屋に入る男が目撃されている」',
          condition: { evidence: 'noguchi_witness' },
          params: { investigation: 1 },
          flags: { ch6_evidence_2: 'witness' },
          next: 'ch6_scene4_witness',
        },
      ],
      timeLimit: 15,
    },

    ch6_scene4_bar: {
      location: '公園',
      time: '木曜日 20:17',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: 'BAR Kのバーテンダーに聞いた。\n「鈴木の借金を上の人間が肩代わりした。\n代わりにやることがあると言われた」と。' },
        { type: 'text', speaker: '鈴木', text: '……そこまで調べたのか。' },
        { type: 'narration', text: '鈴木の声が震えている。\n否定する力が失われつつある。' },
      ],
      next: 'ch6_scene5',
    },

    ch6_scene4_perfume: {
      location: '公園',
      time: '木曜日 20:17',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: 'あの夜、追手が来た時。\n甘い香水の匂いがした。\n\nお前がいつもつけてるコロンと\n同じ匂いだ。' },
        { type: 'effect', name: 'shake' },
        { type: 'text', speaker: '鈴木', text: '……偶然だ。\nあの香水は人気ブランドで……' },
        { type: 'text', speaker: '{name}', text: '偶然が多すぎるんだよ、鈴木。' },
      ],
      next: 'ch6_scene5',
    },

    ch6_scene4_phone: {
      location: '公園',
      time: '木曜日 20:17',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '火曜日の夕方。\n非常階段で電話してたろ。' },
        { type: 'text', speaker: '{name}', text: '「処理する」「{name}が嗅ぎ回ってる」\n「俺のところまでは来てない」\n\n全部聞いてた。' },
        { type: 'effect', name: 'shake' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'text', speaker: '鈴木', text: '……！\nあの時、お前が……' },
        { type: 'narration', text: '鈴木の目に恐怖が走った。' },
      ],
      next: 'ch6_scene5',
    },

    ch6_scene4_witness: {
      location: '公園',
      time: '木曜日 20:17',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'text', speaker: '{name}', text: '事件の夜、目撃者がいる。\n田中のマンションに入っていく\nスーツ姿の男。170後半。\n甘い香水。合鍵を使って入室。' },
        { type: 'text', speaker: '{name}', text: '全部お前の特徴と一致する。' },
        { type: 'narration', text: '鈴木の顔が蒼白になった。' },
        { type: 'text', speaker: '鈴木', text: '目撃者……誰だ。\n誰がそんなことを……' },
      ],
      next: 'ch6_scene5',
    },

    // ===== 場面5：鈴木の告白 =====
    ch6_scene5: {
      location: '公園',
      time: '木曜日 20:20',
      bg: 'bg-confrontation',
      showTransition: false,
      content: [
        { type: 'narration', text: '鈴木の仮面が完全に剥がれた。' },
        { type: 'text', speaker: '鈴木', text: '……お前に何がわかる。' },
        { type: 'narration', text: '鈴木の声が変わった。\nもう穏やかな友人の声ではない。' },
        { type: 'text', speaker: '鈴木', text: '俺には借金があったんだ。\n3000万。ギャンブルで作った。\n家族にも言えない額だ。' },
        { type: 'text', speaker: '鈴木', text: '佐藤がそれを知って近づいてきた。\n「助けてやる」って。\n横領の分け前で返済させてやるって。' },
        { type: 'text', speaker: '鈴木', text: '条件は一つ。\n佐藤の「仕事」を手伝うこと。\n最初は小さなことだった。書類の偽造とか。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'text', speaker: '鈴木', text: 'でも田中が不正に気づいた。\n佐藤は焦った。\nそして……俺に言った。' },
        { type: 'text', speaker: '鈴木', text: '「田中を黙らせろ」って。' },
        { type: 'narration', text: '鈴木の目に涙が光っている。\nだが同情はできない。' },
        { type: 'text', speaker: '鈴木', text: '俺は……田中は親友だった。\n本当に。でも……\n追い詰められて……' },
        { type: 'text', speaker: '{name}', text: '……それで田中を。' },
        { type: 'text', speaker: '鈴木', text: '金曜の夜。田中を呼び出した。\nお前との約束より先に、俺が田中の部屋で会った。\nそして……' },
        { type: 'narration', text: '鈴木が両手で顔を覆った。' },
        { type: 'text', speaker: '鈴木', text: '偽造メッセージもスマホの細工も\n全部俺がやった。\n佐藤に命令されて。\nお前を犯人に仕立てるために。' },
        { type: 'narration', text: '鈴木の全てが嘘だった。\n親友のふり。味方のふり。\nその裏で、田中を殺し\n自分に罪を着せようとしていた。' },
        { type: 'narration', text: '鈴木の目が揺れている。\n追い詰められた獣の目だ。\n\nここで決定的な一手を打つ。' },
      ],
      choices: [
        {
          id: 'final_evidence',
          text: '「全ての録音がある。今更もう遅い」',
          params: { boldness: 3 },
          flags: { ch6_final_choice: 'evidence', ch6_evidence_perfect: true },
          next: 'ch6_scene5_arrest',
        },
        {
          id: 'final_empathy',
          text: '「田中もお前を許したかったと思う。でも──」',
          params: { trust: 2 },
          flags: { ch6_final_choice: 'empathy' },
          next: 'ch6_scene5_arrest',
        },
        {
          id: 'final_threaten',
          text: '「自首しろ。でなければ全てを公開する」',
          params: { boldness: 1 },
          flags: { ch6_final_choice: 'threaten' },
          next: 'ch6_scene5_escape',
        },
      ],
      timeLimit: 15,
    },

    ch6_scene5_arrest: {
      location: '公園',
      time: '木曜日 20:25',
      bg: 'bg-night-danger',
      showTransition: false,
      content: [
        { type: 'effect', name: 'shake' },
        { type: 'narration', text: '鈴木の顔が歪んだ。\nもう言い逃れはできない。' },
        { type: 'text', speaker: '鈴木', text: '……もう、いいんだ。\n全部…全部、俺がやった。' },
        { type: 'narration', text: '鈴木が膝から崩れ落ちた。' },
        { type: 'sfx', name: 'footsteps' },
        { type: 'text', speaker: '黒田', text: '鈴木健太！動くな！\n捜査一課だ！' },
        { type: 'narration', text: '黒田が車から飛び出してきた。\n別の刑事も一緒だ。' },
        { type: 'narration', text: '鈴木は抵抗しなかった。\n泣き崩れたまま、手錠をかけられた。' },
        { type: 'narration', text: '全ての録音は成功していた。\n鈴木の自白。動機。経緯。\n全て記録されている。' },
        {
          type: 'evidence',
          id: 'suzuki_confession',
          name: '鈴木の自白録音',
          description: '公園での対峙で録音した鈴木の全面自白。借金、佐藤との共謀、田中殺害の詳細が記録されている。',
        },
        { type: 'flag', key: 'ch6_suzuki_caught', value: true },
      ],
      next: 'ch6_scene6',
    },

    ch6_scene5_escape: {
      location: '公園',
      time: '木曜日 20:25',
      bg: 'bg-night-danger',
      showTransition: false,
      content: [
        { type: 'text', speaker: '鈴木', text: '……自首？\n冗談じゃない。\nまだ終わりじゃない！' },
        { type: 'narration', text: '鈴木が突然走り出した。\n公園の奥に向かって全力疾走。' },
        { type: 'effect', name: 'shake' },
        { type: 'text', speaker: '{name}', text: '鈴木！待て！' },
        { type: 'narration', text: '追いかける。\nだが鈴木は速い──' },
        { type: 'sfx', name: 'footsteps' },
        { type: 'text', speaker: '黒田', text: 'そこまでだ！鈴木！' },
        { type: 'narration', text: '黒田が回り込んでいた。\n鈴木の前に立ちはだかる。' },
        { type: 'narration', text: '鈴木は立ち止まった。\n前に黒田、後ろに自分。\n逃げ場はない。' },
        { type: 'text', speaker: '鈴木', text: '……ああ。終わりだ。\n全部、終わりだ。' },
        { type: 'narration', text: '鈴木はその場に座り込んだ。\n黒田が手錠をかける。' },
        { type: 'narration', text: '録音は途中までだが\n鈴木の自白は記録されている。' },
        {
          type: 'evidence',
          id: 'suzuki_confession',
          name: '鈴木の自白録音',
          description: '公園での対峙で録音した鈴木の自白。途中までだが、借金と佐藤との共謀について記録されている。',
        },
        { type: 'flag', key: 'ch6_suzuki_caught', value: true },
      ],
      next: 'ch6_scene6',
    },

    // ===== 場面6：第6章エンディング =====
    ch6_scene6: {
      location: '公園',
      time: '木曜日 20:40',
      bg: 'bg-night-street',
      showTransition: false,
      content: [
        { type: 'narration', text: 'パトカーのサイレンが近づいてくる。\n赤と青の光が公園を照らす。' },
        { type: 'narration', text: '鈴木は手錠をかけられたまま\n黙ってうつむいていた。' },
        { type: 'text', speaker: '黒田', text: '{name}。\nよくやった。' },
        { type: 'text', speaker: '黒田', text: '録音は全て確保した。\nこれで起訴に持ち込める。' },
        { type: 'narration', text: '黒田がパトカーに向かう前に\n立ち止まった。' },
        { type: 'text', speaker: '黒田', text: 'ひとつ気になることがある。\n匿名メッセージの件だが。' },
        { type: 'text', speaker: '黒田', text: '田中の自動送信システムは\n確かにいくつかのメッセージを送っていた。\nだが最後の1通だけ──' },
        { type: 'text', speaker: '黒田', text: '「にげろ」だけは\n自動送信のパターンと一致しない。\n誰かが手動で送った可能性がある。' },
        { type: 'sfx', name: 'tensionSting' },
        { type: 'narration', text: '最後の1通だけが手動──？\n\n誰が。何のために。\n\n鈴木は逮捕された。\n佐藤も逮捕されている。\nなら、その「誰か」は──' },
        { type: 'narration', text: '全てが終わったはずだった。\nだがまだ、一つだけ\n解けていない謎が残っている。' },
        { type: 'narration', text: '\n　　　　　── 第6章 終 ──' },
      ],
      choices: [
        {
          id: 'to_ch7',
          text: '第7章へ進む',
          next: 'ch7_scene1',
        },
      ],
    },
  },
};
