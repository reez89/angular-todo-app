import { Ingridient } from "../shared/ingridients.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string; // ABBIAMO CREATO UN MODELLO (BLUEPRINTS) , DI COME IL NOSTRO OGGETTO DOVRà ESSERE ALLA FINE, O PER LO MENO DI COME PENSIAMO CHE LO SARA', A QUESTO SERVONO I MODELLI.
  public ingridients: Ingridient[];

  constructor(name: string, description: string, imagePath: string, ingridients: Ingridient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingridients = ingridients;
  }
}
