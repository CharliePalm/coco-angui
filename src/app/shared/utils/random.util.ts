export class Random {
  private seed: number;

  constructor(seed?: number) {
    this.seed = seed ?? Date.now(); // Use current timestamp if no seed provided
  }

  // Generates a pseudo-random number between 0 and 1
  next(): number {
    // LCG parameters (Numerical Recipes)
    this.seed = (this.seed * 1664525 + 1013904223) % 0x100000000;
    return this.seed / 0x100000000;
  }

  // Returns a new random integer in [min, max)
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min)) + min;
  }

  // Sets a new seed
  reseed(seed: number) {
    this.seed = seed;
  }

  // Get the current seed
  getSeed(): number {
    return this.seed;
  }
}
