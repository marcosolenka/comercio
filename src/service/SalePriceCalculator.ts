import { CalculatorOperation } from "../enums/CalculatorOperation";
import Product from "../model/Product";

export default class SalePriceCalculator {
    private value: number = 0;
    public calculate(product: Product, quantity: number, operation: string): number {

        if(operation === CalculatorOperation.ADICAO){
            return product.getValue() * quantity;
        }
        if (operation === CalculatorOperation.SUBTRACAO){
            this.value -= product.getValue() * quantity;
        }
        return 0;
    }
}
