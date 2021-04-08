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
		speed: 200,
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
			//#region logique arrêter/continuer joueur mouvement

			/* On vérifie si la position initiale au début du mouvement est
				inférieure ou supérieure a la destination voulue, dépendament de cela
				il faudra arrêter le joueur quand sa position X/Y sera plus grande
				ou plus petite que la destination voulue */

			if (
				(this.movement.lastStartPosition.x > this.movement.toReach.x &&
					this.position.x +
						this.movement.speed * dt * this.movement.direction.x <=
						this.movement.toReach.x) ||
				(this.movement.lastStartPosition.x < this.movement.toReach.x &&
					this.position.x +
						this.movement.speed * dt * this.movement.direction.x >=
						this.movement.toReach.x) ||
				(this.movement.lastStartPosition.y > this.movement.toReach.y &&
					this.position.y +
						this.movement.speed * dt * this.movement.direction.y <=
						this.movement.toReach.y) ||
				(this.movement.lastStartPosition.y < this.movement.toReach.y &&
					this.position.y +
						this.movement.speed * dt * this.movement.direction.y >=
						this.movement.toReach.y)
			) {
				// dans tous les cas on applique la position voulue exacte
				// pour éviter le décalage de la grid ET on set temporairement
				// la direction a zero pour éviter la double direction
				this.position.x = this.movement.toReach.x;
				this.position.y = this.movement.toReach.y;
				this.movement.direction.setZero();

				// on vérifie si le joueur désire continuer à bouger
				const hasPlayerMoved: boolean = this.handleInput(true);

				// s'il ne souhaite pas continuer à bouger on le stop
				if (hasPlayerMoved === false) {
					this.movement.isInMove = false;
				}
			}
			//#endregion

			// on applique le mouvement du joueur

			this.position.x +=
				this.movement.speed * dt * this.movement.direction.x;
			this.position.y +=
				this.movement.speed * dt * this.movement.direction.y;
		}

		this.handleInput(false);
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

	/**
	 * Gère les inputs du joueur
	 * @param continueMode à utiliser pour vérifier si le joueur
	 * appuie ENCORE sur un input, puor le faire continuer de bouger.
	 */
	private handleInput(continueMode: boolean): boolean {
		let hasMoved = false;

		if (continueMode === false) {
			// si on est pas en continue mode, appliquer la vérification
			// normale des KeyJustDown s
			if (
				MyNewGame.inputHandler.GetRightKeyJustDown() &&
				this.movement.isInMove === false
			) {
				this.movement.isInMove = true;
				hasMoved = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.x = 1;
				this.movement.toReach.change(
					this.position.x + 64,
					this.position.y
				);
			} else if (
				MyNewGame.inputHandler.GetLeftKeyJustDown() &&
				this.movement.isInMove === false
			) {
				this.movement.isInMove = true;
				hasMoved = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.x = -1;
				this.movement.toReach.change(
					this.position.x - 64,
					this.position.y
				);
			} else if (
				MyNewGame.inputHandler.GetUpKeyJustDown() &&
				this.movement.isInMove === false
			) {
				this.movement.isInMove = true;
				hasMoved = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.y = -1;
				this.movement.toReach.change(
					this.position.x,
					this.position.y - 64
				);
			} else if (
				MyNewGame.inputHandler.GetDownKeyJustDown() &&
				this.movement.isInMove === false
			) {
				this.movement.isInMove = true;
				hasMoved = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.y = 1;
				this.movement.toReach.change(
					this.position.x,
					this.position.y + 64
				);
			}
		} else {
			// utiliser les KeyDown (a la place des KeyJustDown) parce qu'on
			// veut faire continuer le joueur de bouger, également ne pas vérifier
			// isInMove car il est toujours en mouvement a ce mouvement la

			if (MyNewGame.inputHandler.GetRightKeyDown()) {
				this.movement.isInMove = true;
				hasMoved = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.x = 1;
				this.movement.toReach.change(
					this.position.x + 64,
					this.position.y
				);
			} else if (MyNewGame.inputHandler.GetLeftKeyDown()) {
				this.movement.isInMove = true;
				hasMoved = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.x = -1;
				this.movement.toReach.change(
					this.position.x - 64,
					this.position.y
				);
			} else if (MyNewGame.inputHandler.GetUpKeyDown()) {
				this.movement.isInMove = true;
				hasMoved = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.y = -1;
				this.movement.toReach.change(
					this.position.x,
					this.position.y - 64
				);
			} else if (MyNewGame.inputHandler.GetDownKeyDown()) {
				this.movement.isInMove = true;
				hasMoved = true;
				this.movement.lastStartPosition = this.position;
				this.movement.direction.y = 1;
				this.movement.toReach.change(
					this.position.x,
					this.position.y + 64
				);
			}
		}

		return hasMoved;
	}
}
