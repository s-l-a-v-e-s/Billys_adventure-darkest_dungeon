'use srict'
import {Item,EquipmnetItem,InventorySlot,EquipmentSlot} from './itemsANDslots.js'

export class Equipment {
    #equipCanvas = document.getElementById("equipment");
    #itemHead = new EquipmentSlot;
    #itemShoulder = new EquipmentSlot;
    #itemAmulet  = new EquipmentSlot;
    #itemWeapon  = new EquipmentSlot;
    #itemLeftHand  = new EquipmentSlot;
    #itemChest  = new EquipmentSlot;
    #itemLegs  = new EquipmentSlot;
    #itemBoots  = new EquipmentSlot;

    slots=[this.#itemHead,this.#itemShoulder,this.#itemAmulet,this.#itemWeapon,this.#itemLeftHand,this.#itemChest,this.#itemLegs,this.#itemBoots]
    #activeSlot;
    equipItem(item,inv,equip,player){
        if(player.inBattle()) return;
        if(item == null) return;
        player.updateStats(equip);
        let stats = player.getSummaryStats();
        if(stats[0]+item.str * 1.25 + 100 <= 0 ||
            stats[2]+item.agi * 1.25 + 100 <= 0
        ) return;
        let bufItem;
        console.log(item)
        switch (item.getEqType()){
            case 'head':
                if(this.#itemHead!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemHead.assignedItem; 
                    this.#itemHead.assignedItem = bufItem;
                }
                else {
                    this.#itemHead.assignedItem = item;
                    inv.getActiveSlot() = new InventorySlot;
                }
                break;
            case 'shoulder':
                if(this.#itemShoulder!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemShoulder.assignedItem; 
                    this.#itemShoulder.assignedItem = bufItem;
                }
                else {
                    this.#itemShoulder.assignedItem = item;
                    inv.getActiveSlot()= new InventorySlot;
                }
                
                break;
            case 'amulet':
                if(this.#itemAmulet!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemAmulet.assignedItem; 
                    this.#itemAmulet.assignedItem =  bufItem;
                }
                else {
                    this.#itemAmulet.assignedItem = item;
                    inv.getActiveSlot()= new InventorySlot;
                }
                break;
            case 'weapon':
                if(this.#itemWeapon!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemWeapon.assignedItem; 
                    this.#itemWeapon.assignedItem =  bufItem;
                }
                else {
                    this.#itemWeapon.assignedItem = item;
                    inv.getActiveSlot()= new InventorySlot;
                }
                break;
            case 'left-hand':
                if(this.#itemLeftHand!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemLeftHand.assignedItem; 
                    this.#itemLeftHand.assignedItem =  bufItem;
                }
                else {
                    this.#itemLeftHand.assignedItem = item;
                    inv.getActiveSlot()= new InventorySlot;
                }
                break;
            case 'chest':
                if(this.#itemChest!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemChest.assignedItem; 
                    this.#itemChest.assignedItem =  bufItem;
                }
                else {
                    this.#itemChest.assignedItem = item;
                    inv.getActiveSlot()= new InventorySlot;
                }
                break;
            case 'legs':
                if(this.#itemLegs!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemLegs.assignedItem; 
                    this.#itemLegs.assignedItem =  bufItem;
                }
                else {
                    this.#itemLegs.assignedItem = item;
                    inv.getActiveSlot() = new InventorySlot;
                }
                break;
            case 'boots':
                if(this.#itemBoots!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemBoots.assignedItem; 
                    this.#itemBoots.assignedItem =  bufItem;
                }
                else {
                    console.log("2")
                    this.#itemBoots.assignedItem = item;
                    inv.getActiveSlot() = new InventorySlot;
                }
                break;
        }
        player.updateStats(equip);
        player.updateState();
        this.equipDraw();
    }
    unEquipItem(item,inv,equip,player){
        if(player.inBattle()) return;
        inv.addItem(item);
        player.whenUnEquip(item);
        equip.#activeSlot.assignedItem = null;
    }
    getEquipmentStats(){
        let sumStr = 0, sumInt = 0, sumAgi = 0, sumLuck = 0, sumAttack = 0, sumDeffense = 0;
        let eqStats;
        this.slots.forEach(item => {
            if(item.assignedItem!=null){
                if(item.assignedItem.str!=null) sumStr += item.assignedItem.str;
                if(item.assignedItem.int!=null) sumInt += item.assignedItem.int;
                if(item.assignedItem.agi!=null) sumAgi += item.assignedItem.agi;
                if(item.assignedItem.luck!=null) sumLuck += item.assignedItem.luck;
                if(item.assignedItem.getEqType()=="weapon") sumAttack += item.assignedItem.getItemStat();
                else sumDeffense += item.assignedItem.getItemStat();
            }
            
        })
        eqStats=[sumStr,sumInt,sumAgi,sumLuck,sumAttack,sumDeffense]
        return eqStats;
    }
    setActiveSlot(x,y){ 
        this.slots.forEach(element => {        
        if( x >= element.posX && x <= element.posX  + element.dWidth &&
            y >= element.posY && y <= element.posY  + element.dHeight){
            if(this.#activeSlot){
                    this.#activeSlot.isActiveSlot = false;
                    this.#activeSlot = element;
                }
                else{
                    this.#activeSlot = element;
                    
                }
                this.#activeSlot.isActiveSlot = !element.isActiveSlot;
            }
        })       
    }
    firstInit(){
        let ctx = this.#equipCanvas.getContext("2d");
        let equipMan = new Image();
        equipMan.src = "res/equip-man.svg"
        equipMan.onload = function(){
            ctx.drawImage(equipMan,10,10);  
        } 
    }
    equipDraw(){
        this.#itemHead.draw(161,28,null,this.#equipCanvas);
        this.#itemShoulder.draw(80,116,null,this.#equipCanvas);
        this.#itemChest.draw(161,204,null,this.#equipCanvas);
        this.#itemLegs.draw(161,298,null,this.#equipCanvas);
        this.#itemWeapon.draw(14,288,null,this.#equipCanvas);
        this.#itemLeftHand.draw(307,288,null,this.#equipCanvas);
        this.#itemBoots.draw(241,574,null,this.#equipCanvas);
        this.#itemAmulet.draw(175,116,null,this.#equipCanvas,38,38)
    }
    getActiveSlot(){return this.#activeSlot}
    setPopupInfo(){
            let popup = document.getElementsByClassName("inventory-popup")[0];
            if(this.#activeSlot==null||this.#activeSlot.assignedItem==null) {
                popup.style.visibility = "hidden";
                return;
            };
            let popItem = this.#activeSlot.assignedItem;
            let pIName = document.getElementsByClassName("item-name")[0].children[0];
            let imgItem = document.getElementsByClassName("item-info")[0].children[0];
            let atkORdfn = document.getElementsByClassName("attack-defence")[0].children[0];
            let itemStat = document.getElementsByClassName("attack-defence")[0].children[1];
            let patkORdfn = document.getElementsByClassName("attack-defence")[0].children[2];
            let pStr = document.getElementsByClassName("str")[0];
            let pInt = document.getElementsByClassName("int")[0];
            let pAgi = document.getElementsByClassName("agi")[0];
            let pLuck = document.getElementsByClassName("luck")[0];
            let pButton = document.getElementsByClassName("equipB")[0].children[0];
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
            pIName.innerHTML = popItem.name;
            imgItem.style.backgroundImage = "url("+popItem.getBImage()+")";
            if(popItem.getEqType()=="weapon") {atkORdfn.src = "res/atk-icon.svg";patkORdfn.innerHTML="Атака";}
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
            pButton.innerHTML = "Снять";
        
            
    }
    closePopup(){
        let popup = document.getElementsByClassName("inventory-popup")[0];
        popup.style.visibility = "hidden";
        
    }
}