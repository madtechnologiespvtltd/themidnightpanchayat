export const CATEGORIES = [
  { id: 'coffee', name: 'COFFEE' },
  { id: 'tea', name: 'TEA' },
  { id: 'breakfast', name: 'BREAKFAST' },
  { id: 'sandwiches', name: 'SANDWICHES' },
  { id: 'bakery', name: 'BAKERY' },
  { id: 'desserts', name: 'DESSERTS' },
  { id: 'cold-drinks', name: 'COLD DRINKS' },
];

export const MENU_ITEMS = [
  { 
    id: 'c1', categoryId: 'coffee', name: 'Espresso', price: 120, presentationType: 'cup',
    image: '/food/espresso.png',
    description: 'A rich, full-bodied shot of our signature house blend.',
    variants: [
      { id: 'v1', name: 'Single', priceDelta: 0 },
      { id: 'v2', name: 'Double', priceDelta: 60 }
    ],
    addons: []
  },
  { 
    id: 'c2', categoryId: 'coffee', name: 'Cappuccino', price: 180, presentationType: 'cup',
    image: '/food/cappuccino.png',
    description: 'Classic espresso topped with deeply steamed milk and a thick layer of foam.',
    variants: [
      { id: 'v1', name: 'Regular', priceDelta: 0 },
      { id: 'v2', name: 'Large', priceDelta: 40 }
    ],
    addons: [
      { id: 'a1', name: 'Extra Shot', price: 60 },
      { id: 'a2', name: 'Oat Milk', price: 50 },
      { id: 'a3', name: 'Vanilla Syrup', price: 30 }
    ]
  },
  { id: 'c3', categoryId: 'coffee', name: 'Latte', price: 190, presentationType: 'cup' },
  { id: 'c4', categoryId: 'coffee', name: 'Americano', price: 150, presentationType: 'cup' },
  { id: 'c5', categoryId: 'coffee', name: 'Mocha', price: 210, presentationType: 'cup' },
  { id: 't1', categoryId: 'tea', name: 'Masala Chai', price: 80, presentationType: 'cup', image: '/food/chai.png' },
  { id: 't2', categoryId: 'tea', name: 'Earl Grey', price: 120, presentationType: 'cup' },
  { id: 'b1', categoryId: 'breakfast', name: 'Pancakes', price: 220, presentationType: 'plate' },
];
