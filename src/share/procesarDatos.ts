
import { query, Request, Response } from "express";
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


    static insertarDatos(req: Request, res: Response) {
        const { idUsuario, fhSenalEncontrada, prefijoPenal, idSenal, detalle, idEstadoRFS, idOperador, idTecnologia, potencia, idResponsabilidad, ruido_db, latitud, longitud, area_no_bloqueo, hipervinculo_S, idVisita } = req.body
        const sql = `call RadioFrecuenciaReportes.insertarDatos (${idUsuario},${fhSenalEncontrada},${prefijoPenal},${idSenal},'${detalle}',${idEstadoRFS},${idOperador},
        ${idTecnologia},'${potencia}',${idResponsabilidad},'${ruido_db}','${latitud}','${longitud}','${area_no_bloqueo}','${hipervinculo_S}',
        ${idVisita});`
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } })
                } else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0]["resultado"] })
                }
            } catch (error) {

                res.status(400).send({ resultado: 'KO', error: result.error })
            }
        })
    };

    static obtenerReporte(req: Request, res: Response) {
        const {  prefijoPenal, fechaHoraInicio, fechaHoraFin,estado } = req.query
        const sql = `call RadioFrecuenciaReportes.obtenerDatos (${prefijoPenal},${fechaHoraInicio},${fechaHoraFin},'${estado}');`
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } })
                } else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0] })
                }

            } catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error })
            }
        })
    };

    static obtenerReportePorID(req: Request, res: Response) {
        const { idReporte } = req.query
        const sql = `call RadioFrecuenciaReportes.obtenerDatosPorIDReporte (${idReporte});`
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } })
                } else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0] })
                }
               
            } catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error })
            }
        })
    };


    static insertarDatosIngeniero(req: Request, res: Response) {
        const { idReporte,idEstadoRFI,fhVisitaIngenieria,detalle,idVisita,hipervinculoI } = req.body
        const sql = `call RadioFrecuenciaReportes.insertarDatosIngeniero (${idReporte},${idEstadoRFI},${fhVisitaIngenieria},'${detalle}',${idVisita},'${hipervinculoI}');`
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } })
                } else {
                    res.status(200).send({ respuesta: result[0][0]["respuesta"]["resultado"] })
                }
            } catch (error) {

                res.status(400).send({ resultado: 'KO', error: result.error })
            }
        })
    };

    static insertarDatosSenales(req: Request, res: Response) {
        const { banda,cellID,PSC,EA,MAC=0,idTipoTecnologia,prefijoPenal } = req.body;
        const sql = `INSERT INTO RadioFrecuenciaReportes.SENALES(banda, cellID, \`PSC/PCI\`, \`EA/UA/A-RFCN\`, MAC, idTipoTecnologia, prefijoPenal)
        VALUES (${banda}, '${cellID}', '${PSC}', '${EA}', '${MAC}', ${idTipoTecnologia}, ${prefijoPenal});`;
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({  respuesta: "KO"  })
                } else {
                    res.status(200).send({respuesta: "OK" })
                }
            } catch (error) {

                res.status(400).send({ resultado: 'KO', error: result.error })
            }
        })
    };

    static obtenerReporteIngeniero(req: Request, res: Response) {
        const { idReporte } = req.query
        const sql = `call RadioFrecuenciaReportes.actualizarReporteIngeniero(${idReporte});`
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } })
                } else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0] })
                }
                
            } catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error })
            }
        })
    };

    static obtenerUltimoReporte(req: Request, res: Response) {
        const { idUsuario } = req.query
        const sql = `call RadioFrecuenciaReportes.obtenerUltimoReporte(${idUsuario});`
        gettingResponses.getResponse(sql, (result: any) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } })
                } else {
                    res.status(200).send({ respuesta: result[0][0]["resultado"] })
                }
                
            } catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error })
            }
        })
    };

}



// POST>>CREAR UN RECURSO O INSERTAR
// GET--->>OBTNER RECURSO
// PUT -->>ACTUALIZAR
// PATCH-->>ACTUALIZAR PARCIALMENTE
// DELETE --->> REMOVER RECURSO
