import { Router } from "express";
import bodyParser from "body-parser";
import subRutasConexion from "../uris/conexion/conexion";
import subRutasDatos from "../uris/datos/datos";
import errorHTTP from "../uris/manejadorErroresHTTP";
import healthPage from "../uris/healthPage";

export default class manejadorRutas {
  readonly paths: Router;

  constructor() {
    this.paths = Router();
    this.rutas();
  }

  rutas() {
    this.paths.use(bodyParser.json());
    this.paths.get("/", healthPage.healthy); //CREAR-VALIDAR-ELIMINAR USUARIO
    this.paths.use("/conexion", subRutasConexion);
    this.paths.use("/datos", subRutasDatos);

    
    this.paths.use(errorHTTP.notFound);
  }
}
