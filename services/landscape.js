const getNewCity = require("./helpers");

const exc = (y, x, temp) => {
    if ((x >= 0 && y >= 0) && (x <= 9 && y <= 9) ) {
        temp.push({y: y, x: x}) 
    }
}
const getCloses = (y, x) => {
    const temp = [];
    exc(y-1, x-1, temp);
    exc(y, x-1, temp);
    exc(y+1, x-1, temp);
    exc(y-1,x, temp);
    exc(y+1, x, temp);
    exc(y-1, x+1, temp);
    exc(y, x+1, temp);
    exc(y+1,x+1, temp);

    return temp;
}

class FieldGrass {
    constructor() {
        this.food = 1;
        this.manufacture = 1;
        this.building = null;
    }
}

class CityMethods {
    static addFood(el, value) {
        el.foodLevel += value;
    }
}

class CreatUnit {
    constructor(el) {
        this.x = el.x;
        this.y = el.y;
        this.img = el.processing.img;
        this.hp = 100;
        this.basePoints = el.processing.basePoints;
        this.strength = el.processing.strength;
        this.move = el.processing.basePoints;
        this.type = el.processing.type;
        this.id = (Math.round(Math.random() * 100)).toString();
    }
}

class LandscapeService {
    constructor() {
        this.units = [{x: 0, y: 0, img: './assets/img/Scout.png', strength: 5, id: '1', hp: 100, basePoints: 2,  move: 2},
        {x: 0, y: 2, img: './assets/img/Settler.png', id: '2', hp: 100, basePoints: 1, move: 1, type: 'city'}];
        this.city = [];
        this.matrix = [];
    }

    getNewMatrix() {
        const arr = [];
        for (let index = 0; index < 10; index++) {
            const arrs = [];
            for (let s = 0; s < 10; s++) {
                arrs.push(new FieldGrass());
            }
            arr.push(arrs);
        }
        this.matrix = arr;
        return this.matrix ;
    }
    canMove(from, to) {
        if (from.move === 0) return false;
        const closes = getCloses(from.y, from.x);
        return closes.some(item => {
            return (item.y === to.y) && (item.x === to.x);
        });
    }

    getCityById(cityId) {
        let city;
        for (let i = 0; i < this.city.length; i++) {
            if (this.city[i].id === cityId.id) {
                city = this.city[i];
                break;
            }           
        }
        return city;
    }

    unitCanMove(from, to) {
        this.units = this.units.map(item => {
            if (item.id === from.id) {
                from.move -= 1;
                return {...from, ...to};
            } else {
                return item;
            }
        });
        return this.units;
    }
    createConstruction(unit) {
        this.units = this.units.map(item => {
            if (item.id === unit.id) {
                item.move = 0;
                return item;
            }
            return item;
        });
        this.matrix[unit.y][unit.x].building = './assets/img/Farm.png';
        this.matrix[unit.y][unit.x].food++;
        unit = {...unit, ...this.matrix[unit.y][unit.x]};
        this.cityRebase();
        return unit;
    }
    cityRebase() {
        this.city.forEach(city => {
            city.food = 0;
            city.manufacture = 0;
            getCloses(city.y, city.x).forEach(el => {
                city.food += this.matrix[el.y][el.x].food;
                city.manufacture += this.matrix[el.y][el.x].manufacture;
            });
        })
    }
    createCity(unit) {
        this.units = this.units.filter(item => {
            if (item.id !== unit.id) {
              return item;
            }
        });
        const city = new getNewCity(unit);
        getCloses(unit.y, unit.x).forEach(el => {
            city.food += this.matrix[el.y][el.x].food;
            city.manufacture += this.matrix[el.y][el.x].manufacture;
        });
        this.city.push(city);
    }
    addToProd(prod) {
        this.city.find(el => {
            if (el.id === prod.id) {
                el.processing = prod.build
                return true;
            }
        });
    }
    createUnit(el) {
        this.units.push(new CreatUnit(el));
    }
    createBuilding(el) {
        el.buildings.push(el.processing);
    }
    nextMove() {
        this.units = this.units.map(item => {
            item.move = item.basePoints;
            return item;
        });

        this.city.forEach(el => {
            if (el.buildings) {
                el.buildings.forEach(elm => {
                    CityMethods[elm.bonuses.method](el, elm.bonuses.value);
                });
            }

            el.foodLevel += el.food;

            if (el.foodLevel >= 100 ) {
                el.foodLevel -= 100;
                el.cityLevel++
            }
            if (el.processing) {
                el.processing.cost -= el.manufacture;
                if (el.processing.cost <= 0) {
                    el.processing.type === 'building' ? this.createBuilding(el) : this.createUnit(el);
                    el.processing = null;
                }
            }
            
        })
    }
}

module.exports = LandscapeService;