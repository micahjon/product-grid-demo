import { useEffect, useState } from 'react'
import Chip from '../Chip'
import ProductGridItem from '../ProductGridItem'
import './style.css'

type Product = {
  productId: { value: string },
  name: string,
  imageUrl: string,
  price: number,
  category: string
}

function ProductGrid() {
  // Cart (map of product IDs to quantity)
  const [cart, updateCart] = useState({} as {[key: string]: number});

  // Products
  const [products, setProducts] = useState([] as Product[]);

  // Categories
  const [categories, setCategories] = useState([] as string[]);
  const [selectedCategories, setSelectedCategories] = useState([] as string[])

  // Fetch products from API (ideally we would abstract this out into a separate state machine)
  const [isLoading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(undefined as any);

  useEffect(() => {
    if (isLoading || fetchError || products.length) return;

    console.log('Fetching..')
    setLoading(true);
      fetch('/src/products.json').then(res => res.json()).then(
        (products) => {
          setProducts(products);
          setCategories((products as Product[])
            .map(p => p.category)
            .filter(Boolean)
            .filter((category, index, arr) => arr.indexOf(category) === index)
          );
        }, 
        (error) => {
          // Send this error to Sentry
          console.error('Failed to fetch products', error)
          // Ask user to re-try
          setFetchError(error)
        }, 
      ).then(() => setLoading(false));
    
  }, [fetchError]);

  // Currently showing first 12 items (@todo -> handle pagination)
  const maxProducts = 12;
  const productsToDisplay = selectedCategories.length 
    ? products.filter(p => selectedCategories.includes(p.category)).slice(0, maxProducts)
    : products.slice(0, maxProducts);

  // Handle loading & error states
  if (isLoading || fetchError) {
    return <section className="product-grid">
      {isLoading ? 'Loading...' : ''}
      {fetchError ? <span>Unable to fetch products. Please try again <button onClick={() => setFetchError(undefined)}>Try Again</button></span> : ''}
    </section>
  }

  return (
    <section className="product-grid">

      {/* Product filters (maybe move to separate component) */}
      <h2 className="product-grid__filter-heading">Shop by Category</h2>
      <div className="product-grid__filter-choices">
        {categories.map(name => 
          <Chip 
            key={name} 
            name={name} 
            isSelected={selectedCategories.includes(name)} 
            onDeselect={() => setSelectedCategories(selectedCategories.filter(n => n !== name))} 
            onSelect={() => setSelectedCategories([...selectedCategories, name])} 
            className="product-grid__filter-choice" 
          />
        )}
      </div>

      {/* Product grid */}
      <div className="product-grid__items">
        {productsToDisplay.map((product) => 
          <ProductGridItem 
            key={product.productId.value}
            quantityInCart={cart[product.productId.value] || 0} 
            onAddToCart={() => {
              const id = product.productId.value;
              updateCart({
                ...cart,
                [id]: cart[id] ? cart[id] + 1 : 1,
              })
            }}
            onRemoveFromCart={() => {
              const id = product.productId.value;
              updateCart({
                ...cart,
                [id]: cart[id] ? cart[id] - 1 : 0,
              })
            }}
            {...product} 
          />
        )}
      </div>

    </section>
  )
}

export default ProductGrid
