'use strict'
import {Item,EquipmnetItem,InventorySlot,EquipmentSlot} from './itemsANDslots.js'

export class Inventory{
    #invCanvas =  document.getElementsByClassName("inventory")[0].children[0];
    #itemMas=[
        [,,,,,,],
        [,,,,,,],
        [,,,,,,],
        [,,,,,,],
        [,,,,,,],
        [,,,,,,],
        [,,,,,,],
        [,,,,,,],
        [,,,,,,],
    ]
    #invWidth=6;
    #invHeight=9;
    #activeSlot=0;
    /*Первая инициализация*/
    firstInit(){
        for(let i=0;i<this.#invHeight;i++){
            for(let d=0;d<this.#invWidth;d++){
                this.#itemMas[i][d] = new InventorySlot;
            }       
        }
    }
    /*Отрисовать инвентарь*/
    drawInv(){
        for(let i=0;i<9;i++){
            for(let d=0;d<6;d++){
                this.#itemMas[i][d].draw(0+d*69,0+i*69,this.#itemMas[i][d].isActive(),this.#invCanvas);
            }      
        }
    }
    /*Сделать слот активным*/
    setActiveSlot(x,y){
        for(let i=0;i<9;i++){
            for(let d=0;d<6;d++){
                if( x >= this.#itemMas[i][d].posX && x <= this.#itemMas[i][d].posX  + this.#itemMas[i][d].dWidth &&
                    y >= this.#itemMas[i][d].posY && y <= this.#itemMas[i][d].posY  + this.#itemMas[i][d].dHeight){
                        if(this.#activeSlot){
                            this.#activeSlot.isActiveSlot = false;
                            this.#activeSlot = this.#itemMas[i][d];
						}
						else{ 
                            this.#activeSlot = this.#itemMas[i][d];
                        }
                        this.#activeSlot.isActiveSlot = !this.#itemMas[i][d].isActiveSlot;
                    }      
            }       
        }
    }
    addItem(item){
        let added=false
        for(let i=0;i<9;i++){
            for(let d=0;d<6;d++){
                if(added==false){
                    if(this.#itemMas[i][d].assignedItem==null){
                        this.#itemMas[i][d].assignedItem=item;
                        added=true;
                    }
                }
            }
        }
        
    }
    /*Задать инф о выбранном предмете*/
    setPopupInfo(){
        let popup = document.getElementsByClassName("inventory-popup")[0];
        let pButton = document.getElementsByClassName("equipB")[0].children[0];
        if(this.#activeSlot.assignedItem==null) {
            popup.style.visibility = "hidden";
            return;
        };
        let popItem = this.#activeSlot.assignedItem;
        let pIName = document.getElementsByClassName("item-name")[0].children[0];
        let pIType = document.getElementsByClassName("item-type")[0].children[0];
        let imgItem = document.getElementsByClassName("item-info")[0].children[0];
        let atkORdfn = document.getElementsByClassName("attack-defence")[0].children[0];
        let itemStat = document.getElementsByClassName("attack-defence")[0].children[1];
        let patkORdfn = document.getElementsByClassName("attack-defence")[0].children[2];
        let pStr = document.getElementsByClassName("str")[0];
        let pInt = document.getElementsByClassName("int")[0];
        let pAgi = document.getElementsByClassName("agi")[0];
        let pLuck = document.getElementsByClassName("luck")[0];
        if(popItem==null){
            popup.style.visibility = "hidden";
        }
        else{
            switch(popItem.getRarity()){
                case "Common":
                    popup.style.backgroundImage = "url(res/item-rarity-common.svg)";
                    break;
                case "Uncommon":
                    popup.style.backgroundImage = "url(res/item-rarity-uncommon.svg)";
                    break;
                case "Rare":
                    popup.style.backgroundImage = "url(res/item-rarity-rare.svg)";
                    break;
                case "Epic":
                    popup.style.backgroundImage = "url(res/item-rarity-epic.svg)";
                    break;
                case "Legendary":
                    popup.style.backgroundImage = "url(res/item-rarity-legendary.svg)";
                    break;
            }
        }
        pIName.innerHTML = popItem.name;
        pIType.innerHTML = popItem.getEqType();
        imgItem.style.backgroundImage = "url("+popItem.getBImage()+")";
        if(popItem.getEqType()=="weapon") {atkORdfn.src = "res/atk-icon.svg";patkORdfn.innerHTML="Атака"}
        else {atkORdfn.src ="res/def-icon.svg";patkORdfn.innerHTML="Защита"};
        itemStat.innerHTML = popItem.getItemStat();
        /*********Сила**********/
        if(popItem.str > 0){
            pStr.style.color = "#90CC54";
            pStr.innerHTML = "+"+popItem.str;
        }
        else if(popItem.str <= 0){
            pStr.style.color = "#E37171";
            pStr.innerHTML = popItem.str;
        }
        /*********Интелект**********/
        if(popItem.int > 0){
            pInt.style.color = "#90CC54";
            pInt.innerHTML = "+"+popItem.int;
        }
        else if(popItem.int <= 0){
            pInt.style.color = "#E37171";
            pInt.innerHTML = popItem.int;
        }
        /*********Ловкость**********/
        if(popItem.agi > 0){
            pAgi.style.color = "#90CC54";
            pAgi.innerHTML = "+"+popItem.agi;
        }
        else if(popItem.agi <= 0){
            pAgi.style.color = "#E37171";
            pAgi.innerHTML = popItem.agi;
        }
        /*********Удача**********/
        if(popItem.luck > 0){
            pLuck.style.color = "#90CC54";
            pLuck.innerHTML = "+"+popItem.luck;
        }
        else if(popItem.luck <= 0){
            pLuck.style.color = "#E37171";
            pLuck.innerHTML = popItem.luck;
        }
        pButton.innerHTML = "Надеть";
    }
    closePopup(){
        let popup = document.getElementsByClassName("inventory-popup")[0];
        popup.style.visibility = "hidden";
        
    }
    chooseSlot(e){
        
    }
    /*Получить массив инвентаря*/
    getItemMas(){return this.#itemMas}
    /*Получить активный слот*/
    getActiveSlot(){return this.#activeSlot}
}