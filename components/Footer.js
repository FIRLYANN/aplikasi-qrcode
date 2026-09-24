function Footer() {
    return (
        <footer className="bg-black border-t border-[var(--border-color)] py-12" data-name="footer" data-file="components/Footer.js">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                            <div className="icon-qr-code text-black text-base"></div>
                        </div>
                        <span className="text-lg font-black uppercase tracking-tighter text-white">
                            QRGen Pro
                        </span>
                    </div>
                    
                    <div className="text-center md:text-right text-[10px] font-black uppercase tracking-widest text-white/20">
                        &copy; 2026 QRGen Pro. Dark Brutalist Design.
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                    CREATED BY FIRLYAN PRIYOKO 2K26
                </div>
            </div>
        </footer>
    );
}