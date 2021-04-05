import * as PIXI from "pixi.js";

const myCanvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
console.log(myCanvas);

const pixiRenderer = new PIXI.Renderer({
	// view: myCanvas,
	width: 256,
	height: 256,
	backgroundColor: 0x4287f5,
});

//
document.body.appendChild(pixiRenderer.view);

const stage = new PIXI.Container();

const ticker = new PIXI.Ticker();

ticker.add(() => {
	pixiRenderer.render(stage);
	console.log(ticker.FPS);
});

// TODO dans la vidéo on en est la : https://youtu.be/2J0VUiozAVM?t=210

ticker.start();
