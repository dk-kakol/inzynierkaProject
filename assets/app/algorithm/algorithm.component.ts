import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../shared/data.service";
import { Warehouse } from "../shared/warehouse.model";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-algorithm',
    templateUrl: './algorithm.component.html',
    styleUrls: ['./algorithm.component.css']
})
export class AlgorithmComponent{
    constructor(private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService) {
            this.dataService.clear();
         }

    selectedFile = null;
    period: number;
    getName(){
        if (this.period) { 
            return 'Zmień okres'
        }
        else {
            return 'Zapisz'
        }
    }


    onNewWarehous(){
        this.router.navigate(['newWarehous'], {relativeTo: this.route} );
    }
    onCalculate(){
        this.router.navigate(['../result'], {relativeTo: this.route} );
    }
    onUpload(event){
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
        var reader = new FileReader();
        reader.readAsText(this.selectedFile,'Windows-1250');
        reader.onload = (data) => {
            let csvData = reader.result;
            let csvRecordsArray = csvData.split(/\r\n|\n/);
            let i = 1;
            let resultsArray = [];
            for (i; i<csvRecordsArray.length-1; i++){
                resultsArray[i] = csvRecordsArray[i].split(",");
                this.dataService.addWarehouse(new Warehouse(
                                                Number(resultsArray[i][0]), 
                                                resultsArray[i][1], 
                                                [ Number(resultsArray[i][2]) , Number(resultsArray[i][3]) ],
                                                Number(resultsArray[i][4]),
                                                Number(resultsArray[i][5]),
                                                Number(resultsArray[i][6]),
                                                Number(resultsArray[i][7]),
                                                Number(0),
                ))
            }
        }
    }

    onSubmit(form: NgForm){
        this.period = Number(form.value.period);
        this.dataService.addPeriod(this.period);
    }

    isWarehouse: boolean= false;
    isPeriod: boolean= false;
    checkData(){
        this.dataService.warehousesChanged
            .subscribe(
                (warehouses: Warehouse[]) => {
                    if(warehouses.length !== 0) { 
                        this.isWarehouse = true;
                    }
                    if(warehouses.length === 0){
                        this.isWarehouse = false;
                    }
                }
            )
        this.dataService.periodChanged
            .subscribe(
                (period: number) => {
                    console.log(period);
                    if(period !== 0) { 
                        this.isPeriod = true; 
                    }; 
                    if(period === 0) { 
                        this.isPeriod = false; 
                    }; 
                }
            )
        return (this.isWarehouse && this.isPeriod);
    }
}