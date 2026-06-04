import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos {

  // ── Estado ──
  productos: Producto[] = [
    { id: 1, nombre: 'Arroz extra 5kg',    precio: 18.50, stock: 42 },
    { id: 2, nombre: 'Aceite vegetal 1L',  precio: 7.90,  stock: 8  },
    { id: 3, nombre: 'Azúcar rubia 1kg',   precio: 3.20,  stock: 0  },
    { id: 4, nombre: 'Harina sin preparar',precio: 4.50,  stock: 30 },
    { id: 5, nombre: 'Leche evaporada',    precio: 3.80,  stock: 5  },
  ];

  private nextId = 6;

  buscarTexto = '';

  // ── Formulario modal ──
  editandoId: number | null = null;
  nuevoNombre = '';
  nuevoPrecio: number | null = null;
  nuevoStock:  number | null = null;

  // ── Toast ──
  toastVisible = false;
  toastMsg = '';
  private toastTimer: any;

  // ── Computed ──
  productosFiltrados(): Producto[] {
    const q = this.buscarTexto.toLowerCase();
    return this.productos.filter(p => p.nombre.toLowerCase().includes(q));
  }

  valorInventario(): number {
    return this.productos.reduce((acc, p) => acc + p.precio * p.stock, 0);
  }

  stockBajo(): number {
    return this.productos.filter(p => p.stock > 0 && p.stock <= 10).length;
  }

  sinStock(): number {
    return this.productos.filter(p => p.stock === 0).length;
  }

  // ── Helpers de estilo ──
  getStockClass(stock: number): string {
    if (stock === 0)   return 'stock-empty';
    if (stock <= 10)   return 'stock-low';
    return 'stock-ok';
  }

  getStockIcon(stock: number): string {
    if (stock === 0)   return 'ti-alert-circle';
    if (stock <= 10)   return 'ti-alert-triangle';
    return 'ti-check';
  }

  // ── Acciones ──
  prepararNuevo() {
    this.editandoId  = null;
    this.nuevoNombre = '';
    this.nuevoPrecio = null;
    this.nuevoStock  = null;
  }

  editarProducto(producto: Producto) {
    this.editandoId  = producto.id;
    this.nuevoNombre = producto.nombre;
    this.nuevoPrecio = producto.precio;
    this.nuevoStock  = producto.stock;
  }

  agregarProducto() {
    if (!this.nuevoNombre.trim() || this.nuevoPrecio == null || this.nuevoStock == null) return;

    if (this.editandoId !== null) {
      const idx = this.productos.findIndex(p => p.id === this.editandoId);
      if (idx !== -1) {
        this.productos[idx] = {
          id:     this.editandoId,
          nombre: this.nuevoNombre.trim(),
          precio: this.nuevoPrecio,
          stock:  this.nuevoStock,
        };
      }
      this.showToast('Producto actualizado');
    } else {
      this.productos.push({
        id:     this.nextId++,
        nombre: this.nuevoNombre.trim(),
        precio: this.nuevoPrecio,
        stock:  this.nuevoStock,
      });
      this.showToast('Producto agregado');
    }

    this.prepararNuevo();
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.showToast('Producto eliminado');
  }

  private showToast(msg: string) {
    clearTimeout(this.toastTimer);
    this.toastMsg     = msg;
    this.toastVisible = true;
    this.toastTimer   = setTimeout(() => (this.toastVisible = false), 2500);
  }
}
