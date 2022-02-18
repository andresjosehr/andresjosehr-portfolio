#!/bin/bash
find . -maxdepth 1 -type f -not \( -name ".git" -or -name ".gitignore" -or -name "production.sh" -or -name ".htaccess" \) -delete