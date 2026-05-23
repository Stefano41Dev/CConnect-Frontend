# 🚀 Quick Start - Home Page CConnect

## Para Visualizar

```bash
cd /path/to/CConnect-Frontend
ng serve
# Abrir en navegador: http://localhost:4200/home
```

## Archivos Principales

| Archivo | Líneas | Descripción |
|---------|--------|-------------|
| `src/app/pages/home.component.ts` | 105 | Lógica del componente |
| `src/app/pages/home.component.template.html` | 193 | Template HTML |
| `src/app/pages/home.component.css` | 682 | Estilos CSS |
| `src/app/app.routes.ts` | 12 | Rutas (actualizado) |

## Documentación Disponible

1. **RESUMEN_EJECUTIVO.md** - Visión general del proyecto
2. **HOME_DESIGN.md** - Guía de diseño y componentes
3. **TECHNICAL_SPEC.md** - Especificaciones técnicas
4. **HOME_SHOWCASE.md** - Resumen visual detallado
5. **CODIGO_EJEMPLOS.md** - Ejemplos de código

## Características Principales

✨ **Diseño**
- Modo oscuro elegante
- Gradientes suaves morado
- Border radius grandes (20px)
- Espaciado amplio y respirable

🏗️ **Estructura**
- Navbar fija (72px)
- Sidebar izquierda (260px)
- Feed centrado (máx 760px)
- Post cards premium

📱 **Responsive**
- Desktop: Sidebar fija
- Tablet: Sidebar horizontal
- Mobile: Layout adaptado
- Small: Navegación compacta

🎯 **Funcionalidad**
- Navegación en sidebar
- Toggle like en posts
- Grid de imágenes adaptable
- Hover effects suaves

## Colores Clave

```
Fondo:      #0f1115
Cards:      #1a1d24
Primario:   #6c5cf2 → #8b5cf6 (gradiente)
Texto:      #f2f3f5
Secundario: #949ba4
```

## Estructura de Datos

```typescript
interface Post {
  id: string;
  author: { name, handle, avatar };
  content: string;
  timestamp: string;
  images?: string[];
  likes: number;
  comments: number;
  liked?: boolean;
}
```

## Componentes Internos

### Navbar
```
[C Logo] CConnect        [Avatar]
```

### Sidebar
```
🏠 Inicio (activo)
🧭 Explorar
🔔 Notificaciones
✉️ Mensajes
🔖 Guardados
👤 Perfil
⚙️ Ajustes
───────────────
➕ Nueva publicación
```

### Post Card
```
┌─────────────────────────────┐
│ 👤 Nombre      tiempo    ⋯ │
│   @handle                   │
├─────────────────────────────┤
│ Contenido del post...       │
│                             │
│ [Imagen con radius 20px]    │
├─────────────────────────────┤
│ 💬 28    ❤️ 342            │
└─────────────────────────────┘
```

## CSS Variables Importantes

```css
--bg: #0f1115                    /* Fondo */
--card: #1a1d24                  /* Tarjetas */
--primary: #6c5cf2               /* Primario */
--primary-light: #8b5cf6         /* Primario claro */
--text: #f2f3f5                  /* Texto */
--glow: rgba(108,92,242,0.35)   /* Glow */
--radius-lg: 20px                /* Border radius */
--transition: 0.22s cubic...     /* Animaciones */
```

## Métodos Disponibles

```typescript
setActiveMenu(item: string)    // Cambiar menú activo
toggleLike(postId: string)     // Alternar like en post
```

## Propiedades Reactivas

```typescript
posts = signal<Post[]>(...)    // Lista de posts
activeMenu = signal('inicio')  // Menú activo
```

## Puntos de Customización

### 1. Agregar Nuevos Posts
```typescript
posts.set([...posts(), newPost])
```

### 2. Cambiar Colores
Editar variables CSS en `home.component.css`:
```css
--primary: #new-color;
```

### 3. Agregar Más Opciones al Sidebar
```typescript
sidebarItems = [
  ...existentes,
  { icon: 'newIcon', label: 'New Option' }
]
```

### 4. Conectar a Backend
```typescript
constructor(private http: HttpClient) {}

loadPosts() {
  this.http.get('/api/posts').subscribe(posts => {
    this.posts.set(posts);
  });
}
```

## Breakpoints Responsive

```
Desktop:  >= 1200px (sidebar fija)
Tablet:   768px - 1200px (sidebar horizontal)
Mobile:   480px - 768px (labels ocultos)
Small:    < 480px (compact)
```

## Rendimiento

- ✅ CSS optimizado
- ✅ SVG inline (sin loader)
- ✅ Animations usando CSS (GPU)
- ✅ Signals para reactividad eficiente
- ✅ No hay dependencias externas

## Compatibilidad

- Angular 21.2+
- TypeScript 5.9+
- Todos los navegadores modernos
- Mobile-first design

## Archivos Importantes

```
✅ Usar:       home.component.template.html
❌ Deprecado:  home.component.html
```

## Próximos Pasos

1. Conectar API backend
2. Cargar posts reales
3. Implementar autenticación
4. Agregar más rutas
5. Notificaciones en tiempo real

## Soporte

- Revisar HOME_DESIGN.md para preguntas de diseño
- Revisar TECHNICAL_SPEC.md para arquitectura
- Revisar CODIGO_EJEMPLOS.md para implementación

---

**Status**: ✅ Completado y Listo  
**Última actualización**: Mayo 23, 2026  
**Versión**: 1.0
