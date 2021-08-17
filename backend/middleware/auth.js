const jwt = require("jsonwebtoken"); //instancia del jwt

const auth = async(req, res, next) =>{

    let jwtToken = req.header("Authorization"); // busca la informaicon en el header

    if(!jwtToken) return res.status(400).send("Authorization denied: No token");

    jwtToken = jwtToken.split(" ")[1]; // Bearer o9iuq2h3er98b298, separa eso por el espacio, elegimos el index 1 porque ese es el token

    if(!jwtToken) return res.status(400).send("Authorization denied: No token")

    console.log(jwtToken)
    
    try {
        const payload = await jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);//verifica que si se haya generado
        // en nuestra app y que tenga la clave secreta
        req.user = payload;
        next(); // todo correcto, siga caballero al siguiente pedazo de script
    } catch (error) {
        return res.status(400).send("Authorization denied: Invalid token");//token generado en otro lado, evita hackers
    }

};

module.exports = {auth};