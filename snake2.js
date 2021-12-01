var canva;
var ctx;
var v = [];
var tam = 15;
var contPlacar = 0;
var dimensao;
for (var p = 0; p < 20; p = p + 5) {
	snake = {
		cor: "green",
		px: 400 - p,
		py: 400,
		vx: 0,
		vy: 0,
		comp: 20,
		alt: 20,
		qtp: 40,
		fator: 20,
	}
	v.push(snake);
}
placar = {
	cor: "red",
	texto: "COMEU NO TOTAL:  ",
	py: 37,
	px: 577,
	tamanho: " 19px",
	fonte: " arial",
	desenho: function () {
		ctx.font = "bold " + this.tamanho + this.fonte;
		dimensao = ctx.measureText(this.texto + contPlacar);
		console.log(dimensao.width + " " + dimensao.height);
		ctx.fillStyle = this.cor;
		ctx.fillRect(this.py, this.px, dimensao.width, dimensao.height);
		ctx.fillText(this.texto + contPlacar, this.px, this.py);

	},
	resultado: function () {
		contPlacar++;
	}

}
objeto1 = {
	cor: "black",
	largura: 800,
	altura: 800,
	cenario: function () {
		ctx.fillStyle = this.cor;
		ctx.fillRect(0, 0, this.largura, this.altura);
	}

}
snake = {
	cor: "green",
	px: 400,
	py: 400,
	vx: 0,
	vy: 0,
	comp: 20,
	alt: 20,
	qtp: 40,
	fator: 20,
	colisaoParede: function () {
		if (this.px + this.comp > 800) {

			this.px = 0;
		}
		if (this.px + this.comp < 0) {
			console.log(this.px + this.comp);

			this.px = 780;

		}
		if (this.py + this.comp > 800) {

			this.py = 0;
		}
		if (this.py + this.comp < 0) {


			this.py = 780;

		}

	},
	comer: function () {
		comida.novaposicao();
		this.aumentarTamanho();
		placar.resultado();
	},
	movimentar: function () {
		this.px += this.vx;
		this.py += this.vy;
		v.push({
			cor: "green",
			px: this.px,
			py: this.py,
			comp: 20,
			alt: 20
		});

	},
	aumentarTamanho: function () {
		tam += 5;
		v.push({
			cor: "green",
			px: this.px,
			py: this.py,
			comp: 20,
			alt: 20
		});
	},
	tocouComida: () => {
		if ((v[v.length - 1].px + v[v.length - 1].comp > comida.px) && (v[v.length - 1].px < comida.px + comida.comp) &&
			(v[v.length - 1].py < comida.py + comida.comp) && (v[v.length - 1].py + v[v.length - 1].comp > comida.py)) {
			console.log(v[0].px + v[0].comp)
			snake.comer();
		}
	}
}
comida = {
	color: "red",
	px: 320,
	py: 320,
	comp: 20,
	alt: 20,
	fator: 5,
	desenha: function () {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.px, this.py, this.comp, this.alt);
	},
	novaposicao: function () {
		this.px = this.fator * (Math.floor(150 * (Math.random())));
		this.py = this.fator * (Math.floor(150 * Math.random()));
	}
}
document.addEventListener("keydown", (e) => {
	if (e.keyCode == 39) {

		snake.vx = 5;
		snake.vy = 0;
	}
	if (e.keyCode == 37) {
		snake.vx = -5;
		snake.vy = 0;
	}
	if (e.keyCode == 38) {
		snake.vy = -5;
		snake.vx = 0;
	}
	if (e.keyCode == 40) {
		snake.vy = 5;
		snake.vx = 0;
	}
}, false);
function loop() {
	atualizar();
	desenhar();
	requestAnimationFrame(loop, false);
}
function atualizar() {
	snake.tocouComida();        //opcao mais facil de comer a comida
	snake.colisaoParede();
	//snake.comer();             //opcao mais dificil e tem desligar o metodo snake.tocouComida() 
	snake.movimentar();
}
function desenhar() {
	ctx.clearRect(0, 0, 800, 800);
	objeto1.cenario();
	comida.desenha();
	placar.desenho();
	desenharSnake();
}
function desenharSnake() {
	for (var i = 0; i < v.length; i++) {
		while (v.length > tam) {
			v.shift();
		}
		ctx.fillStyle = v[i].cor;
		ctx.fillRect(v[i].px, v[i].py, v[i].comp, v[i].alt);
	}
}
function carregar() {
	canva = document.getElementById("canva");
	ctx = canva.getContext("2d");
	loop();

}
window.addEventListener("load", carregar);