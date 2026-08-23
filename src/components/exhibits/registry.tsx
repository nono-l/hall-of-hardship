import type { ComponentType } from "react";
import type { ExhibitSlug } from "@/lib/exhibits";
import { CameraExhibit } from "./camera-exhibit";
import { FaxExhibit } from "./fax-exhibit";
import { LayersExhibit } from "./layers-exhibit";
import { RelayExhibit } from "./relay-exhibit";
import { TestimonyExhibit } from "./testimony-exhibit";
import { ThirtyExhibit } from "./thirty-exhibit";
import { WordsExhibit } from "./words-exhibit";

export const EXHIBIT_UI: Record<ExhibitSlug, ComponentType> = {
  words: WordsExhibit,
  fax: FaxExhibit,
  relay: RelayExhibit,
  camera: CameraExhibit,
  thirty: ThirtyExhibit,
  layers: LayersExhibit,
  testimony: TestimonyExhibit,
};
