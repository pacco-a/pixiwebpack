import * as PIXI from "pixi.js";

export default class Game {
	// pixi renderer
	private _pixiRenderer: PIXI.Renderer;

	constructor(config: IGameConfig) {
		// create the pixi app (renderer)

		const gameCanvas = document.getElementById(
			"game-canvas"
		) as HTMLCanvasElement;

		this._pixiRenderer = new PIXI.Renderer({
			view: gameCanvas,
			width: config.width,
			height: config.height,
			backgroundColor: config.backgroundColor,
		});

		// document.body.appendChild(this._pixiRenderer.view);

		const stage = new PIXI.Container();

		// fonction renderer

		this.create();

		// renderer loop

		const ticker = new PIXI.Ticker();
		ticker.add(() => {
			const dTime = ticker.elapsedMS / 1000;
			this.update(dTime);
		});
	}

	// TODO fonction create qui s'execute une fois avant update
	protected create(): void {}

	protected update(dt: number): void {}
}

interface IGameConfig {
	width: number;
	height: number;
	backgroundColor: number;
	fps: number;
}
