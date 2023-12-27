class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected tenants: Person[];

  constructor(protected key: Key) {}

  public comeIn(person: Person) {
    if (!this.door) {
      return;
    }
    this.tenants.push(person);
  }

  public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  public openDoor(key: Key) {
    if (key.getSignature() !== this.key.getSignature()) {
      return;
    }
    this.door = true;
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);

export {};
