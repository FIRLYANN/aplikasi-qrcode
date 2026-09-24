function Header() {
    return (
        <header className="bg-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white flex items-center justify-center">
                        <div className="icon-qr-code text-black text-xl"></div>
                    </div>
                    <span className="text-xl font-black uppercase tracking-tighter text-white">
                        QRGen<span className="text-black bg-white px-1">Pro</span>
                    </span>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#top" className="text-xs font-bold uppercase tracking-widest text-white hover:underline transition-colors">Beranda</a>
                    <a href="#features" className="text-xs font-bold uppercase tracking-widest text-white hover:underline transition-colors">Fitur</a>
                </nav>
            </div>
        </header>
    );
}