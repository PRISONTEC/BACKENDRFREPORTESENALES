"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const getResponses_1 = __importDefault(require("./getResponses"));
const generateUuid = () => {
    return (0, uuid_1.v4)();
};
class processUri {
    static insertarDatos(req, res) {
        const { idUsuario, fhSenalEncontrada, prefijoPenal, idSenal, detalle, idEstadoRFS, idOperador, idTecnologia, potencia, idResponsabilidad, ruido_db, latitud, longitud, area_no_bloqueo, hipervinculo_S, idVisita } = req.body;
        const sql = `call RadioFrecuenciaReportes.insertarDatos (${idUsuario},${fhSenalEncontrada},${prefijoPenal},${idSenal},'${detalle}',${idEstadoRFS},${idOperador},
        ${idTecnologia},'${potencia}',${idResponsabilidad},'${ruido_db}','${latitud}','${longitud}','${area_no_bloqueo}','${hipervinculo_S}',
        ${idVisita});`;
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } });
                }
                else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0]["resultado"] });
                }
            }
            catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error });
            }
        });
    }
    ;
    static obtenerReporte(req, res) {
        const { prefijoPenal, fechaHoraInicio, fechaHoraFin, estado } = req.query;
        const sql = `call RadioFrecuenciaReportes.obtenerDatos (${prefijoPenal},${fechaHoraInicio},${fechaHoraFin},'${estado}');`;
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } });
                }
                else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0] });
                }
            }
            catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error });
            }
        });
    }
    ;
    static obtenerReportePorID(req, res) {
        const { idReporte } = req.query;
        const sql = `call RadioFrecuenciaReportes.obtenerDatosPorIDReporte (${idReporte});`;
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } });
                }
                else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0] });
                }
            }
            catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error });
            }
        });
    }
    ;
    static insertarDatosIngeniero(req, res) {
        const { idReporte, idEstadoRFI, fhVisitaIngenieria, detalle, idVisita, hipervinculoI } = req.body;
        const sql = `call RadioFrecuenciaReportes.insertarDatosIngeniero (${idReporte},${idEstadoRFI},${fhVisitaIngenieria},'${detalle}',${idVisita},'${hipervinculoI}');`;
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } });
                }
                else {
                    res.status(200).send({ respuesta: result[0][0]["respuesta"]["resultado"] });
                }
            }
            catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error });
            }
        });
    }
    ;
    static insertarDatosSenales(req, res) {
        const { banda, cellID, PSC, EA, MAC = 0, idTipoTecnologia, prefijoPenal } = req.body;
        const sql = `INSERT INTO RadioFrecuenciaReportes.SENALES(banda, cellID, \`PSC/PCI\`, \`EA/UA/A-RFCN\`, MAC, idTipoTecnologia, prefijoPenal)
        VALUES (${banda}, '${cellID}', '${PSC}', '${EA}', '${MAC}', ${idTipoTecnologia}, ${prefijoPenal});`;
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ respuesta: "KO" });
                }
                else {
                    res.status(200).send({ respuesta: "OK" });
                }
            }
            catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error });
            }
        });
    }
    ;
    static obtenerReporteIngeniero(req, res) {
        const { idReporte } = req.query;
        const sql = `call RadioFrecuenciaReportes.actualizarReporteIngeniero(${idReporte});`;
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } });
                }
                else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0] });
                }
            }
            catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error });
            }
        });
    }
    ;
    static obtenerUltimoReporte(req, res) {
        const { idUsuario } = req.query;
        const sql = `call RadioFrecuenciaReportes.obtenerUltimoReporte(${idUsuario});`;
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO", respuesta: { respuesta: "KO" } });
                }
                else {
                    res.status(200).send({ respuesta: result[0][0]["resultado"] });
                }
            }
            catch (error) {
                res.status(400).send({ resultado: 'KO', error: result.error });
            }
        });
    }
    ;
}
exports.default = processUri;
// POST>>CREAR UN RECURSO O INSERTAR
// GET--->>OBTNER RECURSO
// PUT -->>ACTUALIZAR
// PATCH-->>ACTUALIZAR PARCIALMENTE
// DELETE --->> REMOVER RECURSO
