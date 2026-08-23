export type ExhibitSlug =
  | "words"
  | "fax"
  | "relay"
  | "camera"
  | "thirty"
  | "layers"
  | "testimony";

export type ExhibitMeta = {
  slug: ExhibitSlug;
  number: string;
  title: string;
  official: string;
  tease: string;
  question: string;
};

export const EXHIBITS: ExhibitMeta[] = [
  {
    slug: "words",
    number: "01",
    title: "言葉の皮",
    official: "情報共有不足",
    tease: "同じ出来事を、マイルドさのつまみで言い換える。",
    question: "どの言い方が、誰の負担を軽くしているか。",
  },
  {
    slug: "fax",
    number: "02",
    title: "読めない紙",
    official: "計画書・手順は整備済み",
    tease: "送ったことと、届いたことは別物だ。",
    question: "「共有したつもり」はどこで成立するか。",
  },
  {
    slug: "relay",
    number: "03",
    title: "伝達の四人",
    official: "危険箇所の周知が不十分",
    tease: "人の組み合わせを変えると、壊れる場所も変わる。",
    question: "失敗は職種の性質か、その日の配役か。",
  },
  {
    slug: "camera",
    number: "04",
    title: "カメラの死角",
    official: "遠隔臨場・現場カメラで後方支援",
    tease: "映るものと、生きているものは一致しない。",
    question: "映像は、何の証拠になるか。",
  },
  {
    slug: "thirty",
    number: "05",
    title: "三十分の使い方",
    official: "標準作業時間に基づき実施",
    tease: "余った時間は、丁寧さにも煽りにもなる。",
    question: "早く終わった仕事は、完了か省略か。",
  },
  {
    slug: "layers",
    number: "06",
    title: "何次の箱",
    official: "二次請け以上で情報共有が途切れる",
    tease: "宛先が読めないとき、責任はどこに落ちるか。",
    question: "名前が読めない相手に、何を渡したことになるか。",
  },
  {
    slug: "testimony",
    number: "07",
    title: "証言の机",
    official: "再発防止策を横展開",
    tease: "誰も全面的な嘘はつかない。誰も全部は言わない。",
    question: "公式の一行は、どの証言を畳んでいるか。",
  },
];

export function getExhibit(slug: string): ExhibitMeta | undefined {
  return EXHIBITS.find((e) => e.slug === slug);
}

export const NEXT_SLUG: Record<ExhibitSlug, ExhibitSlug | null> = {
  words: "fax",
  fax: "relay",
  relay: "camera",
  camera: "thirty",
  thirty: "layers",
  layers: "testimony",
  testimony: null,
};
