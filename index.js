const { createServer } = require("http");
const { createReadStream } = require("fs");

function contentType(extension) {
    if (extension == "html") return "text/html";
    if (extension == "css") return "text/css";
    if (extension == "js") return "text/javascript";
    if (extension == "jpg || extension == jpeg") return "image/jpeg";
    if (extension == "png") return "image/png";
    return "text/plain";

}

function servirFichero(respuesta, ruta, tipo, estado) {
    respuesta.writeHead(estado, { "Content-type": tipo });

    let fichero = createReadStream(ruta);

    fichero.pipe(respuesta);

    fichero.on("end", () => respuesta.end());
}

createServer((peticion, respuesta) => {

    if (peticion.url == "/") {
        servirFichero(respuesta, "./estaticos/index.html", "html", 200);
    } else {
        servirFichero(respuesta, "./404.html", "html", 404);
    }

}).listen(4000);