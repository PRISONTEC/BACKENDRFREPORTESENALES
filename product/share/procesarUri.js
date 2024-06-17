"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const interface_1 = require("../interfaces/interface");
const uuid_1 = require("uuid");
const getResponses_1 = __importDefault(require("./getResponses"));
const generateUuid = () => {
    return (0, uuid_1.v4)();
};
class processUri {
    //VALIDAR USUARIO PARA EL LOGIN
    static validarUsuario(req, res) {
        const sql = "call RadioFrecuenciaReportes.validacionUsuario ('" + req.body.usuario + "');";
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                let credenciales = result[0][0].resultado;
                if (credenciales.resultado == "OK") {
                    bcrypt.compare(req.body.contrasena, credenciales.contrasena, function (err, res1) {
                        if (res1) {
                            const token = jsonwebtoken_1.default.sign({ userId: req.body.usuario }, interface_1.key_secret, {
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
                                }
                                else {
                                    res.status(500).send({ 'respuesta': 'KO', error: insertResult.error });
                                }
                            });
                        }
                        else {
                            res.status(203).send({ 'respuesta': 'KO' });
                        }
                    });
                }
                else {
                    res.status(203).send({ 'respuesta': 'KO', idUsuario: credenciales.idUsuario });
                }
                //res.send(result[0][0].resultado) 
            }
            catch (error) {
                res.status(400).send({ 'respuesta': 'KO', error: result.error });
            }
        });
    }
    ;
    static registrarVisita(usuario, fechaActualEpoch, callback) {
        const updateSql = `UPDATE RadioFrecuenciaReportes.USUARIOS SET fhUltimaConexion=${fechaActualEpoch} WHERE username=('${usuario}');`;
        getResponses_1.default.getResponse(updateSql, (result) => {
            if (result.affectedRows > 0) {
                callback({ success: true });
            }
            else {
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
    static abrirCerrarSesion(req, res) {
        const { fechaInicio, fechaFin, usuario, prefijoPenal } = req.body;
        const sql = "call RadioFrecuenciaReportes.iniciarCerrarSesion (" + fechaInicio + "," + fechaFin + ",'" + usuario + "'," + prefijoPenal + ");";
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO" });
                }
                else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0]["resultado"] });
                }
            }
            catch (error) {
                res.status(400).send({ 'respuesta': 'KO', error: result.error });
            }
        });
    }
    ;
    static verificarSesion(req, res) {
        const { usuario } = req.query;
        const sql = "call RadioFrecuenciaReportes.verificarSesion ('" + usuario + "');";
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO" });
                }
                else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0]["resultado"] });
                }
            }
            catch (error) {
                res.status(400).send({ 'respuesta': 'KO', error: result.error });
            }
        });
    }
    ;
    static obtenerPenales(req, res) {
        const sql = `call RadioFrecuenciaReportes.obtenerPenalesYTecnologia(); `;
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO" });
                }
                else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0]["respuesta"] });
                }
            }
            catch (error) {
                res.status(400).send({ 'respuesta': 'KO', error: result.error });
            }
        });
    }
    ;
    static obtenerDatosPerfil(req, res) {
        const { prefijoPenal, idTecnologia } = req.query;
        const sql = "call RadioFrecuenciaReportes.obtenerDatosPerfil(" + prefijoPenal + ", " + idTecnologia + ");";
        getResponses_1.default.getResponse(sql, (result) => {
            try {
                if (result.error) {
                    res.status(404).send({ resultado: "KO" });
                }
                else {
                    res.status(200).send({ resultado: "OK", respuesta: result[0][0]["resultado"]["respuesta"] });
                }
            }
            catch (error) {
                res.status(400).send({ 'respuesta': 'KO', error: result.error });
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
