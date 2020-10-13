inventoryCanvas = document.getElementById("playerInventory");
var inventorySlots = 
[
	[[],[],[],[],[],[]],
	[[],[],[],[],[],[]],
	[[],[],[],[],[],[]],
	[[],[],[],[],[],[]],
	[[],[],[],[],[],[]],
	[[],[],[],[],[],[]],
	[[],[],[],[],[],[]],
	[[],[],[],[],[],[]],
]




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

	enableBattleEffects() {
		
	}

	enablePassiveEffects() {
		
	}

	//Методы наложения эффектов на хар-ки персонажей
	//Предполагается, что при каждом действии будут проверяться слоты экипировки и вызываться эти методы
	//Например: Амулет самого быстрого dick'a на dick'ом западе вешает бусты к скорости отката cumming из посоха
	//Происходит удар игрока по slav'у и в этот момент срабатывает метод enableBattleEffects, в котором прописано player.cumAttackCooldown *= 0,5


}
function createInventory(){
	for(let i=0;i<8;i++){
		for(let k=0;k<6;k++){
			inventorySlots[i][k]=new InventoryItem('','res/cobble.png','',false,0);

		}
	}
	inventorySlots[5][5] = new InventoryItem('any','res/mage.png','',false,0);
	
	
}

function drawInventory(){
	let canvas = document.getElementById("playerInventory");
	let context = canvas.getContext('2d');
	imgPath = new Path2D();

	for(let i=0;i<8;i++){
		for(let k=0;k<6;k++){
				let img = new Image();
				imgPath = inventorySlots[i][k].img;
				img.src = imgPath;
				img.onload = function(){
					context.drawImage(img, 0+i*32, 0+k*32,32,32);
				}		
		}
	}


}


