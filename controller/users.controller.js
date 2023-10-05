import { getConnection } from "../connection/dbconfig.js";
export const getUsers = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM Users");
  console.log(result);
  res.json("users")
}

export const insertUser = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body; // Suponemos que los datos del usuario se envían en el cuerpo de la solicitud POST

    // Verificar si el correo ya existe en la base de datos
    const pool = await getConnection();
    const emailCheck = await pool
      .request()
      .input("email", email)
      .query("SELECT COUNT(*) as count FROM Users WHERE email = @email");

    const emailExists = emailCheck.recordset[0].count > 0;

    if (emailExists) {
      return res.status(200).json({ statusCode: 400, message: "El correo ya está registrado." });
    }

    // Insertar el nuevo usuario si el correo no está duplicado
    const insertQuery = `
        INSERT INTO Users  (name, lastname, email, password)
        VALUES (@name, @lastname, @email, @password);
      `;
    const result = await pool
      .request()
      .input("name", name)
      .input("lastname", lastname)
      .input("email", email)
      .input("password", password) // Asegúrate de realizar el hash y salting de las contraseñas en aplicaciones reales
      .query(insertQuery);

    res.status(200).json({ statusCode: 200, message: "Usuario registrado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(200).json({ statusCode: 500, message: "Error al registrar el usuario." });
  }
};

// ... otros importaciones y código ...

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Suponemos que los datos de inicio de sesión se envían en el cuerpo de la solicitud POST
    
    // Verificar si el correo existe en la base de datos
    const pool = await getConnection();
    const userQuery = `
      SELECT * FROM Users WHERE email = @email;
    `;

    const userResult = await pool
      .request()
      .input("email", email)
      .query(userQuery);

    const user = userResult.recordset[0];

    // Si el correo no existe, retornar un mensaje de error
    if (!user) {
      return res.status(200).json({ statusCode: 400, message: "Correo o contraseña incorrectos." });
    }

    // Verificar si la contraseña coincide (en una aplicación real, debes comparar contraseñas con bcrypt u otro método seguro)
    if (user.password !== password) {
      return res.status(200).json({ statusCode: 400, message: "Correo o contraseña incorrectos." });
    }

    // Si el correo y la contraseña son válidos, puedes crear un token JWT para autenticar al usuario
    // En una aplicación real, se debe usar un método de autenticación seguro
    const token = "genera_un_token_jwt_aqui";

    res.status(200).json({ statusCode: 200, message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(200).json({ statusCode: 500, message: "Error al iniciar sesión." });
  }
};
