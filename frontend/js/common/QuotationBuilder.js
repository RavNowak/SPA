import { quationsService } from '../services/quationsService';

export class QuotationBuilder {
  constructor() {
    this.quationCounter = 0;
  }

  build(toogleTime, refreshTime) {
    quationsService.getQuations().then(quations => {

      const quotation = $(`
        <span class="quotation">
        <i class="fas fa-quote-left"></i>
        ${quations[ this.quationCounter ].text}
        <i class="fas fa-quote-right"></i>
        <br><br>
        ~${quations[ this.quationCounter ].author}
        </span>`);

      quotation.hide();

      setInterval(() => {
        if (++this.quationCounter >= quations.length) {
          this.quationCounter = 0;
        }

        quotation.fadeIn(toogleTime);

        quotation.fadeOut(toogleTime, 'linear', () => {
          quotation.html(`<i class="fas fa-quote-left"></i>
                          ${quations[ this.quationCounter ].text}
                          <i class="fas fa-quote-right"></i>
                          <br><br>
                          ~${quations[ this.quationCounter ].author}`);
        })
      }, refreshTime)

      $('.homeContainer').ready(() => {
        $('.homeContainer').append(quotation);
      })
    })
  }
}