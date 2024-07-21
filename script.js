const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector ('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPausaBt = document.querySelector('#start-pause');
const iniciarOuPausarBotao = document.querySelector('#start-pause span');
const iconeBotao = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio ('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio ('/sons/play.wav');
const audioPause = new Audio ('/sons/pause.mp3');
const audioBeep = new Audio ('/sons/beep.mp3');

musica.loop = true;

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;  


musicaFocoInput.addEventListener('change', () => {
     if(musica.paused){
        musica.play();
     }else{
        musica.pause();
     }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 30;
    alterarContexto('foco')   
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {    
    tempoDecorridoEmSegundos = 5;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 15;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active')
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src',`/imagens/${contexto}.png`);
    switch(contexto){
        case "foco":
            titulo.innerHTML =  `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superficie.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioBeep.play();
        zerar();
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        alert('Tempo finalizado.');
        return;
    }
    tempoDecorridoEmSegundos -= 1; 
    mostrarTempo();
}

startPausaBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId){
        audioPause.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBotao.textContent = "Pausar"
    iconeBotao.setAttribute('src','/imagens/pause.png')
}

function zerar(){ 
    clearInterval(intervaloId);
    iniciarOuPausarBotao.textContent = "Começar"    
    iconeBotao.setAttribute('src','/imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo() {       
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();