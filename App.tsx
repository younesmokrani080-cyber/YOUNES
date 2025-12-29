
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductDetail from './components/ProductDetail';
import ProductGrid from './components/ProductGrid';
import OrderModal from './components/OrderModal';
import Footer from './components/Footer';
import { FEATURED_PRODUCT, INITIAL_PRODUCTS } from './constants';
import { Product } from './types';

const App: React.FC = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return INITIAL_PRODUCTS;
    return INITIAL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const handleOrderNow = (product: Product) => {
    setSelectedProductForOrder(product);
    setIsOrderModalOpen(true);
  };

  const handleProductClick = (product: Product) => {
    setViewingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        onSearch={setSearchQuery} 
        cartCount={0}
        onLogoClick={() => {
          setSearchQuery('');
          setViewingProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-grow">
        {viewingProduct ? (
          <ProductDetail 
            product={viewingProduct} 
            onBack={() => setViewingProduct(null)} 
            onOrder={handleOrderNow}
            isSingleProductMode={false}
          />
        ) : !isSearching ? (
          <>
            <Hero />
            <div id="product-section" className="scroll-mt-20">
              <ProductDetail 
                product={FEATURED_PRODUCT} 
                onBack={() => {}} 
                onOrder={handleOrderNow}
                isSingleProductMode={true}
              />
            </div>
            {INITIAL_PRODUCTS.length > 1 && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-black text-gray-900 mb-8">منتجات أخرى قد تعجبك</h2>
                <ProductGrid 
                  products={INITIAL_PRODUCTS.filter(p => p.id !== FEATURED_PRODUCT.id)} 
                  onProductClick={handleProductClick} 
                  onOrderClick={handleOrderNow} 
                />
              </div>
            )}
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-blue-600">🔍</span>
              نتائج البحث عن: "{searchQuery}"
            </h2>
            <ProductGrid 
              products={filteredProducts} 
              onProductClick={handleProductClick} 
              onOrderClick={handleOrderNow} 
            />
          </div>
        )}
      </main>

      {isOrderModalOpen && (selectedProductForOrder || FEATURED_PRODUCT) && (
        <OrderModal 
          product={selectedProductForOrder || FEATURED_PRODUCT} 
          isOpen={isOrderModalOpen} 
          onClose={() => setIsOrderModalOpen(false)} 
        />
      )}

      <Footer />
    </div>
  );
};

export default App;
