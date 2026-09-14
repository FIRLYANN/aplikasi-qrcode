function Footer() {
    return (
        <footer className="bg-black border-t border-[var(--border-color)] py-12" data-name="footer" data-file="components/Footer.js">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white flex items-center justify-center">
                            <div className="icon-qr-code text-black text-base"></div>
                        </div>
                        <span className="text-lg font-black uppercase tracking-tighter text-white">
                            QRGen Pro
                        </span>
                    </div>
                    
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/50">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
                        &copy; 2026 QRGen Pro. Dark Brutalist Design.
                    </div>
                </div>
            </div>
        </footer>
    );
}