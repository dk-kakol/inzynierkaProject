import { Warehouse } from "./warehouse.model";
import { EventEmitter } from "@angular/core";

export class DataService {
    warehousesChanged = new EventEmitter<Warehouse[]>();
    periodChanged = new EventEmitter<number>();
    
    private warehouses: Warehouse[] = [];
    private period: number;

    getWarehouses(){
        return this.warehouses.slice();
    }

    getWarehouse(id){
        let index = 0;
        while ( this.warehouses[index].id !== id ){ 
            index++;
        }
        return this.warehouses[index];
    }

    addWarehouse(warehouse: Warehouse){
        this.warehouses.push(warehouse);
        this.warehousesChanged.emit(this.warehouses.slice());
    }

    getPeriod(){
        return this.period;
    }

    addPeriod(period: number){
        this.period = period;
        this.periodChanged.emit(this.period);
    }

    deleteWatehouse(warehouse: Warehouse){
        this.warehouses.splice(this.warehouses.indexOf(warehouse),1);
        this.warehousesChanged.emit(this.warehouses.slice());
    }

    clear(){
        this.warehouses = [];
        this.period = null;
    }
}

