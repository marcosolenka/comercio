import Database from "../db/Database";
import Client from "../model/Client";
import Product from "../model/Product";
import MainScreen from "../view/MainScreen";
import Sale from "../model/Sale";
import SalePriceCalculator from "../service/SalePriceCalculator";
import ClientValidator from "../service/ClientValidator";

export default class MainController{

    public db: Database = new Database();
    public salePriceCalculator = new SalePriceCalculator();

    constructor(){
       new MainScreen(this);
    }

    public getNewProduct(){
        return new Product();
    }

    public getNewClient(){
        return new Client();
    }

    public getNewSale() {
        return new Sale(this.salePriceCalculator); 
    }
}