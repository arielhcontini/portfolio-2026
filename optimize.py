import re
import os

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add dimensions to specific images
replacements = {
    'src="assets/logo.svg" loading="lazy"': 'src="assets/logo.svg" width="24" height="24" loading="lazy"',
    'src="assets/01.svg" loading="lazy"': 'src="assets/01.svg" width="48" height="32" loading="lazy"',
    'src="assets/02.svg" loading="lazy"': 'src="assets/02.svg" width="48" height="38" loading="lazy"',
    'src="assets/03.svg" loading="lazy"': 'src="assets/03.svg" width="48" height="53" loading="lazy"',
    'src="assets/readmore.svg" alt="leer más"': 'src="assets/readmore.svg" width="18" height="18" alt="leer más"',
    'src="assets/readmore.svg" alt=""': 'src="assets/readmore.svg" width="18" height="18" alt=""',
    'src="assets/readmore.svg" loading="lazy" alt="Leer Más"': 'src="assets/readmore.svg" width="16" height="16" loading="lazy" alt="Leer Más"',
    'src="assets/readmore.svg" alt="Ver video"': 'src="assets/readmore.svg" width="18" height="18" alt="Ver video"',
    'src="assets/up.svg" loading="lazy"': 'src="assets/up.svg" width="32" height="32" loading="lazy"',
    'src="./assets/ama-maitea.webp"': 'src="./assets/ama-maitea.webp" width="853" height="640"',
    'src="./assets/velo.webp"': 'src="./assets/velo.webp" width="853" height="640"',
    'src="./assets/espora-qi.webp"': 'src="./assets/espora-qi.webp" width="853" height="640"',
    'src="./assets/lo-de-maria.webp"': 'src="./assets/lo-de-maria.webp" width="853" height="640"',
    'src="./assets/ryoma.webp"': 'src="./assets/ryoma.webp" width="853" height="640"',
}

for old, new in replacements.items():
    html = html.replace(old, new)

# Fix LCP lazy loading by removing loading="lazy" from bivio and ama-maitea and koprolitos
html = html.replace('src="./assets/ama-maitea.webp" width="853" height="640" alt="Ama Maitea — Identidad visual y packaging" loading="lazy"', 'src="./assets/ama-maitea.webp" width="853" height="640" alt="Ama Maitea — Identidad visual y packaging" fetchpriority="high"')
html = html.replace('src="assets/bivio.png" width="800" height="600" loading="lazy"', 'src="assets/bivio.png" width="800" height="600" fetchpriority="high"')
html = html.replace('src="assets/koprolitos-portada.png" width="800" height="600" loading="lazy"', 'src="assets/koprolitos-portada.png" width="800" height="600" fetchpriority="high"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Minify CSS
def minify_css(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        css = f.read()
    # Remove comments
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
    # Remove whitespace
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([\{\}\:\;\,\>])\s*', r'\1', css)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(css.strip())

css_files = ['css/global.css', 'css/variables.css', 'css/reset.css', 'css/modals.css']
for css_file in css_files:
    minify_css(css_file)

# 3. Minify JS (Basic)
def minify_js(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        js = f.read()
    # Remove single line comments (rough)
    js = re.sub(r'//.*', '', js)
    # Remove multi-line comments
    js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)
    # Remove extra spaces
    js = re.sub(r'\s+', ' ', js)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(js.strip())

js_files = ['js/menu.js', 'js/anima.js', 'js/modals.js']
for js_file in js_files:
    minify_js(js_file)

print("Optimizations complete.")
