// time in reviews: [minute, hour, date, month, year]
export const reviews = 
  {
    'r1':
    {
      rating: 5,
      userID: 'u3',
      itemID: 'i3',
      time: [25, 17, 20, 6, 2018],
      content: 'Yong Tau Foo! the liao was nice, and the noodle so gud. wld come back again.',
      photoURL: 'https://burpple-3.imgix.net/foods/2d941c36eb83782413a1608914_original.?w=645&dpr=2&fit=crop&q=80',
    },

    'r2':
    {
      rating: 4,
      userID: 'u1',
      itemID: 'i1',
      time: [3, 18, 19, 6, 2018],
      content: 'the beef bulgogi is a bit tough, but generally tastes nice',
      photoURL: 'https://www.koreanbapsang.com/wp-content/uploads/2010/05/DSC_0893-e1426734907897.jpg',
    },

    'r3':
    {
      rating: 5,
      userID: 'u3',
      itemID: 'i5',
      time: [5, 18, 19, 6, 2018],
      content: '1st time trying black pepper beef bibimbap, good value for money!',
      photoURL: 'https://thewoksoflife.com/wp-content/uploads/2017/05/bibimbap-recipe-3.jpg',
    },
  }

export const locs = [
  {
    id: 'l1',
    name: 'loc1',
    stalls: ['s1']
  },
  {
    id: 'l2',
    name: 'loc2',
    stalls: ['s2']
  },
  {
    id: 'l3',
    name: 'loc3',
    stalls: ['s3', 's4']
  },
  {
    id: 'l4',
    name: 'loc4',
    stalls: ['s5', 's6']
  }
];

export const stalls = [
  {
    id: 's1',
    name: 'stall1',
    loc: 'l1',
    items: ['i1', 'i2', 'i7'],
    rating: 4.75,
    price: 3
  },
  {
    id: 's2',
    name: 'stall2',
    loc: 'l2',
    items: ['i3'],
    rating: 1.5,
    price: 2.5
  }, 
  {
    id: 's3',
    name: 'stall3',
    loc: 'l3',
    items: ['i4'],
    rating: 1,
    price: 3.5
  },
  {
    id: 's4',
    name: 'stall4',
    loc: 'l3',
    items: [],
    rating: 0,
    price: 0
  },
  {
    id: 's5',
    name: 'stall5',
    loc: 'l4',
    items: ['i5'],
    rating: 3.5,
    price: 2
  },
  {
    id: 's6',
    name: 'stall6',
    loc: 'l4',
    items: ['i6'],
    rating: 4,
    price: 5
  }
];

export const items = {
  i1 : {
    id: 'i1',
    name: 'item1',
    details: '...',
    recom: true,
    rank: 1,
    rating: 5,
    price: 3,
    stall: 's1',
    loc: 'l1', 
    tags: ['halal']
  },
  i2 : {
    id: 'i2',
    name: 'item2',
    details: '...',
    recom: false,
    rank: 2,
    rating: 4.5,
    price: 9,
    stall: 's1',
    loc: 'l1',
    tags: ['vegetarian']
  },
  i3 : {
    id: 'i3',
    name: 'item3',
    details: '...',
    recom: true,
    rank: 11,
    rating: 1.5,
    price: 2.5,
    stall: 's2',
    loc: 'l2',
    tags: ['halal', 'vegetarian']
  },
  i4 : {
    id: 'i4',
    name: 'item4',
    details: '...',
    recom: false,
    rank: 12,
    rating: 1,
    price: 3.5,
    stall: 's3',
    loc: 'l3',
    tags: []
  },
  i5 : {
    id: 'i5',
    name: 'item5',
    details: '...',
    recom: true,
    rank: 4,
    rating: 3.5,
    price: 2,
    stall: 's5',
    loc: 'l4',
    tags: []    
  },
  i6 : {
    id: 'i6',
    name: 'item6',
    details: '...',
    recom: false,
    rank: 3,
    rating: 4,
    price: 5,
    stall: 's6',
    loc: 'l4',
    tags: []    
  },
  i7: {
    id: 'i7',
    name: 'item7',
    details: '...',
    recom: true,
    rank: 13,
    rating: 1,
    price: 8,
    stall: 's1',
    loc: 'l1',
    tags: ['halal']
  }
};

export const filterCriterias = ['halal', 'vegetarian'];
export const locationCriterias = ['l1', 'l2', 'l3', 'l4'];
export const sortCriterias = ['rating', 'price'];