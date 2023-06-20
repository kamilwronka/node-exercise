import { validateObjectKeys } from "./utils/validateObjectKeys";
import { Match, ParsedMatch } from "./types";

export class EventParser {
  validObjectKeys = ["sport", "participant1", "participant2", "score"];

  private formatEventName({
    sport,
    participant1,
    participant2,
  }: Match): string {
    switch (sport) {
      case "soccer":
      case "volleyball":
      case "basketball":
        return `${participant1} - ${participant2}`;
      case "tennis":
      case "handball":
        return `${participant1} vs ${participant2}`;
      default:
        throw new Error(`Sport not supported: ${sport}`);
    }
  }

  private formatScore({ sport, score }: Match): string {
    switch (sport) {
      case "soccer":
      case "handball":
        return score;
      case "volleyball":
      case "tennis":
        const [scoreInSets, ...setResults] = score.split(",");
        const formattedSetResults = setResults
          .map((result, i) => `set${i + 1} ${result}`)
          .join(", ");

        return `Main score: ${scoreInSets} (${formattedSetResults})`;
      case "basketball":
        return score
          .reduce((acc: string[] = [], value: string[]) => {
            value.forEach((e) => acc.push(e));

            return acc;
          }, [])
          .join(",");
      default:
        throw new Error(`Sport not supported: ${sport}`);
    }
  }

  public parse(matches: Match[]): ParsedMatch[] {
    return matches.reduce((acc: ParsedMatch[] = [], match: Match) => {
      const isValid = validateObjectKeys(match, this.validObjectKeys);

      if (!isValid) return acc;

      try {
        const name = this.formatEventName(match);
        const score = this.formatScore(match);

        acc.push({ name, score });
      } catch (error) {
        // error occured, ignoring record
        console.error(error);
      }

      return acc;
    }, []);
  }
}
