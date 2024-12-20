let qtdCartas = 0;

function numeroCartas() {
   qtdCartas = parseInt(prompt("Com quantas cartas deseja jogar (escolha um númrero par entre 4 e 14)?"));
   if (qtdCartas < 4 || qtdCartas > 14 || qtdCartas % 2 !== 0){
    alert("Número inválido!")
    numeroCartas();
   }
}

numeroCartas();

const gifCartas = [];

function adicionarCartas(){
    const div = document.querySelector(".allCards");

    for(let index = 0; index < qtdCartas; index++) {
        const elementoCarta = `
        <div class="card">
            <div class="front-face face">
                <img src="./assets/back.png" class="parrot">
            </div>
            <div class="back-face face">
                <img src="./assets/${gifCartas[index]}.gif" class="parrot">
            </div>
        </div>
      `;
        div.innerHTML += elementoCarta;
    }
}
  
adicionarCartas();