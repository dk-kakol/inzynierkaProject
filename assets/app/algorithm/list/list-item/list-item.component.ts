import { Component, Input } from "@angular/core";
import { DataService } from "../../../shared/data.service";
import { Warehouse } from "../../../shared/warehouse.model";

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {
    @Input() item: Warehouse;

    constructor(private data: DataService){};

    onDelete(){
        this.data.deleteWatehouse(this.item);
    };
}