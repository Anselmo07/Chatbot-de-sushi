import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Menu } from "src/menu/entities/menu.entity";
import { Repository } from "typeorm";
import { productMock } from "./prodcut.seed";

@Injectable()
export class ProductSeed{
    constructor(
        @InjectRepository(Menu) private readonly menu: Repository<Menu>
    ){}

    async seed() {
        const existingProductNames = (
            await this.menu.find()
        ).map((product) => product.name);
    
        for (const productData of productMock) {
            if (!existingProductNames.includes(productData.name)) {
                const product = new Menu();
                product.name = productData.name;
                product.description = productData.description;
                product.price = productData.price;
                product.available = productData.available; 
                await this.menu.save(product);
    
            }
        }
    }
}