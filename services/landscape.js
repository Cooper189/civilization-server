const getNewCity = require("./cityCreator");

const exc = (x, y, temp) => {
    if ((x >= 0 && y >= 0) && (x <= 9 && y <= 9) ) {
        temp.push({x: x, y: y}) 
    }
}
const getCloses = (x, y) => {
    const temp = [];
    exc(x-1, y-1, temp);
    exc(x, y-1, temp);
    exc(x+1, y-1, temp);
    exc(x-1,y, temp);
    exc(x+1, y, temp);
    exc(x-1, y+1, temp);
    exc(x, y+1, temp);
    exc(x+1, y+1, temp);

    return temp;
}

class FieldGrass {
    constructor() {
        this.food = 1;
        this.manufacture = 1;
    }
}

class CityMethods {
    static addFood(el, value) {
        el.foodLevel += value;
    }
}

// class CreateBulder {
//     constructor(build) {
//         type: 
//     }
// }
class CreatUnit {
    constructor(el) {
        this.x = el.x;
        this.y = el.y;
        this.img = el.processing.img;
        this.hp = 100;
        this.basePoints = el.processing.basePoints;
        this.move = el.processing.basePoints;
        this.type = null;
        this.id = (Math.round(Math.random() * 100)).toString();
    }
}

class LandscapeService {
    constructor() {
        this.units = [{x: 0, y: 0, img: './assets/img/Scout.png', id: '1', hp: 100, basePoints: 2,  move: 2},
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
        const closes = getCloses(from.x, from.y);
        return closes.some(item => {
            return (item.x === to.x) && (item.y === to.y);
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
    createCity(unit) {
        this.units = this.units.filter(item => {
            if (item.id !== unit.id) {
              return item;
            }
        });
        const city = new getNewCity(unit);
        getCloses(unit.x, unit.y).forEach(el => {
            city.food += this.matrix[el.x][el.y].food;
            city.manufacture += this.matrix[el.x][el.y].manufacture;
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
                    console.log('-------before', el);
                    CityMethods[elm.bonuses.method](el, elm.bonuses.value);
                    console.log('-------after', el);
                });
            }
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
            
            el.foodLevel += el.food;
        })
    }
}

module.exports = LandscapeService;