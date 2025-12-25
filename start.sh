#!/bin/bash

# ElectroLink.az Startup Script

echo "Starting ElectroLink.az..."

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate
fi

# Check if Flask is installed
if ! python -c "import flask" &> /dev/null; then
    echo "Flask not found. Installing dependencies..."
    pip install -r requirements.txt
fi

# Create data directory if it doesn't exist
mkdir -p data

# Start the Flask application
echo "Starting Flask server on http://localhost:5000"
python app.py