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
    title: "Skin of Words",
    official: "Information-sharing deficiency",
    tease: "Retell the same event by turning the mildness knob.",
    question: "Which phrasing lightens whose load?",
  },
  {
    slug: "fax",
    number: "02",
    title: "Unreadable Paper",
    official: "Plans and procedures are in place",
    tease: "Sent is not the same as received.",
    question: "Where does “we shared it” become true?",
  },
  {
    slug: "relay",
    number: "03",
    title: "Four Relays",
    official: "Hazard briefing was insufficient",
    tease: "Change the cast and the failure moves.",
    question: "Is failure a job type, or today’s roles?",
  },
  {
    slug: "camera",
    number: "04",
    title: "Camera Blind Spot",
    official: "Remote presence via site cameras",
    tease: "What the frame shows is not what is live.",
    question: "What, exactly, is footage evidence of?",
  },
  {
    slug: "thirty",
    number: "05",
    title: "Thirty Minutes",
    official: "Work performed to standard time",
    tease: "Spare time can become care — or needling.",
    question: "Is a fast finish completion, or omission?",
  },
  {
    slug: "layers",
    number: "06",
    title: "Nested Boxes",
    official: "Sharing breaks below the prime contractor",
    tease: "When the addressee is unreadable, where does duty fall?",
    question: "What did you hand to a name you cannot read?",
  },
  {
    slug: "testimony",
    number: "07",
    title: "Table of Testimony",
    official: "Horizontal rollout of countermeasures",
    tease: "Nobody lies in full. Nobody tells the whole.",
    question: "Which testimonies does the official line fold away?",
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
