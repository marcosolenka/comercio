import { CalculatorOperation } from "../enums/CalculatorOperation";
import Product from "../model/Product";

export default class SalePriceCalculator {
    private value: number = 0;
    public calculate(product: Product, quantity: number, operation: string): number {

        if(operation === CalculatorOperation.ADICAO){
            this.value =  product.getValue() * quantity;
            console.log(`Adição: ${this.value}`);
            return this.value;
            
        }
        if (operation === CalculatorOperation.SUBTRACAO){
            this.value = -product.getValue() * quantity;
            console.log(`Subtracao: ${this.value}`);
            return this.value;
        }
        return 0;
    }
}
