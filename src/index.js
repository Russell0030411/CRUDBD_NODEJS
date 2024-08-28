const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Alumno = require('./Modelos/alumnos');

app.use(express.json());

// Ruta para insertar un nuevo Alumno
app.post('/insertar', (req, res) => {
  const { Nombres, Apellidos,Grado,Genero,Edad } = req.body;

  Alumno.Insertar(Nombres, Apellidos,Grado,Genero,Edad, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, Nombres, Apellidos,Grado,Genero,Edad });
  });
});
app.get('/alumnos', (req, res) => {
    Alumno.Listar((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
});
app.get('/buscar/:id', (req, res) => {
    const { id } = req.params;
  
    Alumno.Buscar(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Alumno no encontrado' });
      }
      res.status(200).json(result[0]);
    });
});

app.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { id2,Nombres,Apellidos,Grado,Genero,Edad } = req.body;
  
    Alumno.Actualizar(id,id2,Nombres,Apellidos,Grado,Genero,Edad, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Alumno no encontrado' });
      }
      res.status(200).json({ message: 'El alumno ha sido actualizado con éxito' });
    });
});

app.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;
  
    Alumno.Eliminar(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Alumno no encontrado' });
      }
      res.status(200).json({ message: 'El alumno ha sido eliminado' });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
