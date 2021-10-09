import { useState } from 'react'
import Chip from '../Chip'
import './style.css'

function ProductGrid() {
  const categories = ['Alcohol', 'Bakery']
  const [selectedCategories, setSelectedCategories] = useState([] as string[])

  return (
    <section className="product-grid">

      {/* Product filters (maybe move to separate component) */}
      <h2 className="product-grid__filter-heading">Shop by Category</h2>
      <div className="product-grid__filter-choices">
        {categories.map(name => {
          const isSelected = selectedCategories.includes(name);
          const onSelect = () => setSelectedCategories([...selectedCategories, name]);
          const onDeselect = () => setSelectedCategories(selectedCategories.filter(n => n !== name));
          return <Chip key={name} name={name} isSelected={isSelected} onDeselect={onDeselect} onSelect={onSelect} className="product-grid__filter-choice" />
        })}
      </div>

      {/* Product grid */}
      <div className="product-grid__items">
        {/* @todo -> add products */}
      </div>

    </section>
  )
}

export default ProductGrid
