import Game from "./PGEngine/Game";
import KeyboardInputHandler from "./PGEngine/KeyboardInputHandler";
import Player from "./PCM/Player";

export default class MyNewGame extends Game {
	public static inputHandler: KeyboardInputHandler = new KeyboardInputHandler(
		document
	);
	private player: Player = new Player(0, 0);

	constructor() {
		super({
			view: document.getElementById("game-canvas") as HTMLCanvasElement,
			width: 640,
			height: 640,
			backgroundColor: 0x4287f5,
			fps: 60,
		});

		this.stage.addChild(this.player.playerSprite);
		// console.log(this.player.playerSprite.position);
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
