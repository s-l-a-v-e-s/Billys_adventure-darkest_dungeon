'use strict';
let switcher = 0;
let popup = document.getElementsByClassName("inventory-popup")[0];
let invCanvas =  document.getElementsByClassName("inventory")[0].children[0];
class Item{
    #stackable;
    #usable;
    #eqiupable;
    #bImage;
    constructor(name){
        this.name = name;
    }
    setBImage(image){
        this.#bImage = image;
    }
    getBImage(){return this.#bImage}
}
class EquipmnetItem extends Item {
    /*тип эквипа*/
    #eqType;
    str=0;
    int=0;
    agi=0;
    luck=0;
    #rarity;
    constructor(name,equipmnetType){
        super(name)
        this.#eqType = equipmnetType;
    }
    setChars(str,int,agi,luck){
        this.str = str;
        this.int = int;
        this.agi = agi;
        this.luck = luck;
    }
    setRarity(rarity){this.#rarity=rarity}
    getRarity(){return this.#rarity}
    getEqType(){return this.#eqType}
  
    
}
class Slot{
    assignedItem;
    dWidth=70;
    dHeight=70;
    bImage="res/slot.svg";
    posX;
    posY;
    draw(posX,posY,active){
        let canvas = document.getElementsByClassName("inventory")[0].children[0];
        let context = canvas.getContext('2d');
        let img = new Image();
        if(this.assignedItem!=null) img.src = this.assignedItem.getBImage();
        else img.src = this.bImage; 
        this.posX = posX;
        this.posY = posY;
        img.onload = function(){
            context.clearRect(posX,posY,69,69)
            context.drawImage(img,posX,posY,65,65); 
        }
        if(active) {
            img.src = "res/active-border.svg";
            img.onload = function(){
                context.drawImage(img,posX,posY); 
            }
        }
    }
}


class InventorySlot extends Slot {
    isActiveSlot=false;
    setActive(){this.activeSlot=true}
    isActive(){return this.isActiveSlot}
}

class Inventory{
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
                this.#itemMas[i][d].draw(0+d*69,0+i*69,this.#itemMas[i][d].isActive()==true);
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
    setPopupInfo(){
        if(this.#activeSlot.assignedItem==null) {
            popup.style.visibility = "hidden";
            return
        };
        let popItem = this.#activeSlot.assignedItem;
        let pIName = document.getElementsByClassName("item-name")[0].children[0];
        let pIType = document.getElementsByClassName("item-type")[0].children[0];
        let imgItem = document.getElementsByClassName("item-info")[0].children[0];
        let atkORdfn = document.getElementsByClassName("attack-defence")[0].children[0];
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
        /*********Сила**********/
        if(popItem.str > 0){
            pStr.style.color = "#90CC54";
            pStr.innerHTML = "+"+popItem.str;
        }
        else if(popItem.str < 0){
            pStr.style.color = "#E37171";
            pStr.innerHTML = popItem.str;
        }
        /*********Интелект**********/
        if(popItem.int > 0){
            pInt.style.color = "#90CC54";
            pInt.innerHTML = "+"+popItem.int;
        }
        else if(popItem.int < 0){
            pInt.style.color = "#E37171";
            pInt.innerHTML = popItem.int;
        }
        /*********Ловкость**********/
        if(popItem.agi > 0){
            pAgi.style.color = "#90CC54";
            pAgi.innerHTML = "+"+popItem.agi;
        }
        else if(popItem.agi < 0){
            pAgi.style.color = "#E37171";
            pAgi.innerHTML = popItem.agi;
        }
        /*********Удача**********/
        if(popItem.luck > 0){
            pLuck.style.color = "#90CC54";
            pLuck.innerHTML = "+"+popItem.luck;
        }
        else if(popItem.luck < 0){
            pLuck.style.color = "#E37171";
            pLuck.innerHTML = popItem.luck;
        }
    
    }
    /*Получить массив инвентаря*/
    getItemMas(){return this.#itemMas}
    /*Получить активный слот*/
    getActiveSlot(){return this.#activeSlot}
}


/******************ПРЕДМЕТЫ*******************/
let item1 = new EquipmnetItem ("Кираса","chest");
    item1.setChars(2,0,-1,0);
    item1.setBImage("res/icon.png");
    item1.setRarity("Common")
let item2 = new EquipmnetItem ("Обоссанный щит","left-hand");
    item2.setChars(15,0,-2,-5);
    item2.setBImage("res/shield.png");
    item2.setRarity("Rare")
let item3 = new EquipmnetItem ("Обоссанный меч","weapon");
    item3.setChars(7,1,-2,1);
    item3.setBImage("res/sword.png");
    item3.setRarity("Epic")
let item4 = new EquipmnetItem ("♂Анец♂","head");
    item4.setChars(1000,-1000,1000,-1000);
    item4.setBImage("res/anec.gif");
    item4.setRarity("Legendary")
    



let inv = new Inventory;
document.onload = inv.firstInit();
inv.addItem(item1)
inv.addItem(item2)
inv.addItem(item3)
inv.addItem(item4)
document.onload = inv.drawInv();
let bufSlot;


invCanvas.addEventListener("click",function(e){
    let rect = this.getBoundingClientRect();
    let x = e.clientX-rect.left,
        y = e.clientY-rect.top;
    let popX = e.pageX,
        popY = e.pageY;
    inv.setActiveSlot(x,y)
    inv.drawInv();
    if(switcher==0){
        popup.style.left = popX+5+"px";
        popup.style.top = popY+5+"px";
        popup.style.visibility = "visible";
        switcher=1;
        bufSlot = inv.getActiveSlot();
        inv.setPopupInfo();
    }    
    else {
        if(bufSlot==inv.getActiveSlot()){
            popup.style.visibility = "hidden";
        }
        else{
            popup.style.left = popX+5+"px";
            popup.style.top = popY+5+"px";
            popup.style.visibility = "visible";
            inv.setPopupInfo(); 
        }
        switcher=0;
    }   
})


let close1 = document.getElementsByClassName("close-button")[0];
close1.addEventListener('click',function(){
    document.getElementsByClassName("inventory-shadow")[0].style.display = "none";
})

let open1 = document.getElementsByClassName("open-button")[0];
open1.addEventListener('click',function(){
    document.getElementsByClassName("inventory-shadow")[0].style.display = "unset";
})


