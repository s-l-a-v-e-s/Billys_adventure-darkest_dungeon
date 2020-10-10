inventoryCanvas = document.getElementById("playerInventory");

class Item{
    constructor(name,img,description){
        this.name = name;
        this.img = img;
        this.description = description;
    }
}

class InventoryItem extends Item {
    constructor(name,img,description,consumable,stack) {
        super(name,img,description);
        this.consumable = consumable;
        this.stack = stack;
    }
}


class EquipmentItem extends Item {
	constructor(name, img, description){
		super(name, img, description);

	}

	//Методы наложения эффектов на хар-ки персонажей
	//Предполагается, что при каждом действии будут проверяться слоты экипировки и вызываться эти методы
	//Например: Амулет самого быстрого dick'a на dick'ом западе вешает бусты к скорости отката cumming из посоха
	//Происходит удар игрока по slav'у и в этот момент срабатывает метод enableBattleEffects, в котором прописано player.cumAttackCooldown *= 0,5

	/*function enableBattleEffects() {
		
	}

	function enablePassiveEffects() {
		
	}*/
}

function draw(){
	var ctx = document.getElementById("playerInventory").getContext('2d');
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.msImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	var width=675;
	var height=925;
	if(inventoryCanvas.getContext){


	}
setInterval(draw(),1000);

