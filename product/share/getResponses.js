"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../init/App");
class gettingResponse {
    static getResponse(sql, callback) {
        App_1.DBConn.conn.query(sql, function (err, resul) {
            new Promise((resolve, reject) => {
                if (err) {
                    console.log("err", err);
                    reject({ error: "Error al procesar la consulta MYSQL", err });
                }
                else {
                    /* console.log("result",resul) */
                    resolve(resul);
                }
            }).then(message => { return callback(message); }).catch(error => { return callback(error); });
        });
    }
}
exports.default = gettingResponse;
