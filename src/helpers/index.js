function passwordSeguro(pass) {
    // Verificar la longitud mínima (por ejemplo, al menos 8 caracteres)
    if (pass.length < 8) {
      return false;
    }
  
    // Verificar si contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(pass)) {
      return false;
    }
  
    // Verificar si contiene al menos una letra minúscula
    if (!/[a-z]/.test(pass)) {
      return false;
    }
  
    // Verificar si contiene al menos un número
    if (!/[0-9]/.test(pass)) {
      return false;
    }
  
    // Verificar si contiene al menos un carácter especial
    if (!/[@#$%^&+=?¿!¡]/.test(pass)) {
      return false;
    }
  
    // Si pasa todos los criterios anteriores, la contraseña se considera segura
    return true;
  }

  function validarEmail(email) {
    // Expresión regular para validar direcciones de correo electrónico
    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    // Usa la expresión regular para verificar si el email es válido
    return expresionRegular.test(email);
  }

  function formatearFecha(fecha) {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha);
  }

  export {
    passwordSeguro,
    validarEmail, 
    formatearFecha
  }
  