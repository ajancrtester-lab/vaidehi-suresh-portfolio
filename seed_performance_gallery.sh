#!/bin/bash
# Wrapper script to seed Northflank database with correct Python environment

echo "🚀 Starting Performance Gallery Database Seeding..."
echo ""

# Change to backend directory
cd /app/backend || exit 1

# Use the virtual environment Python
/root/.venv/bin/python seed_northflank_database.py

exit_code=$?

if [ $exit_code -eq 0 ]; then
    echo ""
    echo "✅ Seeding completed successfully!"
else
    echo ""
    echo "❌ Seeding failed with exit code: $exit_code"
fi

exit $exit_code
