const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  allowExitOnIdle: true,
});

const agregarPost = async (titulo, url, descripcion, likes) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, url, descripcion, likes];
  const result = await pool.query(consulta, values);
  console.log("Post agregado");
};

const obtenerPost = async () => {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id DESC");
  return rows;
};
obtenerPost();

const likeAPost = async (id) => {
  const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
};

const eliminarPost = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
};

module.exports = { agregarPost, obtenerPost, likeAPost, eliminarPost };
