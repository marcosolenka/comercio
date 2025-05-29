export default class Person{

    private name!: string;
  
    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public toString(): string{
        return `Nome: ${this.getName}`;
    }
}