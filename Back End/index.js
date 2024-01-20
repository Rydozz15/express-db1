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
  try {
    const { titulo, url, descripcion, likes = 0 } = req.body;
    if (!titulo) {
      throw new Error("Coloca un nombre");
    }
    await agregarPost(titulo, url, descripcion, likes);
    res.send("Post agregado con éxito");
  } catch (error) {
    const { code } = error;
    switch (code) {
      case "22P02":
        res
          .status(400)
          .send(
            "invalid_text_representation, está yendo texto donde no debería"
          );
        break;
      case "22001":
        res
          .status(400)
          .send(
            "string_data_right_truncation, probablemente tiene demasiados caractéres"
          );
        break;
      default:
        res.status(500).send(error.message);
    }
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await likeAPost(id);
    res.send("Post likeado con éxito");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarPost(id);
    res.send("Post eliminado con éxito");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});
