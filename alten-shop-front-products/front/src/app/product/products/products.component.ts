import {Component, inject, OnInit} from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ProductsService } from 'app/services/products.service';
import { Product } from 'app/models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsService = inject(ProductsService);

  products!: Product[];

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;


  constructor() { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
        this.products = products;
    });

    this.sortOptions = [
      {label: 'More Expansive', value: '!price'},
      {label: 'Less Expansive', value: 'price'},
      {label: 'Best Rating', value: '!rating'},
      {label: 'Worst Rating', value: 'rating'}
    ];
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }


}


