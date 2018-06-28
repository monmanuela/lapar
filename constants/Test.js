// time in reviews: [minute, hour, date, month, year]
export const reviews = 
  {
    r1 :
    {
      rating: 5,
      userID: 'u3',
      itemID: 'i3',
      time: [25, 17, 20, 6, 2018],
      content: 'Yong Tau Foo! the liao was nice, and the noodle so gud. wld come back again.',
      photoURL: 'https://burpple-3.imgix.net/foods/2d941c36eb83782413a1608914_original.?w=645&dpr=2&fit=crop&q=80',
    },

    r2 :
    {
      rating: 4,
      userID: 'u1',
      itemID: 'i1',
      time: [3, 18, 19, 6, 2018],
      content: 'the beef bulgogi is a bit tough, but generally tastes nice',
      photoURL: 'https://www.koreanbapsang.com/wp-content/uploads/2010/05/DSC_0893-e1426734907897.jpg',
    },

    r3 :
    {
      rating: 5,
      userID: 'u3',
      itemID: 'i5',
      time: [5, 18, 19, 6, 2018],
      content: '1st time trying black pepper beef bibimbap, good value for money!',
      photoURL: 'https://thewoksoflife.com/wp-content/uploads/2017/05/bibimbap-recipe-3.jpg',
    },
  }

export const locs = {
  l1 : {
    id: 'l1',
    name: 'loc1',
    stalls: ['s1']
  },
  l2 : {
    id: 'l2',
    name: 'loc2',
    stalls: ['s2']
  },
  l3 : {
    id: 'l3',
    name: 'loc3',
    stalls: ['s3', 's4']
  },
  l4 : {
    id: 'l4',
    name: 'loc4',
    stalls: ['s5', 's6']
  }
};

export const stalls = {
  s1 : {
    name: 'stall1',
    location : 'loc1',
    items: ['i1', 'i2', 'i7'],
    rating: 4.75,
    lowestPrice: 3
  },
  s2 : {
    name: 'stall2',
    location: 'loc22',
    items: ['i3'],
    rating: 1.5,
    lowestPrice: 2.5
  }, 
  s3 : {
    name: 'stall3',
    location: 'l3',
    items: ['i4'],
    rating: 1,
    lowestPrice: 3.5
  },
  s4 : {
    name: 'stall4',
    location: 'l3',
    items: [],
    rating: 0,
    lowestPrice: 0
  },
  s5 : {
    name: 'stall5',
    location: 'l4',
    items: ['i5'],
    rating: 3.5,
    lowestPrice: 2
  },
  s6 : {
    name: 'stall6',
    location: 'l4',
    items: ['i6'],
    rating: 4,
    lowestPrice: 5
  }
};

export const items = {
  i1 : {
    name: 'item1',
    details: '...',
    recommended: true,
    rating: 5,
    price: 3,
    stallId: 's1',
    locationId: 'l1', 
    tags: ['halal'],
    reviews: ['r2']
  },
  i2 : {
    name: 'item2',
    details: '...',
    recommended: false,
    rating: 4.5,
    price: 9,
    stallId: 's1',
    locationId: 'l1',
    tags: ['vegetarian'],
    reviews: []
  },
  i3 : {
    name: 'item3',
    details: '...',
    recommended: true,
    rating: 1.5,
    price: 2.5,
    stallId: 's2',
    locationId: 'l2',
    tags: ['halal', 'vegetarian'],
    reviews: ['r1']
  },
  i4 : {
    name: 'item4',
    details: '...',
    recommended: false,
    rating: 1,
    price: 3.5,
    stallId: 's3',
    locationId: 'l3',
    tags: [],
    reviews: []
  },
  i5 : {
    name: 'item5',
    details: '...',
    recommended: true,
    rating: 3.5,
    price: 2,
    stallId: 's5',
    locationId: 'l4',
    tags: [],
    reviews: ['r3'] 
  },
  i6 : {
    name: 'item6',
    details: '...',
    recommended: false,
    rating: 4,
    price: 5,
    stallId: 's6',
    locationId: 'l4',
    tags: [],
    reviews: []    
  },
  i7: {
    name: 'item7',
    details: '...',
    recommended: true,
    rating: 1,
    price: 8,
    stallId: 's1',
    locationId: 'l1',
    tags: ['halal'],
    reviews: []
  }
};

export const filterCriterias = ['halal', 'vegetarian'];
export const locationCriterias = ['l1', 'l2', 'l3', 'l4'];
export const sortCriterias = ['rating', 'price'];