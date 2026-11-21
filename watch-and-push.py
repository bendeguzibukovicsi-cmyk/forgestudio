#!/usr/bin/env python3
import os
import subprocess
import time
from pathlib import Path
from datetime import datetime

PROJECT_DIR = "/home/guzi/Asztal/Web programozas/A legjobb pc szamodra !"
os.chdir(PROJECT_DIR)

# Configure git
subprocess.run(["git", "config", "user.email", "copilot@github.com"], capture_output=True)
subprocess.run(["git", "config", "user.name", "Copilot Auto-Push"], capture_output=True)

print("🚀 Live GitHub sync started...")
print("Monitoring for changes...")

last_commit_time = time.time()
MIN_INTERVAL = 5  # Minimum 5 seconds between commits

def should_ignore(path):
    """Check if path should be ignored"""
    ignore_patterns = ['.git', '__pycache__', '.vscode', 'node_modules', '.swp', 'auto-push.log', 'watch-and-push.py']
    path_str = str(path).lower()
    return any(pattern in path_str for pattern in ignore_patterns)

def get_all_files():
    """Get all project files"""
    files = set()
    for root, dirs, filenames in os.walk(PROJECT_DIR):
        # Remove ignored directories
        dirs[:] = [d for d in dirs if not should_ignore(d)]
        for f in filenames:
            if not should_ignore(f):
                files.add(os.path.join(root, f))
    return files

def push_to_github():
    """Stage, commit and push changes"""
    global last_commit_time
    
    current_time = time.time()
    if current_time - last_commit_time < MIN_INTERVAL:
        return False
    
    # Stage all changes
    subprocess.run(["git", "add", "."], capture_output=True)
    
    # Check if there are changes
    result = subprocess.run(["git", "diff-index", "--quiet", "--cached", "HEAD"], capture_output=True)
    if result.returncode == 0:
        return False  # No changes
    
    # Commit
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_msg = f"Auto-push: Live code update at {timestamp}\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
    
    result = subprocess.run(
        ["git", "commit", "-m", commit_msg],
        capture_output=True,
        text=True,
        env={**os.environ, 'GIT_AUTHOR_NAME': 'Copilot Auto-Push', 
             'GIT_AUTHOR_EMAIL': 'copilot@github.com',
             'GIT_COMMITTER_NAME': 'Copilot Auto-Push',
             'GIT_COMMITTER_EMAIL': 'copilot@github.com'}
    )
    
    if result.returncode != 0:
        return False
    
    # Push
    result = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True)
    
    if result.returncode == 0:
        print(f"✅ Pushed to GitHub at {timestamp}")
        last_commit_time = current_time
        return True
    else:
        print(f"⚠️ Push failed: {result.stderr}")
        return False

# Initial file state
file_mtimes = {}
for f in get_all_files():
    try:
        file_mtimes[f] = os.path.getmtime(f)
    except:
        pass

# Watch loop
while True:
    time.sleep(2)  # Check every 2 seconds
    
    changed = False
    current_files = get_all_files()
    
    # Check for modified files
    for f in current_files:
        try:
            mtime = os.path.getmtime(f)
            if f not in file_mtimes or file_mtimes[f] != mtime:
                changed = True
                file_mtimes[f] = mtime
        except:
            pass
    
    # Check for deleted files
    deleted = set(file_mtimes.keys()) - current_files
    if deleted:
        changed = True
        for f in deleted:
            del file_mtimes[f]
    
    # Check for new files
    for f in current_files:
        if f not in file_mtimes:
            changed = True
            try:
                file_mtimes[f] = os.path.getmtime(f)
            except:
                pass
    
    if changed:
        push_to_github()
