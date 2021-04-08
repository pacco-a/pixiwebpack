import * as PIXI from "pixi.js";
import Game from "./PGEngine/Game";
import Inputo from "./testsToDel/inputo";
import Player from "./testsToDel/Player";

// const GRID_TILE_NUMBER_X = 10;
// const GRID_TILE_NUMBER_Y = 10;

// const GRID_TILE_SIZE = 64;

// const player: Player = new Player(0, 0);

// interface SquareObject {
// 	x: number;
// 	y: number;
// 	width: number;
// 	height: number;
// }

// const graphics = new PIXI.Graphics();

// const pixiRenderer = new PIXI.Renderer({
// 	width: 640,
// 	height: 640,
// 	backgroundColor: 0x4287f5,
// });

// document.body.appendChild(pixiRenderer.view);

// const stage = new PIXI.Container();
// stage.addChild(graphics);

// const ticker = new PIXI.Ticker();

// //#region keyboard input

// const linpunto = new Inputo(document);

// //#endregion

// ticker.add(() => {
// 	const deltaTime = ticker.elapsedMS / 1000;

// 	linpunto.update(deltaTime); // update the key event handler

// 	pixiRenderer.render(stage); // render current stage

// 	graphics.clear(); // clear les graphics (les dessins)

// 	//#region grid
// 	for (let x = 0; x < GRID_TILE_NUMBER_X; x++) {
// 		graphics.beginFill(0x9e0916);
// 		graphics.drawRect(GRID_TILE_SIZE * x, 0, 1, pixiRenderer.height);
// 		graphics.endFill();
// 	}

// 	for (let y = 0; y < GRID_TILE_NUMBER_Y; y++) {
// 		graphics.beginFill(0x9e0916);
// 		graphics.drawRect(0, GRID_TILE_SIZE * y, pixiRenderer.width, 1);
// 		graphics.endFill();
// 	}
// 	//#endregion

// 	// UPDATE

// 	//#region inputs

// 	if (linpunto.GetRightKeyJustDown()) {
// 	}

// 	if (linpunto.GetLeftKeyJustDown()) {
// 	}

// 	if (linpunto.GetUpKeyJustDown()) {
// 	}

// 	if (linpunto.GetDownKeyJustDown()) {
// 	}

// 	//#endregion

// 	// DRAW

// 	player.draw(graphics);
// });

// ticker.start();

export default class MyNewGame extends Game {
	public static inputHandler: Inputo = new Inputo(document);
	private player: Player = new Player(0, 0);

	constructor() {
		super({
			width: 640,
			height: 640,
			backgroundColor: 0x4287f5,
			fps: 60,
		});
	}

	protected update(dt: number) {
		super.update(dt);
		MyNewGame.inputHandler.update(dt);
		this.player.update(dt);
	}

	protected draw() {
		super.draw();
		this.player.draw(this.graphics);
	}
}

const gi = new MyNewGame();
gi.start();
