# Especificaciones Técnicas - Home Page CConnect

## Estructura de Archivos

```
src/app/pages/
├── home.component.ts              # Lógica del componente
├── home.component.template.html    # Template
├── home.component.css              # Estilos
├── home.component.html             # Archivo antiguo (deprecated)
└── auth/
    ├── login/
    ├── register/
    └── ...
```

## Componente TypeScript

### HomeComponent

**Imports:**
- `Component, signal` from '@angular/core'
- `CommonModule` from '@angular/common'
- `RouterModule` from '@angular/router'

**Interfaces:**

```typescript
interface Post {
  id: string;
  author: { name, handle, avatar };
  content: string;
  timestamp: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
}
```

**Signals:**
- `sidebarOpen: Signal<boolean>` - Estado del sidebar
- `posts: Signal<Post[]>` - Lista de publicaciones
- `activeMenu: Signal<string>` - Elemento de menú activo

**Métodos:**
- `setActiveMenu(item: string)` - Cambia el menú activo
- `toggleLike(postId: string)` - Alterna like en un post

**Datos de Ejemplo:**
- 3 posts de muestra con imágenes y contenido de demostración
- Avatares de Unsplash
- Datos estructurados para mostrar funcionalidad

## Template Structure

### Navbar
- Logo icon (40x40) + texto "CConnect"
- Avatar de perfil 44x44 con border y hover

### Sidebar
- Navegación vertical con 7 opciones
- Item activo con gradiente y glow
- Botón "Nueva publicación"
- Responsive: horizontal en mobile

### Feed
- Container centrado (max-width: 760px)
- Scroll independiente
- Posts en lista vertical

### Post Card
- Header: avatar, nombre, handle, timestamp, menu
- Content: texto + grid de imágenes
- Footer: botones de acción (comentar, like)

## Estilos CSS

### Paleta de Colores
```css
Fondo:       #0f1115
Card:        #1a1d24
Primario:    #6c5cf2 → #8b5cf6
Texto:       #f2f3f5
Texto muted: #949ba4
```

### Dimensiones
```css
Navbar altura:        72px
Sidebar ancho:        260px
Feed max-width:       760px
Border radius grande:  20px
Border radius medio:   12px
Border radius pequeño:  8px
```

### Animaciones
```css
Transición:  0.22s cubic-bezier(0.4, 0, 0.2, 1)
Pulse glow:  8s ease-in-out infinite
Hover:       translateY(-2px)
Scale:       1.05
```

### Breakpoints Responsive
```css
1200px  - Tablet: Sidebar horizontal
768px   - Mobile: Labels ocultos
480px   - Small mobile: Navegación compacta
```

## Features Implementadas

### ✅ Completadas
- [x] Navbar fija con logo y perfil
- [x] Sidebar con navegación principal
- [x] Feed centrado con posts
- [x] Post cards premium
- [x] Grid de imágenes adaptable (1/2/3/4)
- [x] Interacción de likes
- [x] Diseño responsive
- [x] Efectos visuales (backdrop blur, glow, sombras)
- [x] Background animado (orbs pulsantes)
- [x] Transiciones suaves
- [x] Hover effects
- [x] Paleta de colores consistente con Auth

### 🔄 Futuro
- [ ] Conectar a API backend
- [ ] Cargar posts reales
- [ ] Implementar navegación entre rutas
- [ ] Agregar comentarios
- [ ] Implementar búsqueda
- [ ] Notificaciones en tiempo real
- [ ] Dark/light mode toggle
- [ ] Infinite scroll

## Testing & Validación

### Checklist de Calidad

**Diseño:**
- [x] Modo oscuro elegante
- [x] Tipografía limpia (Inter)
- [x] Espaciado amplio
- [x] Border radius grandes
- [x] Gradientes suaves
- [x] Glow sutil
- [x] Sombras adecuadas
- [x] Consistencia visual con Auth

**Funcionalidad:**
- [x] Sidebar navigation funciona
- [x] Like/Unlike funciona
- [x] Responsive en todos los breakpoints
- [x] Efectos visuales smooth
- [x] Transiciones fluidas

**Performance:**
- [x] CSS optimizado
- [x] SVG inline (no loader)
- [x] Signals para reactividad eficiente
- [x] Animations using CSS (GPU accelerated)

**Accesibilidad:**
- [x] Aria labels en buttons
- [x] Semantic HTML
- [x] Color contrast adecuado
- [x] Teclado navegable

## Uso

### Mostrar la página
```bash
ng serve
# Navegar a http://localhost:4200/home
```

### Estructura de rutas (app.routes.ts)
```typescript
{ path: 'home', component: HomeComponent }
```

## Notas de Implementación

1. **Sidebar**: El componente usa `*ngFor` compatible con versiones antiguas
2. **Images**: Usando Unsplash URLs para demostración
3. **Posts**: Datos de muestra - reemplazar con API
4. **Responsive**: Media queries en CSS puro
5. **Animaciones**: CSS animations (no requiere JS)
6. **Signals**: Angular 16+ para reactividad moderna

## Mantenimiento

- CSS modular y comentado
- Variables CSS para tema centralizado
- Nombres de clases BEM
- TypeScript tipado con interfaces
- Componente standalone (no módulos)

## Archivo Antiguo

El archivo `home.component.html` está deprecado. Usar `home.component.template.html` en su lugar.
