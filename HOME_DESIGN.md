# CConnect Home Page

## Diseño Moderno & Premium

La página Home de CConnect es un feed de red social con diseño moderno inspirado en Discord, Threads y UI startups 2026.

### Características Principales

#### 🎨 Diseño Visual
- **Modo Oscuro Elegante**: Fondo `#0f1115` con tarjetas `#1a1d24`
- **Gradiente Morado**: `#6c5cf2` → `#8b5cf6` con glow sutil
- **Tipografía Inter**: Font limpia con amplio espaciado
- **Border Radius Grande**: Bordes redondeados 20px para look moderno
- **Efectos Premium**: Backdrop blur, sombras suaves, microanimaciones

#### 🏗️ Componentes

**Navbar (72px altura)**
- Logo minimalista "C" en gradiente
- Avatar de perfil circular 44x44 con hover scale
- Fondo translúcido con backdrop blur
- Borde inferior sutil

**Sidebar (260px ancho)**
- 7 opciones de navegación: Inicio, Explorar, Notificaciones, Mensajes, Guardados, Perfil, Ajustes
- Item activo con gradiente y glow
- Botón "Nueva publicación" full-width
- Scroll suave con scroll bar personalizada

**Feed (máx 760px ancho)**
- Centrado horizontalmente
- Amplio espaciado entre elementos
- Padding generoso

**Post Cards**
- Fondo oscuro con borde sutil
- Avatar del autor + nombre + handle + timestamp
- Contenido de texto limpio con line-height amplio
- Grid de imágenes adaptable:
  - 1 imagen: ancho completo
  - 2 imágenes: 2 columnas
  - 3+ imágenes: grid 2x2 con collage

**Interacciones**
- Botones de acción: comentar, like
- Like con animación de cambio de color
- Hover suave con translateY(-2px)
- Transiciones 0.22s cubic-bezier

#### 📱 Responsive

- **Desktop**: Sidebar fija + feed centrado
- **Tablet (1200px)**: Sidebar horizontal bajo navbar
- **Mobile (768px)**: Sidebar con scroll horizontal, labels ocultos
- **Small Mobile (480px)**: Navbar compacta, feed full-width

### Tecnologías

- **Angular 21.2**: Standalone Components
- **Signals API**: Reactividad moderna
- **CSS Puro**: Sin TailwindCSS (como solicitado)
- **SVG Inline**: Iconos Material Design

### Variables CSS

```css
--bg: #0f1115                    /* Fondo principal */
--card: #1a1d24                  /* Tarjetas */
--primary: #6c5cf2               /* Color principal */
--primary-light: #8b5cf6         /* Color primario claro */
--text: #f2f3f5                  /* Texto principal */
--text-muted: #949ba4            /* Texto secundario */
--text-dim: #6d7178              /* Texto muy tenue */
--glow: rgba(108, 92, 242, 0.35) /* Efecto glow */
--transition: 0.22s cubic-bezier /* Animaciones */
```

### Implementación

El componente Home está completamente implementado y listo para:
- Conectar a un backend API
- Cargar posts reales
- Implementar navegación a otras rutas
- Agregar más funcionalidad interactiva

Los datos actualmente mostrados son ejemplos para demostración.

### Estilo Visual Consistente

✅ Mismo fondo y atmósfera que Login/Register  
✅ NO usa efecto mouse tracking (como solicitado)  
✅ Paleta de colores consistente  
✅ Espaciado amplio y minimalista  
✅ Degradados suaves y bordes grandes  
✅ Premium, moderno, silencioso visualmente
