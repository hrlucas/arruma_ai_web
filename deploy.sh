#!/bin/bash
# Simple helper: copy files to gh-pages branch (requires git configured)
# Usage: ./deploy.sh <repo-url>
if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh <git-repo-url>"
  exit 1
fi
git init
git remote add origin $1
git checkout -b main
git add index.html styles.css script.js logo.png README.md
git commit -m "Deploy ArrumaAi prototype"
git push -u origin main --force
echo "Files pushed to main branch. Enable GitHub Pages from repo settings."
