import { useState } from 'react'
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
  // Categories
  const categories = ['Alcohol', 'Bakery']
  const [selectedCategories, setSelectedCategories] = useState([] as string[])

  // Cart (map of product IDs to quantity)
  const [cart, updateCart] = useState({} as {[key: string]: number});

  // Products (@todo -> fetch from API)
  const [products, setProducts] = useState([
    {
      "productId": {
        "value": "0d101385-3cdc-464b-8431-ec0b50618b8a"
      },
      "name": "Sir Kensington’s Organic Mayonnaise, 12 oz",
      "imageUrl": "https://www.sirkensingtons.com/uploads/products/_product2x/SK-20-Render-Mayonnaise-Organic-12oz-Jar-FRONT-V02.png",
      "category": 'Alcohol',
      "price": 749,
    }
  ] as Product[]);

  const maxProducts = 12;
  const productsToDisplay = selectedCategories.length 
    ? products.filter(p => selectedCategories.includes(p.category)).slice(0, maxProducts)
    : products.slice(0, maxProducts);

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
            quantityInCart={cart[product.productId.value] || 0} 
            onAddToCart={() => {
              const id = product.productId.value;
              updateCart({
                ...cart,
                [id]: cart[id] ? cart[id] + 1 : 1,
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
