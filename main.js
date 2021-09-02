'use strict'
import {Item,EquipmnetItem,InventorySlot,EquipmentSlot,Potion} from './itemsANDslots.js'
import {Inventory} from './Inventory.js';
import {Equipment} from './Equipment.js';
import {Player} from './player.js';
import { Generator } from './generators.js';

let equip = new Equipment;
let inv = new Inventory;
let player = new Player(
    sessionStorage.getItem("str"),
    sessionStorage.getItem("int"),
    sessionStorage.getItem("agi"),
    sessionStorage.getItem("luck"),
);
let popButtonSwitch;
let switcher = 0;
let equipItem = document.getElementsByClassName("equipB")[0];
let popup = document.getElementsByClassName("inventory-popup")[0];
let invCanvas =  document.getElementsByClassName("inventory")[0].children[0];
let equipCanvas = document.getElementById("equipment");

/******************ПРЕДМЕТЫ*******************/

document.onload = equip.firstInit();
document.onload = inv.firstInit();

let bufSlot;
/**************Выбор предмета*********************/
invCanvas.addEventListener("click",function(e){
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
        console.log(inv.getActiveSlot())
        inv.drawInv();
})
// invCanvas.addEventListener('dblclick',function(){
//     equip.equipItem(inv.getActiveSlot().assignedItem,inv,equip,player);
//     inv.closePopup();
//     equip.equipDraw()
//     inv.drawInv();
// })

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
// equipCanvas.addEventListener("dblclick",function(){
//     equip.unEquipItem(equip.getActiveSlot().assignedItem,inv,equip,player)
//     player.updateStats(equip);
//     player.updateState();
//     equip.closePopup();
//     equip.equipDraw()
//     inv.drawInv();
// })


equipItem.addEventListener('click',function(){
    if(popButtonSwitch==0){
        equip.equipItem(inv.getActiveSlot().assignedItem,inv,equip,player);
        inv.closePopup();
        equip.equipDraw()
        inv.drawInv();
    }
    else {
        equip.unEquipItem(equip.getActiveSlot().assignedItem,inv,equip,player)
        player.updateStats(equip);
        player.updateState();
        equip.closePopup();
        equip.equipDraw()
        inv.drawInv();
    }
})

let closeInv = document.getElementsByClassName("closeB")[0];
closeInv.addEventListener("click",function(){
    let invShadow =document.getElementsByClassName("inventory-shadow")[0];
    invShadow.style.display="none"
})
let potion = new Potion("Зелье здоровья","Potion","res/temp/heal.png","HP",10)
let potion1 = new Potion("Зелье выносливости","Potion","res/staminaP.png","HP",10)
let gener = new Generator;
let enemy = gener.generateEnemy(1,5)
for (let i = 0; i<11;i++){
    inv.addItem(potion)
    inv.addItem(potion1)


}
for(let i = 0; i < 15; i++){
let newItem = gener.generateItem(enemy);
if(newItem != "nothing") inv.addItem(newItem)
}

document.onload = equip.equipDraw();
document.onload = inv.drawInv();
