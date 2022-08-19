const cells = document.querySelectorAll('.XorO');
const nameOutput = document.getElementById('player-display');
const restartGame = document.querySelector('.game-restart');

var player1 = {
    name: 'Player 1',
    isTurn: true,
    won: false,
    icon: 'X'
}
var player2 = {
    name: 'Player 2',
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

function getWinLines() {
    cells.forEach( cell => {
        console.log(cell.getAttribute('aria-label'))
        console.log(cell.getAttribute('played'))
    })
}

getWinLines()
var useCPU = true
var isFinished = false

nameOutput.innerHTML = player1.name

cells.forEach( cell => {
    cell.addEventListener('click', () => {

        let isPlayed = cell.getAttribute('is-played')
        console.log(isPlayed)

        if(player1.isTurn === true && isPlayed === null) {
            document.querySelector('.container').classList.toggle('what-player')
            // Set Attributes and Display Icon
            cell.setAttribute('symbol', 'X')
            cell.setAttribute('is-played', 'played')
            cell.innerHTML = 'X'

            //set Turns
            player1.isTurn = false
            if(useCPU === true) {
                cpu.isTurn = true
                nameOutput.innerHTML = cpu.name
            } else {
                player2.isTurn = true
                nameOutput.innerHTML = player2.name
            }
        } else if(isPlayed === null) {
            document.querySelector('.container').classList.toggle('what-player')
            // Set Attributes and Display Icon
            cell.setAttribute('symbol', 'O')
            cell.setAttribute('is-played', 'played')
            cell.innerHTML = 'O'

            //set Turns
            player2.isTurn = false
            cpu.isTurn = false
            player1.isTurn = true

            nameOutput.innerHTML = player1.name

        }


    })
})

restartGame.addEventListener('click', () => {
    cells.forEach( cell => {
        document.querySelector('.container').classList.remove('what-player')
        cell.setAttribute('symbol', '')
        cell.setAttribute('is-played', null)
        cell.innerHTML = ''
    })

    player2.isTurn = false
    cpu.isTurn = false
    player1.isTurn = true
})