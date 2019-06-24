import { Component, OnInit } from "@angular/core";
import { Rotation } from "../shared/rotation.model";
import { RotationService } from "../shared/rotation.service";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    rotations: Rotation[];
    constructor(private rotationService: RotationService){};
    filter: string = "all";
    ngOnInit(){
        this.rotationService.getRotations()
            .subscribe(
                (rotations: Rotation[]) => {
                    this.rotations = rotations;
                }
            );
    }
    
}