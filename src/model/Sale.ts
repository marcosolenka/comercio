import Product from "./Product";
import Client from "./Client";
import Employe from "./Employe";
import SalePriceCalculator from "../service/SalePriceCalculator";
import { SaleStatus } from "../enums/SaleStatus";
import { CalculatorOperation } from "../enums/CalculatorOperation";

export default class Sale{
    private saleItems: Product[] = [];
    private saleItemsQuantity: number[] = [];
    private client!: Client;
    private employe!: Employe;
    private salePrice: number = 0;
    private calculator: SalePriceCalculator;
    private status: SaleStatus = SaleStatus.PENDENTE;



    constructor(calculator: SalePriceCalculator) {
        this.calculator = calculator;
    }

    public addProductOnSale(product: Product, quantity: number): void {
        this.saleItems.push(product);
        this.saleItemsQuantity.push(quantity);
        const price = this.calculator.calculate(product, quantity, CalculatorOperation.ADICAO);
        this.salePrice += price;
    }

    public removeSaleItem(index: number){
        console.log(`Item ${this.saleItems[index].getName()} removido`);
        this.saleItems.splice(index, 1);
        this.saleItemsQuantity.splice(index, 1);
    }

    public changeSaleQuantity(index: number, quantity: number): void{
        this.salePrice += this.calculator.calculate(this.saleItems[index], this.saleItemsQuantity[index], CalculatorOperation.SUBTRACAO);
        this.saleItemsQuantity[index] = quantity;
        this.salePrice += this.calculator.calculate(this.saleItems[index], quantity, CalculatorOperation.ADICAO);

    }

    public getClient(): Client{
        return this.client;
    }

    public setClient(client: Client): void{
        this.client = client;
    }

    public setEmploye(employe: Employe): void{
        this.employe = employe;
    }

    public getEmploye(): Employe{
        return this.employe;
    }

    public getSaleItems(): Object[]{
        return this.saleItems;
    }

    public getSaleItemsQuanties(): number[]{
        return this.saleItemsQuantity;
    }

    public getSalePrice(): number{
        return this.salePrice;
    }

    public setStatus(status: SaleStatus): void {
        this.status = status;
    }

    public getStatus(): SaleStatus {
        return this.status;
    }

    public toString(): String{
    let saleData = `
        Colaborador: 
                    ${this.employe.toString()}
        Cliente: 
                ${this.client.toString()}
        Valor Total Compra: ${this.salePrice}
        Produtos Vendidos:`
    let saleProducts = '\n';
        for (let i = 0; i < this.saleItems.length; i++){
            saleProducts +=  this.saleItems[i].getName() + '\n' ;
            saleProducts += 'quantidade: ' + this.saleItemsQuantity[i]; + '\n';
    }

    return saleData + saleProducts;
    }
}