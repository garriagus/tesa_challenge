/** ToDo */
class BinaryParser {
    /**        
    * ToDo        
    * v0.1.0 | [autor] | Primera versión        
    *        
    * @param {buffer} buffer -> Trama a deserializar
    * @param {*} format -> Formato de serialización (ver notas adjuntas)        
    * @return {*} Objeto "composición" (trama deserializada en campos tag = valor)        
    * @memberof BinaryParser        
    * @version ?        
    */
    decode(buffer, format) {
        let _object = {}        
        // ToDo  
        // Inicializo el array donde guardo el buffer en formato String
        var array = []
        array.push(buffer.toString('hex'))
        // Recorro los elementos del argumento 'format'
        format.forEach(element =>{  
            // Instancia de '_object' con los tags y recorto el buffer según el tamaño de bits indicados          
            _object[element.tag] = parseInt(array[0].slice(0, element.len/4), 16)
            // Guardo los valores que quedan del buffer
            array[0] = array[0].substr((element.len/4))   
        })
        return _object
    }

    /**        
    * ?
    * v0.1.0 | [autor] | Primera versión
    *    
    * @param {*} _object -> Objeto a frasear (serializar)
    * @param {*} format -> Formato de serialización (ver notas adjuntas)
    * @return {*} size -> tamaño en bits de la trama. buffer -> Node.js Buffer.
    * @memberof BinaryParser
    * @version ?
    */
    encode(_object, format) {
        // Inicializo las variables
        var size = 0
        var array = []
        //var array_buffer = Buffer.alloc(4)    
        format.forEach(element => {
            // Sumo los len para calcular el size total del buffer en bits
            size = size + element.len
            // Busco matchs entre los tags del objeto y el formato
            for (var i in _object) {                 
                if (i === element.tag) {                    
                    // almaceno los valores dentro de un array, con formato hex
                    array.push(_object[i].toString(16))   
                }
            }
        })            
        // convierto el array a String
        var array = array.join('')
        // Inicializo el buffer y lo refilleo con el array
        const buffer = Buffer.alloc(size/8, array, 'hex');
        // ToDo
        return { size, buffer };

    }
}
