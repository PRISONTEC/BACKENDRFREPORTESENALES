import { Router } from "express";
import processUri from "../../share/procesarUri";
import validarToken from "../validarToken/validarToken";
import { Request, Response } from "express";


class Controller {
    router: Router
    constructor() {
        this.router = Router()
        this.subRutas()
    }

    subRutas() {
        this.router.post("/login",processUri.validarUsuario)
        this.router.get("/penales",validarToken.verifyToken,processUri.obtenerPenales)
        this.router.post("/sesion",validarToken.verifyToken,processUri.abrirCerrarSesion)
        this.router.get("/verificarSesion",validarToken.verifyToken,processUri.verificarSesion)
        this.router.get("/obtenerDatosPerfil",validarToken.verifyToken,processUri.obtenerDatosPerfil)   
    }
}

/**
 * Post track
 * @openapi
 * /conexion/login:
 *    post:
 *      tags:
 *        - login
 *      summary: "Validar usuario e insertar última conexión"
 *      description: "Validamos Usuario para el Login"
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/login"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '203':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 */


/**
 * Get información
 * @openapi
 * /conexion/penales:
 *    get:
 *      tags:
 *        - obtenerPenales
 *      summary: "Obtener penales"
 *      description: Obtener la lista de penales.

 *      responses:
 *        '200':
 *          description: Retorna la información solicitada.
 *        '422':
 *          description: Error de validación.
 *      security:
 *        - Bearer: []
 */

/**
 * Post información
 * @openapi
 * /conexion/sesion:
 *    post:
 *      tags:
 *        - validarSesion
 *      summary: "Iniciar sesión y cerrar"
 *      description: Este endpoint permite abrir y cerrar sesión.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                fechaInicio:
 *                  type: integer
 *                  description: "Fecha de inicio de sesión"
 *                fechaFin:
 *                  type: integer
 *                  description: "Fecha de cierre de sesión"
 *                usuario:
 *                  type: string
 *                  description: "Usuario que inició sesión"
 *                prefijoPenal:
 *                  type: integer
 *                  description: "Prefijo del penal"
 *      responses:
 *        '200':
 *          description: Retorna la información solicitada.
 *        '422':
 *          description: Error de validación.
 *      security:
 *        - Bearer: []
 */





/**
 * Get información
 * @openapi
 * /conexion/obtenerDatosPerfil:
 *    get:
 *      tags:
 *        - obtenerDatosPerfil
 *      summary: "Obtener datos para selección"
 *      description: Este endpoint permite obtener la información para la señección del usuario.
 *      parameters:
 *       - name: prefijoPenal
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *         description: "Prefijo del penal"
 *       - name: idTecnologia
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *         description: "Id tecnología"
 *      responses:
 *        '200':
 *          description: Retorna la información solicitada.
 *        '422':
 *          description: Error de validación.
 *      security:
 *        - Bearer: []
 */


/**
 * Get información
 * @openapi
 * /conexion/verificarSesion:
 *    get:
 *      tags:
 *        - verificarSesion
 *      summary: "Verificar Sesión"
 *      description: Permite verificar si tiene una sesión abierta o cerrada.
 *      parameters:
 *       - name: usuario
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: "usuario"
 *      responses:
 *        '200':
 *          description: Retorna la información solicitada.
 *        '422':
 *          description: Error de validación.
 *      security:
 *        - Bearer: []
 */






export default new Controller().router