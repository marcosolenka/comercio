export default class ClientValidator {

  public static validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error("Nome inválido: não pode ser vazio.");
    }
  }

  public static validateCPF(cpf: string): void {
    try {
      if (!cpf) {
        throw new Error("CPF não pode ser vazio.");
      }
    } catch (error) {
      throw error;
    }
  }
}