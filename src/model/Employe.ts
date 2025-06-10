import Person from "./Person";

export default class Employe extends Person{

    private id!: number;

    public setId(id: number): void{
        this.id = id;
    }

    public getId(): number{
        return this.id;
    }

    public toString(): string{
        return `
                Nome: ${this.getName()} ID: ${this.getId()}`;
    }
}