import { Component, Input, OnInit } from "@angular/core";
import { Rotation } from "../../../../shared/rotation.model";
import { RotationService } from "../../../../shared/rotation.service";
import { DataService } from "../../../../shared/data.service";
import { Warehouse } from "../../../../shared/warehouse.model";

@Component({
    selector: 'app-rotation-item',
    templateUrl: './rotation-item.component.html',
    styleUrls: ['./rotation-item.component.css']
})

export class RotationItemComponent implements OnInit {
    @Input() rotation: Rotation;
    OriginWarehous: Warehouse;
    DestinationWarehous: Warehouse;
    lat: number;
    lng: number;
    lat1: number;
    lng1: number;
    lat2: number;
    lng2: number;
    z=7;
    disp: boolean = false;
    distance: number;
    distString: string;
    status: string;

    constructor(private rotationService: RotationService, private data: DataService){};
    ngOnInit(){
        this.OriginWarehous = this.data.getWarehouse(this.rotation.idOriginWarehous);
        this.DestinationWarehous = this.data.getWarehouse(this.rotation.idDestinationWarehous);
        let index = 0;
        while ( this.OriginWarehous.neighbour[index].idNeighbour !== this.rotation.idDestinationWarehous ){ 
            index++;
        }
        this.distString = this.OriginWarehous.neighbour[index].distance.toFixed(2);

        if(this.rotation.status === 0){ this.status = 'Do akceptacji'}
        if(this.rotation.status === 1){ this.status = 'Zatwierdzone'}
        if(this.rotation.status === -1){ this.status = 'Odrzucone'}
    }

    onAccept(){
        this.rotation.status = 1;
        this.status = 'Zatwierdzone';
        this.rotationService.updateRotation(this.rotation)
            .subscribe(
                result => console.log(result)
            );;
    }

    onDiscard(){
        this.rotation.status = -1;
        this.status = 'Odrzucone';
        this.rotationService.updateRotation(this.rotation)
            .subscribe(
                result => console.log(result)
            );;
    }

    show(){
        return this.disp;
    }
    onShow(){
        this.lat1 = this.OriginWarehous.coordinate[0];
        this.lng1 = this.OriginWarehous.coordinate[1];
        this.lat2 = this.DestinationWarehous.coordinate[0];
        this.lng2 = this.DestinationWarehous.coordinate[1];
        this.lat = (this.lat1 + this.lat2)*0.5;
        this.lng = (this.lng1 + this.lng2)*0.5;
        if (this.distance<=4){ this.z = 15};
        if (this.distance>4 && this.distance<= 20){ this.z = 11};
        if (this.distance>20 && this.distance<= 100){ this.z = 9};
        if (this.distance>100){ this.z = 8};
        this.disp = true;
    }
    onClose(){
        this.disp = false;
    }
    display(){
        return this.rotation.rotationId !== null;
    }

}