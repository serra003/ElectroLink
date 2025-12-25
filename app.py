from flask import Flask, render_template, send_from_directory, request, jsonify
import os, json

app = Flask(__name__, template_folder='templates', static_folder='static')  # explicitly set folders

BASE_DIR = os.path.dirname(__file__)

# Load products
with open(os.path.join(BASE_DIR, 'data', 'products.json'), encoding='utf-8') as f:
    products = json.load(f)

# ------------------------
# ROUTES
# ------------------------

# Home page (index.html in root)
@app.route('/')
def home():
    return send_from_directory(BASE_DIR, 'index.html')

# About, Contact, Products, Cart, Warranty, FAQ
@app.route('/<page>')
def pages(page):
    if page in ['about', 'contact', 'products', 'cart', 'warranty', 'faq']:
        return render_template(f'{page}.html')
    return "Page not found", 404

# Product detail
@app.route('/products/<code>')
def product_detail(code):
    product = next((p for p in products if p['code'] == code), None)
    if not product:
        return "Product not found", 404
    return render_template('product_detail.html', product=product)

# API for products
@app.route('/api/products')
def api_products():
    return jsonify(products)

# Serve static files (images, CSS, JS)
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'static'), filename)

if __name__ == '__main__':
    app.run(debug=True)
