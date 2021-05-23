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
export class EquipmnetItem extends Item {
    /*тип эквипа*/
    #eqType;
    str=0;
    int=0;
    agi=0;
    luck=0;
    #itemStat = 0;
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
    setItemStat(stat){ this.#itemStat = stat}
    getItemStat(){return this.#itemStat}
    
} class Slot{
    assignedItem;
    dWidth=65;
    dHeight=65;
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
            context.clearRect(posX,posY,65,65);
            if(bool) context.drawRoundedImage(img,10,posX,posY,65,65);
            else context.drawRoundedImage(img,7,posX,posY,65,65);
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
    isActiveSlot=false;
    setActive(){this.activeSlot=true}
    isActive(){return this.isActiveSlot}
}
export class EquipmentSlot extends Slot{
    isActiveSlot=false;
    setActive(){this.activeSlot=true}
    isActive(){return this.isActiveSlot}
}
