import { Injectable, EventEmitter } from "@angular/core";
import { DataService } from "./data.service";
import { Warehouse } from "./warehouse.model";
import { Neighbour } from "./neighbour.model";
import { Rotation } from "./rotation.model";
import { RotationService } from "./rotation.service";

@Injectable()
export class CalculationService {
    constructor(
        private dataService: DataService,
        private rotationService: RotationService){};

    quickSortNeighbours(left: number, right: number, table: Neighbour[]){
        let i, j, piwot, x;
        i = Math.floor((left+right) / 2);
        piwot = table[i];
        table[i] = table[right];
        for(j = i = left; i < right; i++ ) {
            if(table[i].distance < piwot.distance) {
                x = table[i];
                table[i] = table[j];
                table[j] = x;
                j++;
            }
        }
        table[right] = table[j]; table[j] = piwot;
        if(left < j - 1) this.quickSortNeighbours(left, j - 1, table);
        if(j + 1 < right) this.quickSortNeighbours(j + 1, right, table);

    }

    quickSortWarehouses(left: number, right: number, table: Warehouse[]){
        let i, j, piwot, x, piwot2;
        i = Math.floor((left+right) / 2);
        piwot = table[i];
        piwot2 = table[i].clients;
        table[i] = table[right];
        for(j = i = left; i < right; i++ ) {
            if(table[i].rate < piwot.rate) {
                x = table[i];
                table[i] = table[j];
                table[j] = x;
                j++;
            }
            if(table[i].rate === piwot.rate && table[i].clients < piwot2){
                x = table[i];
                table[i] = table[j];
                table[j] = x;
                j++;
            }
        }
        table[right] = table[j]; table[j] = piwot;
        if(left < j - 1) this.quickSortWarehouses(left, j - 1, table);
        if(j + 1 < right) this.quickSortWarehouses(j + 1, right, table);

    }

    countRate(warehouse: Warehouse, period: number){
        let result: number = Math.floor(warehouse.tempo * period - (warehouse.numFamily + warehouse.numExtraFamily + warehouse.rotationFamily));
        return result;
    }

    resRotations: Rotation[];
    resRotationsChanged = new EventEmitter<Rotation[]>();

    calculate(){
    //----------------------------------------------
    //First step
        let warehouses: Warehouse[] = this.dataService.getWarehouses();
        let period: number = this.dataService.getPeriod();
        let rotations: Rotation[] = [];
        let noRotations: string;
        let results: any;
        let date = new Date();
    //----------------------------------------------
    //Second step
        //1. Create neighbour:
        let distance = 0;
        let x1 = 0;
        let x2 = 0;
        let y1 = 0;
        let y2 = 0;
        for (let i=0; i<warehouses.length; i++) {
            warehouses[i].neighbour = [];
            //calculate distances
            for(let j=0; j<warehouses.length; j++){
                if (i !== j) {
                    x1 = warehouses[i].coordinate[0];
                    x2 = warehouses[j].coordinate[0];
                    y1 = warehouses[i].coordinate[1];
                    y2 = warehouses[j].coordinate[1];
                    distance = Math.sqrt( Math.pow((x2-x1), 2) + Math.pow( (Math.cos(x1 * Math.PI / 180 ) * (y2 - y1) ), 2)) * 40075.704 / 360;
                    warehouses[i].neighbour.push( new Neighbour( warehouses[j].id, distance) ) ;
                }
            }
            //quicksort
            let left = 0;
            let right = warehouses[i].neighbour.length-1;
            this.quickSortNeighbours(left, right, warehouses[i].neighbour);
            console.log(warehouses[i].neighbour);
        }

    //----------------------------------------------
    //Third step
        for (let i=0; i<warehouses.length; i++) {
            warehouses[i].rate = this.countRate(warehouses[i], period);
            warehouses[i].suggestionRate = warehouses[i].rate;
        }

    //----------------------------------------------
    //Fourth step
        let left = 0;
        let right = warehouses.length-1;
        this.quickSortWarehouses(left, right, warehouses);

    //----------------------------------------------
    //Fifth step
        let i = 0;
        let j = 0;
        let idNeighbour;
        let dist;
        let index;
        let maxAmount, needAmount, amount;
        let rotation: Rotation;

        while(warehouses[i].suggestionRate < -3) {
            for(let k = 0; k < warehouses[i].neighbour.length; k++){
                idNeighbour = warehouses[i].neighbour[k].idNeighbour;
                index = 0;
                while ( warehouses[index].id !== idNeighbour ){ 
                    index++;
                }
                dist = warehouses[i].neighbour[k].distance;
                if(dist > 120){
                    break; //ten i kolejne magazyny już są zbyt daleko. Nie będzie gdzie przenieść
                }
                if(warehouses[index].suggestionRate > 5){
                    //tworzę propozycje przeniesienia
                    maxAmount = warehouses[index].suggestionRate - 5;
                    needAmount = -warehouses[i].suggestionRate - 3;
                    if( maxAmount > needAmount){
                        amount = needAmount;
                    } else {
                        amount = maxAmount;
                    }
                    rotation = new Rotation(date, warehouses[i].id, warehouses[i].name, idNeighbour, warehouses[index].name, amount, 0);
                    rotations.push(rotation);
                        
                    //uaktualniam potencjały
                    warehouses[i].rotationFamily -= amount;
                    warehouses[index].rotationFamily += amount;
                    warehouses[i].suggestionRate = this.countRate(warehouses[i], period);
                    warehouses[index].suggestionRate = this.countRate(warehouses[index], period);
                }
                if(warehouses[i].suggestionRate >= -3){
                    break; //więcej przenosić nie trzeba, idziemy do kolejnego magazynu
                }
            }
            i++;
        }

        this.rotationService.addRotations(rotations)
        .subscribe(
            data => console.log(data),
            error => console.log(error)
        );
        let resRotations: Rotation[]
        this.rotationService.getRotationsByDay(date.toISOString())
        .subscribe(
            (rotations: Rotation[]) => {
                resRotations = rotations;
                this.resRotationsChanged.emit(resRotations);
                console.log(resRotations);
            }
        );
        
    //----------------------------------------------
    //Sixth step
        results = [warehouses,rotations];
    
        return results;
    }
}