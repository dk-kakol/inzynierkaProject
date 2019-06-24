import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Rotation } from "./rotation.model";


@Injectable()
export class RotationService {
    private rotations: Rotation[] = [];
    
    constructor(private http: Http){}

    addRotation(rotation: Rotation){
        const body = JSON.stringify(rotation);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post('http://localhost:3000/api/rotations/one', body, {headers: headers})
            .map((response: Response) => {
                response.json();
                const result = response.json();
                const rotation = new Rotation(
                                        result.obj.date,
                                        result.obj.idOriginWarehous,
                                        result.obj.OriginWarehousName,
                                        result.obj.idDestinationWarehous,
                                        result.obj.DestinationWarehousName,
                                        result.obj.amount,
                                        result.obj.status,
                                        result.obj._id);
                this.rotations.push(rotation);
                return rotation;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    addRotations(rotations: Rotation[]){
        const body = JSON.stringify(rotations);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post('http://localhost:3000/api/rotations/many', body, {headers: headers})
            .map((response: Response) => {
                const responseRotations = response.json();
                for (let result of responseRotations.obj){
                    const rotation = new Rotation(
                                            result.date,
                                            result.idOriginWarehous,
                                            result.OriginWarehousName,
                                            result.idDestinationWarehous,
                                            result.DestinationWarehousName,
                                            result.amount,
                                            result.status,
                                            result._id);
                    this.rotations.push(rotation);
                }
                return rotations;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getRotations(){
        return this.http.get('http://localhost:3000/api/rotations/all')
            .map((response: Response) => {
                const rotations = response.json().obj;
                let transformedRotations: Rotation [] = [];
                for (let rotation of rotations) {
                    transformedRotations.push(new Rotation(
                                                    rotation.date, 
                                                    rotation.idOriginWarehous, 
                                                    rotation.OriginWarehousName,
                                                    rotation.idDestinationWarehous,
                                                    rotation.DestinationWarehousName,
                                                    rotation.amount,
                                                    rotation.status,
                                                    rotation._id));
                }
                this.rotations = transformedRotations;
                return transformedRotations;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getRotationsByDay(date: string){
        return this.http.get('http://localhost:3000/api/rotations/'+date)
            .map((response: Response) => {
                const rotations = response.json().obj;
                let transformedRotations: Rotation [] = [];
                for (let rotation of rotations) {
                    transformedRotations.push(new Rotation(
                                                    rotation.date, 
                                                    rotation.idOriginWarehous, 
                                                    rotation.OriginWarehousName,
                                                    rotation.idDestinationWarehous,
                                                    rotation.DestinationWarehousName,
                                                    rotation.amount,
                                                    rotation.status,
                                                    rotation._id));
                }
                this.rotations = transformedRotations;
                return transformedRotations;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updateRotation(rotation: Rotation){
        const body = JSON.stringify(rotation);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.patch('http://localhost:3000/api/rotations/update/' + rotation.rotationId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMessage(rotation: Rotation){
        this.rotations.splice(this.rotations.indexOf(rotation),1);
        return this.http.delete('http://localhost:3000/api/rotations/' + rotation.rotationId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}