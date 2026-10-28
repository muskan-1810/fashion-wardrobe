import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowRight, Lock, AlertCircle, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency, isValidEmail } from '../utils/commerceLogic';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Checkout: React.FC = () => {
  const { items, subtotal, shipping, tax, total, totalCount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'United States',
    deliveryMethod: 'courier', // 'courier' or 'whiteglove'
    paymentMethod: 'card', // 'card' or 'applepay'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    date: string;
    total: number;
    items: typeof items;
  } | null>(null);

  if (items.length === 0 && !completedOrder) {
    return (
      <div className="min-h-screen pt-40 pb-24 px-6 text-center max-w-xl mx-auto space-y-4">
        <h1 className="font-serif text-3xl">Your Shopping Bag is Empty</h1>
        <p className="text-sm text-[#7E7569]">
          Please select at least one garment before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-widest mt-4"
        >
          Explore Boutique
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsProcessing(true);

    // Simulate luxury order verification
    setTimeout(() => {
      const orderNumber = `AN-${Math.floor(100000 + Math.random() * 900000)}`;
      setCompletedOrder({
        orderId: orderNumber,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        total,
        items: [...items],
      });
      clearCart();
      setIsProcessing(false);
    }, 1200);
  };

  // Order Confirmation View
  if (completedOrder) {
    return (
      <div className="min-h-screen pt-36 pb-24 px-6 md:px-12 max-w-4xl mx-auto text-[#171717]">
        <div className="p-8 md:p-12 bg-[#F4F1EA] border border-[#E8E4DC] text-center space-y-6">
          <div className="w-16 h-16 bg-[#171717] text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="editorial-subheading">Order Manifest Confirmed</span>
            <h1 className="font-serif text-3xl sm:text-4xl uppercase tracking-tight text-[#171717]">
              Thank You for Your Patronage.
            </h1>
            <p className="font-mono text-sm text-[#7E7569]">
              Reference No: <strong className="text-black">{completedOrder.orderId}</strong>
            </p>
          </div>

          <p className="text-sm text-[#544D44] max-w-lg mx-auto font-light leading-relaxed">
            Your limited edition pieces are being prepared at the atelier. A confirmation dispatch has been logged for <span className="font-medium text-black">{formData.email}</span>.
          </p>

          {/* Demo Notice Banner */}
          <div className="p-4 bg-[#EBE7DE] border border-[#DDD7CD] max-w-md mx-auto text-xs text-[#736B60] space-y-1">
            <p className="font-semibold text-black uppercase tracking-wider text-[10px]">
              Prototype Demonstration Confirmation
            </p>
            <p>
              No real monetary charge has occurred. This checkout demonstrates full e-commerce state management, cart persistence, and order receipt flow.
            </p>
          </div>

          {/* Itemized Receipt Summary */}
          <div className="pt-6 border-t border-[#DDD7CD] text-left max-w-lg mx-auto space-y-4">
            <h3 className="font-serif text-base uppercase tracking-wider font-medium text-black">
              Acquired Editions
            </h3>

            <div className="divide-y divide-[#E0D9CE] text-xs">
              {completedOrder.items.map(i => (
                <div key={i.productId} className="py-2.5 flex justify-between">
                  <div>
                    <span className="font-medium text-black">{i.product.name}</span>
                    <span className="text-[#7E7569] block text-[11px]">
                      Size: {i.selectedSize} · Color: {i.selectedColor.name} · Qty: {i.quantity}
                    </span>
                  </div>
                  <span className="font-mono tabular-nums text-black">
                    {formatCurrency(i.product.price * i.quantity, i.product.currency)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#171717] flex justify-between text-sm font-semibold">
              <span className="font-serif uppercase">Total Remittance</span>
              <span className="font-mono tabular-nums">{formatCurrency(completedOrder.total)}</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-3.5 bg-[#171717] text-[#F8F6F1] text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors"
            >
              Return to Ready to Wear
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#171717]">
      {/* Demo Mode Notice */}
      <div className="mb-8 p-4 bg-[#EBE7DE] border border-[#DDD7CD] flex items-center gap-3 text-xs text-[#544D44]">
        <AlertCircle className="w-5 h-5 text-[#8C8377] shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-black uppercase tracking-wider font-semibold">Demo Checkout Environment:</strong> This interface operates as a front-end presentation and portfolio prototype. Live financial transactions are not initiated.
        </p>
      </div>

      <div className="mb-10 border-b border-[#E8E4DC] pb-6">
        <span className="editorial-subheading">Secure Transaction</span>
        <h1 className="font-serif text-3xl sm:text-4xl uppercase tracking-tight font-normal text-[#171717] mt-1">
          ATELIER CHECKOUT.
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Checkout Form (col-span-7) */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-10">
          {/* 1. Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-2">
              <h2 className="font-serif text-xl uppercase tracking-wide text-black font-medium">
                01. Client Contact
              </h2>
              <span className="text-xs text-[#7E7569]">Required for dispatch tracking</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="block uppercase tracking-wider font-semibold text-[#171717]">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="client@domain.com"
                  className={`w-full p-3 bg-white border text-sm focus:outline-none focus:border-black ${
                    errors.email ? 'border-[#B91C1C]' : 'border-[#D5CFC5]'
                  }`}
                />
                {errors.email && <p className="text-[#B91C1C] text-[11px]">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="block uppercase tracking-wider font-semibold text-[#171717]">
                  Telephone Number (Courier Notification)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className="w-full p-3 bg-white border border-[#D5CFC5] text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="space-y-4">
            <div className="border-b border-[#E8E4DC] pb-2">
              <h2 className="font-serif text-xl uppercase tracking-wide text-black font-medium">
                02. Delivery Destination
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="block uppercase tracking-wider font-semibold text-[#171717]">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  className={`w-full p-3 bg-white border text-sm focus:outline-none focus:border-black ${
                    errors.firstName ? 'border-[#B91C1C]' : 'border-[#D5CFC5]'
                  }`}
                />
                {errors.firstName && <p className="text-[#B91C1C] text-[11px]">{errors.firstName}</p>}
              </div>

              <div className="space-y-1">
                <label className="block uppercase tracking-wider font-semibold text-[#171717]">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  className={`w-full p-3 bg-white border text-sm focus:outline-none focus:border-black ${
                    errors.lastName ? 'border-[#B91C1C]' : 'border-[#D5CFC5]'
                  }`}
                />
                {errors.lastName && <p className="text-[#B91C1C] text-[11px]">{errors.lastName}</p>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="block uppercase tracking-wider font-semibold text-[#171717]">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street and house number"
                  className={`w-full p-3 bg-white border text-sm focus:outline-none focus:border-black ${
                    errors.address ? 'border-[#B91C1C]' : 'border-[#D5CFC5]'
                  }`}
                />
                {errors.address && <p className="text-[#B91C1C] text-[11px]">{errors.address}</p>}
              </div>

              <div className="space-y-1">
                <label className="block uppercase tracking-wider font-semibold text-[#171717]">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full p-3 bg-white border text-sm focus:outline-none focus:border-black ${
                    errors.city ? 'border-[#B91C1C]' : 'border-[#D5CFC5]'
                  }`}
                />
                {errors.city && <p className="text-[#B91C1C] text-[11px]">{errors.city}</p>}
              </div>

              <div className="space-y-1">
                <label className="block uppercase tracking-wider font-semibold text-[#171717]">
                  Postal / ZIP Code *
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                  className={`w-full p-3 bg-white border text-sm focus:outline-none focus:border-black ${
                    errors.postalCode ? 'border-[#B91C1C]' : 'border-[#D5CFC5]'
                  }`}
                />
                {errors.postalCode && <p className="text-[#B91C1C] text-[11px]">{errors.postalCode}</p>}
              </div>
            </div>
          </div>

          {/* 3. Delivery Method */}
          <div className="space-y-4">
            <div className="border-b border-[#E8E4DC] pb-2">
              <h2 className="font-serif text-xl uppercase tracking-wide text-black font-medium">
                03. Courier Speed
              </h2>
            </div>

            <div className="space-y-2 text-xs">
              <label className="p-4 border border-[#171717] bg-[#F4F1EA] flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="courier"
                    checked={formData.deliveryMethod === 'courier'}
                    onChange={() => setFormData({ ...formData, deliveryMethod: 'courier' })}
                    className="accent-black"
                  />
                  <div>
                    <span className="font-semibold text-black uppercase tracking-wider">
                      Complimentary Worldwide Courier
                    </span>
                    <p className="text-[#7E7569]">Delivered in 3–5 business days in archival packaging.</p>
                  </div>
                </div>
                <span className="font-mono text-black font-medium">Free</span>
              </label>
            </div>
          </div>

          {/* 4. Payment Demonstration Method */}
          <div className="space-y-4">
            <div className="border-b border-[#E8E4DC] pb-2 flex items-center justify-between">
              <h2 className="font-serif text-xl uppercase tracking-wide text-black font-medium">
                04. Payment Method
              </h2>
              <span className="text-[11px] text-[#7E7569] flex items-center gap-1">
                <Lock className="w-3 h-3" /> 256-bit SSL Demo
              </span>
            </div>

            <div className="p-4 bg-white border border-[#D5CFC5] space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-black uppercase tracking-wider">
                  Test Card Sandbox
                </span>
                <span className="text-[#7E7569] font-mono">Simulated</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-3">
                  <label className="block text-[10px] uppercase tracking-wider text-[#7E7569] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.cardNumber}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E0D9CE] font-mono text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#7E7569] mb-1">
                    Expires
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.cardExp}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E0D9CE] font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7E7569] mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.cardCvc}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#E0D9CE] font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-[#171717] hover:bg-black text-[#F8F6F1] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Confirming Remittance...</span>
            ) : (
              <>
                <span>Authorize &amp; Complete Order ({formatCurrency(total)})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Right: Order Summary Sidebar (col-span-5) */}
        <div className="lg:col-span-5 p-8 bg-[#F4F1EA] border border-[#E8E4DC] space-y-6">
          <div className="flex items-center justify-between border-b border-[#E0D9CE] pb-3">
            <h3 className="font-serif text-xl uppercase tracking-wide text-black font-medium">
              Order Summary
            </h3>
            <span className="text-xs font-mono text-[#7E7569]">{totalCount} Pieces</span>
          </div>

          {/* Mini item list */}
          <div className="divide-y divide-[#E0D9CE] max-h-72 overflow-y-auto pr-1">
            {items.map(item => (
              <div
                key={`${item.productId}-${item.selectedColor.name}-${item.selectedSize}`}
                className="py-3 first:pt-0 flex items-center gap-4 text-xs"
              >
                <div className="w-12 h-16 bg-[#ECE8E1] shrink-0 overflow-hidden relative">
                  <ImageWithFallback
                    src={item.product.images.primary}
                    alt={item.product.name}
                    fallbackTitle={item.product.name}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-sm font-normal text-black line-clamp-1">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-[#7E7569]">
                    Size: {item.selectedSize} · Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-mono tabular-nums text-black font-medium">
                  {formatCurrency(item.product.price * item.quantity, item.product.currency)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="pt-4 border-t border-[#E0D9CE] space-y-2 text-xs">
            <div className="flex justify-between text-[#635B50]">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-black">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#635B50]">
              <span>Worldwide Courier</span>
              <span className="font-mono tabular-nums text-black">
                {shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-[#635B50]">
              <span>Taxes (8%)</span>
              <span className="font-mono tabular-nums text-black">{formatCurrency(tax)}</span>
            </div>
            <div className="pt-3 border-t border-[#171717] flex justify-between text-base font-semibold text-black">
              <span className="font-serif uppercase tracking-wider">Total</span>
              <span className="font-sans tabular-nums">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
