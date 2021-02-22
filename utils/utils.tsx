export const generateArray = (count: number): number[] => {
    return new Array(count).fill('').map((_, i) => i)
}

export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

export const calcHeight = (count: number, distance: number): number => {
    return count * (-distance)
}
