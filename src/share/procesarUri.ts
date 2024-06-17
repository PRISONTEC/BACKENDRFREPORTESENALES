
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { key_secret } from "../interfaces/interface";
import { v4 as uuidv4 } from 'uuid';
import { Credenciales } from "../interfaces/interface"
import gettingResponses from "./getResponses";


const generateUuid = (): string => {
    return uuidv4();
};

export default class processUri {

    //VALIDAR USUARIO PARA EL LOGIN
    static validarUsuario(req: Request, res: Response) {
        const sql = "call RadioFrecuenciaReportes.validacionUsuario ('" + req.body.usuario + "');"
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                let credenciales: Credenciales = result[0][0].resultado;
                if (credenciales.resultado == "OK") {
                    bcrypt.compare(req.body.contrasena, credenciales.contrasena!,
                        function (err, res1) {
                            if (res1) {
                                const token = jwt.sign({ userId: req.body.usuario }, key_secret, {
                                    expiresIn: '12h'
                                });
                                
                                // Guardar la fecha actual en formato epoch
                                const fechaActualEpoch = Math.floor(Date.now() / 1000);
                                // Llamar a la función para insertar más datos
                                processUri.registrarVisita(req.body.usuario, fechaActualEpoch, (insertResult) => {
                                    if (insertResult.success) {
                                        res.send({
                                            resultado: "OK",
                                            idUsuario: credenciales.idUsuario,
                                            /* idUsuarioTecnologia:credenciales, */
                                            token
                                        });
                                    } else {
                                        res.status(500).send({ 'respuesta': 'KO', error: insertResult.error });
                                    }
                                });
                            } else {
                                res.status(203).send({ 'respuesta': 'KO' })
                            }
                        }
                       
                    );
                } else {
                    res.status(203).send({ 'respuesta': 'KO',idUsuario: credenciales.idUsuario })
                }
                //res.send(result[0][0].resultado) 
            } catch (error) {
                res.status(400).send({ 'respuesta': 'KO', error: result.error })
            }
        })
    };

    static registrarVisita(usuario: string, fechaActualEpoch: number, callback: (result: { success: boolean, error?: any }) => void) {
        const updateSql = `UPDATE RadioFrecuenciaReportes.USUARIOS SET fhUltimaConexion=${fechaActualEpoch} WHERE username=('${usuario}');`;
        gettingResponses.getResponse(updateSql, (result: any) => {
            if (result.affectedRows > 0) {
                callback({ success: true });
            } else {

                callback({ success: false, error: result.error });
            }
        });
    }

    /* 
          if (result.error) {
            res.status(404).send({  respuesta: "KO"  })
        } else {
            res.status(200).send({respuesta: "OK" })
        } */

    static abrirCerrarSesion(req: Request, res: Response) {
        const { fechaInicio, fechaFin, usuario, prefijoPenal } = req.body
        const sql = "call RadioFrecuenciaReportes.iniciarCerrarSesion (" + fechaInicio + "," + fechaFin + ",'" + usuario + "'," + prefijoPenal + ");"
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO" })
                } else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0]["resultado"] })
                }
            } catch (error) {
                res.status(400).send({ 'respuesta': 'KO', error: result.error })
            }
        })
    };

    static verificarSesion(req: Request, res: Response) {
        const { usuario } = req.query
        const sql = "call RadioFrecuenciaReportes.verificarSesion ('" + usuario + "');"
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO" })
                } else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0]["resultado"] })
                }
            } catch (error) {
                res.status(400).send({ 'respuesta': 'KO', error: result.error })
            }
        })
    };

    static obtenerPenales(req: Request, res: Response) {
        const sql = `call RadioFrecuenciaReportes.obtenerPenalesYTecnologia(); `
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO" })
                } else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0]["respuesta"] })
                }
            } catch (error) {
                res.status(400).send({ 'respuesta': 'KO', error: result.error })
            }
        })
    };

    static obtenerDatosPerfil(req: Request, res: Response) {
        const { prefijoPenal, idTecnologia } = req.query
        const sql = "call RadioFrecuenciaReportes.obtenerDatosPerfil(" + prefijoPenal + ", " + idTecnologia + ");"
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO" })
                } else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0]["resultado"]["respuesta"] })
                }
            } catch (error) {
                res.status(400).send({ 'respuesta': 'KO', error: result.error })
            }
        })
    };


}



// POST>>CREAR UN RECURSO O INSERTAR
// GET--->>OBTNER RECURSO
// PUT -->>ACTUALIZAR
// PATCH-->>ACTUALIZAR PARCIALMENTE
// DELETE --->> REMOVER RECURSO
