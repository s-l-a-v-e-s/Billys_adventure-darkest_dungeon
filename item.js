class Item{
    #stackable;
    #usable;
    #eqiupable;
    #bImage;
    constructor(name){
        this.name = name;
    }
}
class Equipmnet extends Item {
    /*тип эквипа*/
    #eqType;
    #str;
    #int;
    #agi;
    #luck;
    #bImage;
    constructor(equipmnetType){
        this.#eqType = equipmnetType;
    }
    setChars(str,int,agi,luck){
        this.#str = str;
        this.#int = int;
        this.#agi = agi;
        this.#luck = luck;
    }
    setImage(image){
        this.#bImage = image;
    }
    
}
