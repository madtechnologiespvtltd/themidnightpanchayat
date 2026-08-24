export const CATEGORIES = [
  { id: 'noodles', name: 'NOODLES' },
  { id: 'rice', name: 'RICE' },
  { id: 'chilli-potatoes', name: 'CHILLI POTATOES' },
  { id: 'burger', name: 'BURGER' },
  { id: 'sandwich', name: 'SANDWICH' },
  { id: 'spring-rolls', name: 'SPRING ROLLS' },
  { id: 'momos', name: 'MOMOS' },
  { id: 'fries', name: 'FRIES' },
  { id: 'pasta', name: 'PASTA' },
  { id: 'maggi', name: 'MAGGI' },
  { id: 'pizza', name: 'PIZZA' },
  { id: 'mojito', name: 'MOJITO' },
  { id: 'coffee', name: 'COFFEE' },
  { id: 'shakes', name: 'SHAKES' },
  { id: 'chai', name: 'CHAI' }
];

export const MENU_ITEMS = [
  // Noodles
  { id: 'm1', categoryId: 'noodles', name: 'Veg Noodles', price: 59, presentationType: 'plate', variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 40}] },
  { id: 'm2', categoryId: 'noodles', name: 'Singapore Noodles', price: 69, presentationType: 'plate', variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 50}] },
  { id: 'm3', categoryId: 'noodles', name: 'Chilli Garlic Noodles', price: 79, presentationType: 'plate', variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 50}] },
  { id: 'm4', categoryId: 'noodles', name: 'Hakka Noodles', price: 79, presentationType: 'plate', variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 50}] },
  
  // Rice
  { id: 'm5', categoryId: 'rice', name: 'Fried Rice', price: 59, presentationType: 'plate', variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 60}] },
  { id: 'm6', categoryId: 'rice', name: 'Paneer Fried Rice', price: 79, presentationType: 'plate', variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 50}] },
  
  // Chilli Potatoes
  { id: 'm7', categoryId: 'chilli-potatoes', name: 'Chilli Potatoes', price: 69, presentationType: 'plate', variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 60}] },
  { id: 'm8', categoryId: 'chilli-potatoes', name: 'Honey Chilli Potatoes', price: 79, presentationType: 'plate', variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 60}] },
  
  // Burger
  { id: 'm9', categoryId: 'burger', name: 'Veg Burger', price: 49, presentationType: 'plate' },
  { id: 'm10', categoryId: 'burger', name: 'Paneer Burger', price: 59, presentationType: 'plate' },
  { id: 'm11', categoryId: 'burger', name: 'Cheese Burger', price: 69, presentationType: 'plate' },
  { id: 'm12', categoryId: 'burger', name: 'Loaded Burger', price: 99, presentationType: 'plate' },
  
  // Sandwich
  { id: 'm13', categoryId: 'sandwich', name: 'Veg Sandwich', price: 59, presentationType: 'plate' },
  { id: 'm14', categoryId: 'sandwich', name: 'Cheese Sandwich', price: 69, presentationType: 'plate' },
  { id: 'm15', categoryId: 'sandwich', name: 'Paneer Sandwich', price: 79, presentationType: 'plate' },
  { id: 'm16', categoryId: 'sandwich', name: 'Cheese Paneer Sandwich', price: 99, presentationType: 'plate' },
  
  // Spring Rolls
  { id: 'm17', categoryId: 'spring-rolls', name: 'Veg Spring Rolls', price: 79, presentationType: 'plate' },
  { id: 'm18', categoryId: 'spring-rolls', name: 'Paneer Spring Rolls', price: 99, presentationType: 'plate' },
  
  // Momos
  { id: 'm19', categoryId: 'momos', name: 'Veg Steam Momo', price: 49, presentationType: 'plate', variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 20}] },
  { id: 'm20', categoryId: 'momos', name: 'Veg Fried Momo', price: 49, presentationType: 'plate', variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 20}] },
  { id: 'm21', categoryId: 'momos', name: 'Veg Kurkure Momo', price: 69, presentationType: 'plate', variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 30}] },
  { id: 'm22', categoryId: 'momos', name: 'Tandoori Momo', price: 79, presentationType: 'plate', variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 40}] },
  { id: 'm23', categoryId: 'momos', name: 'Gravy Momo', price: 79, presentationType: 'plate', variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 50}] },
  { id: 'm24', categoryId: 'momos', name: 'Paneer Kurkure Momo', price: 79, presentationType: 'plate', variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 30}] },
  { id: 'm25', categoryId: 'momos', name: 'Paneer Steam Momo', price: 59, presentationType: 'plate', variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 20}] },
  { id: 'm26', categoryId: 'momos', name: 'Paneer Fried Momo', price: 59, presentationType: 'plate', variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 20}] },
  { id: 'm27', categoryId: 'momos', name: 'Paneer Tandoori Momo', price: 89, presentationType: 'plate', variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 50}] },
  
  // Fries
  { id: 'm28', categoryId: 'fries', name: 'Salted Fries', price: 50, presentationType: 'plate' },
  { id: 'm29', categoryId: 'fries', name: 'Peri Peri Fries', price: 60, presentationType: 'plate' },
  { id: 'm30', categoryId: 'fries', name: 'Cheese Fries', price: 90, presentationType: 'plate' },
  
  // Pasta
  { id: 'm31', categoryId: 'pasta', name: 'White Sauce Pasta', price: 150, presentationType: 'plate' },
  { id: 'm32', categoryId: 'pasta', name: 'Red Sauce Pasta', price: 150, presentationType: 'plate' },
  { id: 'm33', categoryId: 'pasta', name: 'Mix Sauce Pasta', price: 170, presentationType: 'plate' },
  
  // Maggi
  { id: 'm34', categoryId: 'maggi', name: 'Plain Maggi', price: 40, presentationType: 'plate' },
  { id: 'm35', categoryId: 'maggi', name: 'Veg Maggi', price: 50, presentationType: 'plate' },
  { id: 'm36', categoryId: 'maggi', name: 'Cheese Paneer Maggi', price: 70, presentationType: 'plate' },
  { id: 'm37', categoryId: 'maggi', name: 'Cheese Maggi', price: 60, presentationType: 'plate' },
  
  // Pizza - Single Veg
  { id: 'm38', categoryId: 'pizza', name: 'Onion Pizza', price: 69, presentationType: 'plate', variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  { id: 'm39', categoryId: 'pizza', name: 'Tomato Pizza', price: 69, presentationType: 'plate', variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  { id: 'm40', categoryId: 'pizza', name: 'Sweet Corn Pizza', price: 79, presentationType: 'plate', variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  { id: 'm41', categoryId: 'pizza', name: 'Paneer Pizza', price: 79, presentationType: 'plate', variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  
  // Pizza - Double Veg
  { id: 'm42', categoryId: 'pizza', name: 'Onion + Capsicum Pizza', price: 79, presentationType: 'plate', variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  { id: 'm43', categoryId: 'pizza', name: 'Onion + Corn Pizza', price: 89, presentationType: 'plate', variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  { id: 'm44', categoryId: 'pizza', name: 'Onion + Paneer Pizza', price: 99, presentationType: 'plate', variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 150}] },
  { id: 'm45', categoryId: 'pizza', name: 'Paneer + Corn Pizza', price: 99, presentationType: 'plate', variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 150}] },
  
  // Pizza - Rectangular
  { id: 'm46', categoryId: 'pizza', name: 'Rectangular Onion + Capsicum', price: 139, presentationType: 'plate' },
  { id: 'm47', categoryId: 'pizza', name: 'Rectangular Onion + Corn', price: 149, presentationType: 'plate' },
  { id: 'm48', categoryId: 'pizza', name: 'Rectangular Onion + Paneer', price: 159, presentationType: 'plate' },
  { id: 'm49', categoryId: 'pizza', name: 'Rectangular Paneer + Corn', price: 159, presentationType: 'plate' },
  
  // Mojito
  { id: 'm50', categoryId: 'mojito', name: 'Lime Soda', price: 60, presentationType: 'cup' },
  { id: 'm51', categoryId: 'mojito', name: 'Black Current', price: 70, presentationType: 'cup' },
  { id: 'm52', categoryId: 'mojito', name: 'Mint', price: 60, presentationType: 'cup' },
  { id: 'm53', categoryId: 'mojito', name: 'Virgin Mojito', price: 70, presentationType: 'cup' },
  
  // Coffee
  { id: 'm54', categoryId: 'coffee', name: 'Cold Coffee Classic', price: 59, presentationType: 'cup' },
  { id: 'm55', categoryId: 'coffee', name: 'Hazelnut Coffee', price: 69, presentationType: 'cup' },
  { id: 'm56', categoryId: 'coffee', name: 'Caramel Coffee', price: 79, presentationType: 'cup' },
  
  // Shakes
  { id: 'm57', categoryId: 'shakes', name: 'Cake & Coffee Shake', price: 99, presentationType: 'cup' },
  { id: 'm58', categoryId: 'shakes', name: 'Protein Shake', price: 89, presentationType: 'cup' },
  { id: 'm59', categoryId: 'shakes', name: 'KitKat Shake', price: 79, presentationType: 'cup' },
  { id: 'm60', categoryId: 'shakes', name: 'Oreo Shake', price: 79, presentationType: 'cup' },
  
  // Chai
  { id: 'm61', categoryId: 'chai', name: 'Chai', price: 20, presentationType: 'cup' },
  { id: 'm62', categoryId: 'chai', name: 'Adrak Chai', price: 20, presentationType: 'cup' },
  { id: 'm63', categoryId: 'chai', name: 'Elaichi Chai', price: 30, presentationType: 'cup' },
  { id: 'm64', categoryId: 'chai', name: 'Kesar Chai', price: 40, presentationType: 'cup' },
  { id: 'm65', categoryId: 'chai', name: 'Masala Chai', price: 30, presentationType: 'cup' }
];
