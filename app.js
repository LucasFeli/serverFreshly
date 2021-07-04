require("dotenv").config;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Mel907millos",
  database: "FreshlyPicking",
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM area_picking";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const fechaPedido = req.body.fecha;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const direccion = req.body.direccion;
  const pais = req.body.pais;
  const producto = req.body.producto;
  const estado = req.body.estado;

  const sqlInsert =
    "INSERT INTO area_picking (fecha, nombre, apellido, direccion, pais , producto, estado) VALUES (?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      fechaPedido,
      nombre,
      apellido,
      direccion,
      pais,
      producto,
      estado,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.delete("/api/delete/:nombre", (req, res) => {
  const customer = req.params.nombre;
  const sqlDelete = "DELETE FROM area_picking WHERE nombre = ?";
  db.query(sqlDelete, customer, (err, result) => {});
});

app.put("/api/update/:nombre", (req, res) => {
    const estado = req.body.estado;
    const nombre = req.body.nombre;
    const sqlUpdate = "UPDATE area_picking SET nombre = ? WHERE estado = ? ";
    db.query(sqlUpdate, [estado], (err, result) => {
        if(err) console.log(err)
    });
  });

app.listen(4000, () => console.log("Running on port 4000"));
