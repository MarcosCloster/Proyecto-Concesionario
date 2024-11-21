export interface Auto
{
    id?: string;
    brand: string;
    name: string; 
    model: string;
    year: number;
    fuel: string;
    doors: number;
    kph: number;
    engine: string;
    transmision: string;
    description: string;
    traction: string;
    price: number;
    color: string;
    photos: string[];
    isActive: boolean;
}
