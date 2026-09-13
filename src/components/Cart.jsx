import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, STORE_NAME, CURRENCY } from '../config';

const formatPrice = (n) => `${Number(n).toLocaleString('fr-HT')} ${CURRENCY}`;

const Cart = () => {
  const {
    cart, isCartOpen, closeCart,
    updateQty, removeFromCart, clearCart,
    totalItems, totalPrice,
  } = useContext(CartContext);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const lines = cart.map(
      (item) => `• ${item.name} (x${item.qty}) : ${formatPrice(Number(item.price) * item.qty)}`
    );

    const message =
      `Bonjour ${STORE_NAME} ! 🌸%0A%0A` +
      `Je souhaite commander :%0A${lines.join('%0A')}%0A%0A` +
      `*Total : ${formatPrice(totalPrice)}*%0A%0A` +
      `Merci de me confirmer la disponibilité et la livraison. 💕`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Overlay sombre */}
      <div
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
        aria-hidden={!isCartOpen}
      />

      {/* Tiroir */}
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label="Panier">
        <div className="cart-header">
          <h3 className="cart-title">
            Mon Panier <span className="cart-count-pill">{totalItems}</span>
          </h3>
          <button className="icon-btn" onClick={closeCart} aria-label="Fermer">
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} strokeWidth={1} />
            <p>Votre panier est vide.</p>
            <button className="btn-primary" onClick={closeCart}>Continuer mes achats</button>
          </div>
        ) : (
          <>
            {/* Bandeau de réassurance */}
            <div className="cart-perks">
              <div className="cart-perk"><ShieldCheck size={15} /> 100% Authentique</div>
              <div className="cart-perk"><Truck size={15} /> Livraison en Haïti</div>
              <div className="cart-perk"><MessageCircle size={15} /> Commande sur WhatsApp</div>
            </div>

            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <span className="cart-item-brand">{item.brand || STORE_NAME}</span>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <div className="cart-item-price">{formatPrice(item.price)}</div>

                    <div className="qty-control">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Moins">
                        <Minus size={14} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Plus">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Retirer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <button className="clear-cart-btn" onClick={clearCart}>Vider le panier</button>
              <div className="cart-total-row">
                <span>Total</span>
                <span className="cart-total-value">{formatPrice(totalPrice)}</span>
              </div>
              <button className="btn-primary checkout-btn" onClick={handleCheckout}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Commander sur WhatsApp
              </button>
              <p className="checkout-note">Vous finalisez votre commande directement avec nous sur WhatsApp 💬</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Cart;
