class Car {

	setDriveSound = (sound) => {
		this.sound = sound;
	}

	drive = () => {
		return this.sound;
	}
}

const car = new Car();
car.setDriveSound('woosh');

const { drive } = car;
drive();
