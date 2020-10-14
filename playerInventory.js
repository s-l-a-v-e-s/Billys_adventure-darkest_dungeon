
var canvas = document.getElementById("playerInventory");
var context = canvas.getContext('2d');

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
var slotsImg = 
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
var drawInvSlot = function(source,x,y,width,height){
	let img = new Image();
	if(source==''||source==null)
	{
		img.src = "res/cobble.png";
	}
	else{
		img.src = source;
	}
	img.onload = function(){
		context.drawImage(img, x, y, width, height);
	}		
}
var InventorySlot = function(source,x,y,width,height){
	this.source = source;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.selected = false;
}

InventorySlot.prototype = {
	draw: function(){
		drawInvSlot(this.source,this.x,this.y,this.width,this.height);
	},
	select:function(){
		this.selected =!this.selected;
	}
}
function createInventory(){
	for(let i=0;i<8;i++){
		for(let k=0;k<6;k++){
			inventorySlots[i][k]=new InventoryItem('','','',false,0);
			slotsImg[i][k] = new InventorySlot(inventorySlots[i][k].img,64+i*70,60+k*70,64,64);
		}
	}
	slotsImg[0][0].source = "res/mage.png"
}


	function drawInventory(){
		for(let i=0;i<8;i++){
			for(let k=0;k<6;k++){
				
				slotsImg[i][k].draw();
				}
			}
		}

	var isSlotInMousePos = function(x,y,invSlot){
		if( x > invSlot.x && x < invSlot.x + invSlot.width &&
			y > invSlot.y && y < invSlot.y + invSlot.height){
				return true;
			}

	}

	canvas.onclick = function(e){
		console.log(e);
		var x = e.layerX,
			y = e.layerY;
		for(let i=0;i<8;i++){
			for(let k=0;k<6;k++){
				if(isSlotInMousePos(x,y,slotsImg[i][k])){
						slotsImg[i][k].select();
						slotsImg[i][k].source = 'res/mage.png';
						console.log(slotsImg[i][k].source);
						console.log(slotsImg[i][k].selected);
					}
				}
			}
		drawInventory();
	}
	




