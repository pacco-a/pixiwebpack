import Game from "./PGEngine/Game";
import Inputo from "./testsToDel/inputo";
import Player from "./testsToDel/Player";

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
