export interface TableHospital {}
export interface TypeData{
    uuid: string;
    name: string;
    specificAddress: string;
    customerType: {
        id: number;
        name: string;
    };
    status: string;
    ward: {
        id: number;
        name: string;
    };
    province: {
        id: number;
        name: string;
    };
    district: {
        id: number;
        name: string;
    };

}