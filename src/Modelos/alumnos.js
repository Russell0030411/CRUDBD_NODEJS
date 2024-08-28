const db = require('../BD/db');

const Alumno = {
  Insertar: (Nombres, Apellidos,Grado,Genero,Edad, callback) => {
    const query = `CALL InsertarAlumno(?,?,?,?,?)`;
    db.query(query, [Nombres, Apellidos,Grado,Genero,Edad], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },

  Listar: (callback) => {
    const query = `CALL ConsultarAlumnos()`;
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  },

  Buscar: (id, callback) => {
    const query = `CALL BuscarAlumno(?)`;
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },

  Actualizar: (id,id2, Nombres,Apellidos,Grado,Genero,Edad, callback) => {
    const query = `CALL ActualizarAlumno(?,?,?,?,?,?)`;
    db.query(query, [id,Nombres,Apellidos,Grado,Genero,Edad], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },

  Eliminar: (id, callback) => {
    const query = `CALL EliminarAlumno(?)`;
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
};

module.exports = Alumno;
