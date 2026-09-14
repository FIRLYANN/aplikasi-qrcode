// Important: DO NOT remove this ErrorBoundary component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" data-name="error-boundary">
          <div className="text-center max-w-md w-full bg-white p-8 rounded-3xl shadow-xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="icon-triangle-alert text-3xl text-red-600"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ups! Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-8">Maaf, aplikasi mengalami kendala teknis yang tidak terduga.</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full btn-primary"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    return (
      <div className="min-h-screen flex flex-col" data-name="app" data-file="app.js">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Generator QR Code <span className="text-[var(--primary-color)]">Profesional</span>
                    </h1>
                    <p className="text-lg text-[var(--secondary-color)] max-w-2xl mx-auto">
                        Buat QR Code berkualitas tinggi untuk teks, URL, WiFi, dan lainnya dengan kustomisasi penuh dan gratis.
                    </p>
                </div>
                
                <QRGenerator />
                
                <section className="mt-24 grid md:grid-cols-3 gap-8">
                    <div className="card text-center" data-name="feature-1">
                        <div className="w-16 h-16 border-b border-white flex items-center justify-center mx-auto mb-6">
                            <div className="icon-zap text-3xl text-white"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Instan & Mudah</h3>
                        <p className="text-white/70">Ketik data Anda dan QR Code akan langsung muncul di layar tanpa menunggu lama.</p>
                    </div>
                    <div className="card text-center" data-name="feature-2">
                        <div className="w-16 h-16 border-b border-white flex items-center justify-center mx-auto mb-6">
                            <div className="icon-palette text-3xl text-white"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Kustomisasi Penuh</h3>
                        <p className="text-white/70">Ubah warna, ukuran, dan tentukan level koreksi kesalahan sesuai kebutuhan proyek Anda.</p>
                    </div>
                    <div className="card text-center" data-name="feature-3">
                        <div className="w-16 h-16 border-b border-white flex items-center justify-center mx-auto mb-6">
                            <div className="icon-download text-3xl text-white"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Kualitas Tinggi</h3>
                        <p className="text-white/70">Unduh hasil QR dalam format gambar berkualitas tinggi yang siap dicetak di mana saja.</p>
                    </div>
                </section>
            </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);