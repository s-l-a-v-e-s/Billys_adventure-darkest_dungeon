'use strict'
class Player {
    #name;
    #class;
    #strength;
    #agility
    #intelligence
    #luck
    #inBattle=false;
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
        this.#maxHealth = this.#strength * 1.25 + 100;
        this.health = this.#strength * 1.25 + 100;
        this.#maxMana = this.#intelligence * 1.25 + 100;
        this.mana = this.#intelligence * 1.25 + 100;
        this.#maxStamina = this.#agility * 0.25 + 100;
        this.stamina = this.#agility * 1.25 + 100;
        this.#stats = [this.strength,this.intelligence,this.agility,this.luck,this.#attack,this.#armor];
    }


    inBattle(){return this.#inBattle}
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
    whenUnEquip(item){
        this.#equipStats[0] -= item.str;
        this.#equipStats[1] -= item.int;
        this.#equipStats[2] -= item.agi;
        this.#equipStats[3] -= item.luck;
        if(item.getEqType()=="weapon") this.#equipStats[4] -= item.getItemStat();
        else this.#equipStats[5] -= item.getItemStat();
    }
    getSummaryStats(){return this.#stats}
    updateState(){
        if(this.#stats[0] * 1.25 + 100 <= 0 ||
           this.#stats[2] * 1.25 + 100 <= 0
            ) return;
        this.#maxHealth = this.#stats[0] * 0.75 + 100;
        if(this.#maxMana = this.#stats[1] * 0.75 + 100 < 0) this.#maxMana = 0;
        else this.#maxMana = this.#stats[1] * 0.75 + 100;
        this.#maxStamina = this.#stats[2] * 0.75 + 100;
        this.#sumAttack = this.#stats[4];
        this.#sumArmor = this.#stats[5];
        let hpText = document.getElementsByClassName("hp")[0].parentElement.children[1];
        let manaText = document.getElementsByClassName("mana")[0].parentElement.children[1];
        let staminaText = document.getElementsByClassName("stamina")[0].parentElement.children[1];
        let strText = document.getElementsByClassName("playerStr")[0].children[1];
        let intText = document.getElementsByClassName("playerInt")[0].children[1];
        let agiText = document.getElementsByClassName("playerAgi")[0].children[1];
        let luckText = document.getElementsByClassName("playerLuck")[0].children[1];
        if (this.#inBattle) return;
        else {
            this.health = this.#maxHealth;
            this.mana = this.#maxMana;
            this.stamina = this.#maxStamina;
        }
        strText.innerHTML = this.#stats[0];
        intText.innerHTML = this.#stats[1];
        agiText.innerHTML = this.#stats[2];
        luckText.innerHTML = this.#stats[3];
        hpText.innerHTML = this.health +" / "+this.#maxHealth;
        manaText.innerHTML = this.mana +" / "+this.#maxMana;
        staminaText.innerHTML = this.stamina +" / "+this.#maxStamina;
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