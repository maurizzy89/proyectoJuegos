const cells = document.querySelectorAll('.XorO');
const nameOutput = document.getElementById('player-display');
const restartGame = document.querySelector('.game-restart');
const winModal = document.querySelector('.winning-modal');
const startAndPlayers = document.querySelector('.start-and-player');
const startBtn = document.querySelector('#start');

var useCPU = false
var isFinished = false
var gotLine = false

var player1 = {
    name: 'Oli',
    isTurn: true,
    won: false,
    icon: 'X'
}
var player2 = {
    name: 'Mauri',
    isTurn: false,
    won: false,
    icon: 'O'
}
var cpu = {
    name: 'IA',
    isTurn: false,
    won: false,
    icon: 'O'
}

const gameLines = [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]],
    [cells[0], cells[3], cells[6]],
    [cells[1], cells[4], cells[7]],
    [cells[2], cells[5], cells[8]],
    [cells[0], cells[4], cells[8]],
    [cells[2], cells[4], cells[6]]
]

startBtn.addEventListener('click', () => {
    startBtn.innerHTML = 'Reiniciar';
    startGame();
})

restartGame.addEventListener('click', () => {
    restart();
    startGame();
})

function startGame() {

    cells.forEach( cell => {
        cell.addEventListener('click', () => {
    
            let isPlayed = cell.getAttribute('is-played')
    
            if(player1.isTurn === true && !isPlayed) {
                document.querySelector('.container').classList.toggle('what-player')
                // Set Attributes and Display Icon
                cell.setAttribute('symbol', 'X')
                cell.setAttribute('is-played', 'played')
                cell.style.color = '#e5de23';
                cell.innerHTML = 'X'
                cell.setAttribute('last-player', player1.name)
                validateLines(player1.name);
                nameOutput.style.color = '#e41ed8'
    
                //set Turns
                player1.isTurn = false
                if(useCPU === true) {
                    cpu.isTurn = true
                    nameOutput.innerHTML = cpu.name
                } else {
                    player2.isTurn = true
                    nameOutput.innerHTML = player2.name
                }
            } else if(!isPlayed) {
                document.querySelector('.container').classList.toggle('what-player')
                // Set Attributes and Display Icon
                cell.setAttribute('symbol', 'O')
                cell.setAttribute('is-played', 'played')
                cell.style.color = '#e41ed8';
                cell.innerHTML = 'O'
                cell.setAttribute('last-player', player2.name)
    
                validateLines(player2.name);
    
                //set Turns
                player2.isTurn = false
                cpu.isTurn = false
                player1.isTurn = true
    
                //show turn's player
                nameOutput.style.color = '#e5de23';
                nameOutput.innerHTML = player1.name
    
            }

            if (player2.isTurn === true) {
                restartGame.classList.add('what-player')
            } else {
                restartGame.classList.remove('what-player')
            }
        })
    })
}

function validateLines(player) {
    gameLines.forEach(line => {
        let coincidence = [];
        line.map(item => {
            coincidence.push(item.getAttribute('last-player') === player)
        }) 

        gotLine = coincidence.every(value => {
            return value === true
        })

        if (gotLine) {
            winModal.style.opacity = 1;
            winModal.innerHTML = `
                <h2>Felicidades ${player}!</h2><br>
                <p>Ganaste la partida</p>
            `
            startBtn.innerHTML = 'Iniciar';
        }
    })

    let playedSquares = []
    cells.forEach(cell => {
        if (cell.getAttribute('is-played')) {
            playedSquares.push(cell)
        }
        console.log(playedSquares);
        console.log(cells);
        if (playedSquares === cells) {
            console.log('es un empate');
        }
    });
}

function restart() {
    document.querySelector('.container').classList.remove('what-player')
    cells.forEach( cell => {
        cell.setAttribute('symbol', '')
        cell.setAttribute('is-played', '')
        cell.setAttribute('last-player', 'none')
        winModal.style.opacity = 0;
        cell.innerHTML = ''
        setTimeout(() => {winModal.innerHTML = '';  nameOutput.innerHTML = player1.name}, 500);
    })

    player2.isTurn = false
    cpu.isTurn = false
    player1.isTurn = true

}