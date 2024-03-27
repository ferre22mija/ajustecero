export interface ProductoApi{
    id:number,
    name:string,
    inventory:Inventory,
    estado:string,
    resultado:string
    status:string,
    cantidad:number

}
interface Inventory {
    warehouses:Array<warehouse>,
    unit:string,
    unitCost:number
}

interface warehouse{
    availableQuantity:number
}
