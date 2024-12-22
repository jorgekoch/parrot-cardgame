let qtdCartas = 0;

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

    let cartasEscolhidas = gifCartas.slice(0, qtdCartas / 2);
    cartasEscolhidas = [...cartasEscolhidas, ...cartasEscolhidas];

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
        resetarJogada();
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
