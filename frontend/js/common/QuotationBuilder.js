import '../../style/home.scss';
import '../../style/fonts.scss';

export class QuotationBuilder {
    constructor() {
      this.quationCounter = 0;
      this.quations = [{
          text: ' The mind should be allowed some relaxation, that it may return<br>to its work all the better for the rest. ',
          author: 'Seneca'
        },
        {
          text: ' Your mind will answer most questions if you learn to relax<br>and wait for the answer. ',
          author: 'William S. Burroughs'
        },
        {
          text: ' Tension is who you think you should be.<br>Relaxation is who you are. ',
          author: 'Chinese Proverb'
        },
        {
          text: ' It is necessary to relax your muscles when you can.<br>Relaxing your brain is fatal. ',
          author: 'Stirling Moss'
        },
        {
          text: ' It is requisite for the relaxation of the mind that we make use,<br>from time to time, of playful deeds and jokes. ',
          author: 'St. Thomas Aquinas'
        },
        {
          text: " Learn to relax. Your body is precious, as it houses your mind and spirit.<br>Inner peace begins with a relaxed body. ",
          author: 'Norman Vincent Peale'
        },
      ];
    }
  
    build(toogleTime, refreshTime) {
      const quotation = $(`
        <span class="quotation">
        <i class="fas fa-quote-left"></i>
        ${this.quations[this.quationCounter].text}
        <i class="fas fa-quote-right"></i>
        <br><br>
        ~${this.quations[this.quationCounter].author}
        </span>`);
  
      quotation.hide();
  
      setInterval(() => {
        if (++this.quationCounter >= this.quations.length) {
          this.quationCounter = 0;
        }
  
        quotation.fadeIn(toogleTime);
  
        quotation.fadeOut(toogleTime, 'linear', () => {
          quotation.html(`<i class="fas fa-quote-left"></i>
                          ${this.quations[this.quationCounter].text}
                          <i class="fas fa-quote-right"></i>
                          <br><br>
                          ~${this.quations[this.quationCounter].author}`);
        });
  
  
      }, refreshTime);
  
      return quotation;
    }
  }