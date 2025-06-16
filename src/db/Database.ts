import Client from "../model/Client";
import Product from "../model/Product";
import Sale from "../model/Sale";
import Employe from "../model/Employe";

export default class Database {

    private productDb: Product[] = [];
    private clientDb: Client[] = [];
    private employeDb: Employe[] = [];
    private sales: Sale[] = [];

    public addNewProduct(product: Product): void {
        this.productDb.push(product);
    }
    public getProduct(index: number): Product {
        return this.productDb[index];
    }

    public getProducts(): Product[]{
        return this.productDb;
    }

    public addNewClient(client: Client): void{
        this.clientDb.push(client);
    }

    public getClient(index: number): Client{
        return this.clientDb[index];
    }

    public getClients(): Client[]{
        return this.clientDb;
    }

    public addNewEmploye(employe: Employe): void{
        this.employeDb.push(employe);
    }

    public getEmploye(index: number): Employe{
        return this.employeDb[index];
    }

    public getEmployes(): Employe[]{
        return this.employeDb;
    }

    public addNewSale(sale: Sale) {
        this.sales.push(sale);
    }

    public getSale(index: number): Sale{
        return this.sales[index];
    }

    public getSales(): Sale[]{
        return this.sales
    }
}