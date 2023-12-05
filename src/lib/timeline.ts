//
//
// Timeline

export type Stage = {
    turn: "player" | "enemy",
    phase: "dealing-cards" | "select-card" | "use-card" | "crit";
    delay: number
}

export class Timeline {
    stages: Stage[] =  [
        {
            turn: "player",
            phase: "dealing-cards",
            delay: 1000,
        },
        {
            turn: "player",
            phase: "select-card",
            delay: 0,
        },
        {
            turn: "player",
            phase: "use-card",
            delay: 5000,
        },
        {
            turn: "player",
            phase: "crit",
            delay: 1000,
        },
        {
            turn: "enemy",
            phase: "dealing-cards",
            delay: 1000,
        },
        {
            turn: "enemy",
            phase: "select-card",
            delay: 1000,
        },
        {
            turn: "enemy",
            phase: "use-card",
            delay: 1000,
        },
        {
            turn: "enemy",
            phase: "crit",
            delay: 1000,
        },
    ]
    currentStage: number = 1;

    move(callback? : Function) {
        setTimeout(
            ()=>{
                if (this.currentStage < this.stages.length-1) {
                    this.currentStage++
                } else {
                    this.currentStage = 0;
                }
                if (callback) {callback()}
                console.log(`It is ${this.stages[this.currentStage].turn}'s turn. The phase is ${this.stages[this.currentStage].phase} .The delay is ${this.stages[this.currentStage].delay}.`)
            },
            this.stages[this.currentStage].delay
        );
    }
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