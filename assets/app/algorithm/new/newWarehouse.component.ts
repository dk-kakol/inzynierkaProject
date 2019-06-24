import { Component, DoCheck } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Warehouse } from "../../shared/warehouse.model";
import { DataService } from "../../shared/data.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-new-warehouse',
    templateUrl: './newWarehouse.component.html',
})
export class NewWarehouseComponent implements DoCheck {
    warehouse: Warehouse;
    show: boolean = true;
    constructor(
        private dataService: DataService, 
        private router: Router, 
        private route: ActivatedRoute){};
    ngDoCheck(){
        this.show = true;
    }

    onSubmit(form: NgForm){
        console.log(form.value.name.length);
        if (form.value.name.length !== 0){
            const warehouse  = new Warehouse(
                                        form.value.id, 
                                        form.value.name,
                                        [form.value.coordinatelat, form.value.coordinatelon],
                                        form.value.numFamily,
                                        form.value.numExtraFamily,
                                        form.value.clients,
                                        form.value.tempo,
                                        0);
            console.log(warehouse);
            this.dataService.addWarehouse(warehouse);
        form.resetForm();
        }
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    onCancel(){
        this.show = false;
    }
}