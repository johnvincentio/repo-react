class Car {
	constructor() {
		this.drive = this.drive.bind(this);
	}

	setDriveSound(sound) {
		this.sound = sound;
	}

	drive() {
		return this.sound;
	}
}

const car = new Car();
car.setDriveSound('woosh');

const { drive } = car;
drive();
