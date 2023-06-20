import { matches } from "./data/matches";
import { EventParser } from "./EventParser";

const parser = new EventParser();
const parsedMatches = parser.parse(matches);

console.log(parsedMatches);
