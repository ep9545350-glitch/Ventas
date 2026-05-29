import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  imports: [FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {

  productos = [

    {
      id: 1,
      nombre: 'Laptop',
      precio: 2500,
      stock: 10
    },

    {
      id: 2,
      nombre: 'Mouse',
      precio: 50,
      stock: 25
    },

    {
      id: 3,
      nombre: 'Teclado',
      precio: 120,
      stock: 15
    }

  ];

  nuevoNombre = '';
  nuevoPrecio = 0;
  nuevoStock = 0;

  editandoId: number | null = null;
  buscarTexto = '';

  agregarProducto() {

    if (this.editandoId) {

      const producto = this.productos.find(
        p => p.id === this.editandoId
      );

      if (producto) {

        producto.nombre = this.nuevoNombre;
        producto.precio = this.nuevoPrecio;
        producto.stock = this.nuevoStock;

      }

      this.editandoId = null;

      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        text: 'Los datos fueron actualizados'
      });

    } else {

      const nuevoProducto = {

        id: this.productos.length + 1,
        nombre: this.nuevoNombre,
        precio: this.nuevoPrecio,
        stock: this.nuevoStock

      };

      this.productos.push(nuevoProducto);

      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto fue registrado correctamente'
      });

    }

    this.nuevoNombre = '';
    this.nuevoPrecio = 0;
    this.nuevoStock = 0;

  }

  eliminarProducto(id: number) {

    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'No podrás recuperarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.productos = this.productos.filter(
          producto => producto.id !== id
        );

        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Producto eliminado correctamente'
        });

      }

    });

  }

  editarProducto(producto: any) {

    this.nuevoNombre = producto.nombre;
    this.nuevoPrecio = producto.precio;
    this.nuevoStock = producto.stock;

    this.editandoId = producto.id;

    const modal = document.getElementById('productoModal');

    if (modal) {

      modal.classList.add('show');
      modal.style.display = 'block';

    }



  }
  get productosFiltrados() {

    return this.productos.filter(producto =>

      producto.nombre
        .toLowerCase()
        .includes(this.buscarTexto.toLowerCase())

    );

  }



}
