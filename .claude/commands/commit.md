# Comando de Commit Simple

Este comando agrega todos los cambios y crea un commit con un mensaje estandarizado siguiendo las mejores prácticas.

## Uso

```bash
/commit
```

## Qué hace:

1. Agrega todos los archivos modificados actualmente al área de preparación.
2. Crea un commit con un mensaje correctamente formateado siguiendo los estándares de commits convencionales (no incluir autor, fecha o algo relacionado con "claude", "claude code" o "Generado con [Claude Code](https://claude.ai/code)").
3. Muestra el estado final de git.

## Ejemplos:

* `/commit` - Crea un commit con un mensaje estandarizado.

## Comandos de Git Ejecutados:

```bash
git add .
git commit -m "Mensaje de commit siguiendo los estándares y mejores prácticas"
git status
```

> **Instrucción adicional:** Todos los commits deben realizarse en **español**.
