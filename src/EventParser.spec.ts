import { EventParser } from "./EventParser";
import { Match } from "./types";

const sampleMatches: Match[] = [
  {
    sport: "soccer",
    participant1: "Real Madrid",
    participant2: "Barcelona",
    score: "5:0",
  },
  {
    sport: "volleyball",
    participant1: "Poland",
    participant2: "Brazil",
    score: "3:1,25:23,19:25,25:21,25:19",
  },
  {
    sport: "handball",
    participant1: "Barlinek Industria Kielce",
    participant2: "Azoty-Puławy",
    score: "31:28",
  },
  {
    sport: "basketball",
    participant1: "Denver Nuggets",
    participant2: "Miami Heat",
    score: [
      ["22:24", "22:27"],
      ["26:20", "24:18"],
    ],
  },
  {
    sport: "tennis",
    participant1: "Novak Djokovic",
    participant2: "Ruud Casper",
    score: "3:0,7:6,6:3,7:5",
  },
  {
    // @ts-expect-error - not supported
    sport: "ski jumping",
  },
  {
    // @ts-expect-error - not supported
    // wrong data just for testing
    sport: "ski jumping",
    participant1: "Kamil Stoch",
    participant2: "Noriaki Kasai",
    score: "2:1",
  },
];

const notSupportedSports: Match[] = [
  {
    // @ts-expect-error - not supported
    sport: "ski jumping",
  },
  {
    // @ts-expect-error - not supported
    // wrong data just for testing
    sport: "ski jumping",
    participant1: "Kamil Stoch",
    participant2: "Noriaki Kasai",
    score: "2:1",
  },
];

const expectedOutput = [
  { name: "Real Madrid - Barcelona", score: "5:0" },
  {
    name: "Poland - Brazil",
    score: "Main score: 3:1 (set1 25:23, set2 19:25, set3 25:21, set4 25:19)",
  },
  { name: "Barlinek Industria Kielce vs Azoty-Puławy", score: "31:28" },
  {
    name: "Denver Nuggets - Miami Heat",
    score: "22:24,22:27,26:20,24:18",
  },
  {
    name: "Novak Djokovic vs Ruud Casper",
    score: "Main score: 3:0 (set1 7:6, set2 6:3, set3 7:5)",
  },
];

describe("EventParser", () => {
  describe("parse", () => {
    it("should return desired data format for all the matches", () => {
      const parser = new EventParser();
      const parsedMatches = parser.parse(sampleMatches);

      expect(parsedMatches).toStrictEqual(expectedOutput);
    });

    it("should return empty array if there are no supported sports", () => {
      const parser = new EventParser();
      const parsedMatches = parser.parse(notSupportedSports);

      expect(parsedMatches).toStrictEqual([]);
    });

    it("should print an error in the console if error occurs", () => {
      const error = jest.spyOn(console, "error");
      const parser = new EventParser();
      parser.parse(notSupportedSports);

      expect(error).toHaveBeenCalled();
    });
  });
});
