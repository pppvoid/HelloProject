// 0 (포함) and 1 (불포함) 난수를 반환
export function getRandom(): number {
    return Math.random();
}

// min (포함) 과 max (불포함) 사이의 난수를 반환
export function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

// min (포함) 과 max (불포함) 사이의 임의 정수를 반환
  // Math.round() 를 사용하면 고르지 않은 분포를 얻게된다!
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}
 
// min (포함) 과 max (포함) 사이의 임의 정수를 반환
// Math.round() 를 사용하면 고르지 않은 분포를 얻게된다!
export function getRandomIntInclusive(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}