'use strict'
import {Item,EquipmnetItem,InventorySlot,EquipmentSlot} from './itemsANDslots.js'
import {Inventory} from './Inventory.js';
import {Equipment} from './Equipment.js';
import player from './player.js';
let equip = new Equipment;
let inv = new Inventory;

let popButtonSwitch;
let switcher = 0;
let equipItem = document.getElementsByClassName("equipB")[0];
let popup = document.getElementsByClassName("inventory-popup")[0];
let invCanvas =  document.getElementsByClassName("inventory")[0].children[0];
let equipCanvas = document.getElementById("equipment");

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
let item5 = new EquipmnetItem("Кожаный наргудник","chest")
    item5.setChars(2,1,4,0);
    item5.setBImage("res/leather-chest.png");
    item5.setRarity('Common')
    item5.setItemStat(10)

let item6 = new EquipmnetItem("Кожаный щлемак","head");
    item6.setBImage("res/leather-helmet.png");
    item6.setRarity('Uncommon');
    item6.setChars(2,2,2,2);
let item7 = new EquipmnetItem("Кожаный щлемак","head");
    item7.setBImage("res/leather-helmet2.png");
    item7.setRarity('Uncommon');
    item7.setChars(2,2,2,2);
let item8 = new EquipmnetItem("Кожаный щлемак","head");
    item8.setBImage("res/leather-helmet3.png");
    item8.setRarity('Uncommon');
    item8.setChars(2,2,2,2);

document.onload = equip.firstInit();
document.onload = equip.equipDraw();
document.onload = inv.firstInit();
inv.addItem(item1)
inv.addItem(item2)
inv.addItem(item3)
inv.addItem(item4)
inv.addItem(item5)
inv.addItem(item6)
inv.addItem(item7)
inv.addItem(item8)
document.onload = inv.drawInv();

/**************Выбор предмета*********************/
invCanvas.addEventListener("click",function(e){
    let bufSlot;
    let rect = invCanvas.getBoundingClientRect();
        let x = e.clientX-rect.left,
            y = e.clientY-rect.top;
        let popX = e.pageX,
            popY = e.pageY;
        if(popX>=1300) popX=1200;
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
    equip.equipItem(inv.getActiveSlot().assignedItem,inv,equip);
    inv.closePopup();
    equip.equipDraw()
    inv.drawInv();
})

equipCanvas.addEventListener('click',function(e){
    let bufSlot;
    let rect = equipCanvas.getBoundingClientRect();
        let x = e.clientX-rect.left,
            y = e.clientY-rect.top;
        let popX = e.pageX,
            popY = e.pageY;
        
        equip.setActiveSlot(x,y);
    if (x >=  equip.getActiveSlot().posX && x <= equip.getActiveSlot().posX  + equip.getActiveSlot().dWidth &&
         y >= equip.getActiveSlot().posY && y <= equip.getActiveSlot().posY  + equip.getActiveSlot().dHeight){
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
        
            
    }
    else {
        switcher = 0
        popup.style.visibility = "hidden";
    }
    popButtonSwitch = 1;
    equip.setPopupInfo();
    equip.equipDraw(); 
})
equipCanvas.addEventListener("dblclick",function(){
    equip.unEquipItem(equip.getActiveSlot().assignedItem,inv)
    player.updateStats(equip);
    player.updateState();
    equip.closePopup();
    equip.equipDraw()
    inv.drawInv();
})

popup.addEventListener("click",function(){
    player.updateState();

})

equipItem.addEventListener('click',function(){
    if(popButtonSwitch==0){
        equip.equipItem(inv.getActiveSlot().assignedItem,inv,equip);
        inv.closePopup();
        equip.equipDraw()
        inv.drawInv();
    }
    else {
        equip.unEquipItem(equip.getActiveSlot().assignedItem,inv,equip,equip)
        player.updateStats(equip);
        player.updateState();
        equip.closePopup();
        equip.equipDraw()
        inv.drawInv();
    }
})

