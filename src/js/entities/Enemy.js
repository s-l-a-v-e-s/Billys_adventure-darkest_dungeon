'use strict'

class Enemy{
    #Health;
    #baseAttack;
    #baseDeffense;
    #healthScale;
    #attackScale;
    #deffenseScale;
    #dropChance = [6];
    constructor(name){
        this.name = name;
    }
    setStats(health,baseAttack,baseDeffense){
        this.#Health = health;
        this.#baseAttack = baseAttack;
        this.#baseDeffense = baseDeffense;
    }
    setDropChance(common,uncommon,rare,epic,legendary){
        this.#dropChance[0] = common || 0;
        this.#dropChance[1] = uncommon || 0;
        this.#dropChance[2] = rare || 0;
        this.#dropChance[3] = epic || 0;
        this.#dropChance[4] = legendary || 0;
    }
    setScale(health,attack,deffense){
        this.#healthScale = health;
        this.#attackScale = attack;
        this.#deffenseScale = deffense;
    }
    UpdateStatsWithScale(layer,floor){
        this.#Health = this.#Health + this.#healthScale*floor*layer;
        this.#baseAttack = this.#baseAttack + this.#attackScale*floor;
        this.#baseDeffense = this.#baseDeffense + this.#deffenseScale*floor;
    }
    getDropChance(){return this.#dropChance}
}




export class Slime extends Enemy{
    constructor(name="Слизь"){
        super(name);
        this.setStats(15,5,0);
        this.setScale(10,5,2)
        this.setDropChance(85,15,0,0,0)
    }
}
export class IntermediateSlime extends Enemy{
    constructor(name="Промежуточная слизь"){
        super(name);
        this.setStats(15,5,2);
        this.setScale(12,5,2)
        this.setDropChance(80,20,0,0,0)
    }
}
export class BigSlime extends Enemy{
    constructor(name="Большая слизь"){
        super(name);
        this.setStats(30,5,3);
        this.setScale(10,5,3.5)
        this.setDropChance(70,25,5,0,0)
    }
}
export class Skeleton extends Enemy{
    constructor(name="Скелет"){
        super(name);
        this.setStats(20,11,0);
        this.setScale(7,7,2)
        this.setDropChance(60,32.5,7.5,0,0)
    }
}
export class SkeletonArcher extends Enemy{
    constructor(name="Скелет 'Сметана с луком'"){
        super(name);
        this.setStats(20,14,1);
        this.setScale(7,7,2,5)
        this.setDropChance(60,31,9,0,0)
    }
}
export class Goblin extends Enemy{
    constructor(name="Гоблин проныра"){
        super(name);
        this.setStats(20,10,17);
        this.setScale(7,7,2,5)
        this.setDropChance(35,50,15,0,0)
    }
}
export class ThugGoblin extends Enemy{
    constructor(name="Гоблин c клинками"){
        super(name);
        this.setStats(20,10,17);
        this.setScale(7,7,2,5)
        this.setDropChance(35,45,15,5,0)
    }
}
export class Orc extends Enemy{
    constructor(name="Орк"){
        super(name);
        this.setStats(40,10,10);
        this.setScale(15,8,5)
        this.setDropChance(0,75,20,5,0)
    }
}
export class Slave extends Enemy{
    constructor(name="Слейв"){
        super(name);
        this.setStats(40,10,10);
        this.setScale(15,8,5)
        this.setDropChance(0,0,85,15,0)
    }
}
export class HeavySlave extends Enemy{
    constructor(name="Слейв в доспехах"){
        super(name);
        this.setStats(60,20,20);
        this.setScale(15,8,15)
        this.setDropChance(0,0,80,20,0)
    }
}
