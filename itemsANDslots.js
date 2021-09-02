'use strict'
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
export class Item{
    #stackable = false;
    #usable = false;
    bImage;
    constructor(name,bImage){
        this.name = name;
        this.setBImage(bImage)
    }
    setBImage(image){this.bImage = image;}
    getBImage(){return this.bImage}
    setStackable(){this.#stackable = true}
    setUsable(){this.#usable = true}
    isStackable(){return this.#stackable}
    isUsable(){return this.#usable}
}
export class EquipmnetItem extends Item {
    /*тип эквипа*/
    eqType;
    str=0;
    int=0;
    agi=0;
    luck=0;
    #itemStat = 0;
    #rarity = "Common";
    constructor(name,equipmnetType,Img){
        super(name,Img)
        this.eqType = equipmnetType;
    }
    setChars(str,int,agi,luck,rarity,itemStat){
        let scale = 1
        this.#rarity = rarity;
        if(rarity=="Uncommon") scale = 2;
        if(rarity=="Rare") scale = 3;
        if(rarity=="Epic") scale = 4;
        if(rarity=="Legendary") scale = 5;
        this.str = str+2*scale;
        this.int = int+2*scale;
        this.agi = agi+2*scale;
        this.luck = luck+2*scale;
        this.#itemStat = itemStat*0.5*scale;
    }
    getRarity(){return this.#rarity}
    getEqType(){return this.eqType}
    setItemStat(stat){ this.#itemStat = stat}
    getItemStat(){return this.#itemStat}

}



class ConsumableItem extends Item{
    eqType;
    resource;
    #itemStat;
    constructor(name,equipmnetType,img,resource,amount){
        super(name,img)
        this.setStackable();
        this.setUsable();
        this.eqType = equipmnetType;
        this.resource = resource;
        this.#itemStat = amount;
    }
    /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/ 
    useItem(player,potion){
        switch (this.resource){
            case "HP":
                if(player.health +potion.getItemStat()>=player.getMaxHp()){
                    player.health = player.getMaxHp();
                }
                else    
                break;
        }
    }
    getItemStat(){return this.#itemStat}
}
export class Potion extends ConsumableItem{
    #rarity = "Common";
    constructor(name,equipmnetType,img,resource,itemStat){
        super(name,equipmnetType,img,resource,itemStat)

    }
    getRarity(){return this.#rarity}
    getEqType(){return this.eqType}
    
}







class Slot{
    assignedItem = null;
    dWidth=65;
    dHeight=65;
    bImage="res/slot.svg";
    posX;
    posY;
    draw(posX,posY,active,canvas,w,h){
        w = typeof w !== 'undefined' ? w:64;
        h = typeof h !== 'undefined' ? h:64;
        let bool = false
        let context = canvas.getContext('2d');
        let source;
        let img = new Image();
        if(this.assignedItem!=null) {
            img.src = this.assignedItem.bImage;
            bool = true;
            if(this.assignedItem!=null){
                switch(this.assignedItem.getRarity()){
                    case "Common":
                        source = "res/commonBorder.svg"
                        break;
                    case "Uncommon":
                        source = "res/uncommonBorder.svg"
                        break;
                    case "Rare":
                        source = "res/rareBorder.svg"
                        break;
                    case "Epic":
                        source = "res/epicBorder.svg"
                        break;
                    case "Legendary":
                        source = "res/legendaryBorder.svg"
                        break;
                }
            }
        }
        else img.src = this.bImage; 
        this.posX = posX;
        this.posY = posY;

        img.onload = function(){
            context.clearRect(posX,posY,w+1,h+1);
            if(bool) {
                context.drawRoundedImage(img,11,posX,posY,w,h);
                img.src = source;
                img.onload = function(){
                    context.drawImage(img,posX,posY);
                }
            }
            else context.drawRoundedImage(img,7,posX,posY,w,h);
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


export class InventorySlot extends Slot {
    Stack = 1;
    maxStack = 10;
    isActiveSlot=false;
    setActive(){this.activeSlot=true}
    isActive(){return this.isActiveSlot}
}
export class EquipmentSlot extends Slot{
    isActiveSlot=false;
    setActive(){this.activeSlot=true}
    isActive(){return this.isActiveSlot}
}
