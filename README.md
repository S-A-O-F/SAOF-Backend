![Banner](https://github.com/S-A-O-F/SAOF-Backend/blob/master/resources/img/SaofBanner.png)
# S.A.O.F. Backend
Esta aplicación es parte del sistema S.A.O.F. (Sistema de almacenamiento y organización de fotos) 

## Resumen

## Instalación

## ¿Como funciona?
En los próximos apartados se explicará el funcionamiento del backend por cada caso de uso. Explicar todo con diagramas

## Autenticación de usuarios
El módulo de autenticación de usuarios se encarga de realizar todo lo necesario para mantener un control. Todo lo relacionado con autencación y registro de usuarios se procesará mediante la ruta `/auth`.

### Registrar usuario
Para poder registrar un usuario será necesario enviar un JSON que contenga el email, la contraseña y la contraseña repetida para verificar que coinciden ambas. Podemos ver un ejemplo del JSON que se espera recibir en la siguiente imagen:

Si se ha registrado de forma correcta el usuario, la respuesta que devolverá el endpoint tendrá estatus 201 y se devolverá el usuario generado en formato JSON como podemos ver en la siguiente imagen: 

### Autenticar usuario
Para poder autenticar un usuario será necesario enviar un JSON que contenga el email y la contraseña. Podemos ver un ejemplo del JSON que se espera recibir en la siguiente imagen:

Si se ha autenticado de forma correcta el usuario, la respuesta que devolverá el endpoint tendrá estatus 200 y se devolverá el usuario obtenido de la base de datos en formato JSON como podemos ver en la siguiente imagen: 

### Borrar usuario
Para poder dar de baja a un usuario será necesario enviar un JSON que contenga unicamente el email. Podemos ver un ejemplo del JSON que se espera recibir en la siguiente imagen:

Previamente el usuario deberá estar autenticado y disponer de su correspondiente JWT. Se deberá enviar en la cabecera de la petición utilizando el identificador `api-key`. Podemos ver un ejemplo en la siguiente imagen: 

Si se ha autenticado de forma correcta el usuario, la respuesta que devolverá el endpoint tendrá estatus 200 y se devolverá el usuario obtenido de la base de datos en formato JSON como podemos ver en la siguiente imagen: 

## Registro de versiones
Para poder ampliar información sobre las diferentes versiones y funcionalidades consultar el fichero [CHANGELOG](https://github.com/S-A-O-F/SAOF-Backend/blob/master/CHANGELOG.md)

## License
Este proyecto se encuetra bajo licencia GNU v3.0. Para saber más se puede consultar el fichero [LICENSE](https://github.com/S-A-O-F/SAOF-Backend/blob/master/LICENSE)

## Author
Este proyecto ha sido diseñado y desarrollado por las siguientes personas:
- **Javier Plaza Sisqués**: [LinkedIn](https://www.linkedin.com/in/javier-plaza-sisqu%C3%A9s-b79367172/) | [Instagram](https://www.instagram.com/jsisques/)

---
<div align="center">
  <sub>Designed and made it from León with ❤︎ by <a href="https://www.linkedin.com/in/javier-plaza-sisqu%C3%A9s-b79367172/">@jsisques</a>
</div>
