export const validate =(name,value)=>{
    let error ="";

    switch(name){
        case "name":
            if(!value.trim()) {
                error ="El nombre del conductor es obligatorio"
            } else if (!/^[a-zA-Z\s]+$/.test(value)){
                error= "El formato de nombre es invalido, no se pueden usar caracteres especiales ni números "
            }
            break;
        case "image":
        if(!value.trim()) {
            error = "La URL de la imagen es obligatoria";
        } else if(!/^https?:\/\/\S+$/.test(value)){
            error ="URL de imagen invalida";
        }
        break;
        default:
            break;
    }
    return error;
}