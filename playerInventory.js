class Item{
    constructor(name,img,description){
        this.name = name;
        this.img = img;
        this.description = description;
    }
}

class inventoryItem extends Item {
    constructor(name,img,description,consumable,stack) {
        super(name,img,description);
        this.consumable = consumable;
        this.stack = stack;
    }
}


