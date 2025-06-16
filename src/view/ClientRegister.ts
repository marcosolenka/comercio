import PromptSync from "prompt-sync";
import MainController from "../controller/MainController";
import ClientValidator from "../service/ClientValidator";

export default class ClientRegister {

    private prompt = PromptSync();
    private control: MainController;

    public constructor(control: MainController) {
        this.control = control;
    }

    public addClient(): void {
        let client = this.control.getNewClient();
        let name = this.prompt("\ndigite o nome do cliente: "); 
        name = this.validateClientName(name);
        client.setName(name);

        let cpf = this.prompt("\nDigite o CPF do cliente: ");
        cpf = this.validateClientCPF(cpf);
        client.setCPF(cpf);

        this.control.db.addNewClient(client);

    }

public validateClientName(name: string): string {
    try {
        ClientValidator.validateName(name);
        return name; 
    } catch (error: any) {
        console.log(`Ocorreu um erro durante a execução: ${error.message}`);
        let newName = this.prompt("\nDigite o nome do Cliente: ");
        return this.validateClientName(newName); 
    } finally {
        console.log("Finalizando validação de nome.");
    }
}


    public validateClientCPF(cpf: string): string{
        try{
            ClientValidator.validateCPF(cpf);
            return cpf;
        } catch (error: any){
            console.log(`Ocorreu um erro durante a execução: ${error.message}`);
            let newCPF = this.prompt("\nDigite o CPF do cliente: ");
            return this.validateClientCPF(newCPF);
        } finally {
            console.log("Finalizando validacao de CPF.");
        }
    }
}

