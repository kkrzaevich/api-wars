//
//
// Timeline

export class Timeline {
    turn: "player" | "enemy";
    phase: "dealing-cards" | "player-select" | "player-use" | "player-crit" | "enemy-select" | "enemy-use" | "enemy-crit";

    constructor(turn: "player" | "enemy",
        phase: "dealing-cards" | "player-select" | "player-use" | "player-crit" | "enemy-select" | "enemy-use" | "enemy-crit"
     = "dealing-cards") {
        this.turn = turn;
        this.phase = phase;
    }
}

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