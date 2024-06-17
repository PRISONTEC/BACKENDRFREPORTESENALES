"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const procesarDatos_1 = __importDefault(require("../../share/procesarDatos"));
const validarToken_1 = __importDefault(require("../validarToken/validarToken"));
class Controller {
    constructor() {
        this.router = (0, express_1.Router)();
        this.subRutas();
    }
    subRutas() {
        this.router.post("/insertarDatos", validarToken_1.default.verifyToken, procesarDatos_1.default.insertarDatos);
        this.router.post("/insertarDatosIngeniero", validarToken_1.default.verifyToken, procesarDatos_1.default.insertarDatosIngeniero);
        this.router.post("/insertarDatosSenales", validarToken_1.default.verifyToken, procesarDatos_1.default.insertarDatosSenales);
        this.router.get("/obtenerReporte", validarToken_1.default.verifyToken, procesarDatos_1.default.obtenerReporte);
        this.router.get("/obtenerReportePorID", validarToken_1.default.verifyToken, procesarDatos_1.default.obtenerReportePorID);
        this.router.get("/obtenerReporteIngeniero", validarToken_1.default.verifyToken, procesarDatos_1.default.obtenerReporteIngeniero);
        this.router.get("/obtenerUltimoReporte", validarToken_1.default.verifyToken, procesarDatos_1.default.obtenerUltimoReporte);
    }
}
/**
 * Post track
 * @openapi
 * /datos/insertarDatos:
 *    post:
 *      tags:
 *        - insertarDatos
 *      summary: "Insertar datos"
 *      description: "Insertamos datos para el reporte"
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/insertarDatos"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '203':
 *          description: Error de validacion.
 *      security:
 *       - Bearer: []
 */
/**
 * Get track
 * @openapi
 * /datos/obtenerReporte:
 *    get:
 *      tags:
 *        - obtenerReporte
 *      summary: "Obtener reporte cerradas y abiertas"
 *      description: "Obtener reporte cerradas y abiertas"
 *      parameters:
 *        - in: query
 *          name: prefijoPenal
 *          required: true
 *          schema:
 *            type: integer
 *        - in: query
 *          name: fechaHoraInicio
 *          required: true
 *          schema:
 *            type: integer
 *        - in: query
 *          name: fechaHoraFin
 *          required: true
 *          schema:
 *            type: integer
 *        - in: query
 *          name: estado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Retorna el objeto actualizado en la colección.
 *        '203':
 *          description: Error de validación.
 *      security:
 *       - Bearer: []
 */
/**
 * Get track
 * @openapi
 * /datos/obtenerReportePorID:
 *    get:
 *      tags:
 *        - obtenerReportePorID
 *      summary: "Obtener reporte por ID"
 *      description: "Obtener reporte por ID"
 *      parameters:
 *        - in: query
 *          name: idReporte
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Retorna el objeto actualizado en la colección.
 *        '203':
 *          description: Error de validación.
 *      security:
 *       - Bearer: []
 */
/**
 * Get track
 * @openapi
 * /datos/obtenerReporteIngeniero:
 *    get:
 *      tags:
 *        - obtenerReporteIngeniero
 *      summary: "Obtener reporte para el Ingeniero"
 *      description: "Obtener reporte para el Ingeniero"
 *      parameters:
 *        - in: query
 *          name: idReporte
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Retorna el objeto actualizado en la colección.
 *        '203':
 *          description: Error de validación.
 *      security:
 *       - Bearer: []
 */
/**
 * Post track
 * @openapi
 * /datos/insertarDatosIngeniero:
 *    post:
 *      tags:
 *        - insertarDatosIngeniero
 *      summary: "Insertar datos Ingeniero"
 *      description: "Insertamos datos Ingeniero"
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/insertarDatosIngeniero"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '203':
 *          description: Error de validacion.
 *      security:
 *       - Bearer: []
 */
/**
 * Post track
 * @openapi
 * /datos/insertarDatosSenales:
 *    post:
 *      tags:
 *        - insertarDatosSenales
 *      summary: "Insertar datos Senales"
 *      description: "Insertamos datos Senales"
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/insertarDatosSenales"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '203':
 *          description: Error de validacion.
 *      security:
 *       - Bearer: []
 */
/**
 * Get track
 * @openapi
 * /datos/obtenerUltimoReporte:
 *    get:
 *      tags:
 *        - obtenerUltimoReporte
 *      summary: "Obtener fecha de último reporte"
 *      description: "Obtener fecha de último reporte"
 *      parameters:
 *        - in: query
 *          name: idUsuario
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Retorna el objeto actualizado en la colección.
 *        '203':
 *          description: Error de validación.
 *      security:
 *       - Bearer: []
 */
exports.default = new Controller().router;
