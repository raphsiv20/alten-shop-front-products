import {Component, inject, OnInit} from '@angular/core';
import { Product } from 'app/models/product';
import { ProductsService } from 'app/services/products.service'; 
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  productDialog: boolean;

  products: Product[];

  product: Product = {
    category: '',
    code: '',
    description: '',
    id: '',
    inventoryStatus: '',
    name: '',
    price: 0,
    quantity: 0
  };

  selectedProducts: Product[];

  submitted: boolean;

  productsService = inject(ProductsService);

  messageService = inject(MessageService);

  confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    }) ;
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProducts(this.selectedProducts).subscribe();
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });

  }

  editProduct(product: Product) {
    this.product = {...product};
    this.productDialog = true;
    }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.productsService.deleteAProduct(product).subscribe();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });


  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.productsService.updateAProduct(this.product).subscribe();

        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.productsService.createAProduct(this.product).subscribe();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }
      
      this.products = [...this.products];
      this.productDialog = false;


    }
    

  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }


}


