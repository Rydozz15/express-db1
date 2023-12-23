const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "illidan15",
  database: "likeme",
  allowExitOnIdle: true,
});

const agregarPost = async (titulo, img, descripcion, likes) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, descripcion, likes];
  const result = await pool.query(consulta, values);
  console.log("Post agregado");
};

const obtenerPost = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};
obtenerPost();

module.exports = { agregarPost, obtenerPost };
