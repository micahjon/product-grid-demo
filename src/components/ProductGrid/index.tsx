import { useState } from 'react'
import './style.css'

function ProductGrid() {
  return (
    <section className="product-grid">

      {/* Product filters (maybe move to separate component) */}
      <h2 className="product-grid__filter-heading">Shop by Category</h2>
      {/* @todo -> add choices */}

      {/* Product grid */}
      <div className="product-grid__items">
        {/* @todo -> add products */}
      </div>

    </section>
  )
}

export default ProductGrid
