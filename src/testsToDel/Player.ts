import * as PIXI from "pixi.js";
import MyNewGame from "..";
import { Vector2 } from "../utils/MathUtils";

export default class Player {
	// player position
	private position: Vector2 = new Vector2(0, 0);

	private movement: {
		isInMove: boolean;
		direction: Vector2;
		speed: number;
		toReach: Vector2;
		lastStartPosition: Vector2;
	} = {
		isInMove: false,
		direction: new Vector2(0, 0),
		speed: 100,
		toReach: new Vector2(0, 0),
		lastStartPosition: new Vector2(0, 0),
	};

	// player apparence
	private playerSize: Vector2 = new Vector2(64, 64);

	constructor(x: number, y: number) {
		this.position.x = x;
		this.position.y = y;
	}

	public update(dt: number) {
		if (this.movement.isInMove) {
			/* On vérifie si la position initiale au début du mouvement est
				inférieure ou supérieure a la destination voulue, dépendament de cela
				il faudra arrêter le joueur quand sa position X/Y sera plus grande
				ou plus petite que la destination voulue */
			//#region logique arrêt joueur
			if (this.movement.lastStartPosition.x > this.movement.toReach.x) {
				if (
					this.position.x +
						this.movement.speed * dt * this.movement.direction.x <=
					this.movement.toReach.x
				) {
					this.position.x = this.movement.toReach.x;
					this.movement.isInMove = false;
					this.movement.direction.setZero();
					console.log("false");
				}
			} else if (
				this.movement.lastStartPosition.x < this.movement.toReach.x
			) {
				if (
					this.position.x +
						this.movement.speed * dt * this.movement.direction.x >=
					this.movement.toReach.x
				) {
					this.position.x = this.movement.toReach.x;
					this.movement.isInMove = false;
					this.movement.direction.setZero();
					console.log("false");
				}
			}

			if (this.movement.lastStartPosition.y > this.movement.toReach.y) {
				if (
					this.position.y +
						this.movement.speed * dt * this.movement.direction.y <=
					this.movement.toReach.y
				) {
					this.position.y = this.movement.toReach.y;
					this.movement.isInMove = false;
					this.movement.direction.setZero();
					console.log("false");
				}
			} else if (
				this.movement.lastStartPosition.y < this.movement.toReach.y
			) {
				if (
					this.position.y +
						this.movement.speed * dt * this.movement.direction.y >=
					this.movement.toReach.y
				) {
					this.position.y = this.movement.toReach.y;
					this.movement.isInMove = false;
					this.movement.direction.setZero();
					console.log("false");
				}
			}
			//#endregion

			// TODO décrire la suite

			this.position.x +=
				this.movement.speed * dt * this.movement.direction.x;
			this.position.y +=
				this.movement.speed * dt * this.movement.direction.y;
			if (this.position.x < 11) {
				console.log(`${Math.floor(this.position.x)}`);
			}
		}

		if (MyNewGame.inputHandler.GetRightKeyJustDown()) {
			if (this.movement.isInMove === false) {
				this.movement.isInMove = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.x = 1;
				this.movement.toReach.change(
					this.position.x + 64,
					this.position.y
				);
			}
		}

		if (MyNewGame.inputHandler.GetLeftKeyJustDown()) {
			if (this.movement.isInMove === false) {
				this.movement.isInMove = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.x = -1;
				this.movement.toReach.change(
					this.position.x - 64,
					this.position.y
				);
			}
		}

		if (MyNewGame.inputHandler.GetUpKeyJustDown()) {
			if (this.movement.isInMove === false) {
				this.movement.isInMove = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.y = -1;
				this.movement.toReach.change(
					this.position.x,
					this.position.y - 64
				);
			}
		}

		if (MyNewGame.inputHandler.GetDownKeyJustDown()) {
			if (this.movement.isInMove === false) {
				this.movement.isInMove = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.y = 1;
				this.movement.toReach.change(
					this.position.x,
					this.position.y + 64
				);
			}
		}
	}

	public draw(graphics: PIXI.Graphics) {
		// draw the player
		graphics.beginFill(0x9e0916);
		graphics.drawRect(
			this.position.x,
			this.position.y,
			this.playerSize.x,
			this.playerSize.y
		);
		graphics.endFill();
	}
}
