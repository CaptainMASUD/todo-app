"use client"

import { useState } from "react"
import { useShopContext } from "../../Context/ShopContext"
import { X, ShoppingBag, Heart, ArrowUpDown, Trash2, ChevronLeft, ShoppingCart, CreditCard, Truck, Shield, Tag, ChevronRight } from 'lucide-react'
import Wishlist from "../WishList/WishList"
import PurchaseModal from "../PurcheaseModal/Purchease"

const Dashboard = () => {
  const {
    activeTab,
    setActiveTab,
    cart,
    cartTotal,
    removeFromCart,
    sortCartByPrice,
    handleBackToProducts,
    completePurchase,
  } = useShopContext()

  const [showModal, setShowModal] = useState(false)
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(null)
  const [itemToRemove, setItemToRemove] = useState(null)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)

  // Fix for cartTotal.toFixed is not a function
  // Convert cartTotal to a number if it's a string
  const numericCartTotal = typeof cartTotal === "string" ? parseFloat(cartTotal) : cartTotal || 0

  // Calculate tax and total
  const taxRate = 0.08
  const taxAmount = numericCartTotal * taxRate
  const discountAmount = couponApplied ? numericCartTotal * 0.1 : 0
  const orderTotal = numericCartTotal + taxAmount - discountAmount

  // Handle purchase
  const handlePurchase = () => {
    if (cart.length > 0) {
      completePurchase()
      setShowModal(true)
    }
  }

  // Close modal and continue shopping
  const handleCloseModal = () => {
    setShowModal(false)
    handleBackToProducts()
  }

  // Handle remove item with confirmation
  const confirmRemoveItem = (itemId) => {
    setItemToRemove(itemId)
    setShowRemoveConfirm(itemId)
  }

  const executeRemoveItem = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove)
      setShowRemoveConfirm(null)
      setItemToRemove(null)
    }
  }

  // Apply coupon code
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setCouponApplied(true)
    }
  }

  // Get product images based on category
  const getProductImage = (product) => {
    const categoryImageMap = {
      Laptops: [
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
      Phones: [
        "https://images.unsplash.com/photo-1695048133142-1a20484bce71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1678911820864-e5cfd0902d68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
      Accessories: [
        "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
      ],
      "Smart Watches": [
        "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      ],
      Earbuds: [
        "https://images.unsplash.com/photo-1606741965429-8d76ff50bb2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        "https://images.unsplash.com/photo-1627926539429-e8fb3a60a10f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
      Tablets: [
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        "https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      ],
    }

    // Default image if category doesn't match
    const defaultImages = [
      "https://images.unsplash.com/photo-1573739122661-d7a0b93e4a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    ]

    const images = categoryImageMap[product.category] || defaultImages
    return images[Math.floor(Math.random() * images.length)]
  }

  // If the active tab is wishlist, render the Wishlist component
  if (activeTab === "wishlist") {
    return <Wishlist />
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Purchase Modal */}
      <PurchaseModal isOpen={showModal} onClose={handleCloseModal} total={orderTotal.toFixed(2)} />

      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <button
                onClick={handleBackToProducts}
                className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Products
              </button>
              <h1 className="text-4xl font-bold">Your Shopping Cart</h1>
              <p className="text-white/80 mt-2 text-lg">
                {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 bg-white/10 backdrop-blur-md p-1 rounded-full shadow-lg">
              <button
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  activeTab === "cart"
                    ? "bg-white text-purple-700 shadow-md"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("cart")}
              >
                <span className="flex items-center">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Cart
                </span>
              </button>
              <button
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  activeTab === "wishlist"
                    ? "bg-white text-purple-700 shadow-md"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("wishlist")}
              >
                <span className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Column */}
            <div className="lg:w-2/3">
              {/* Cart Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <ShoppingBag className="h-6 w-6 text-purple-700 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                </div>

                <button
                  className="flex items-center text-gray-600 hover:text-purple-700 transition-colors text-sm"
                  onClick={sortCartByPrice}
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Sort by Price
                </button>
              </div>

              {/* Cart Items */}
              {cart.length > 0 ? (
                <div className="space-y-6 mb-8">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all group"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/3 h-48 sm:h-auto bg-gray-100 relative overflow-hidden">
                          <img
                            src={getProductImage(item) || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {item.inStock ? (
                            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                              In Stock
                            </div>
                          ) : (
                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                              Out of Stock
                            </div>
                          )}
                        </div>

                        <div className="p-6 sm:w-2/3 flex flex-col sm:flex-row justify-between">
                          <div className="flex-grow pr-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-xl text-gray-900 mb-1">{item.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                              </div>

                              {/* Mobile remove button */}
                              <button
                                className="sm:hidden text-gray-400 hover:text-red-500 p-1"
                                onClick={() => confirmRemoveItem(item.id)}
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>

                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.specs.map((spec, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center mt-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(item.rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500 ml-1">{item.rating.toFixed(1)}</span>
                            </div>
                          </div>

                          <div className="flex flex-row sm:flex-col justify-between items-end mt-4 sm:mt-0">
                            <div className="text-2xl font-bold text-gray-900">${item.price.toFixed(2)}</div>

                            {/* Desktop remove button */}
                            <div className="relative">
                              <button
                                className="hidden sm:flex items-center text-gray-500 hover:text-red-500 text-sm mt-4 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
                                onClick={() => confirmRemoveItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </button>

                              {/* Remove confirmation */}
                              {showRemoveConfirm === item.id && (
                                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 animate-fadeIn">
                                  <p className="text-sm text-gray-600 mb-2">Remove this item?</p>
                                  <div className="flex justify-end space-x-2">
                                    <button
                                      className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                                      onClick={() => setShowRemoveConfirm(null)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                      onClick={executeRemoveItem}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Looks like you haven't added any products to your cart yet. Browse our collection to
                    find the perfect gadgets for you.
                  </p>
                  <button
                    onClick={handleBackToProducts}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary Column */}
            {cart.length > 0 && (
              <div className="lg:w-1/3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({cart.length} items)</span>
                        <span>${numericCartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax (8%)</span>
                        <span>${taxAmount.toFixed(2)}</span>
                      </div>
                      {couponApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (10%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between font-bold text-gray-900 text-xl">
                          <span>Total</span>
                          <span>${orderTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">Including VAT</p>
                      </div>
                    </div>

                    {/* Coupon Code */}
                    {!couponApplied ? (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Promo Code
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter code"
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-lg hover:bg-gray-200 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Try "SAVE10" for 10% off</p>
                      </div>
                    ) : (
                      <div className="mb-6 bg-green-50 p-3 rounded-lg flex items-start">
                        <Tag className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-green-700 font-medium text-sm">Promo code applied!</p>
                          <p className="text-green-600 text-xs">10% discount has been applied to your order</p>
                        </div>
                      </div>
                    )}

                    <button
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors flex items-center justify-center"
                      onClick={handlePurchase}
                    >
                      Complete Purchase
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-3">We Accept</h4>
                    <div className="flex space-x-2">
                      <div className="bg-gray-100 rounded p-2">
                        <svg className="h-6" viewBox="0 0 48 48" fill="none">
                          <path
                            d="M44 11H4C2.89543 11 2 11.8954 2 13V35C2 36.1046 2.89543 37 4 37H44C45.1046 37 46 36.1046 46 35V13C46 11.8954 45.1046 11 44 11Z"
                            fill="#252C6F"
                          />
                          <path
                            d="M15 20C15 19.4477 15.4477 19 16 19H20C20.5523 19 21 19.4477 21 20V28C21 28.5523 20.5523 29 20 29H16C15.4477 29 15 28.5523 15 28V20Z"
                            fill="#EB001B"
                          />
                          <path
                            d="M27 20C27 19.4477 27.4477 19 28 19H32C32.5523 19 33 19.4477 33 20V28C33 28.5523 32.5523 29 32 29H28C27.4477 29 27 28.5523 27 28V20Z"
                            fill="#F79E1B"
                          />
                          <path
                            d="M21 24C21 22.3431 22.3431 21 24 21C25.6569 21 27 22.3431 27 24C27 25.6569 25.6569 27 24 27C22.3431 27 21 25.6569 21 24Z"
                            fill="#FF5F00"
                          />
                        </svg>
                      </div>
                      <div className="bg-gray-100 rounded p-2">
                        <svg className="h-6" viewBox="0 0 48 48" fill="none">
                          <path
                            d="M44 11H4C2.89543 11 2 11.8954 2 13V35C2 36.1046 2.89543 37 4 37H44C45.1046 37 46 36.1046 46 35V13C46 11.8954 45.1046 11 44 11Z"
                            fill="#016FD0"
                          />
                          <path
                            d="M24 28C26.7614 28 29 25.7614 29 23C29 20.2386 26.7614 18 24 18C21.2386 18 19 20.2386 19 23C19 25.7614 21.2386 28 24 28Z"
                            fill="#EEEEEE"
                          />
                          <path
                            d="M24 18C21.2386 18 19 20.2386 19 23H29C29 20.2386 26.7614 18 24 18Z"
                            fill="#D4D4D4"
                          />
                        </svg>
                      </div>
                      <div className="bg-gray-100 rounded p-2">
                        <svg className="h-6" viewBox="0 0 48 48" fill="none">
                          <path
                            d="M44 11H4C2.89543 11 2 11.8954 2 13V35C2 36.1046 2.89543 37 4 37H44C45.1046 37 46 36.1046 46 35V13C46 11.8954 45.1046 11 44 11Z"
                            fill="#0079BE"
                          />
                          <path
                            d="M17 29L19 19H22L20 29H17Z"
                            fill="white"
                          />
                          <path
                            d="M30 19C28.9 19 28 19.5 27.5 20.5L24 29H27L27.5 27H30.5L31 29H34L31.5 19H30ZM28.4 25L29 23C29.2 22.4 29.4 21.7 29.5 21H29.6C29.7 21.7 29.8 22.4 30 23L30.6 25H28.4Z"
                            fill="white"
                          />
                          <path
                            d="M24 22C24 20.3 22.7 19 20.5 19C18.3 19 16.5 20.3 16 22.8L15 27C14.5 29.5 16.3 31 18.5 31C20.7 31 22.5 29.5 23 27L24 22ZM20.5 28C19.7 28 19 27.3 19.2 26.5L20.2 22.5C20.4 21.7 21.3 21 22.1 21C22.9 21 23.6 21.7 23.4 22.5L22.4 26.5C22.2 27.3 21.3 28 20.5 28Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div className="bg-gray-100 rounded p-2">
                        <svg className="h-6" viewBox="0 0 48 48" fill="none">
                          <path
                            d="M44 11H4C2.89543 11 2 11.8954 2 13V35C2 36.1046 2.89543 37 4 37H44C45.1046 37 46 36.1046 46 35V13C46 11.8954 45.1046 11 44 11Z"
                            fill="#F7F7F7"
                          />
                          <path
                            d="M27 18H21C19.3431 18 18 19.3431 18 21V27C18 28.6569 19.3431 30 21 30H27C28.6569 30 30 28.6569 30 27V21C30 19.3431 28.6569 18 27 18Z"
                            fill="#3086C8"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="p-6">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Shield className="h-4 w-4 mr-2 text-green-600" />
                        <span>Secure checkout</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Truck className="h-4 w-4 mr-2 text-green-600" />
                        <span>Free shipping on orders over $50</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CreditCard className="h-4 w-4 mr-2 text-green-600" />
                        <span>No additional fees</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
