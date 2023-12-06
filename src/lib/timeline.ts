//
//
// Timeline

export type Stage = {
    phase: "dealing-cards" | "player-select-card" | "player-use-card" | "player-crit" | "enemy-select-card" | "enemy-use-card" | "enemy-crit";
}

export class Timeline {
    phase: "dealing-cards" | "player-select-card" | "player-use-card" | "player-crit" | 
    "enemy-select-card" | "enemy-use-card" | "enemy-crit" = "player-select-card";
    dealDelay = 1000;
    critDelay = 4000;
    turnDelay = 5000;
    selectDelay = 3000;
}

export const timeline1 = new Timeline;

/* На что влияют фазы?
0. Нужна ли фаза dealing-cards?
1. Ход игрока:
    - Можно выбирать и использовать карты только в фазе - player-select
    - Когда карта используется, происходят события:
        - Карта улетает
        - Проводится базовое действие карты
        - Показывается диалоговая строчка
        - Проводится критическое действие карты
        - Раздаются карты
2. Ход врага:
    - Нельзя использовать карты совсем
    - Выбор карты противником занимает какое-то время
    - Когда карта используется, происходят события:
        - Карта улетает
        - Проводится базовое действие карты
        - Показывается диалоговая строчка
        - Проводится критическое действие карты
        - Раздаются карты



*/