import { DBConn/* ,DBConnChoBK  */ } from "../init/App";

export default class gettingResponse { 
    static getResponse(sql: string, callback: any) {
        DBConn.conn.query(sql, function (err, resul) {
             
            new Promise((resolve, reject) => {
                
                if (err) {
                    console.log("err",err)
                    reject({error: "Error al procesar la consulta MYSQL",err})}
                    
                else {
                    /* console.log("result",resul) */
                    resolve(resul)
                }
            }).then (
                message => {return callback(message)}
            ).catch (
                error => {return callback(error)}
            )
        })
    }

    /* static getResponseChorrillosBK(sql: string, callback: any) {
        DBConnChoBK.conn.query(sql, function (err, resul) {
             
            new Promise((resolve, reject) => {
                if (err) reject({error: "Conexion Bdd Caída"})
                else {resolve(resul)}
            }).then (
                message => {return callback(message)}
            ).catch (
                error => {return callback(error)}
            )
        })
    } */
}


