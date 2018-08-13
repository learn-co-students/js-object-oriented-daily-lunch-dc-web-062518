// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.neighborhoodId === this.id
    })
  }
  customers() {
    let a = this.deliveries().map(delivery => {
      return delivery.customer()
    })
    return Array.from(new Set(a))
  }
  meals() {
    let a = this.deliveries().map(delivery => {
      return delivery.meal()
    })
    return Array.from(new Set(a))
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }
  meals() {
    return this.deliveries().map(delivery => {
      return delivery.meal()
    })
  }
  totalSpent() {
    return this.meals().reduce((acc, value) => {
      return acc + value.price
    }, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => {
      return this.id == delivery.mealId
    })
  }
  customers() {
    let a = this.deliveries().map(delivery => {
      return delivery.customer()
    })
    return Array.from(new Set(a))
  }

  static byPrice() {
    return store.meals.sort((a, b) => {
      return b.price - a.price
    })
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id == this.mealId
    })
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id == this.customerId
    })
  }

  neighborhood() {
    return store.neighborhoods.find(n => {
      return n.id == this.neighborhoodId
    })
  }

}
