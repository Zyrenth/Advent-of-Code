const fs = require('fs');

function possibleGames(input) {
    const games = parseGames(input);
    const maxColors = {
        red: 12,
        green: 13,
        blue: 14
    }

    let sum = 0;
    let power = 0;

    for (let game of games) {
        let max = {
            red: 0,
            green: 0,
            blue: 0
        }

        for (let set of game.sets)
            for (let color of set)
                if (color.value > max[color.type]) max[color.type] = color.value;

        if (max.red <= maxColors.red &&
            max.green <= maxColors.green &&
            max.blue <= maxColors.blue) sum += game.id;

        power += max.red * max.green * max.blue;
    }

    return [sum, power];
}

function parseGames(input) {
    const games = input.split('\n');
    let parsedGames = [];

    for (let game of games) {
        let [id, ...sets] = game.split(': ');

        id = Number(id.split(' ')[1]);
        sets = sets[0].split('; ').map(s => s.split(', '));
        sets = sets.map(s => s.map(ss => ({ type: ss.split(' ')[1], value: Number(ss.split(' ')[0]) })));

        parsedGames.push({ id, sets });
    }

    return parsedGames;
}

console.log(
    possibleGames(
        fs.readFileSync('./input.txt', 'utf8').replace(/\r/g, '')
    )
);