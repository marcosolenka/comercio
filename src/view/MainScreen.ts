import promptSync from 'prompt-sync';
import MainController from '../controller/MainController';
import ProductRegister from './ProductRegister';
import ClientRegister from './ClientRegister';
import SaleRegister from './SaleRegister';
import EmployeRegister from './EmployeRegister';

export default class MainScreen {

    private prompt = promptSync();
    private control: MainController;
    private productRegister: ProductRegister;
    private clientRegister: ClientRegister;
    private saleRegister: SaleRegister;
    private employeRegister: EmployeRegister;

    constructor(control: MainController){
        
        this.control = control;
        this.productRegister = new ProductRegister(control);
        this.clientRegister = new ClientRegister(control);
        this.saleRegister = new SaleRegister(control);
        this.employeRegister = new EmployeRegister(control);
        this.mainMenu();
    }
    public mainMenu(): void {
        let continues: boolean = true;
        while (continues) {


            let choice = parseInt(this.prompt(`
                                               1 - Cadastrar Produto
                                               2 - Cadastrar Cliente
                                               3 - Cadastrar Colaborador
                                               4 - Registrar Venda
                                               5 - Sair
                                               Resposta: `));
            switch (choice) {
                case 1:
                    this.productRegister.addProduct();
                    break;
                case 2:
                    this.clientRegister.addClient();
                    break;
                case 3:
                    this.employeRegister.addEmploye();
                    break;
                case 4:
                    this.saleRegister.addSale();
                case 5:
                    continues = false;
                    break;
                default:
                    console.log("digite um numero válido");
                    break;
            }
        }
        console.log("SAIU");
    }


}