import PromptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Product from "../model/Product";
import Client from "../model/Client";
import Employe from "../model/Employe";

export default class SaleRegister {

    private prompt = PromptSync();
    private control: MainController;

    public constructor(control: MainController) {
        this.control = control;
    }

    public addSale(){
        let sale = this.control.getNewSale();
        sale.setClient(this.addClient());
        sale.setEmploye(this.addEmploye());
        let aux = 'S';

        do {
            sale.addProductOnSale(this.addSaleItem(), this.addSaleQuantity());
            do {
                if (aux != 'S' && aux != 'N'){
                    console.log('Não entendi sua resposta!\n');
                }
                aux = this.prompt(`Deseja adicionar mais produtos? \nS. Sim \nN. Não \nResposta: `).toUpperCase();
            } 
            while (aux != 'S' && aux != 'N');
        } while (aux === 'S');
        
        this.control.db.addNewSale(sale);
    }

    public addClient(): Client{
        console.log('----------LISTA DE CLIENTES---------------')
        let clients: Client[] = this.control.db.getClients();
        for (let i = 0; i < clients.length; i++){
            console.log(`ID: ${i} Nome: ${clients[i].getName()}\n`);
        }

        let clientOption: number;
        do {
            clientOption = parseInt(this.prompt(`Digite o ID do cliente que está fazendo a compra: `), 10);
        } while (isNaN(clientOption) || !Number.isInteger(clientOption));
        let clientSelected = this.control.db.getClient(clientOption);
        console.log('------------------------------------------')
        console.log(`cliente selecionado: ${clientSelected.getName()}`)
        return clientSelected;
    }

    public addEmploye(): Employe{
        console.log('----------LISTA DE FUNCIONARIOS---------------')
        let employes: Employe[] = this.control.db.getEmployes();
        for (let i = 0; i < employes.length; i++){
            console.log(`ID: ${i} Nome: ${employes[i].getName()}\n`);
        }

        let employeOption: number;
        do {
            employeOption = parseInt(this.prompt(`Digite o ID do colaborador que está vendendo `), 10);
        } while (isNaN(employeOption) || !Number.isInteger(employeOption));
        let employeSelected = this.control.db.getEmploye(employeOption);
        console.log('------------------------------------------')
        console.log(`Colaborador selecionado: ${employeSelected.getName()}`)
        return employeSelected;
    }


    public addSaleItem(): Product {
        let productSelected: Product;
        console.log('----------------LISTA DE PRODUTOS DISPONÍVEIS-------------------------')
        let products: Product[] = this.control.db.getProducts();
        for (let i = 0; i < products.length; i++){
            console.log(`ID: ${i} Nome: ${this.control.db.getProduct(i).getName()}\n`);
        }

        let productOption = this.prompt(`Digite o ID do produto que deseja adicionar ao pedido: `);
        productSelected = this.control.db.getProduct(Number(productOption));
        console.log('-----------------------------------------------------------------------')
        return productSelected;
    }

    public addSaleQuantity(): number{
        let quantity = 0;

        do {
        quantity = Number(this.prompt(`Digite a quantidade que deseja comprar: `));
        } while (isNaN(quantity) || !Number.isInteger(quantity) || quantity <= 0);
        return quantity;
    }

    
}

