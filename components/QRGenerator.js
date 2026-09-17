function QRGenerator() {
    const [inputValue, setInputValue] = React.useState('https://trickle.so');
    const [qrColor, setQrColor] = React.useState('#ffffff');
    const [bgColor, setBgColor] = React.useState('#000000');
    const [size, setSize] = React.useState(300);
    const [errorLevel, setErrorLevel] = React.useState('M');
    const [type, setType] = React.useState('text');
    const [wifiName, setWifiName] = React.useState('');
    const [wifiPass, setWifiPass] = React.useState('');
    const [wifiSec, setWifiSec] = React.useState('WPA');
    const [logoUrl, setLogoUrl] = React.useState('');
    const [bottomText, setBottomText] = React.useState('');
    const canvasRef = React.useRef(null);
    const logoInputRef = React.useRef(null);

    const generateQR = React.useCallback(async () => {
        try {
            let content = inputValue;
            
            if (type === 'wifi') {
                content = `WIFI:T:${wifiSec};S:${wifiName};P:${wifiPass};;`;
            } else if (type === 'email') {
                content = `mailto:${inputValue}`;
            }

            if (!content) return;
            
            if (typeof window.QRCode === 'undefined') {
                console.error('Pustaka QRCode belum dimuat.');
                return;
            }

            const renderScale = 3;
            const renderSize = size * renderScale;
            const qrCanvas = document.createElement('canvas');
            await window.QRCode.toCanvas(qrCanvas, content, {
                width: renderSize,
                margin: 2,
                color: {
                    dark: qrColor,
                    light: bgColor
                },
                errorCorrectionLevel: errorLevel
            });

            const textHeight = bottomText.trim() ? Math.max(48, Math.round(size * 0.16)) * renderScale : 0;
            const canvas = canvasRef.current;
            canvas.width = renderSize;
            canvas.height = renderSize + textHeight;
            canvas.style.width = `${size}px`;
            canvas.style.height = 'auto';
            const context = canvas.getContext('2d');
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
            context.fillStyle = bgColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(qrCanvas, 0, 0);

            if (logoUrl) {
                await new Promise((resolve) => {
                    const logo = new Image();
                    logo.onload = () => {
                        const logoSize = Math.round(renderSize * 0.2);
                        const logoX = (renderSize - logoSize) / 2;
                        const logoY = (renderSize - logoSize) / 2;
                        const padding = Math.max(6 * renderScale, Math.round(renderSize * 0.02));
                        const backgroundX = Math.max(0, logoX - padding);
                        const backgroundY = Math.max(0, logoY - padding);
                        const backgroundSize = Math.min(renderSize - backgroundX, logoSize + padding * 2);
                        const cornerRadius = Math.round(backgroundSize * 0.18);

                        const roundedArea = () => {
                            context.beginPath();
                            context.roundRect(backgroundX, backgroundY, backgroundSize, backgroundSize, cornerRadius);
                        };

                        context.save();
                        roundedArea();
                        context.clip();
                        context.filter = `blur(${Math.max(3 * renderScale, Math.round(renderSize * 0.018))}px)`;
                        context.drawImage(
                            qrCanvas,
                            backgroundX,
                            backgroundY,
                            backgroundSize,
                            backgroundSize,
                            backgroundX,
                            backgroundY,
                            backgroundSize,
                            backgroundSize
                        );
                        context.restore();

                        context.save();
                        roundedArea();
                        context.clip();
                        context.globalAlpha = 1;
                        context.fillStyle = '#000000';
                        context.fillRect(backgroundX, backgroundY, backgroundSize, backgroundSize);
                        context.restore();

                        context.save();
                        context.beginPath();
                        context.roundRect(logoX, logoY, logoSize, logoSize, Math.round(logoSize * 0.14));
                        context.clip();
                        const sourceSize = Math.min(logo.naturalWidth, logo.naturalHeight);
                        const sourceX = (logo.naturalWidth - sourceSize) / 2;
                        const sourceY = (logo.naturalHeight - sourceSize) / 2;
                        context.drawImage(
                            logo,
                            sourceX,
                            sourceY,
                            sourceSize,
                            sourceSize,
                            logoX,
                            logoY,
                            logoSize,
                            logoSize
                        );
                        context.restore();
                        resolve();
                    };
                    logo.onerror = resolve;
                    logo.src = logoUrl;
                });
            }

            if (textHeight) {
                context.fillStyle = bgColor;
                context.fillRect(0, renderSize, canvas.width, textHeight);
                context.fillStyle = qrColor;
                context.font = `bold ${Math.max(14 * renderScale, Math.round(renderSize * 0.045))}px sans-serif`;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(bottomText.trim(), renderSize / 2, renderSize + textHeight / 2, renderSize - 24 * renderScale);
            }
        } catch (err) {
            console.error('QR Generation failed:', err);
        }
    }, [inputValue, qrColor, bgColor, size, errorLevel, type, wifiName, wifiPass, wifiSec, logoUrl, bottomText]);

    React.useEffect(() => {
        generateQR();
    }, [generateQR]);

    const downloadQR = () => {
        const canvas = canvasRef.current;
        const url = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = `qr-code-${Date.now()}.png`;
        link.href = url;
        link.click();
    };

    return (
        <div className="grid lg:grid-cols-5 gap-8" data-name="qr-generator" data-file="components/QRGenerator.js">
            <div className="lg:col-span-3 space-y-6">
                <div className="card">
                    <h2 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="icon-settings text-white"></div>
                        Konfigurasi Konten
                    </h2>
                    
                    <div className="flex gap-0 border border-white mb-6 overflow-x-auto no-scrollbar">
                        {['text', 'url', 'wifi', 'email'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setType(t)}
                                className={`flex-1 min-w-[80px] py-3 px-3 text-xs font-black uppercase transition-all ${
                                    type === t ? 'bg-white text-black' : 'text-white hover:bg-white/10'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {type !== 'wifi' ? (
                            <div>
                                <label className="block text-sm font-medium text-[var(--secondary-color)] mb-2">
                                    {type === 'email' ? 'Alamat Email' : 'Masukkan Teks atau URL'}
                                </label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={type === 'email' ? 'contoh@domain.com' : 'Ketik di sini...'}
                                    className="input-field"
                                />
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-[var(--secondary-color)] mb-2">Nama Jaringan (SSID)</label>
                                    <input
                                        type="text"
                                        value={wifiName}
                                        onChange={(e) => setWifiName(e.target.value)}
                                        className="input-field"
                                        placeholder="Nama WiFi"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--secondary-color)] mb-2">Kata Sandi</label>
                                    <input
                                        type="password"
                                        value={wifiPass}
                                        onChange={(e) => setWifiPass(e.target.value)}
                                        className="input-field"
                                        placeholder="Password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--secondary-color)] mb-2">Keamanan</label>
                                    <select
                                        value={wifiSec}
                                        onChange={(e) => setWifiSec(e.target.value)}
                                        className="input-field"
                                    >
                                        <option value="WPA">WPA/WPA2</option>
                                        <option value="WEP">WEP</option>
                                        <option value="nopass">None</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="card">
                    <h2 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="icon-palette text-white"></div>
                        Desain & Gaya
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-tighter mb-2">Warna QR</label>
                            <div className="flex items-center gap-0 border border-white">
                                <input
                                    type="color"
                                    value={qrColor}
                                    onChange={(e) => setQrColor(e.target.value)}
                                    className="w-12 h-12 cursor-pointer border-none p-0 overflow-hidden bg-transparent"
                                />
                                <input 
                                    type="text" 
                                    value={qrColor} 
                                    onChange={(e) => setQrColor(e.target.value)}
                                    className="flex-grow px-3 py-2 text-xs font-mono uppercase focus:outline-none bg-black text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-tighter mb-2">Warna Latar</label>
                            <div className="flex items-center gap-0 border border-white">
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-12 h-12 cursor-pointer border-none p-0 overflow-hidden bg-transparent"
                                />
                                <input 
                                    type="text" 
                                    value={bgColor} 
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="flex-grow px-3 py-2 text-xs font-mono uppercase focus:outline-none bg-black text-white"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-black uppercase tracking-tighter mb-2">Ukuran ({size}px)</label>
                            <input
                                type="range"
                                min="200"
                                max="1000"
                                step="50"
                                value={size}
                                onChange={(e) => setSize(parseInt(e.target.value))}
                                className="w-full h-1 bg-white appearance-none cursor-pointer accent-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--secondary-color)] mb-2">Level Koreksi</label>
                            <select
                                value={errorLevel}
                                onChange={(e) => setErrorLevel(e.target.value)}
                                className="input-field"
                            >
                                <option value="L">Low (7%)</option>
                                <option value="M">Medium (15%)</option>
                                <option value="Q">Quartile (25%)</option>
                                <option value="H">High (30%)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-tighter mb-2">Logo Tengah</label>
                            <input
                                ref={logoInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setLogoUrl(file ? URL.createObjectURL(file) : '');
                                }}
                                className="input-field text-xs"
                            />
                            {logoUrl && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLogoUrl('');
                                        if (logoInputRef.current) logoInputRef.current.value = '';
                                    }}
                                    className="w-full btn-secondary mt-3 text-xs uppercase tracking-widest"
                                >
                                    <div className="icon-trash-2"></div>
                                    Hapus Logo
                                </button>
                            )}
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-black uppercase tracking-tighter mb-2">Bottom Text</label>
                            <input
                                type="text"
                                value={bottomText}
                                onChange={(e) => setBottomText(e.target.value)}
                                placeholder="Teks di bawah QR (opsional)"
                                maxLength="60"
                                className="input-field"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2">
                <div className="card sticky top-28 flex flex-col items-center">
                    <h2 className="text-lg font-black uppercase tracking-widest mb-6 w-full text-left text-white">Pratinjau QR</h2>
                    <div className="bg-white/5 p-8 border-2 border-dashed border-white/20 mb-8 flex items-center justify-center min-h-[300px] w-full">
                        <canvas ref={canvasRef} className="max-w-full h-auto shadow-[0_0_50px_rgba(255,255,255,0.1)]"></canvas>
                    </div>
                    
                    <div className="w-full space-y-4">
                        <button
                            onClick={downloadQR}
                            className="w-full btn-primary uppercase tracking-widest text-xs"
                        >
                            <div className="icon-download"></div>
                            Unduh (.png)
                        </button>
                        <button
                            onClick={() => {
                                window.print();
                            }}
                            className="w-full btn-secondary uppercase tracking-widest text-xs"
                        >
                            <div className="icon-printer"></div>
                            Cetak Sekarang
                        </button>
                    </div>
                    
                    <div className="mt-8 p-4 border border-white/10 w-full bg-white/5">
                        <div className="flex gap-3">
                            <div className="icon-circle-alert text-white shrink-0 mt-0.5"></div>
                            <p className="text-[10px] uppercase font-bold text-white/60 leading-relaxed">
                                Tip: Level koreksi "High" direkomendasikan untuk penggunaan luar ruangan atau cetak media besar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}