import { RowDataPacket } from "mysql2";
import { connection } from "./connection";

export interface Product extends RowDataPacket {
    id: number;
}

export async function getProductId(name:string) : Promise<Product|undefined>{
    const conn = await connection;
    const [rows] = await conn.query<Product[]>("SELECT id from Products where title=?", [name])
    if (rows.length == 0){
        return undefined
    }
    return rows[0]
}


export async function updateProduct(id:number,description:string,color:string){
    const conn = await connection;
    await conn.execute("UPDATE Products SET description=?, color=? WHERE id=?",[description,color,id])
}
