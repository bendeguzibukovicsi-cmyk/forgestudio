#!/bin/bash

cd "/home/guzi/Asztal/Web programozas/A legjobb pc szamodra !"

# Configure git for auto-commit
git config user.email "copilot@github.com"
git config user.name "Copilot Auto-Push"

echo "🚀 Git auto-push watcher started..."
echo "Monitoring for file changes..."

# Watch for file changes using inotifywait
inotifywait -m -r -e modify,create,delete . \
  --exclude '\.git|node_modules|\.swp' \
  --format '%w%f' |
while read -r file; do
  echo "📝 Changed: $file"
  
  sleep 2  # Wait for all changes to settle
  
  # Stage changes
  git add .
  
  # Check if there are changes to commit
  if ! git diff-index --quiet --cached HEAD; then
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    git commit -m "Auto-push: Code changes at $TIMESTAMP

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
    
    # Push to GitHub
    if git push origin main 2>/dev/null; then
      echo "✅ Pushed to GitHub at $TIMESTAMP"
    else
      echo "⚠️ Push failed - will retry on next change"
    fi
  fi
done
