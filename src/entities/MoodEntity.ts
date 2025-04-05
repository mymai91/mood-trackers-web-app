import type { Entity } from "./Entity";

export interface Mood {
  mood: string;
  comment?: string;
  rating?: number;
}

export type MoodType =
  | "not_good_at_all"
  | "a_bit_meh"
  | "pretty_good"
  | "felling_great";

export type MoodLabel =
  | "Not good at all"
  | 'A bit "meh"'
  | "Pretty good"
  | "Feeling great";

export interface MoodOption {
  emoji: string;
  imgSrc?: string;
  label: string;
}

export type MoodOptions = {
  [key in MoodType]: MoodOption;
};

export interface MoodEntity extends Entity {}

export const MoodOptionsData: MoodOptions = {
  not_good_at_all: { emoji: "😞", label: "Not good at all" },
  a_bit_meh: { emoji: "😐", label: 'A bit "meh"' },
  pretty_good: { emoji: "😊", label: "Pretty good" },
  felling_great: { emoji: "😁", label: "Feeling great" },
};

export const emotionColors = {
  not_good_at_all: "bg-orange-300",
  a_bit_meh: "bg-yellow-200",
  pretty_good: "bg-green-200",
  felling_great: "bg-emerald-500",
};
