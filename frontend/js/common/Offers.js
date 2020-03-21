export class Offers {
    constructor() {
        this.local = {};
        this.remote = [];
        this.matched = [];
        this.which = 0;
    }

    setLocal() {
      $('.quantityBox').ready(() => {
          this.local.guests = parseInt($('.quantityBox').find('input').val());
        });
        
      $('#priceSlider').ready(() => {
        this.local.price = parseInt($('#priceSlider').val());
      });
        
      $('.optionsBox').ready(() => {
        this.local.children = $('#Children').prop("checked");
        this.local.pets = $('#Pets').prop("checked");
        this.local.balcony = $('#Balcony').prop("checked");
        this.local.miniBar = $('#Mini-bar').prop("checked");
        this.local.jacuzzi = $('#Jacuzzi').prop("checked");
        this.local.pool = $('#Pool').prop("checked");
      });
    }

    setRemote(data) {
      this.remote = data;
    }
  
    getLocal() {
      return this.local;
    }

    getRemote() {
      return this.remote;
    }

    compareSettings() {
      var offers = [];

      for(let i = 0; i < this.remote.length; i++)
      {
        if ((this.remote[i].guests >= this.local.guests) &&
            (this.remote[i].price <= this.local.price) &&
            (this.remote[i].children === this.local.children) && 
            (this.remote[i].pets === this.local.pets) && 
            (this.remote[i].balcony === this.local.balcony) &&
            (this.remote[i].miniBar === this.local.miniBar) &&
            (this.remote[i].jacuzzi === this.local.jacuzzi) &&  
            (this.remote[i].pool === this.local.pool))
            {
              console.log("Added offer with id: " + this.remote[i].id);
              offers.push(this.remote[i]);
            }
      }

      this.matched = offers;
            
      return offers;
    }

    getMatched() {
      return this.matched;
    }

    next() {
      this.which++;

      if (this.which == this.matched.length)
      {
        this.which = 0;
      }

      return this.which;
    }

    back() {
      this.which--;

      if (this.which < 0)
      {
        this.which = this.matched.length - 1;
      }

      return this.which;
    }

    current() {
      return this.which;
    }
}