import { Neighbour } from "./neighbour.model";

export class Warehouse {
    constructor(
        public id: number,
        public name: string,
        public coordinate:number[],
        public numFamily: number,
        public numExtraFamily: number,
        public clients: number,
        public tempo: number,
        public rotationFamily: number,
        public suggestionRate?: number,
        public neighbour?: Neighbour[],
        public rate?: number) {}
}