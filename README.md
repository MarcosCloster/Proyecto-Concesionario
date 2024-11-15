# DynamicDrive

Este proyecto es un sistema de gestión de reservas de autos en una concesionaria. En esta pagina, el cliente podrá visualizar coches, reservarlos y hablar con el vendedor si lo desea a traves de whatsapp. Si el cliente tiene alguna consulta con respecto a la concesionaria, este prodra contactarse mediante el apartado "Contacto" y podra mandar un mail alli. Tambien si el cliente lo desea, puede reservar 1 solo auto o tambien puede tener un carrito de compras donde podra reservar multiples vehiculos. Alli debera ingresar la fecha para ver  el/los vehiculos y si esa fecha esta ocupada le mostrara un error y tambien deberá ingresar los datos de su tarjeta. Y una vez reservado el auto, este se deja de mostrar automaticamente para que nadie mas lo pueda reservar.
Y desde el punto de vista del administrador, este podrá ingresar autos nuevos, modificarlos y darlos de baja. Tambien, cuando algun cliente reserva un auto, le saltará una notificacion por mail diciendo el mail del cliente, el precio, el/los vehiculos reservados y la fecha reservada.

## Sobre Nosotros

Integrantes del grupo:
- Iñaki Fernández
- Marcos Closter
- Matias Coluccio

## Cómo configurar el entorno de desarrollo

1. Clona este repositorio: `git clone https://github.com/usuario/proyecto.git`
2. Instala las dependencias: `npm install`

## Servidor de desarrollo
1. Ejecuta `json-server db-db.json` en la terminal para levantar el json
2. Ejecuta `ng serve` en la terminal para levantar el servidor de desarrollo.