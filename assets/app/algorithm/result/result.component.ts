import { Component, OnInit, DoCheck, ChangeDetectorRef, ViewRef} from "@angular/core";
import { CalculationService } from "../../shared/calculation.service";
import { Warehouse } from "../../shared/warehouse.model";
import { Rotation } from "../../shared/rotation.model";
import { RotationService } from "../../shared/rotation.service";

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, DoCheck{
    wynik;
    warehouses: Warehouse[];
    rotations: Rotation[];
    date: Date;
    constructor(
        private calculationService: CalculationService,
        private rotationService: RotationService,
        private ref: ChangeDetectorRef){
            ref.detach();
            setInterval(() => {
                if(this.ref && !(this.ref as ViewRef).destroyed){
                    this.ref.detectChanges();
                }
            },1000);
        }

    ngOnInit(){
        this.wynik = this.calculationService.calculate();
        this.rotations=this.wynik[1];
        this.warehouses = this.wynik[0];
    }
    ngDoCheck(){
        this.calculationService.resRotationsChanged
            .subscribe(
                (rotations: Rotation[]) => {
                    this.rotations = rotations;
                    //console.log(rotations);
                }
            );
    }
}