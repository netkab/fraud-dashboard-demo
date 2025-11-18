#!/bin/bash

echo "🚀 Building project…"
npm run build

echo "🗑️  Removing old docs folder…"
rm -rf docs

echo "📁 Moving build output to docs/…"
mv dist docs

echo "📦 Committing changes…"
git add .
git commit -m "Deploy latest build" || echo "Nothing to commit"

echo "⬆️  Pushing to GitHub…"
git push origin main

echo "🌐 Deployment complete!"
echo "Check your live site at:"
echo "https://netkab.github.io/fraud-dashboard-demo/"
