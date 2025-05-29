import PromptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Employe from "../model/Employe";

export default class EmployeRegister {

    private prompt = PromptSync();
    private control: MainController;

    public constructor(control: MainController) {
        this.control = control;
    }

    public addEmploye(): void {
        let employe = new Employe();
        let name = this.prompt("\ndigite o nome do colaborador: "); 
        let id = this.control.db.getEmployes().length;

        employe.setName(name);

        if (id === undefined){
            id = 0;
            employe.setId(id);
            this.control.db.addNewEmploye(employe);
            return;
        } else{
            employe.setId(id++);
            this.control.db.addNewEmploye(employe);
            return;
        }
    }
}

