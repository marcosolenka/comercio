import { IProduct } from "../interfaces/IProduct";

export default class Product implements IProduct{
   private name!: string;
   private value!: number;

   public getName(): string{
      return this.name;
   }
   public setName(name: string): void{
    this.name = name;
   }

   public getValue(): number{
      return this.value;
   }
   public setValue(value: number): void{
    this.value = value;
   }

   public toString(): string{
      return `Produto: ${this.getName()}
      Valor: ${this.getValue()}`
   }
}