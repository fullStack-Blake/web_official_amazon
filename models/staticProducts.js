const product = {
  database1: [
    {
      name: "Promotion",
      image: "/images/promo_sweater.png"
    }
  ],
  database2: [
    {
      name: "Shoes",
      image: "/images/category/cate_shoes.png",
      category: "shoes"
    },
    {
      name: "Valentines",
      image: "/images/category/cate_valentines.png",
      category: "valentines"
    },
    {
      name: "Electronics",
      image: "/images/category/cate_electronics.png",
      category: "electronics"
    },
    {
      name: "Airpod Case",
      image: "/images/category/cate_airpod.png",
      category: "airpodcase"
    }
  ],

  // productDB: [
  //   {
  //     number: 1,
  //     image: "/images/airpod/airpod_cartoon.jpg",
  //     title: "Cartoon Airpod Case",
  //     price: 30.99,
  //     category: "airpodcase",
  //     best: true
  //   },
  //   {
  //     number: 2,
  //     image: "/images/airpod/airpod_game.jpg",
  //     title: "Game Airpod Case",
  //     price: 19.99,
  //     category: "airpodcase",
  //     best: false
  //   },
  //   {
  //     number: 3,
  //     image: "/images/airpod/airpod_game2.jpg",
  //     title: "Game Airpod Case",
  //     price: 19.99,
  //     category: "airpodcase",
  //     best: false
  //   },
  //   {
  //     number: 4,
  //     image: "/images/airpod/airpod_owl.jpg",
  //     title: "Owl Airpod Case",
  //     price: 19.99,
  //     category: "airpodcase",
  //     best: false
  //   },
  //   {
  //     number: 5,
  //     image: "/images/airpod/airpod_peach.jpg",
  //     title: "Peach Airpod Case",
  //     price: 12.99,
  //     category: "airpodcase",
  //     best: false
  //   },
  //   {
  //     number: 6,
  //     image: "/images/airpod/airpod_pine.jpg",
  //     title: "Pine Airpod Case",
  //     price: 18.99,
  //     category: "airpodcase",
  //     best: false
  //   },
  //   {
  //     number: 7,
  //     image: "/images/airpod/airpod_ryan.jpg",
  //     title: "Ryan Airpod Case",
  //     price: 23.99,
  //     category: "airpodcase",
  //     best: false
  //   },
  //   {
  //     number: 8,
  //     image: "/images/airpod/airpod_shin.jpg",
  //     title: "Shin Airpod Case",
  //     price: 25.99,
  //     category: "airpodcase",
  //     best: false
  //   },
  //   {
  //     number: 9,
  //     image: "/images/airpod/airpod_water.jpg",
  //     title: "Water Airpod Case",
  //     price: 20.99,
  //     category: "airpodcase",
  //     best: false
  //   },
  //   {
  //     number: 10,
  //     image: "/images/airpod/airpod_whale.jpg",
  //     title: "Whale Airpod Case",
  //     price: 18.99,
  //     category: "airpodcase",
  //     best: false
  //   },
  //   {
  //     number: 11,
  //     image: "/images/electronic/electronic_camera.jpg",
  //     title: "Home Security Camera",
  //     price: 230.99,
  //     category: "electronics",
  //     best: true
  //   },
  //   {
  //     number: 12,
  //     image: "/images/electronic/electronic_co.jpg",
  //     title: "2020 New Air Fryer",
  //     price: 780.99,
  //     category: "electronics",
  //     best: true
  //   },
  //   {
  //     number: 13,
  //     image: "/images/electronic/electronic_echo.jpg",
  //     title: "Smart Home Controller",
  //     price: 320.89,
  //     category: "electronics",
  //     best: false
  //   },
  //   {
  //     number: 14,
  //     image: "/images/electronic/electronic_light.jpg",
  //     title: "Smart Home light",
  //     price: 420.89,
  //     category: "electronics",
  //     best: false
  //   },
  //   {
  //     number: 15,
  //     image: "/images/electronic/electronic_speaker.jpg",
  //     title: "Smart Home AI Speaker",
  //     price: 120.89,
  //     category: "electronics",
  //     best: false
  //   },
  //   {
  //     number: 16,
  //     image: "/images/shoes/shoes_bo.jpg",
  //     title: "Winter Boots 2020 New style",
  //     price: 320.89,
  //     category: "shoes",
  //     best: false
  //   },
  //   {
  //     number: 16,
  //     image: "/images/shoes/shoes_commo.jpg",
  //     title: "Coverse Comme des garcon",
  //     price: 120.89,
  //     category: "shoes",
  //     best: true
  //   },
  //   {
  //     number: 17,
  //     image: "/images/shoes/shoes_pha_cha_1.jpg",
  //     title: "Chanel Pharrell Original New product",
  //     price: 820.89,
  //     category: "shoes",
  //     best: true
  //   },
  //   {
  //     number: 18,
  //     image: "/images/shoes/shoes_pha_cha.jpg",
  //     title: "Adidas Pharrell 2020 New Color",
  //     price: 720.89,
  //     category: "shoes",
  //     best: true
  //   },
  //   {
  //     number: 19,
  //     image: "/images/shoes/shoes_pha.jpg",
  //     title: "Adidas Shoes Mint Color",
  //     price: 120.89,
  //     category: "shoes",
  //     best: false
  //   },
  //   {
  //     number: 20,
  //     image: "/images/shoes/shoes_slip.jpg",
  //     title: "Slip on converse shoes",
  //     price: 120.89,
  //     category: "shoes",
  //     best: false
  //   },
  //   {
  //     number: 21,
  //     image: "/images/shoes/shoes_water.jpg",
  //     title: "Water Shoes First style",
  //     price: 69.89,
  //     category: "shoes",
  //     best: false
  //   },
  //   {
  //     number: 22,
  //     image: "/images/shoes/shoes_water2.jpg",
  //     title: "Water Shoes Second style",
  //     price: 89.89,
  //     category: "shoes",
  //     best: false
  //   },
  //   {
  //     number: 23,
  //     image: "/images/Valentine/rum.png",
  //     title: "Valentine's Rum",
  //     price: 489.89,
  //     category: "valentines",
  //     best: false
  //   },
  //   {
  //     number: 24,
  //     image: "/images/shoes/shoes_off.jpg",
  //     title: "Off white shoes",
  //     price: 430.99,
  //     category: "shoes",
  //     best: false
  //   },
  //   {
  //     number: 25,
  //     image: "/images/Valentine/valentine_1.png",
  //     title: "2020 New Blue Sapphire ",
  //     price: 430.99,
  //     category: "valentines",
  //     best: false
  //   },
  //   {
  //     number: 26,
  //     image: "/images/Valentine/valentine_2.jpeg",
  //     title: "Perfect gift for valentine's ",
  //     price: 730.99,
  //     category: "valentines",
  //     best: false
  //   },
  //   {
  //     number: 27,
  //     image: "/images/Valentine/valentine_3.jpg",
  //     title: "Great way to express your love ",
  //     price: 330.99,
  //     category: "valentines",
  //     best: false
  //   },
  //   {
  //     number: 28,
  //     image: "/images/Valentine/valentine_4.jpg",
  //     title: "Propose Her this valentine's Day ",
  //     price: 930.99,
  //     category: "valentines",
  //     best: false
  //   },
  //   {
  //     number: 29,
  //     image: "/images/Valentine/valentine_5.jpg",
  //     title: "There are many ways to express your love",
  //     price: 20.99,
  //     category: "valentines",
  //     best: false
  //   },
  //   {
  //     number: 30,
  //     image: "/images/Valentine/valentine_6.jpg",
  //     title: "Mark his name with Love",
  //     price: 30.99,
  //     category: "valentines",
  //     best: false
  //   },
  //   {
  //     number: 31,
  //     image: "/images/Valentine/valentine_7.jpg",
  //     title: "Watch him this valentine's",
  //     price: 130.99,
  //     category: "valentines",
  //     best: false
  //   },
  //   {
  //     number: 32,
  //     image: "/images/Valentine/valentine_8.jpeg",
  //     title: "Ring Ring, Impress him with me",
  //     price: 160.99,
  //     category: "valentines",
  //     best: false
  //   },
  //   {
  //     number: 33,
  //     image: "/images/electronic/electronic_speak.jpg",
  //     title: "New Dr.dre speaker",
  //     price: 260.99,
  //     category: "electronics",
  //     best: false
  //   },
  //   {
  //     number: 34,
  //     image: "/images/electronic/electronic_watch.jpg",
  //     title: "New style Sham watch on Sale",
  //     price: 253.99,
  //     category: "electronics",
  //     best: false
  //   },
  //   {
  //     number: 35,
  //     image: "/images/electronic/electronic_head.jpg",
  //     title: "Dr.dre headphone New edition",
  //     price: 263.99,
  //     category: "electronics",
  //     best: false
  //   },
  //   {
  //     number: 36,
  //     image: "/images/electronic/electronic_airpod.jpeg",
  //     title: "2nd Generation New airpod",
  //     price: 213.99,
  //     category: "electronics",
  //     best: false
  //   }
  // ],

  initP() {
    return this.database1;
  },
  initC() {
    return this.database2;
  }
  // initProduct() {
  //   return this.productDB;
  // }
};
module.exports = product;
