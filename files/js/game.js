//Configuração do Jogo

var ResetButton = document.getElementById('reset')

var Configuration = {
    Player: '',
    Playing: false,
    Rounds: 0,

    WinList: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],

        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],

        [3, 5, 7],
        [1, 5, 9]
    ],

    Score : { X : 0, O : 0 }
}

//Funções do Jogo
function ChangeImageSlot(slotSelect) {
    if (!Configuration.Playing) {
        slotSelect.style['background-image'] = ''

        return
    }

    if (slotSelect.getAttribute('player') == '') {
        slotSelect.setAttribute('player', Configuration.Player)
        slotSelect.style['background-image'] = `url('files/imgs/${Configuration.Player}.png')`
        return true
    }
    return false
}

function SetMessageGame(message) {
    var label = document.getElementById('message_game');
    label.innerHTML = message
}

function RefreshScore(){
    document.querySelectorAll('label[class="player_score"]').forEach((label)=>{
        label.innerHTML = Configuration.Score[label.getAttribute('value')]
    })
}

function NewGame() {
    for (let slot of getAllElement(`td[class='slot']`)) {
        slot.setAttribute('player', '')
        ChangeImageSlot(slot)
    }

    Configuration.Player = 'X'
    Configuration.Playing = true
    Configuration.Rounds = 0

    SetMessageGame(`É a vez do <b>${Configuration.Player}</b>`)
}

function EndGame(message){
    RefreshScore()

    Configuration.Playing = false
    ResetButton.classList.remove('disabled')
    return SetMessageGame(message)
}

function CheckWin() {
    for(let Line of Configuration.WinList)
    {
        let playerSelect = ''
        let Count = 0;

        for(let Pos of Line){

            let thisSlot = document.querySelector(`td[value="${Pos}"]`)
            let thisPlayer = thisSlot.getAttribute('player')

            if(thisPlayer != ""){
                if(playerSelect == ''){
                    playerSelect = thisPlayer
                
                }else {
                    if(playerSelect != thisPlayer){
                        playerSelect = ''
                        Count = 0;
                        break
                    }
                }
                Count++
            }
        }
        
        if(Count >= 3)
        {
            return true
        }
    }
    return false;
}

function Play(slotSelect) {
    if (ChangeImageSlot(slotSelect) && Configuration.Playing) {
        
        Configuration.Rounds++;

        if(CheckWin()){
            Configuration.Score[Configuration.Player]++;
            return EndGame(`O <b>${Configuration.Player}</b> ganhou!`);
        
        }else if(Configuration.Rounds >= 9){
            return EndGame('Empate!')
        
        }else{
            console.log('Nada.')
        }

        console.log(Configuration.Score[Configuration.Player])

        Configuration.Player = (Configuration.Player === 'X') ? 'O' : 'X'
        SetMessageGame(`É a vez do <b>${Configuration.Player}</b>`)
    }
}

//Adicionando a função de click em todos 'slot'

document.querySelectorAll(`td[class='slot']`).forEach((slot) => {
    slot.addEventListener('click', () => {
        return Play(slot)
    })
})

//Configurando o botão Reniciar
ResetButton.addEventListener('click',()=>{
    if(!Configuration.Playing){
        ResetButton.classList.add('disabled')
        NewGame();
    }
})

// Iniciando um novo jogo
NewGame()