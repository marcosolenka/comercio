import PromptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Client from "../model/Client";

export default class ClientRegister {

    private prompt = PromptSync();
    private control: MainController;

    public constructor(control: MainController) {
        this.control = control;
    }

    public addClient(): void {
        let client = new Client();
        let name = this.prompt("\ndigite o nome do cliente: "); 
        let cpf = this.prompt("\nDigite o CPF do cliente: ");
        
        client.setName(name);
        client.setCPF(cpf);

        this.control.db.addNewClient(client);

    }
}

