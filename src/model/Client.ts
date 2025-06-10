import Person from "./Person";

export default class Client extends Person{

  private cpf!: string;
  
  public setCPF(cpf: string): void {
    this.cpf = cpf;
  }

  public getCPF(): string{
    return this.cpf;
  }

  public toString(): string {
    return `\nNome: ${this.getName()} CPF: ${this.getCPF()}`;
  }
}