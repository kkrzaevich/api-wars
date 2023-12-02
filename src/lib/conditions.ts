import type { Writable } from "svelte/store";
import type { City } from "./cities"
import { player, enemy } from "../stores";
import { buenosAires, london, ryanOklahoma, tokyo, istanbul, paris, aktau, pyongyang} from './cities';

export type Conditions = {
    playerCity: City;
    enemyCity: City;
    arenaCity: City;
}

export const conditions: Conditions = {
    playerCity: london,
    enemyCity: tokyo,
    arenaCity: pyongyang,
}