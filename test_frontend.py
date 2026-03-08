from playwright.sync_api import sync_playwright

def render_expense_chart():
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
            .relative { position: relative; }
            .w-40 { width: 10rem; }
            .h-40 { height: 10rem; }
            .rounded-full { border-radius: 9999px; }
            .absolute { position: absolute; }
            .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
            .m-8 { margin: 2rem; }
            .bg-slate-900 { background-color: #0f172a; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-center: center; }
            .shadow-inner { box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05); }
            .text-center { text-align: center; }
            .block { display: block; }
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-slate-400 { color: #94a3b8; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .font-bold { font-weight: 700; }
            .text-slate-200 { color: #e2e8f0; }
            .flex-1 { flex: 1 1 0%; }
            .min-h-[180px] { min-height: 180px; }
            .glass-card { background: rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.25rem; }
            .uppercase { text-transform: uppercase; }
            .tracking-wider { letter-spacing: 0.05em; }
            .mb-4 { margin-bottom: 1rem; }
        </style>
    </head>
    <body>
        <div class="glass-card flex flex-col w-80">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Composição de Gastos
            </h3>
            <div class="flex items-center justify-center flex-1 min-h-[180px]">
                <div id="chart" class="relative w-40 h-40 rounded-full" style="background: conic-gradient(#ef4444 0% 35%, #3b82f6 35% 75%, #10b981 75% 100%);">
                    <div class="absolute inset-0 m-8 bg-slate-900 rounded-full flex items-center justify-center shadow-inner">
                        <div class="text-center">
                            <span class="block text-xs text-slate-400">Total</span>
                            <span class="block text-sm font-bold text-slate-200">100%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_content(html)

        # Take screenshot of the rendered component
        page.screenshot(path="expense_chart_render.png")
        browser.close()

if __name__ == "__main__":
    render_expense_chart()
