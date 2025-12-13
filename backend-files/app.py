from flask import Flask, render_template, jsonify, request
import json
import os
from datetime import datetime

# Initialize Flask app
app = Flask(__name__, template_folder='templates')

# Configuration
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'
app.config['JSON_SORT_KEYS'] = False

# -------------------- Helper Functions --------------------

def load_products():
    """Load products from JSON file"""
    json_path = os.path.join(os.path.dirname(__file__), 'data', 'products.json')
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_products(products):
    """Save products to JSON file"""
    json_path = os.path.join(os.path.dirname(__file__), 'data', 'products.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

def load_translations():
    """Load translations from JSON file"""
    json_path = os.path.join(os.path.dirname(__file__), 'data', 'translations.json')
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

# -------------------- Routes --------------------

@app.route('/')
def index():
    """Render home page"""
    return render_template('index.html')

@app.route('/products')
def products_page():
    """Render products page"""
    return render_template('products.html')

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'TechVault API'
    }), 200

# -------------------- API Endpoints --------------------

@app.route('/api/products', methods=['GET'])
def get_products():
    products = load_products()

    # Query params
    category = request.args.get('category', 'all')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    sort_by = request.args.get('sort', 'default')
    lang = request.args.get('lang', 'en')

    # Filter
    if category != 'all':
        products = [p for p in products if p.get('category') == category]
    if min_price is not None:
        products = [p for p in products if p.get('price', 0) >= min_price]
    if max_price is not None:
        products = [p for p in products if p.get('price', 0) <= max_price]

    # Sort
    if sort_by == 'name_asc':
        products.sort(key=lambda x: x.get('name', '').lower())
    elif sort_by == 'name_desc':
        products.sort(key=lambda x: x.get('name', '').lower(), reverse=True)
    elif sort_by == 'price_asc':
        products.sort(key=lambda x: x.get('price', 0))
    elif sort_by == 'price_desc':
        products.sort(key=lambda x: x.get('price', 0), reverse=True)

    return jsonify({'success': True, 'count': len(products), 'products': products, 'language': lang}), 200

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    products = load_products()
    product = next((p for p in products if p.get('id') == product_id), None)
    if product:
        return jsonify({'success': True, 'product': product}), 200
    return jsonify({'success': False, 'error': 'Product not found'}), 404

@app.route('/api/products/featured', methods=['GET'])
def get_featured_products():
    products = load_products()
    featured = products[:3] if len(products) >= 3 else products
    return jsonify({'success': True, 'count': len(featured), 'products': featured}), 200

@app.route('/api/categories', methods=['GET'])
def get_categories():
    products = load_products()
    categories = sorted(list(set(p.get('category', 'other') for p in products)))
    return jsonify({'success': True, 'categories': categories}), 200

@app.route('/api/translations', methods=['GET'])
def get_translations():
    lang = request.args.get('lang', 'en')
    translations = load_translations()
    if lang in translations:
        return jsonify({'success': True, 'language': lang, 'translations': translations[lang]}), 200
    return jsonify({'success': False, 'error': f'Language {lang} not supported', 'available_languages': list(translations.keys())}), 404

@app.route('/api/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '').lower()
    lang = request.args.get('lang', 'en')
    if not query:
        return jsonify({'success': False, 'error': 'Search query is required'}), 400

    products = load_products()
    results = []
    for p in products:
        name_match = query in p.get('name', '').lower()
        desc_match = query in p.get(f'description_{lang}', '').lower()
        if name_match or desc_match:
            results.append(p)
    return jsonify({'success': True, 'query': query, 'count': len(results), 'results': results}), 200

# -------------------- Error Handlers --------------------

@app.errorhandler(404)
def not_found(error):
    return jsonify({'success': False, 'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'success': False, 'error': 'Internal server error'}), 500

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({'success': False, 'error': 'Method not allowed'}), 405

# -------------------- Run App --------------------

if __name__ == '__main__':
    os.makedirs('data', exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5000)
