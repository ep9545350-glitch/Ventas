import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos implements OnInit {

  productos: any[] = [];

  totalProductos = 0;
  valorInventario = 0;
  stockBajo = 0;
  agotados = 0;

  modoEdicion = false;
  productoEditandoId: number | null = null;

  nuevoProducto = this.inicializarProducto();

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // =========================
  // LISTAR PRODUCTOS
  // =========================
  cargarProductos(): void {
  this.productoService.obtenerProductos()
    .subscribe({
      next: (data) => {

        this.productos = Array.isArray(data) ? data : [];


        this.calcularMetricas();

      },
      error: (error) => console.log(error)
    });
}

  // =========================
  // GUARDAR PRODUCTO
  // =========================
  guardarProducto(): void {

    this.productoService.crearProducto(this.nuevoProducto)
      .subscribe({
        next: (respuesta) => {

          this.productos = [...this.productos, respuesta];

          this.calcularMetricas();

          this.nuevoProducto = this.inicializarProducto();
        },
        error: (error) => console.log(error)
      });
  }

  // =========================
  // ELIMINAR
  // =========================
  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id)
      .subscribe({
        next: () => {
          this.cargarProductos();
        },
        error: (error) => console.log(error)
      });
  }

  // =========================
  // EDITAR
  // =========================
  seleccionarProducto(producto: any): void {
    this.nuevoProducto = { ...producto };
    this.productoEditandoId = producto.id;
    this.modoEdicion = true;
  }

  actualizarProducto(): void {

    if (!this.productoEditandoId) return;

    this.productoService.actualizarProducto(
      this.productoEditandoId,
      this.nuevoProducto
    ).subscribe({
      next: () => {

        this.cargarProductos();

        this.nuevoProducto = this.inicializarProducto();
        this.modoEdicion = false;
        this.productoEditandoId = null;
      },
      error: (error) => console.log(error)
    });
  }

  // =========================
  // MÉTRICAS
  // =========================
  calcularMetricas(): void {

  this.totalProductos = this.productos.length;

  this.valorInventario = this.productos.reduce((sum, p) => {
    const precio = Number(p.precio_venta || 0);
    const stock = Number(p.stock_actual || 0);
    return sum + (precio * stock);
  }, 0);

  this.stockBajo = this.productos.filter(p =>
    Number(p.stock_actual) > 0 &&
    Number(p.stock_actual) <= Number(p.stock_minimo)
  ).length;

  this.agotados = this.productos.filter(p =>
    Number(p.stock_actual) === 0
  ).length;
}

  // =========================
  // RESET FORM
  // =========================
  inicializarProducto() {
    return {
      codigo: '',
      nombre: '',
      marca_presentacion: '',
      precio_venta: 0,
      precio_costo: 0,
      stock_actual: 0,
      stock_minimo: 0,
      categoria: '',
      codigo_barras: '',
      estado: 'OK'
    };
  }
}
