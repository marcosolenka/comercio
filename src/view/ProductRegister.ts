import PromptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Product from "../model/Product";

export default class ProductRegister {

    private prompt = PromptSync();
    private control: MainController;

    public constructor(control: MainController) {
        this.control = control;
    }

    public addProduct(): void{
        let product = this.control.getNewProduct();
        let name = this.prompt("\ndigite o nome do produto: "); 
        let value = Number(this.prompt("Digite o valor do produto: "));
        
        product.setName(name);
        product.setValue(value);
        this.control.db.addNewProduct(product);
    }
}

