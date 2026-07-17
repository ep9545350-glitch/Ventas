import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VentaService } from '../../services/ventas';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ventas.html',
  styleUrls: ['./ventas.css']
})
export class Ventas implements OnInit {
  ventaDetalle: any = null;

  mostrarModalDetalle = false;

  ventas: any[] = [];
  ventasHoy = 0;

  ticketPromedio = 0;

  ventasMes = 0;

  pendientes = 0;

  productos: any[] = [];

  cliente = '';

  productoSeleccionado: number = 0;

  cantidad = 1;

  carrito: any[] = [];

  total = 0;

  metodoPago = 'Efectivo';

  constructor(
    private ventaService: VentaService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {

    this.cargarVentas();

    this.cargarProductos();

  }

  cargarVentas(): void {

    this.ventaService.obtenerVentas()
      .subscribe({
        next: (data) => {

          this.ventas = data;

          this.calcularMetricas();

        },
        error: (error) => {
          console.log(error);
        }
      });

  }

  cargarProductos(): void {

    this.productoService.obtenerProductos()
      .subscribe({
        next: (data) => {
          this.productos = data;
        },
        error: (error) => {
          console.log(error);
        }
      });

  }

  agregarProducto(): void {

    const producto = this.productos.find(
      p => p.id == this.productoSeleccionado
    );

    if (!producto) {
      return;
    }

    const subtotal =
      producto.precio_venta * this.cantidad;

    this.carrito.push({
      producto_id: producto.id,
      nombre: producto.nombre,
      cantidad: this.cantidad,
      precio: producto.precio_venta,
      subtotal: subtotal
    });

    this.calcularTotal();

    this.cantidad = 1;

  }

  calcularMetricas(): void {

    const hoy = new Date();

    this.ventasHoy = this.ventas.filter(v => {

      const fecha = new Date(v.fecha);

      return (
        fecha.getDate() === hoy.getDate() &&
        fecha.getMonth() === hoy.getMonth() &&
        fecha.getFullYear() === hoy.getFullYear()
      );

    }).length;

    const totalGeneral = this.ventas.reduce(
      (sum, v) => sum + Number(v.total),
      0
    );

    this.ticketPromedio =
      this.ventas.length > 0
        ? totalGeneral / this.ventas.length
        : 0;

    this.pendientes = this.ventas.filter(
      v => v.estado === 'Pendiente'
    ).length;

    this.ventasMes = this.ventas
      .filter(v => {

        const fecha = new Date(v.fecha);

        return (
          fecha.getMonth() === hoy.getMonth() &&
          fecha.getFullYear() === hoy.getFullYear()
        );

      })
      .reduce((sum, v) => sum + Number(v.total), 0);

  }

  eliminarDelCarrito(index: number): void {

    this.carrito.splice(index, 1);

    this.calcularTotal();

  }

  calcularTotal(): void {

    this.total = this.carrito.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

  }

  registrarVenta(): void {

    const venta = {

      cliente: this.cliente,

      metodo_pago: this.metodoPago,

      estado: 'Pagado',

      productos: this.carrito.map(item => ({
        producto_id: item.producto_id,
        cantidad: item.cantidad
      }))

    };

    this.ventaService.crearVenta(venta)
      .subscribe({
        next: () => {

          alert('Venta registrada');

          this.carrito = [];

          this.total = 0;

          this.cliente = '';

          this.cargarVentas();

          this.cargarProductos();

        },
        error: (error) => {
          console.log(error);
        }
      });

  }

  verDetalle(id: number): void {

  this.ventaService.obtenerVenta(id)
    .subscribe({

      next: (data) => {

        this.ventaDetalle = data;

        this.mostrarModalDetalle = true;

      },

      error: (error) => {
        console.log(error);
      }

    });

}

cerrarDetalle(): void {

  this.mostrarModalDetalle = false;

  this.ventaDetalle = null;

}

}
