export const locs = [
  {
    id: 'l1',
    name: 'loc1'
  },
  {
    id: 'l2',
    name: 'loc2'
  },
  {
    id: 'l3',
    name: 'loc3'
  },
  {
    id: 'l4',
    name: 'loc4'
  }
];

export const stalls = [
  {
    id: 's1',
    name: 'stall1',
    loc: 'l1'
  },
  {
    id: 's2',
    name: 'stall2',
    loc: 'l2'
  }, 
  {
    id: 's3',
    name: 'stall3',
    loc: 'l3'
  },
  {
    id: 's4',
    name: 'stall4',
    loc: 'l3'
  },
  {
    id: 's5',
    name: 'stall5',
    loc: 'l4'
  },
  {
    id: 's6',
    name: 'stall6',
    loc: 'l5'
  }
];

export const items = [
  {
    id: 'i1',
    name: 'item1',
    details: '...',
    recom: true,
    rank: 1,
    price: 3,
    stall: 's1', 
    tags: ['halal']
  },
  {
    id: 'i2',
    name: 'item2',
    details: '...',
    recom: false,
    rank: 2,
    price: 9,
    stall: 's1',
    tags: ['vegetarian']
  },
  {
    id: 'i3',
    name: 'item3',
    details: '...',
    recom: true,
    rank: 11,
    price: 2.5,
    stall: 's2',
    tags: ['halal', 'vegetarian']
  },
  {
    id: 'i4',
    name: 'item4',
    details: '...',
    recom: false,
    rank: 12,
    price: 3.5,
    stall: 's3',
    tags: []
  },
  {
    id: 'i5',
    name: 'item5',
    details: '...',
    recom: true,
    rank: 4,
    price: 2,
    stall: 's5',
    tags: []    
  },
  {
    id: 'i6',
    name: 'item6',
    details: '...',
    recom: false,
    rank: 3,
    price: 5,
    stall: 's6',
    tags: []    
  }
]

export const filterCriterias = ['halal', 'vegetarian'];