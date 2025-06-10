export default abstract class Person{

    private name!: string;
  
    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public abstract toString(): string;
}