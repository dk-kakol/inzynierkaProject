export class Rotation {
    constructor(
        public date: Date,
        public idOriginWarehous: number,
        public OriginWarehousName: string,
        public idDestinationWarehous: number,
        public DestinationWarehousName: string,
        public amount: number,
        public status: number,
        public rotationId?: number) {}
}