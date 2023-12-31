const { agregarPost, obtenerPost } = require("./consultas");
const express = require("express");
const app = express();
const cors = require("cors");
const backEndPort = 3000;

app.listen(backEndPort, console.log("¡Servidor encendido!"));
app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
  const posts = await obtenerPost();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion, likes = 0 } = req.body;
  await agregarPost(titulo, img, descripcion, likes);
  res.send("Post agregado con éxito");
});
