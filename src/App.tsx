import { useState } from 'react'
import './App.css'
import ProductGrid from './components/ProductGrid'

function App() {
  // @todo -> show/hide cart
  const [isCartVisible, setCartVisible] = useState(false)

  return (
    <div className="page">
      {/* Header (@todo -> move to new component) */}
      <header className="page-header">
        Header
      </header>
      <div className="page-header-placeholder"></div>
      {/* Cart (@todo -> move to new component) */}
      <section className="cart">
        Cart
      </section>
      <ProductGrid />
    </div>
  )
}

export default App
