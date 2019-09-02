class CityCreator {
    constructor(unit) {
        this.img = './assets/img/civ.png';
        this.cityLevel = 1;
        this.x = unit.x;
        this.y = unit.y;
        this.hp = 100;
        this.foodLevel = 0;
        this.food = 0;
        this.manufacture = 0;
        this.id = (Math.round(Math.random() * 1000)).toString();
        this.buildings =[];
    }
}

module.exports = CityCreator;