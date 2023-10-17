const fs = require("fs");

function usuario(nombre, correoElectronico) {
  this.nombre = nombre;
  this.correoElectronico = correoElectronico;
}

usuario.prototype.registrar = function() {
  const usuarios = read();
  usuarios.push({ nombre: this.nombre, correoElectronico: this.correoElectronico });
  writeJson(usuarios);
};

const read = () => {
  try {
    let user = fs.readFileSync("./usuarios.json", "utf-8");
    let parsedJSON = JSON.parse(user);
    return parsedJSON;
  } catch (error) {
    return [];
  }
};

const writeJson = (usuarios) => {
  let stringUser = JSON.stringify(usuarios, null, 2);
  fs.writeFileSync("./usuarios.json", stringUser);
};

const listarUsuarios = () => {
  const usuarios = read();
  console.log("Usuarios registrados:");
  usuarios.forEach((usuario, index) => {
    console.log(`${index + 1} -> Nombre: ${usuario.nombre}, Correo Electrónico: ${usuario.correoElectronico}`);
  });
};

const args = process.argv.slice(2);

if (args.length === 2) {
    const nuevoUsuario = new usuario(args[0], args[1]);
    nuevoUsuario.registrar();
    console.log("Usuario registrado correctamente.");
} else if (args[0] === "listarUsuarios"){
    listarUsuarios();
} else {
  console.log("Por favor, ingrese nombre y correo electrónico");
}

