import Product from "./Product";
import Client from "./Client";
import Employe from "./Employe";
import SalePriceCalculator from "../service/SalePriceCalculator";
import { SaleStatus } from "../enums/SaleStatus";

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
        const price = this.calculator.calculate(product.getValue(), quantity);
        this.salePrice += price;
    }

    public removeSaleItem(index: number){
        console.log(`Item ${(this.saleItems[index] as any).product.getName()} removido`);
        this.saleItems.splice(index, 1);
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
            saleProducts += '\n Produto: ' + this.saleItems[i].getName() + ' ' ;
            saleProducts += 'quantidade: ' + this.saleItemsQuantity[i]; + '\n';
    }

    return saleData + saleProducts;
    }
}