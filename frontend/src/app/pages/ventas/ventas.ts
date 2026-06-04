import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ─── Interfaces ───────────────────────────────────────────────

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

export interface ItemCarrito extends Producto {
  cantidad: number;
}

export interface Venta {
  id: number;
  hora: string;
  cliente: string;
  items: ItemCarrito[];
  subtotal: number;
  descuento: number;
  montoDescuento: number;
  total: number;
  metodoPago: string;
}

// ─── Component ───────────────────  ─────────────────────────────

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.html',
  styleUrls: ['./ventas.css']
})
export class Ventas implements OnInit {

  // ── Catálogo (reemplaza con tu servicio real) ──
  productos: Producto[] = [
    { id: 1,  nombre: 'Arroz extra 5kg',      precio: 18.50, stock: 42, categoria: 'Abarrotes' },
    { id: 2,  nombre: 'Aceite vegetal 1L',     precio: 7.90,  stock: 8,  categoria: 'Abarrotes' },
    { id: 3,  nombre: 'Azúcar rubia 1kg',      precio: 3.20,  stock: 0,  categoria: 'Abarrotes' },
    { id: 4,  nombre: 'Harina sin preparar',   precio: 4.50,  stock: 30, categoria: 'Abarrotes' },
    { id: 5,  nombre: 'Leche evaporada',       precio: 3.80,  stock: 5,  categoria: 'Lácteos'   },
    { id: 6,  nombre: 'Yogurt fresa 1L',       precio: 6.50,  stock: 15, categoria: 'Lácteos'   },
    { id: 7,  nombre: 'Agua mineral 625ml',    precio: 1.50,  stock: 60, categoria: 'Bebidas'   },
    { id: 8,  nombre: 'Gaseosa 1.5L',          precio: 5.00,  stock: 20, categoria: 'Bebidas'   },
    { id: 9,  nombre: 'Jabón de tocador',      precio: 2.80,  stock: 35, categoria: 'Higiene'   },
    { id: 10, nombre: 'Detergente 500g',       precio: 4.20,  stock: 18, categoria: 'Limpieza'  },
  ];

  // ── Estado del carrito ──
  carrito: ItemCarrito[] = [];
  cliente = '';
  descuento = 0;
  metodoPago = 'efectivo';

  // ── Búsqueda ──
  buscarProducto = '';

  // ── Historial ──
  ventas: Venta[] = [];
  private nextId = 1001;

  // ── Ticket modal ──
  ticketVisible = false;
  ticketActual: Venta | null = null;

  // ── Toast ──
  toastVisible = false;
  toastMsg = '';
  private toastTimer: any;

  // ── Fecha ──
  fechaHoy = '';

  // ─────────────────────────────────────────────────────────────

  ngOnInit() {
    this.fechaHoy = new Date().toLocaleDateString('es-PE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  // ── Computed ──

  productosFiltrados(): Producto[] {
    const q = this.buscarProducto.toLowerCase();
    return this.productos.filter(p => p.nombre.toLowerCase().includes(q));
  }

  subtotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  montoDescuento(): number {
    return this.subtotal() * (this.descuento / 100);
  }

  total(): number {
    return this.subtotal() - this.montoDescuento();
  }

  // ── Stats ──

  totalIngresos(): number {
    return this.ventas.reduce((a, v) => a + v.total, 0);
  }

  ticketPromedio(): number {
    return this.ventas.length ? this.totalIngresos() / this.ventas.length : 0;
  }

  totalItemsVendidos(): number {
    return this.ventas.reduce((a, v) => a + v.items.reduce((b, i) => b + i.cantidad, 0), 0);
  }

  totalItemsVenta(venta: Venta): number {
    return venta.items.reduce((a, i) => a + i.cantidad, 0);
  }

  // ── Carrito ──

  agregarAlCarrito(producto: Producto) {
    if (producto.stock === 0) return;

    const existing = this.carrito.find(x => x.id === producto.id);
    if (existing) {
      if (existing.cantidad >= producto.stock) {
        this.showToast('Stock máximo alcanzado');
        return;
      }
      existing.cantidad++;
    } else {
      this.carrito = [...this.carrito, { ...producto, cantidad: 1 }];
    }
  }

  cambiarCantidad(item: ItemCarrito, delta: number) {
    const prod = this.productos.find(p => p.id === item.id);
    const newQty = item.cantidad + delta;

    if (newQty <= 0) {
      this.quitarDelCarrito(item.id);
      return;
    }

    if (prod && newQty > prod.stock) {
      this.showToast('Stock máximo alcanzado');
      return;
    }

    item.cantidad = newQty;
    this.carrito = [...this.carrito]; // trigger change detection
  }

  quitarDelCarrito(id: number) {
    this.carrito = this.carrito.filter(x => x.id !== id);
  }

  vaciarCarrito() {
    this.carrito = [];
  }

  // ── Venta ──

  procesarVenta() {
    if (!this.carrito.length) return;

    const sub = this.subtotal();
    const desc = this.descuento;
    const descAmt = this.montoDescuento();
    const tot = this.total();
    const hora = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

    // Descontar stock
    this.carrito.forEach(item => {
      const p = this.productos.find(x => x.id === item.id);
      if (p) p.stock -= item.cantidad;
    });

    const venta: Venta = {
      id: this.nextId++,
      hora,
      cliente: this.cliente.trim() || 'Cliente general',
      items: [...this.carrito],
      subtotal: sub,
      descuento: desc,
      montoDescuento: descAmt,
      total: tot,
      metodoPago: this.metodoPago,
    };

    this.ventas = [venta, ...this.ventas];
    this.verTicket(venta);

    // Reset
    this.carrito = [];
    this.cliente = '';
    this.descuento = 0;

    this.showToast('¡Venta registrada exitosamente!');
  }

  // ── Ticket ──

  verTicket(venta: Venta) {
    this.ticketActual = venta;
    this.ticketVisible = true;
  }

  cerrarTicket() {
    this.ticketVisible = false;
    this.ticketActual = null;
  }

  // ── Helpers de estilo ──

  getStockClass(stock: number): string {
    if (stock === 0)  return 'empty';
    if (stock <= 10)  return 'low';
    return '';
  }

  getStockLabel(stock: number): string {
    if (stock === 0)  return 'Sin stock';
    if (stock <= 10)  return `⚠ ${stock} en stock`;
    return `${stock} en stock`;
  }

  getPayClass(pay: string): string {
    const map: Record<string, string> = {
      efectivo: 'pay-cash',
      tarjeta:  'pay-card',
      yape:     'pay-yape',
    };
    return map[pay] ?? '';
  }

  getPayIcon(pay: string): string {
    const map: Record<string, string> = {
      efectivo: 'ti-cash',
      tarjeta:  'ti-credit-card',
      yape:     'ti-device-mobile',
    };
    return map[pay] ?? '';
  }

  getPayLabel(pay: string): string {
    const map: Record<string, string> = {
      efectivo: 'Efectivo',
      tarjeta:  'Tarjeta',
      yape:     'Yape/Plin',
    };
    return map[pay] ?? pay;
  }

  // ── Toast ──

  private showToast(msg: string) {
    clearTimeout(this.toastTimer);
    this.toastMsg = msg;
    this.toastVisible = true;
    this.toastTimer = setTimeout(() => (this.toastVisible = false), 2500);
  }
}
