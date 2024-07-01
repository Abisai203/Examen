
const express = require("express");
const mysql = require("mysql");
const app = express();

// Configuración de la base de datos
let conexion = mysql.createConnection({
    host: "localhost",
    database: "Libreria_Examen",
    user: "root",
    password: ""
});

conexion.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Conexión exitosa");
    }
});

// Middleware para procesar datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Motor de plantillas EJS
app.set("view engine", "ejs");

// Ruta para renderizar el formulario
app.get("/", function(req, res) {
    res.render("registro");
});

// Ruta para procesar el formulario
app.post("/validar", function(req, res) {
    const datos = req.body;

    let nombre = datos.nombre;
    let apellido = datos.apellido;
    let fechaNac = datos.fechaNac;
    let titulo = datos.titulo;
    let fechaP = datos.fechaP;
    let precio = datos.Precio;

    // Inserción en la tabla autores
    let insertarAutor = `INSERT INTO autores (nombre, apellido, fecha_nacimiento) VALUES ('${nombre}', '${apellido}', '${fechaNac}')`;
    conexion.query(insertarAutor, function(error) {
        if (error) {
            console.error("Error al insertar autor:", error);
            res.status(500).send("Error al insertar autor");
        } else {
            console.log("Autor almacenado correctamente");
        }
    });

    // Inserción en la tabla libros
    let insertarLibro = `INSERT INTO libros (titulo, fecha_publicacion, precio) VALUES ('${titulo}', '${fechaP}', '${precio}')`;
    conexion.query(insertarLibro, function(error) {
        if (error) {
            console.error("Error al insertar libro:", error);
            res.status(500).send("Error al insertar libro");
        } else {
            console.log("Libro almacenado correctamente");
            res.send("Datos almacenados correctamente");
        }
    });
});

// Inicio del servidor
app.listen(3002, function() {
    console.log("Servidor creado http://localhost:3002");
});





