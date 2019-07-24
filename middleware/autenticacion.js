const clave = 'Clave Secreta';
const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.verificarTokenUsuario = function(req, res, next){
    if(!req.headers.autorizacion) {
        return res.send({
            status : 'error',
            message: 'Token no encontrado',
            code: '400'
        });
    }

    var token = req.headers['autorizacion']
    //token = token.replace('Bearer ', '')
    try {  
        const payload = jwt.verify(token, clave);        
        if(payload.exp <= moment().unix()){
            return res.send({
                status : 'error',
                message: 'Token ha expirado',
                code: '400'
            });
        }else{
            req.user = payload.username;
        }
    } catch (ex) {
        return res.send({
            status : 'error',
            message: 'Token no válido',
            code: '400'
        });
    } 
    next();
}