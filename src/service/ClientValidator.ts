export default class ClientValidator {

  public static validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error("Nome inválido: não pode ser vazio.");
    }

    const noNumbersRegex = /^[^\d]+$/;

    if (!noNumbersRegex.test(name)) {
      throw new Error("Nome inválido: não pode conter números.");
    }
  }


  public static validateCPF(cpf: string): void {
    const onlyNumbersRegex = /^\d{11}$/;
    if (!cpf) {
      throw new Error("CPF não pode ser vazio.");
    }

    if (!onlyNumbersRegex.test(cpf)) {
      throw new Error("CPF deve conter exatamente 11 números.");
    }
  }

}