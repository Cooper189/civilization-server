export interface IPosition {
    x: number;
    y: number;
}
export interface IUnit {
    x: number;
    y: number;
    name: string;
    cost: number;
    type: string;
    img: string;
    hp: number;
    strength: number;
    basePoints: number;
    id: string;
    move?: number;
}
interface IBuildingBonuses {
    method: string;
    value: number;
}
export interface IBuilding {
    name: string;
    cost: number;
    img: string;
    type: string;
    bonuses: IBuildingBonuses;
}

export interface ICity {
    img: string;
    cityLevel: number;
    x: number;
    y: number;
    hp: number;
    foodLevel: number;
    food: number;
    manufacture: number;
    id: string;
    buildings: Array<IBuilding>;
}

export interface IField {
    x: number;
    y: number;
    food: number;
    manufacture: number;
    building: string;
}
