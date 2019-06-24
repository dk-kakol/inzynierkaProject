import { Component, Input, OnInit } from "@angular/core";
import { Rotation } from "../../shared/rotation.model";
import { RotationService } from "../../shared/rotation.service";

@Component({
    selector: 'app-history-item',
    templateUrl: './history-item.component.html',
    styleUrls: ['./history-item.component.css']
})
export class HistoryItemComponent implements OnInit {
    @Input() item: Rotation;
    @Input() filtr: string;
    constructor(private rotationService: RotationService){}
    data: string;
    status: string;
    ngOnInit(){
        this.data = this.item.date.slice(0,10);
        if(this.item.status === 0){ this.status = 'Do akceptacji'}
        if(this.item.status === 1){ this.status = 'Zatwierdzone'}
        if(this.item.status === -1){ this.status = 'Odrzucone'}

    }
    onDelete(){
        this.rotationService.deleteMessage(this.item)
            .subscribe(
                result => console.log(result)
            );
    }

    disp: boolean = true;
    display(){
        if (this.filtr === "all") { return true}
        if (this.item.status.toString() !== this.filtr) { return false }
        return true;
    }

}