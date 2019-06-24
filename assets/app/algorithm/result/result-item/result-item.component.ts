import { Component, Input, OnInit } from "@angular/core";
import { Warehouse } from "../../../shared/warehouse.model";
import { Rotation } from "../../../shared/rotation.model";

@Component({
    selector: 'app-result-item',
    templateUrl: './result-item.component.html',
    styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {
    @Input() item: Warehouse;
    @Input() rotations: Rotation[];

    itemRotations: Rotation[] = [];
    ngOnInit(){
        for(let rotation of this.rotations){
            if(rotation.idOriginWarehous === this.item.id){
                this.itemRotations.push(rotation);
            }
        }
    }

}