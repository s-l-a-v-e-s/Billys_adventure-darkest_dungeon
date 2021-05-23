'use strict'
class Player {
    #name;
    #class;
    #strength;
    #agility
    #intelligence
    #luck
    health;
    mana;
    stamina;
    #attack = 5;
    #sumAttack;
    #armor = 0;
    #sumArmor;
    #maxHealth;
    #maxMana;
    #maxStamina;
    #equipStats;
    /********Суммарные статы********/
    #stats;
    constructor(strength,intelligence,agility,luck){
        this.#strength = strength || 0;
        this.#agility = agility || 0;
        this.#intelligence = intelligence || 0;
        this.#luck = luck || 0;
        this.#maxHealth = this.#strength * 0.25 + 100;
        this.health = this.#strength * 0.25 + 100;
        this.#maxMana = this.#intelligence * 0.25 + 100;
        this.mana = this.#intelligence * 5 + 100;
        this.#maxStamina = this.#agility * 0.25 + 100;
        this.stamina = this.#agility * 5 + 100;
        this.#stats = [this.strength,this.intelligence,this.agility,this.luck,this.#attack,this.#armor];
    }


    
    setName(pName){this.#name=pName}
    setClass(pClass){this.#class=pClass}
    updateStats(equip){
        this.#equipStats=equip.getEquipmentStats()
        this.#stats[0]= this.#strength + this.#equipStats[0];
        this.#stats[1]= this.#agility + this.#equipStats[1];
        this.#stats[2]= this.#intelligence + this.#equipStats[2];
        this.#stats[3]= this.#luck + this.#equipStats[3];
        this.#stats[4] = this.#attack + this.#equipStats[4];
        this.#stats[5] = this.#armor + this.#equipStats[5];
    }
    getSummaryStats(){return this.#stats}
    updateState(){
        if(this.#stats[0] * 1.25 + 100 <= 0 ||
           this.#stats[1] * 1.25 + 100 <= 0 ||
           this.#stats[2] * 1.25 + 100 <= 0
            ) return;
        this.#maxHealth = this.#stats[0] * 1.25 + 100;
        this.#maxMana = this.#stats[1] * 1.25 + 100;
        this.#maxStamina = this.#stats[2] * 1.25 + 100;
        this.#sumAttack = this.#stats[4];
        this.#sumArmor = this.#stats[5];
        
    }
    getDmg(dmg){
        let hpbar = document.getElementsByClassName('hp')[0].children[0];
        if(this.health-dmg <= 0 ) {console.log('dead'); hpbar.style.width=0+"%"}
        else {
            console.log(this.health+" "+dmg);
            this.health -= dmg+this.#armor;
            hpbar.style.width = (this.health * 100) / this.#maxHealth+"%";
        }
        
        
    }
    attack(){}
}
let player = new Player(
    sessionStorage.getItem("str"),
    sessionStorage.getItem("int"),
    sessionStorage.getItem("agi"),
    sessionStorage.getItem("luck"),
);
player.setName(sessionStorage.getItem("name"));



export default player;