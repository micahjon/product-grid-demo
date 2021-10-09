import './style.css'

type ProductGridItemProps = {
  name: string,
  imageUrl: string, // @todo -> add multiple sources (srcset)
  price: number,
  quantityInCart: number,
  onAddToCart: (event: any) => void,
  onRemoveFromCart: (event: any) => void,
}

function ProductGridItem({name, imageUrl, price, quantityInCart, onAddToCart, onRemoveFromCart}: ProductGridItemProps) {
  return <article className={`product ${quantityInCart > 0 ? 'product--in-cart' : ''}`}>
    {quantityInCart > 0 ? <span className="product__quantity-in-cart">{quantityInCart}</span> : ''}
    <figure className="product__image-container" style={{backgroundImage: `url('${imageUrl}')`}}></figure>
    <h1 className="product__name">{name}</h1>
    <p className="product__price">{formatPrice(price, 'en-US')}</p>
    <button className="product__add-to-cart" onClick={onAddToCart}>Add to Cart</button>
    {quantityInCart > 0 ?<button className="product__remove-from-cart" onClick={onRemoveFromCart}>X</button> : ''}
  </article>
}

// Format price in USD
// Can easily be extended to support any currency & language
function formatPrice(usdCents: number, locale: string) {
  const numberFormat = new Intl.NumberFormat([locale], {
      style: 'currency',
      currency: 'usd',
      currencyDisplay: 'symbol',
  });
  return numberFormat.format(usdCents / 100);
}

export default ProductGridItem
