let qtdCartas = 0;
let jogadas = 0; // Contador de jogadas
let paresEncontrados = 0; // Contador de pares encontrados

function numeroCartas() {
    qtdCartas = parseInt(prompt("Com quantas cartas deseja jogar (escolha um número par entre 4 e 14)?"));
    if (qtdCartas < 4 || qtdCartas > 14 || qtdCartas % 2 !== 0) {
        alert("Número inválido!");
        numeroCartas();
    }
}

numeroCartas();

const gifCartas = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif"
];

function embaralhar() {
    return Math.random() - 0.5;
}

function adicionarCartas() {
    const div = document.querySelector(".allCards");

    let cartasEscolhidas = [];
    for (let i = 0; i < qtdCartas / 2; i++) {
        cartasEscolhidas.push(gifCartas[i]);
        cartasEscolhidas.push(gifCartas[i]);
    }

    cartasEscolhidas.sort(embaralhar);

    cartasEscolhidas.forEach((gif) => {
        const elementoCarta = `
        <div class="card" onclick="virarCarta(this)" data-gif="${gif}">
            <div class="front-face face">
                <img src="./assets/back.png" class="parrot">
            </div>
            <div class="back-face face">
                <img src="./assets/${gif}" class="parrot">
            </div>
        </div>
        `;
        div.innerHTML += elementoCarta;
    });
}

adicionarCartas();

let primeiraCarta = null;
let segundaCarta = null;
let bloqueio = false;

function virarCarta(carta) {
    if (bloqueio || carta.classList.contains('flipped') || carta.classList.contains('matched')) {
        return;
    }

    carta.classList.add('flipped');
    jogadas++; // Incrementar contador de jogadas

    if (!primeiraCarta) {
        primeiraCarta = carta;
        return;
    }

    segundaCarta = carta;
    verificarPar();
}

function verificarPar() {
    const gifPrimeira = primeiraCarta.getAttribute('data-gif');
    const gifSegunda = segundaCarta.getAttribute('data-gif');

    if (gifPrimeira === gifSegunda) {
        primeiraCarta.classList.add('matched');
        segundaCarta.classList.add('matched');
        paresEncontrados++; // Incrementar contador de pares encontrados
        resetarJogada();
        verificarFimDeJogo(); // Verificar se o jogo terminou
    } else {
        bloqueio = true;
        setTimeout(() => {
            primeiraCarta.classList.remove('flipped');
            segundaCarta.classList.remove('flipped');
            resetarJogada();
        }, 1000);
    }
}

function resetarJogada() {
    [primeiraCarta, segundaCarta] = [null, null];
    bloqueio = false;
}

function verificarFimDeJogo() {
    if (paresEncontrados === qtdCartas / 2) {
        alert(`Você ganhou em ${jogadas} jogadas!`);
    }
}
