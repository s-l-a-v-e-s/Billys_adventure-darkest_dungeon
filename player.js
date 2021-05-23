'use strict'
import equip from "./inventory.js";

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
    #maxHealth;
    #maxMana;
    #maxStamina;
    #equipStats=equip.getEquipmentStats();
    /********Суммарные статы********/
    #stats = [this.strength,this.intelligence,this.agility,this.luck];
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
    }


    
    setName(pName){this.#name=pName}
    setClass(pClass){this.#class=pClass}
    updateStats(){
        this.#equipStats=equip.getEquipmentStats()
        this.#stats[0]= this.#strength + this.#equipStats[0];
        this.#stats[1]= this.#agility + this.#equipStats[1];
        this.#stats[2]= this.#intelligence + this.#equipStats[2];
        this.#stats[3]= this.#luck + this.#equipStats[3];
    }
    getSummaryStats(){return this.#stats}
    updateState(){
        if(this.#stats[0] * 1.25 + 100 < 0 ||
           this.#stats[1] * 1.25 + 100 < 0 ||
           this.#stats[2] * 1.25 + 100 < 0
            ) return;
        this.#maxHealth = this.#stats[0] * 1.25 + 100;
        this.#maxMana = this.#stats[1] * 1.25 + 100;
        this.#maxStamina = this.#stats[2] * 1.25 + 100;
    }
    getDmg(dmg){
        let hpbar = document.getElementsByClassName('hp')[0].children[0];
        if(this.health-dmg <= 0 ) {console.log('dead'); hpbar.style.width=0+"%"}
        else {
            console.log(this.health+" "+dmg);
            this.health -= dmg;
            hpbar.style.width = (this.health * 100) / this.#maxHealth+"%";
            console.log(hpbar.style.width);
            console.log(this.health,this.#maxHealth);
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




document.body.onclick = function() {
    player.getDmg(40)
}



let popup = document.getElementsByClassName("inventory-popup")[0];
popup.addEventListener("click",function(){
    player.updateStats();
    player.updateState();
    console.log(player)
   
    
})

export default player;