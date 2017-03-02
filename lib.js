'use strict'

const listing =
  (name, price) => ({
    name,
    price
  })

const cart =
  (customer, ...items) => ({
    customer,
    items
  })

const listedPrice =
  listing =>
    name =>
      name === listing.name
        ? listing.price
        : 0

/**
 * transform carts into an array of { customer, total }
 */
const calculateTotals =
  listings =>
    carts => {
      return carts.map((cart) => {
        return {
          customer: cart.customer,
          total: cart.items.reduce(
            (previous, itemName) => {
              return previous + listings
                .filter((listing) => {
                  let checkFunc = listedPrice(listing)
                  return checkFunc(itemName)
                })
                .reduce(
                  (previous, current) => {
                    return current.price
                  },
                0)
            },
          0)
        }
      })
    }

module.exports = {
  listing,
  cart,
  calculateTotals
}
