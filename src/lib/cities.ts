//
//
// Cities

export class City {
    name: string;
    latitude: number;
    longitude: number;

    constructor(name: string, latitude: number, longitude: number) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude
    }
}

export const buenosAires = new City("Buenos Aires", -34.60, -58.38);
export const london = new City("London", 51.50, 0.11);
export const ryanOklahoma = new City("Ryan, Oklahoma", 34.02, -97.95);
export const tokyo = new City("Tokyo", 35.65, 139.83)
export const istanbul = new City("Istanbul", 41.01, 28.97)
export const paris = new City("Paris", 48.86, 2.34)
export const aktau = new City("Aktau", 43.69, 51.26)
export const pyongyang = new City("Pyongyang", 39.01, 125.73)