'use strict';
CanvasRenderingContext2D.prototype.drawRoundedImage = function(image, radius, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
	var x = dx || sx;
	var y = dy || sy;
	var width =  dWidth || sWidth || image.naturalWidth;
	var height = dHeight || sHeight || image.naturalHeight;
	var r = {topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0};

	if(!Array.isArray(radius)){
		radius = [radius];
	}

	r.topLeft = radius[0];
	r.topRight = radius[1] || (radius[1]===undefined) * radius[0];
	r.bottomRight = radius[2] || (radius[2]===undefined) * radius[0];
	r.bottomLeft = radius[3] || (radius[3]===undefined) * (radius[1] || (radius[1]===undefined) * radius[0]);

	this.beginPath();
	this.arc(x + r.topLeft, y + r.topLeft, r.topLeft, Math.PI, Math.PI + Math.PI / 2);
	this.lineTo(x + width - r.topRight, y);
	this.arc(x + width - r.topRight, y + r.topRight, r.topRight, Math.PI + Math.PI/2, Math.PI*2);
	this.lineTo(x + width, y + height - r.bottomRight);
	this.arc(x + width - r.bottomRight, y + height - r.bottomRight, r.bottomRight, Math.PI*2, Math.PI/2);
	this.lineTo(x + r.bottomLeft, y + height);
	this.arc(x + r.bottomLeft, y + height - r.bottomLeft, r.bottomLeft, Math.PI/2, Math.PI);
	this.closePath();
	this.save();
	this.clip();

	switch(true){
		case arguments.length > 6:
			this.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);			
		break;

		case arguments.length > 4:
			this.drawImage(image, sx, sy, sWidth, sHeight);			
		break;

		default:
			this.drawImage(image, sx, sy);			
		break;
	}

	this.restore();
}

let popButtonSwitch;
let switcher = 0;
let popup = document.getElementsByClassName("inventory-popup")[0];
let invCanvas =  document.getElementsByClassName("inventory")[0].children[0];
let equipCanvas = document.getElementById("equipment");
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
    draw(posX,posY,active,canvas){
        let bool = false
        let context = canvas.getContext('2d');
        let img = new Image();
        if(this.assignedItem!=null) {
            img.src = this.assignedItem.getBImage();
            bool = true;
        }
        else img.src = this.bImage; 
        this.posX = posX;
        this.posY = posY;
        img.onload = function(){
            context.clearRect(posX,posY,66,66);
            if(bool) context.drawRoundedImage(img,10,posX,posY,65,65);
            else context.drawImage(img,posX,posY,65,65);
            if(active) {
                img.src = "res/active-border.svg";
                img.onload = function(){
                    context.drawImage(img,posX,posY); 
                }
            }
        }
        }
    setPosition(x,y){
        this.posX = x;
        this.posY = y;
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
                this.#itemMas[i][d].draw(0+d*69,0+i*69,this.#itemMas[i][d].isActive(),invCanvas);
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
        popup.style.visibility = "hidden";
        switcher = 0;
    }
    chooseSlot(e){
        
    }
    /*Получить массив инвентаря*/
    getItemMas(){return this.#itemMas}
    /*Получить активный слот*/
    getActiveSlot(){return this.#activeSlot}
}

class Equipment {
    #itemHead = new Slot();
    #itemShoulder = new Slot;
    #itemAmulet  = new Slot;
    #itemWeapon  = new Slot;
    #itemLeftHand  = new Slot;
    #itemChest  = new Slot;
    #itemLegs  = new Slot;
    #itemBoots  = new Slot;
    slots=[this.#itemHead,this.#itemShoulder,this.#itemAmulet,this.#itemWeapon,this.#itemLeftHand,this.#itemChest,this.#itemLegs,this.#itemBoots]
    #activeSlot;
    equipItem(item){
        let bufItem; 
        switch (item.getEqType()){
            case 'head':
                if(this.#itemHead!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemHead.assignedItem; 
                    this.#itemHead.assignedItem = bufItem;
                }
                else {
                    this.#itemHead.assignedItem = item;
                    inv.getActiveSlot().assignedItem = null;
                }
                break;
            case 'shoulder':
                if(this.#itemShoulder!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemShoulder; 
                    this.#itemShoulder.assignedItem =  bufItem;
                }
                else {
                    this.#itemShoulder.assignedItem = item;
                    inv.getActiveSlot().assignedItem = null;
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
                    inv.getActiveSlot().assignedItem = null;
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
                    inv.getActiveSlot().assignedItem = null;
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
                    inv.getActiveSlot().assignedItem = null;
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
                    inv.getActiveSlot().assignedItem = null;
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
                    inv.getActiveSlot().assignedItem = null;
                }
                break;
            case 'boots':
                if(this.#itemBoots!=null){
                    bufItem = inv.getActiveSlot().assignedItem;
                    inv.getActiveSlot().assignedItem = this.#itemBoots; 
                    this.#itemBoots.assignedItem =  bufItem;
                }
                else {
                    this.#itemBoots.assignedItem = item;
                    inv.getActiveSlot().assignedItem = null;
                }
                break;
        }
    }
    unEquipItem(item){
        inv.addItem(item);
        equip.#activeSlot.assignedItem = null;
    }
    setActiveSlot(x,y){
        this.slots.forEach(element => {
            if( x >= element.posX && x <= element.posX  + element.dWidth &&
                y >= element.posY && y <= element.posY  + element.dHeight){
                    console.log(element)
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
        let ctx = equipCanvas.getContext("2d");
        let equipMan = new Image();
        equipMan.src = "res/equip-man.svg"
        equipMan.onload = function(){
            ctx.drawImage(equipMan,10,10);  
        } 
    }
    equipDraw(){
        this.#itemHead.draw(161,28,null,equipCanvas);
        this.#itemShoulder.draw(80,116,null,equipCanvas);
        this.#itemChest.draw(161,204,null,equipCanvas);
        this.#itemLegs.draw(161,298,null,equipCanvas);
        this.#itemWeapon.draw(14,288,null,equipCanvas);
        this.#itemLeftHand.draw(307,288,null,equipCanvas);
        this.#itemBoots.draw(241,574,null,equipCanvas);

    }
    getActiveSlot(){return this.#activeSlot}
    setPopupInfo(){
        if(this.#activeSlot.assignedItem==null) {
            popup.style.visibility = "hidden";
            
        }
            let popItem = this.#activeSlot.assignedItem;
            if(popItem == null) return;
            let pIName = document.getElementsByClassName("item-name")[0].children[0];
            let pIType = document.getElementsByClassName("item-type")[0].children[0];
            let imgItem = document.getElementsByClassName("item-info")[0].children[0];
            let atkORdfn = document.getElementsByClassName("attack-defence")[0].children[0];
            let patkORdfn = document.getElementsByClassName("attack-defence")[0].children[2];
            let pStr = document.getElementsByClassName("str")[0];
            let pInt = document.getElementsByClassName("int")[0];
            let pAgi = document.getElementsByClassName("agi")[0];
            let pLuck = document.getElementsByClassName("luck")[0];
            let pButton = document.getElementsByClassName("equipB")[0].children[0];
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
        popup.style.visibility = "hidden";
        switcher = 0;
    }
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
let item4 = new EquipmnetItem ("Меч Анн Чоуса","weapon");
    item4.setChars(1000,-1000,1000,-1000);
    item4.setBImage("res/anec-sword.png");
    item4.setRarity("Legendary")
    



let inv = new Inventory;
let equip = new Equipment;
document.onload = equip.firstInit();
document.onload = equip.equipDraw();
document.onload = inv.firstInit();
inv.addItem(item1)
inv.addItem(item2)
inv.addItem(item3)
inv.addItem(item4)
document.onload = inv.drawInv();
let bufSlot;
/**************Выбор предмета*********************/
invCanvas.addEventListener("click",function(e){
    let rect = invCanvas.getBoundingClientRect();
        let x = e.clientX-rect.left,
            y = e.clientY-rect.top;
        let popX = e.pageX,
            popY = e.pageY;
        inv.setActiveSlot(x,y)
        if(switcher==0){
            popup.style.left = popX+5+"px";
            popup.style.top = popY+5+"px";
            popup.style.visibility = "visible";
            switcher=1;
            bufSlot = inv.getActiveSlot();
        }    
        else {
            if(bufSlot==inv.getActiveSlot()){
                popup.style.visibility = "hidden";
            }
            else{
                popup.style.left = popX+5+"px";
                popup.style.top = popY+5+"px";
                popup.style.visibility = "visible";
            }
            switcher=0;
        } 
        popButtonSwitch = 0;
        inv.setPopupInfo();
        inv.drawInv();
})
invCanvas.addEventListener('dblclick',function(){
    equip.equipItem(inv.getActiveSlot().assignedItem);
    inv.closePopup();
    equip.equipDraw()
    inv.drawInv();
})
       



equipCanvas.addEventListener('click',function(e){
    let rect = equipCanvas.getBoundingClientRect();
        let x = e.clientX-rect.left,
            y = e.clientY-rect.top;
        let popX = e.pageX,
            popY = e.pageY;
        
        equip.setActiveSlot(x,y)
        
       
        if(switcher==0){
            popup.style.left = popX+5+"px";
            popup.style.top = popY+5+"px";
            popup.style.visibility = "visible";
            switcher=1;
            bufSlot = equip.getActiveSlot();
        }    
        else {
            if(bufSlot==equip.getActiveSlot()){
                popup.style.visibility = "hidden";
            }
            else{
                popup.style.left = popX+5+"px";
                popup.style.top = popY+5+"px";
                popup.style.visibility = "visible";
            }
            switcher=0;
        }
        popButtonSwitch = 1;
        equip.setPopupInfo();
        equip.equipDraw();
})
equipCanvas.addEventListener("dblclick",function(){
    equip.unEquipItem(equip.getActiveSlot().assignedItem)
    equip.closePopup();
    equip.equipDraw()
    inv.drawInv();
})


let equipItem = document.getElementsByClassName("equipB")[0];
equipItem.addEventListener('click',function(){
    if(popButtonSwitch==0){
        equip.equipItem(inv.getActiveSlot().assignedItem);
        inv.closePopup();
        equip.equipDraw()
        inv.drawInv();
    }
    else {
        equip.unEquipItem(equip.getActiveSlot().assignedItem)
        equip.closePopup();
        equip.equipDraw()
        inv.drawInv();
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

