
var canvas = document.getElementById("playerInventory");
var context = canvas.getContext('2d');
var active;
var invWidth = 8;
var invHeight = 6;
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

	 
	 
	
		// var scale = 'scale(0.75)';
		
		// document.body.style.msTransform =  scale;
	   	// document.body.style.transform = scale;

function drawInvSlot(source,x,y,width,height){
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


function switchItemDescInformation(item) {
	document.getElementById("descItem_img").src = item.img;
	document.getElementById("descItem_name").innerHTML = item.name;
	document.getElementById("descItem_description").innerHTML = item.description;
}

function setActiveBorder(x,y,width,height){
	context.strokeRect(x, y, width, height);
}

var InventorySlot = function(source,x,y,width,height){
	this.source = source;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.selected = false;
	quantity=0;
}

InventorySlot.prototype = {
	draw: function(){
		drawInvSlot(this.source,this.x,this.y,this.width,this.height);
	},
	select:function(){
		this.selected =!this.selected;
	},
	setBorder:function(){
		setActiveBorder(this.x,this.y,this.width,this.height);
	}
}
function createInventory(){
	for(let i=0;i<invWidth;i++){
		for(let k=0;k<invHeight;k++){
			inventorySlots[i][k]=new InventoryItem('','','',null,0);
			slotsImg[i][k] = new InventorySlot(inventorySlots[i][k].img,89+k*45,20+i*45,40,40);
		}
	}
}


	function drawInventory(){
		for(let i=0;i<invWidth;i++){
			for(let k=0;k<invHeight;k++){
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

	var addItemToInv = function(item){
	if(inventorySlots[7][5].name==''||inventorySlots[7][5].name==null){
		
		if(item.stack>1){
			for(let d=0;d<invWidth;d++){
				for(let c=0;c<invHeight;c++){
					if(item.name==inventorySlots[d][c].name && inventorySlots[d][c].quantity<item.stack){
						console.log(1);
						inventorySlots[d][c].quantity++;
						return;
						}
					else if((item.name==inventorySlots[d][c].name && inventorySlots[d][c].quantity==item.stack)||inventorySlots[d][c].stack==0){
						console.log(inventorySlots[d][c].quantity);
						for(let r=0;r<invWidth;r++){
							for(let z=0;z<invHeight;z++){
								if(inventorySlots[r][z].name==null||inventorySlots[r][z].name==''){
								inventorySlots[r][z]=item;
								slotsImg[r][z].source=item.img;
								inventorySlots[r][z].quantity=1;
								return;
								}
							}
						}
					}
					}	
				}
			}	
	}
	else{
		console.log('invFull');
		return 0;
	}
}


	var buffed=0;
	context.strokeStyle='red';
	canvas.onclick = function(e){
		console.log(e);
		var rect = this.getBoundingClientRect();
		var x = e.clientX-rect.left,
			y = e.clientY-rect.top;
		for(let i=0;i<invWidth;i++){
			for(let k=0;k<invHeight;k++){
				if(isSlotInMousePos(x,y,slotsImg[i][k])){
						if(buffed){
							context.clearRect(buffed.x-1,buffed.y-1,buffed.width+2,buffed.height+2);
							buffed.selected = false;
							buffed = slotsImg[i][k];
						}
						else{buffed = slotsImg[i][k];}
						slotsImg[i][k].select();
						slotsImg[i][k].setBorder();
						switchItemDescInformation(inventorySlots[i][k]);
						if(inventorySlots[i][k].name!=null||inventorySlots[i][k].name!=''){
							console.log(inventorySlots[i][k]);
						}
						drawInventory();	
				}
			}
		}
		
	}




