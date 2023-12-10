//
//
// Timeline

export type Stage = {
    phase: "dealing-cards" | "player-select-card" | "player-use-card" | "player-crit" | "enemy-select-card" | "enemy-use-card" | "enemy-crit" | "player-won" | "enemy-won";
}

export class Timeline {
    phase: "dealing-cards" | "player-select-card" | "player-use-card" | "player-crit" | 
    "enemy-select-card" | "enemy-use-card" | "enemy-crit" | "player-won" | "enemy-won" = "player-select-card";
    dealDelay = 1000;
    critDelay = 4000;
    turnDelay = 5000;
    selectDelay = 3000;
}

export const timeline1 = new Timeline;