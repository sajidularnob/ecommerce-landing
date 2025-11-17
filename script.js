function ecommerceDemo() {
  return {
    products:[
      {id:1,name:'Smartphone',price:15000,images:[
          'images/phone-1.webp',
        'images/phone-2.jpeg',
        'https://source.unsplash.com/600x400/?electronics'
      ]},
      {id:2,name:'Headphones',price:3500,images:[
        'images/headphone-1.jpeg',
        'https://source.unsplash.com/600x400/?earphones',
        'https://source.unsplash.com/600x400/?music'
      ]},
      {id:3,name:'Laptop',price:55000,images:[
        'images/laptop-1.webp',
        'https://source.unsplash.com/600x400/?computer',
        'https://source.unsplash.com/600x400/?notebook'
      ]}
    ],
    cart: JSON.parse(localStorage.getItem('cart')||'[]'),
    showCart:false,
    dark:false,
    coupon:'',
    total:0,
    product:null,
    qty:1,
    mainImg:0,
    customer:{name:'',address:'',phone:'',email:''},

    initProduct(){
      const params = new URLSearchParams(window.location.search);
      const id = +params.get('id');
      if(id) this.product = this.products.find(p=>p.id===id);
      this.updateTotal();
    },

    toggleCart(){ this.showCart=!this.showCart; },
    closeCart(){ this.showCart=false; },

    updateTotal(){
      this.total = this.cart.reduce((a,b)=>(b.price*b.qty||b.price)+a,0).toFixed(2);
    },

    addToCart(item,imgId){
      let exist = this.cart.find(p=>p.id===item.id);
      if(exist){ exist.qty = (exist.qty||1) + (item.qty||1); }
      else{ this.cart.push({...item}); }
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateTotal();
      if(imgId) this.flyToCart(imgId);
    },

    removeItem(index){
      this.cart.splice(index,1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateTotal();
    },

    applyCoupon(){ alert('Coupon applied: '+this.coupon); },

    flyToCart(imgId){
      const fly = document.getElementById('fly-cart');
      const img = document.getElementById(imgId);
      const cartIcon = document.getElementById('cart-icon');
      if(!img) return;
      fly.src = img.src;
      const rect = img.getBoundingClientRect();
      fly.style.display='block';
      fly.style.left = rect.left+'px';
      fly.style.top = rect.top+'px';
      setTimeout(()=>{
        const cartRect = cartIcon.getBoundingClientRect();
        fly.style.left = cartRect.left+'px';
        fly.style.top = cartRect.top+'px';
        fly.style.width = '30px';
        fly.style.height = '30px';
      },50);
      setTimeout(()=>{ fly.style.display='none'; fly.style.width='50px'; fly.style.height='50px'; },700);
    },

    placeOrder(){
      if(this.cart.length===0){ alert('Cart is empty'); return; }
      alert(`Thank you ${this.customer.name}! Your order of ৳${this.total} has been placed.`);
      this.cart=[]; localStorage.removeItem('cart');
      this.customer={name:'',address:'',phone:'',email:''};
      this.updateTotal();
    }
  }
}
