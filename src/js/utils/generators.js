'use strict'
import {Slime,IntermediateSlime,BigSlime,Skeleton,SkeletonArcher,Goblin,ThugGoblin,
        Orc,HeavySlave,Slave} from './Enemy.js';
import { EquipmnetItem } from './itemsANDslots.js';

let LeatherArmor = [];
    LeatherArmor.push(new EquipmnetItem("Кожаный капюшон","head","res/leather-helmet.png"));
    LeatherArmor.push(new EquipmnetItem("Кожаный плащ","shoulder","res/leather-shoulder.png"));
    LeatherArmor.push(new EquipmnetItem("Кожаная портупея","chest","res/leather-chest.png"));
    LeatherArmor.push(new EquipmnetItem("Кожаный бандаж","legs"));
    LeatherArmor.push(new EquipmnetItem("Кожаные шлепанцы","boots","res/leather-boots.png"));
let ClothArmor = [];
    ClothArmor.push(new EquipmnetItem("Тканевый берет","head","res/temp/cHead.png"));
    ClothArmor.push(new EquipmnetItem("Тканевый шарф","shoulder","res/temp/cShoulder.png"));
    ClothArmor.push(new EquipmnetItem("Тканевая роба с вырезом","chest","res/temp/cChest.png"));
    ClothArmor.push(new EquipmnetItem("Тканевый кильт","legs","res/temp/cLegs.png"));
    ClothArmor.push(new EquipmnetItem("Тканевые лодочки","boots","res/temp/cBoots.png"));
let HeavyArmor = [];
    HeavyArmor.push(new EquipmnetItem("Шлем с вырезом для ушей","head","res/temp/cHead.png"));
    HeavyArmor.push(new EquipmnetItem("Наплечники из фольги","shoulder","res/temp/cShoulder.png"));
    HeavyArmor.push(new EquipmnetItem("Партупея с железными пластинами","chest","res/temp/cChest.png"));
    HeavyArmor.push(new EquipmnetItem("Желензые пэнтс","legs","res/temp/cLegs.png"));
    HeavyArmor.push(new EquipmnetItem("Кальчужные носки","boots","res/temp/cBoots.png"));

export class Generator{
    generateEnemy(layer,floor){
        let enemy;
        let randMob = Math.floor(Math.random() * 4) + 1;
        switch (layer){
            case 1:
                switch (floor){
                    case 1:
                        if(randMob >= 2) enemy = new Slime;
                        else enemy = new IntermediateSlime;
                        break;
                    case 2:
                        if(randMob>2) enemy = new Slime;
                        else if (randMob < 2) enemy = new IntermediateSlime;
                        else enemy = new BigSlime;
                        break;
                    case 3:
                        if(randMob>2) enemy = new Slime;
                        else if (randMob < 2) enemy = new IntermediateSlime;
                        else enemy = new BigSlime;
                        break;
                    case 4:
                        if(randMob >= 2) enemy = new BigSlime;
                        else enemy = new Skeleton;
                        break;
                    case 5:
                        if(randMob>2) enemy = new BigSlime;
                        else if (randMob < 2) enemy = new Skeleton;
                        else enemy = new SkeletonArcher;
                }
                break;
            case 2:
                switch (floor){
                    case 1:
                        if(randMob >= 2) enemy = new Skeleton;
                        else enemy = new SkeletonArcher;
                        break;
                    case 2:
                        if(randMob>2) enemy = new Skeleton;
                        else if (randMob < 2) enemy = new SkeletonArcher;
                        else enemy = new Goblin;
                        break;
                    case 3:
                        if(randMob>2) enemy = new Skeleton;
                        else if (randMob < 2) enemy = new SkeletonArcher;
                        else enemy = new Goblin;
                        break;
                    case 4:
                        if(randMob >= 2) enemy = new SkeletonArcher;
                        else enemy = new Goblin;
                        break;
                    case 5:
                        if(randMob>2) enemy = new SkeletonArcher;
                        else if (randMob < 2) enemy = new Goblin;
                        else enemy = new ThugGoblin;
                }
                break;
            case 3:
                switch (floor){
                    case 1:
                        if(randMob >= 2) enemy = new ThugGoblin;
                        else enemy = new Orc;
                        break;
                    case 2:
                        if(randMob >= 2) enemy = new ThugGoblin;
                        else enemy = new Orc;
                        break;
                    case 3:
                        if(randMob>2) enemy = new ThugGoblin;
                        else if (randMob < 2) enemy = new Orc;
                        else enemy = new Slave;
                        break;
                    case 4:
                        if(randMob>2) enemy = new Orc;
                        else if (randMob < 2) enemy = new Slave;
                        else enemy = new HeavySlave;
                        break;
                    case 5:
                        if(randMob >= 2) enemy = new Slave;
                        else enemy = new HeavySlave;
                        break;
                }
                
            break;

        }
        enemy.UpdateStatsWithScale(layer,floor);
        return enemy;
    }
    generateItem(enemy){
        let itemSet;
        let item;
        let itemRarity=["Common","Uncommon","Rare","Epic","Legendary"];
        let DropChance = enemy.getDropChance();
        let rare = 0;
        let bufItem;
        let str,int,agi,luck;
        for(let i = DropChance.length; i >= 0;i--){
            if(DropChance[i]!=0){
                let rand = Math.floor(Math.random() * 100) +1;
                if(rand<=DropChance[i]) {rare = itemRarity[i];break;}
            } 
        }
        if(rare == 0) item = "nothing";
        if (item!="nothing"){
            itemSet = Math.floor(Math.random() * 3)+1;
            let randPart = Math.floor(Math.random() * 5);
            switch (itemSet){
                case 1:  
                        bufItem = JSON.parse(JSON.stringify(LeatherArmor[randPart]))
                        item = new EquipmnetItem(bufItem.name,bufItem.eqType,bufItem.bImage)
                        str = Math.floor(Math.random() * 3)-3;
                        int = Math.floor(Math.random() * 1)-1;
                        agi = Math.floor(Math.random() * 4)-6;
                        luck = Math.floor(Math.random() * 2)-3;
                        item.setChars(str,int,agi,luck,rare,10);
                        
                break;
                case 2: 
                        bufItem = JSON.parse(JSON.stringify(ClothArmor[randPart]))
                        item = new EquipmnetItem(bufItem.name,bufItem.eqType,bufItem.bImage)
                        str = Math.floor(Math.random() * 1)-1;
                        int = Math.floor(Math.random() * 4)-6;
                        agi = Math.floor(Math.random() * 2)-3;
                        luck = Math.floor(Math.random() * 4)-6;
                        item.setChars(str,int,agi,luck,rare,10);
                break;
                case 3: 
                        bufItem = JSON.parse(JSON.stringify(HeavyArmor[randPart]))
                        item = new EquipmnetItem(bufItem.name,bufItem.eqType,bufItem.bImage)
                        str = Math.floor(Math.random() * 5)-8;
                        agi = Math.floor(Math.random() * 1)-1;
                        luck = Math.floor(Math.random() * 3)-3;
                        item.setChars(str,0,agi,luck,rare,10);

                break;
            }
        }
        return item;
    }
}
