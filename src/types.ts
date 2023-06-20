export type Sport =
  | "soccer"
  | "volleyball"
  | "handball"
  | "basketball"
  | "tennis";

export type Match =
  | {
      sport: Exclude<Sport, "basketball">;
      participant1: string;
      participant2: string;
      score: string;
    }
  | {
      sport: Extract<Sport, "basketball">;
      participant1: string;
      participant2: string;
      score: string[][];
    };

export type ParsedMatch = {
  name: string;
  score: string;
};
