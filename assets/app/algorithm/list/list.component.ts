import { Component, OnInit } from "@angular/core";
import { Warehouse } from "../../shared/warehouse.model";
import { DataService } from "../../shared/data.service";


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
    warehouses: Warehouse[];
    constructor(private data: DataService){};
    ngOnInit(){
        this.data.warehousesChanged
            .subscribe(
                (warehouses: Warehouse[]) => this.warehouses = warehouses
            );
        console.log(this.warehouses);
    }


}