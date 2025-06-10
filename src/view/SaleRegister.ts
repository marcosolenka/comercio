import PromptSync from "prompt-sync";
import MainController from "../controller/MainController";
import Product from "../model/Product";
import Client from "../model/Client";
import Employe from "../model/Employe";
import { SaleStatus } from "../enums/SaleStatus";
import Sale from "../model/Sale";

export default class SaleRegister {

    private prompt = PromptSync();
    private control: MainController;

    public constructor(control: MainController) {
        this.control = control;
    }

    public addSale(): void{
        let sale = this.control.getNewSale();
        sale.setClient(this.addClient());
        sale.setEmploye(this.addEmploye());
        let aux = 'S';
        console.log('------------------------------------------');

        do {
            //ADICAO DE PRODUTO NA VENDA
            sale.addProductOnSale(this.addSaleItem(), this.addSaleQuantity());
            do {
                if (aux != 'S' && aux != 'N'){
                    console.log('\n Não entendi sua resposta!\n');
                }
                aux = this.prompt(`\nDeseja adicionar mais produtos? \nS. Sim \nN. Não \nResposta: `).toUpperCase();
            } 
            while (aux != 'S' && aux != 'N');
        } while (aux === 'S');

        aux = 'S';
        console.log('------------------------------------------');
        //ALTERAÇÃO DA VENDA
        do {
            aux = this.prompt(`\nDeseja alterar a venda em algum produto? \nS. Sim \nN. Não \nResposta: `).toUpperCase();
            if(aux ==='S'){
                this.changeSaleItem(sale);
            }
        } while (aux === 'S')

        sale.setStatus(SaleStatus.REALIZADA);
        this.control.db.addNewSale(sale);
    }

    public addClient(): Client{
        console.log('\n----------LISTA DE CLIENTES---------------')
        let clients: Client[] = this.control.db.getClients();
        for (let i = 0; i < clients.length; i++){
            console.log(`ID: ${i} Nome: ${clients[i].getName()}\n`);
        }

        let clientOption: number;
        do {
            clientOption = parseInt(this.prompt(`\nDigite o ID do cliente que está fazendo a compra: `), 10);
        } while (isNaN(clientOption) || !Number.isInteger(clientOption));
        let clientSelected = this.control.db.getClient(clientOption);
        console.log('------------------------------------------');
        console.log(`cliente selecionado: ${clientSelected.getName()} \n`)
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
            employeOption = parseInt(this.prompt(`\nDigite o ID do colaborador que está vendendo: `), 10);
        } while (isNaN(employeOption) || !Number.isInteger(employeOption));
        let employeSelected = this.control.db.getEmploye(employeOption);
        console.log('------------------------------------------')
        console.log(`Colaborador selecionado: ${employeSelected.getName()}`)
        return employeSelected;
    }


    public addSaleItem(): Product {
        let productSelected: Product;
        console.log('\n----------------LISTA DE PRODUTOS DISPONÍVEIS-------------------------')
        
        let products: Product[] = this.control.db.getProducts();
        for (let i = 0; i < products.length; i++){
            console.log(`ID: ${i} Nome: ${this.control.db.getProduct(i).getName()}\n`);
        }

        let productOption = this.prompt(`\nDigite o ID do produto que deseja adicionar ao pedido: `);
        productSelected = this.control.db.getProduct(Number(productOption));
        return productSelected;
    }

    public addSaleQuantity(): number{
        let quantity = 0;

        do {
        quantity = Number(this.prompt(`\nDigite a quantidade que deseja comprar: `));
        } while (isNaN(quantity) || !Number.isInteger(quantity) || quantity <= 0);
        return quantity;
    }

    public changeSaleItem(sale: Sale): number{
        let productSelected: number;
        let saleItems = sale.getSaleItems();
        let saleQuantity = sale.getSaleItemsQuanties();
        let aux = 'S';
        let auxChangeItem;
        let productIndex = 0;

        console.log('---------------------LISTA DA COMPRA-----------------------------------');
        
        for(let i = 0; i < sale.getSaleItems().length; i++){
            productIndex = saleItems.indexOf(saleItems[i]);
            console.log(`ID: ${productIndex} Produto: ${saleItems[i]} Quantidade: ${saleQuantity[i]}`)
        }

        let productOption = this.prompt(`Digite o ID do produto que deseja remover do pedido ou diminuir a quantidade de compra: `);
        productSelected = Number(productOption);

        do{
            console.log(`Produto Selecionado: ${saleItems[productSelected]} Quantidade: ${saleQuantity[(productSelected)]} \n`);
            auxChangeItem = Number(this.prompt(`\nDeseja remover ou alterar a quantidade? \n1. Remover \n2.Alterar Quantidade\n`));
            
            if(auxChangeItem === 1){
                this.removeSaleItem(sale, productSelected);
                aux = 'N';
            } 
            if (auxChangeItem === 2){
                this.changeSaleItemQuantity(sale, productSelected);
                aux = 'N';
            }
            else{
                console.log('Não entendi sua resposta!');
            }
        } while (aux === 'S');
        
        return productSelected;
    }

    public removeSaleItem(sale: Sale, saleItem: number): void{
        sale.removeSaleItem(saleItem);
    }

    public changeSaleItemQuantity(sale: Sale, saleItem: number){
        let quantity;
        let aux = 'S';

        do{
            quantity = Number(this.prompt(`\nDigite a quantidade que deseja definir para o item: `));
            aux = 'N';
        } while (aux === 'S');
        sale.changeSaleQuantity(saleItem, quantity);
    }
    
}

