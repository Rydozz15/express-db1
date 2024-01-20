const {
  agregarPost,
  obtenerPost,
  likeAPost,
  eliminarPost,
} = require("./consultas");
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

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  await likeAPost(id);
  res.send("Post likeado con éxito");
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  await eliminarPost(id);
  res.send("Post eliminado con éxito");
});
