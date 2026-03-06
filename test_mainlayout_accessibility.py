from playwright.sync_api import sync_playwright

def render_html():
    return """
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test MainLayout Accessibility</title>
    </head>
    <body>
        <div class="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
            <nav class="glassmorphism rounded-3xl px-6 py-3 flex items-center justify-between shadow-lg dark:shadow-sky-900/40">
                <a href="/dashboard" aria-label="Dashboard" class="p-2 rounded-xl transition-all duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                </a>
                <a href="/transactions" aria-label="Extrato" class="p-2 rounded-xl transition-all duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-receipt"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/></svg>
                </a>
                <div class="relative -top-6 group">
                    <button aria-label="Nova transação" class="w-14 h-14 bg-gradient-to-tr from-sky-500 to-violet-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-sky-500/40 hover:shadow-sky-500/60 transition-transform hover:scale-110 active:scale-95 ring-4 ring-slate-300/80 dark:ring-slate-900">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus group-hover:rotate-45 transition-transform duration-300"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                </div>
                <a href="/cards" aria-label="Meus Cartões" class="p-2 rounded-xl transition-all duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                </a>
                <a href="/profile" aria-label="Perfil" class="p-2 rounded-xl transition-all duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </a>
            </nav>
        </div>
    </body>
    </html>
    """

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_content(render_html())

        # Verify aria-labels
        print("Verifying ARIA labels...")
        assert page.locator('a[aria-label="Dashboard"]').count() == 1
        assert page.locator('a[aria-label="Extrato"]').count() == 1
        assert page.locator('button[aria-label="Nova transação"]').count() == 1
        assert page.locator('a[aria-label="Meus Cartões"]').count() == 1
        assert page.locator('a[aria-label="Perfil"]').count() == 1

        print("Taking screenshot...")
        page.screenshot(path="verification.png", full_page=True)
        print("Success!")
        browser.close()

if __name__ == "__main__":
    run_test()
