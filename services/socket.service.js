const landscapeService = require("./landscape");
const buildings = require('../db/buildings.json');


const socketService = (socket) => {
    
    console.log('socket connect');
    let landscape;

    socket.on('user', (message) => {
        socket.userCustomId = message;
        landscape = new landscapeService(message);
        socket.emit('unit', landscape.units);
        socket.emit('city', landscape.city);
        socket.emit('getMatrix', landscape.getNewMatrix());
    });

    socket.on('unitCanMove', (move) => {
        if (landscape.canMove(move.from, move.to)) {
            socket.emit('unit', landscape.unitCanMove(move.from, move.to));
        }
    });

    socket.on('createCity', (unit) => {
        landscape.createCity(unit);
        socket.emit('unit', landscape.units);
        socket.emit('city', landscape.city);
    });
    socket.on('createBuilding', (unit) => {
        socket.emit('createBuilding', landscape.createConstruction(unit));
        socket.emit('unit', landscape.units);
        socket.emit('city', landscape.city);
    });

    socket.on('nextMove', () => {
        landscape.nextMove();
        socket.emit('unit', landscape.units);
        socket.emit('city', landscape.city);
    });

    socket.on('rebase', () => {
        socket.emit('unit', landscape.units);
        socket.emit('city', landscape.city);
        socket.emit('getMatrix', landscape.matrix);
    });

    socket.on('cityData', (id) => {
        socket.emit('cityData', landscape.getCityById(id));
        socket.emit('available', buildings);
    });

    socket.on('addToProd', (building) => {
        landscape.addToProd(building);
        socket.emit('cityData', landscape.getCityById(building));
    });

    socket.on('save', () => {
        socket.emit('save', landscape.save(socket.userCustomId));
    });

    socket.on('disconnect', function() {
        console.log('socket disconnect');
    });

}

module.exports = socketService;