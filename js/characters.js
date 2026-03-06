// ========== CHARACTER PROFILES ==========
const CHARACTER_PROFILES = {
  tanaka: {
    name: '田中洋介',
    nameReading: 'たなか ようすけ',
    icon: '被',
    baseInfo: {
      role: '被害者',
      relation: '同期の同僚',
      description: '同じ会社の同僚。金曜夜に飲みに誘ったが現れず、翌日殺害されたことが判明した。',
    },
    unlockCondition: { always: true },
    updates: [
      {
        condition: { evidence: 'yamamoto_testimony' },
        info: '会社で「やばいこと」を発見していた。山本に相談しようとしていた。',
        tag: '不正発見',
      },
      {
        condition: { evidence: 'tanaka_mystery_woman' },
        info: 'SNSで謎の女性とやり取りしていた形跡がある。',
        tag: '謎の女性',
      },
      {
        condition: { evidence: 'sato_embezzlement' },
        info: '佐藤の7000万円超の横領データをUSBに保存していた。これが殺害の動機。',
        tag: '横領データ',
      },
      {
        condition: { evidence: 'nakamura_testimony' },
        info: '中村綾と秘密裡に交際していた。「一番信頼していた友人をもう信じられない」と語っていた。',
        tag: '交際関係',
      },
      {
        condition: { flag: 'anonymous_traced' },
        info: '生前にデッドマンスイッチ（自動メッセージシステム）を仕込んでいた。死後も味方を導いた。',
        tag: 'デッドマンスイッチ',
      },
      {
        condition: { flag: 'tanaka_memo_decoded' },
        info: '鈴木の裏切りに気づいていた。暗号メモ「すずきはうらぎりもの」を残した。',
        tag: '裏切りの認知',
      },
      {
        condition: { flag: 'tanaka_letter_opened' },
        info: '最期の手紙を暗号化して残していた。「人を信じることは裏切られるリスクを伴う。でも信じることをやめたら何のために生きているんだろう」。',
        tag: '最後の手紙',
      },
    ],
    statusUpdates: [
      { condition: { always: true }, status: '死亡' },
    ],
  },

  kuroda: {
    name: '黒田',
    nameReading: 'くろだ',
    icon: '刑',
    baseInfo: {
      role: '刑事',
      relation: '捜査一課',
      description: '田中殺害事件を担当する刑事。厳つい外見だが誠実な捜査官。',
    },
    unlockCondition: { flag: 'met_kuroda' },
    updates: [
      {
        condition: { evidence: 'kuroda_info' },
        info: '偽造メッセージは田中のスマホに直接インストールされたもの。犯人は田中と親しい人物の可能性が高い。',
        tag: '捜査情報',
      },
      {
        condition: { flag: 'kuroda_has_evidence' },
        info: '横領の証拠を受け取り、佐藤の捜査に動き出した。',
        tag: '証拠受領',
      },
      {
        condition: { evidence: 'suzuki_confession' },
        info: '鈴木の自白を確保し逮捕。事件解決に導いた。',
        tag: '事件解決',
      },
    ],
    statusUpdates: [
      { condition: { always: true }, status: '捜査中' },
      { condition: { flag: 'game_cleared' }, status: '事件解決' },
    ],
  },

  sato: {
    name: '佐藤',
    nameReading: 'さとう',
    icon: '上',
    baseInfo: {
      role: '部長',
      relation: '会社の上司',
      description: '{name}の上司。佐藤部長。',
    },
    unlockCondition: { evidence: 'yamamoto_testimony' },
    updates: [
      {
        condition: { evidence: 'sato_embezzlement' },
        info: '架空取引で7000万円超の横領を行っていた。全てのファイルに佐藤の承認印。',
        tag: '横領発覚',
      },
      {
        condition: { evidence: 'sato_confession' },
        info: '田中を「処理した」と発言。しかし殺害時刻にホテルのアリバイあり。直接手を下していない。',
        tag: '自白',
      },
      {
        condition: { evidence: 'shimizu_info' },
        info: '鈴木の借金を肩代わりし、見返りに書類偽造などの「仕事」を手伝わせていた。',
        tag: '鈴木との共謀',
      },
      {
        condition: { evidence: 'suzuki_confession' },
        info: '鈴木に「田中を黙らせろ」と命令した黒幕。殺人教唆で追起訴。',
        tag: '殺人教唆',
      },
    ],
    statusUpdates: [
      { condition: { always: true }, status: '容疑者' },
      { condition: { evidence: 'sato_confession' }, status: '逮捕済み' },
      { condition: { flag: 'game_cleared' }, status: '起訴済み（横領・殺人教唆）' },
    ],
  },

  suzuki: {
    name: '鈴木健太',
    nameReading: 'すずき けんた',
    icon: '同',
    baseInfo: {
      role: '同僚',
      relation: '田中の親友',
      description: '田中と一番仲が良かった同僚。田中の死を悲しんでいるように見える。',
    },
    unlockCondition: { evidence: 'suzuki_witness' },
    updates: [
      {
        condition: { evidence: 'suzuki_witness' },
        info: '田中は最後の2週間、怯えていた。佐藤と頻繁に密会。女性の訪問者もいたと証言。',
        tag: '目撃証言',
      },
      {
        condition: { evidence: 'shimizu_info' },
        info: '3000万円のギャンブル借金がある。清水太郎（闇金）から借りていた。',
        tag: '借金発覚',
      },
      {
        condition: { evidence: 'suzuki_suspicious_call' },
        info: '「処理する」「嗅ぎ回ってる」──不審な電話を盗み聞きされた。',
        tag: '不審な電話',
      },
      {
        condition: { evidence: 'suzuki_sato_calls' },
        info: '佐藤との通話が異常に多い。殺害前後3日間で14回、当日だけで5回。',
        tag: '通話記録',
      },
      {
        condition: { flag: 'tanaka_memo_decoded' },
        info: '田中は鈴木の裏切りに気づいていた。暗号メモ「すずきはうらぎりもの」。',
        tag: '裏切り者',
      },
      {
        condition: { evidence: 'suzuki_confession' },
        info: '田中殺害を自白。佐藤に命令されて実行。偽造メッセージ・スマホの細工・合鍵のコピーも全て鈴木の仕業。',
        tag: '全面自白',
      },
    ],
    statusUpdates: [
      { condition: { always: true }, status: '関係者' },
      { condition: { evidence: 'suzuki_suspicious_call' }, status: '要注意人物' },
      { condition: { flag: 'tanaka_memo_decoded' }, status: '容疑者' },
      { condition: { evidence: 'suzuki_confession' }, status: '逮捕済み' },
      { condition: { flag: 'game_cleared' }, status: '起訴済み（殺人罪）' },
    ],
  },

  yamamoto: {
    name: '山本',
    nameReading: 'やまもと',
    icon: '友',
    baseInfo: {
      role: '同僚',
      relation: '田中の同僚・味方',
      description: '田中から不正の話を聞いていた同僚。{name}に情報を提供してくれる。',
    },
    unlockCondition: { flag: 'met_yamamoto' },
    updates: [
      {
        condition: { evidence: 'yamamoto_testimony' },
        info: '田中が「会社でやばいことを見つけた」と相談してきたと証言。佐藤の名前を挙げた。',
        tag: '証言',
      },
      {
        condition: { evidence: 'suzuki_sato_calls' },
        info: '独自に佐藤と鈴木の通話記録を入手。殺害前後に14回の通話を発見。',
        tag: '独自調査',
      },
    ],
    statusUpdates: [
      { condition: { always: true }, status: '味方' },
    ],
  },

  nakamura: {
    name: '中村綾',
    nameReading: 'なかむら あや',
    icon: '恋',
    baseInfo: {
      role: '営業企画部社員',
      relation: '田中の交際相手',
      description: '田中と秘密裡に交際していた女性。営業企画部所属。',
    },
    unlockCondition: { flag: 'met_nakamura' },
    updates: [
      {
        condition: { evidence: 'nakamura_testimony' },
        info: '田中と付き合っていた。合鍵も持っている。田中は「一番信頼していた友人をもう信じられない」と言っていた。',
        tag: '証言',
      },
      {
        condition: { evidence: 'nakamura_key' },
        info: '田中の部屋の合鍵を所持。他に合鍵を持つ人物がいる可能性が浮上。',
        tag: '合鍵',
      },
      {
        condition: { evidence: 'nakamura_alibi_confirmed' },
        info: '事件当夜は箱根の社員研修旅行に参加していた。アリバイ確認済み。',
        tag: 'アリバイ確認',
      },
      {
        condition: { evidence: 'anonymous_sender_revealed' },
        info: '「にげろ」のメッセージを手動で送っていた。田中を守れなかった償いとして。',
        tag: '匿名送信者',
      },
    ],
    statusUpdates: [
      { condition: { always: true }, status: '関係者' },
      { condition: { evidence: 'nakamura_alibi_confirmed' }, status: 'アリバイ確認済み' },
    ],
  },

  noguchi: {
    name: '野口健二',
    nameReading: 'のぐち けんじ',
    icon: '元',
    baseInfo: {
      role: '元社員',
      relation: '半年前に解雇',
      description: '半年前に解雇された元社員。田中を恨んでいるという情報がある。',
    },
    unlockCondition: { evidence: 'noguchi_sighting' },
    updates: [
      {
        condition: { evidence: 'noguchi_sighting' },
        info: '事件当夜、田中のマンション付近で目撃されている。',
        tag: '目撃情報',
      },
      {
        condition: { evidence: 'noguchi_threat_email' },
        info: '田中に脅迫メールを送っていた。「お前のせいで俺の人生は終わった。覚えていろ」。',
        tag: '脅迫メール',
      },
      {
        condition: { evidence: 'noguchi_witness' },
        info: '事件の夜にスーツの男が田中のマンションに入るのを目撃。重要な証言を持つ。',
        tag: '目撃証言',
      },
      {
        condition: { evidence: 'noguchi_alibi_confirmed' },
        info: 'パチンコ店の防犯カメラでアリバイ確認済み。田中殺害への関与はなし。',
        tag: 'アリバイ確認',
      },
    ],
    statusUpdates: [
      { condition: { always: true }, status: '容疑者' },
      { condition: { evidence: 'noguchi_alibi_confirmed' }, status: 'アリバイ確認済み' },
    ],
  },

  shimizu: {
    name: '清水太郎',
    nameReading: 'しみず たろう',
    icon: '闇',
    baseInfo: {
      role: '金融業者',
      relation: '鈴木の債権者',
      description: '鈴木に金を貸している男。堅気ではない雰囲気。',
    },
    unlockCondition: { flag: 'met_shimizu' },
    updates: [
      {
        condition: { evidence: 'shimizu_info' },
        info: '鈴木に3000万円を貸している。佐藤逮捕で返済の当てがなくなり困っている。',
        tag: '借金情報',
      },
    ],
    statusUpdates: [
      { condition: { always: true }, status: '関係者' },
    ],
  },

  bartender: {
    name: 'バーテンダー',
    nameReading: 'BAR Kの店主',
    icon: '酒',
    baseInfo: {
      role: 'BAR Kの店主',
      relation: '情報提供者',
      description: '裏社会と繋がりのあるバーの店主。紹介制の店を営む。',
    },
    unlockCondition: { flag: 'met_bartender' },
    updates: [
      {
        condition: { evidence: 'bar_k_testimony' },
        info: '鈴木はギャンブルで大損。借金を「上の人間」が肩代わりしたと証言。',
        tag: '鈴木の情報',
      },
    ],
    statusUpdates: [
      { condition: { always: true }, status: '情報源' },
    ],
  },

  tenin: {
    name: '店員',
    nameReading: '居酒屋「灯火」',
    icon: '店',
    baseInfo: {
      role: '居酒屋の店員',
      relation: '第1章で登場',
      description: '田中との待ち合わせ場所だった居酒屋「灯火」の店員。',
    },
    unlockCondition: { flag: 'met_tenin' },
    updates: [],
    statusUpdates: [
      { condition: { always: true }, status: '一般人' },
    ],
  },
};
