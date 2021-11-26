const client = require("../db");

const getAll = (request, response) => {
  client.query("SELECT * FROM classes ORDER BY name DESC", (err, res) => {
    if (!err) {
      response.status(200).json(res.rows);
    } else {
      console.log(err);
    }
  });
};

const getByName = (request, response) => {
  const { name } = request.body;

  client
    .query("SELECT * FROM classes WHERE name=$1", [name])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => console.log(err));
};

const getClass = (request, response) => {
  const { name } = request.body;
};

const create = (request, response) => {
  const { size, cost, manager, usefull, name } = request.body;
  client.query(
    "INSERT INTO classes VALUES ($1,$2,$3,$4,$5)",
    [size, cost, manager, useful, name],
    (err, res) => {
      if (!err) {
        response.status(201).send("class created");
      } else {
        console.log(err);
      }
    }
  );
};

const updateOne = (request, response) => {
  let keys = Object.keys(request.body);
  let values = Object.values(request.body);
  let str = "";
  for (let i = 0; i < keys.length; i++) {
    if (i == keys.length - 1) {
      str += `${keys[i]}=$${i + 1}`;
    } else {
      str += `${keys[i]}=$${i + 1}, `;
    }
  }
  client.query(
    `UPDATE classes SET ${str} WHERE name=$1`,
    values,
    (err, res) => {
      if (!err) {
        response.status(201).send(`classes updated`);
      } else {
        console.log(err);
      }
    }
  );
};

const delByName = async (request, response) => {
  const { name } = request.body;

  try {
    await client.query("DELETE FROM classes WHERE name=$1", [name]);
    response.status(200).send("classes successfully deleted");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAll,
  getByName,
  create,
  updateOne,
  delByName
};
