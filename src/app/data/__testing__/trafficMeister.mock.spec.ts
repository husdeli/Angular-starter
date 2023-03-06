export const simpleResposeMock = [
  {
    id: 1,
    type: 'car',
    brand: 'Bugatti Veyron',
    colors: ['red', 'black'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
  },
];

export const simpleResposeTransformedMock = {
  brands: new Set(['Bugatti Veyron']),
  colors: new Set(['red', 'black']),
  types: new Set(['car']),
  vehicles: [
    {
      id: 1,
      type: 'car',
      brand: 'Bugatti Veyron',
      colors: ['red', 'black'],
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
    },
  ],
};

export const severalVehiclesResponse = [
  {
    id: 1,
    type: 'car',
    brand: 'Bugatti Veyron',
    colors: ['red', 'black'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
  },
  {
    id: 2,
    type: 'airplane',
    brand: 'Boeing 787 Dreamliner',
    colors: ['red', 'white', 'black', 'green'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg/600px-All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg',
  },
  {
    id: 9,
    type: 'train',
    brand: 'Amer 4-4-0',
    colors: ['red', 'black'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/440woodcut.jpg/600px-440woodcut.jpg',
  },
  {
    id: 10,
    type: 'car',
    brand: 'Ferrari F40',
    colors: ['red', 'yellow'],
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/F40_Ferrari_20090509.jpg/1920px-F40_Ferrari_20090509.jpg',
  },
];

export const severalVehiclesResponseTransformedMock = {
  brands: new Set([
    'Bugatti Veyron',
    'Boeing 787 Dreamliner',
    'Amer 4-4-0',
    'Ferrari F40',
  ]),
  colors: new Set(['red', 'black', 'white', 'green', 'yellow']),
  types: new Set(['car', 'train', 'airplane']),
  vehicles: [
    {
      id: 1,
      type: 'car',
      brand: 'Bugatti Veyron',
      colors: ['red', 'black'],
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
    },
    {
      id: 2,
      type: 'airplane',
      brand: 'Boeing 787 Dreamliner',
      colors: ['red', 'white', 'black', 'green'],
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg/600px-All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg',
    },
    {
      id: 9,
      type: 'train',
      brand: 'Amer 4-4-0',
      colors: ['red', 'black'],
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/440woodcut.jpg/600px-440woodcut.jpg',
    },
    {
      id: 10,
      type: 'car',
      brand: 'Ferrari F40',
      colors: ['red', 'yellow'],
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/F40_Ferrari_20090509.jpg/1920px-F40_Ferrari_20090509.jpg',
    },
  ],
};
