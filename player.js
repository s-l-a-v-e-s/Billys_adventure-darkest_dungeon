'use strict'
class Player {
    #name;
    #class;
    constructor(strength,intelligence,agility,luck){
        this.strength = strength;
        this.agility = agility;
        this.intelligence = intelligence;
        this.luck = luck;
    }
    setName(pName){this.#name=pName}
    setClass(pClass){this.#class=pClass}
}

var player = new Player(
    sessionStorage.getItem("str"),
    sessionStorage.getItem("int"),
    sessionStorage.getItem("agi"),
    sessionStorage.getItem("luck"),
);
player.setName(sessionStorage.getItem("name"));

