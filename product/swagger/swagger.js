"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "DOCUMENTACION BACKEND RF",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://190.187.248.85:2850",
        },
    ],
    components: {
        /* securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          },
        }, */
        securitySchemes: {
            Bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        schemas: {
            login: {
                type: "object",
                required: ["usuario", "contrasena"],
                properties: {
                    usuario: {
                        type: "string",
                    },
                    contrasena: {
                        type: "string",
                    },
                },
            },
            obtenerPenales: {
            /* type: "object",
             required: ["fechaInicio", "fechaFin","usuario","prefijoPenal"],
             properties: {
               fechaInicio: {
                 type: "integer",
               },
               fechaFin: {
                 type: "integer",
               },
               usuario: {
                 type: "string",
               },
               prefijoPenal: {
                 type: "integer",
               },
             }, */
            },
            validarSesion: {
                type: "object",
                required: ["fechaInicio", "fechaFin", "usuario", "prefijoPenal"],
                properties: {
                    fechaInicio: {
                        type: "integer",
                    },
                    fechaFin: {
                        type: "integer",
                    },
                    usuario: {
                        type: "string",
                    },
                    prefijoPenal: {
                        type: "integer",
                    },
                },
            },
            obtenerDatosPerfil: {
                type: "object",
                required: ["prefijoPenal", "idTipoTecnologia"],
                properties: {
                    prefijoPenal: {
                        type: "integer",
                    },
                    idTecnologia: {
                        type: "integer",
                    }
                },
            },
            verificarSesion: {
                type: "object",
                required: ["usuario"],
                properties: {
                    usuario: {
                        type: "string",
                    }
                },
            },
            insertarDatos: {
                type: "object",
                required: ["idUsuario", "fhSeñalEncontrada", "prefijoPenal", "idSenal", "detalle", "idEstadoRFS", "idOperador", "idTecnologia",
                    "potencia", "idResponsabilidad", "ruido_db", "latitud", "longitud", "area_no_bloqueo", "hipervinculo_S", "idVisita"],
                properties: {
                    idUsuario: {
                        type: "integer",
                    },
                    fhSenalEncontrada: {
                        type: "integer",
                    },
                    prefijoPenal: {
                        type: "integer",
                    },
                    idSenal: {
                        type: "integer",
                    },
                    detalle: {
                        type: "string",
                    },
                    idEstadoRFS: {
                        type: "integer",
                    },
                    idOperador: {
                        type: "integer",
                    },
                    idTecnologia: {
                        type: "integer",
                    },
                    potencia: {
                        type: "string",
                    },
                    idResponsabilidad: {
                        type: "integer",
                    },
                    ruido_db: {
                        type: "string",
                    },
                    latitud: {
                        type: "string",
                    },
                    longitud: {
                        type: "string",
                    },
                    area_no_bloqueo: {
                        type: "integer",
                    },
                    hipervinculo_S: {
                        type: "string",
                    },
                    idVisita: {
                        type: "integer",
                    }
                },
            },
            obtenerReporte: {
                type: "object",
                required: ["prefijoPenal", "fechaHoraInicio", "fechaHoraFin", "estado"],
                properties: {
                    idUsuario: {
                        type: "integer",
                    },
                    prefijoPenal: {
                        type: "integer",
                    },
                    fechaHoraInicio: {
                        type: "integer",
                    },
                    fechaHoraFin: {
                        type: "integer",
                    },
                    estado: {
                        type: "string",
                    }
                },
            },
            obtenerReporteIngeniero: {
                type: "object",
                required: ["prefijoPenal"],
                properties: {
                    prefijoPenal: {
                        type: "integer",
                    }
                },
            },
            insertarDatosIngeniero: {
                type: "object",
                required: ["idReporte", "idEstadoRFI", "fhVisitaIngenieria", "detalle", "idVisita", "hipervinculoI"],
                properties: {
                    idReporte: {
                        type: "integer",
                    },
                    idEstadoRFI: {
                        type: "integer",
                    },
                    fhVisitaIngenieria: {
                        type: "integer",
                    },
                    detalle: {
                        type: "string",
                    },
                    idVisita: {
                        type: "integer",
                    },
                    hipervinculoI: {
                        type: "string",
                    }
                },
            },
            insertarDatosSenales: {
                type: "object",
                required: ["banda", "cellID", "PSC", "EA", "MAC", "idTipoTecnologia", "prefijoPenal"],
                properties: {
                    banda: {
                        type: "integer",
                    },
                    cellID: {
                        type: "string",
                    },
                    PSC: {
                        type: "string",
                    },
                    EA: {
                        type: "string",
                    },
                    MAC: {
                        type: "string",
                    },
                    idTipoTecnologia: {
                        type: "integer",
                    },
                    prefijoPenal: {
                        type: "integer",
                    }
                },
            },
        },
    },
};
const swaggerOptions = {
    swaggerDefinition,
    //apis: ["./src/uris/conexion/*","./src/uris/datos/*"],
    apis: ["./usr/local/backendRF/product/uris/conexion/*", "./usr/local/backendRF/product/uris/datos/*"],
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
//mi variable es la planificacion estrategica y productividad y mi dimension e indicadores cuales podrian ser
