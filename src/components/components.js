function banglaNumber(number) {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number
    .toString()
    .split('')
    .map(digit => (/\d/.test(digit) ? bengaliDigits[digit] : digit))
    .join('');
}
function banglaMonth(date){
  const banglaMonths = [
        "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
        "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
    ];
  const currentMonthIndex = new Date(date).getMonth();
  return banglaMonths[currentMonthIndex];
};


class Notice extends HTMLElement {
  constructor() {
    super();
    this.notices = [];
  }
  render() {
    this.innerHTML = `
        <div class='notice-board'>
            <h5 class="mb-2 py-2 text-center text-white prime-color rounded-top">নোটিশ বোর্ড</h5>
                <div class="px-2">
                ${this.notices.map(notice => (`<div class="notice-item">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-bell-fill notice-icon"></i>
                      <span class="notice-text">
                       ${notice.title}
                      </span>
                    </div>
                    <div class="date-card">
                      <div class="day">${banglaNumber(new Date(notice.createdAt).getDate())}</div>
                      <div class="text-center">
                        <div>${banglaMonth(notice.createdAt)}</div>
                        <div class="others">${banglaNumber(new Date(notice.createdAt).getFullYear())}</div>
                      </div>
                    </div>
                  </div>`)).join('')}
                </div>
                <h6 class="mt-2 my-0 py-2 text-center rounded-bottom" style="background-color: #1ab33d"><a href="/notice" class="text-white "> আরো দেখুন<i class='bi bi-chevron-right'></i></a></h6>
         </div>
    `;
  }
  connectedCallback() {
    this.render()
    fetch('https://678ff67e49875e5a1a93fa27.mockapi.io/api/v1/notices')
      .then(res => res.json())
      .then(data => {
        this.notices = data;
        this.render()
      })
      .catch(err => console.error('Failed to fetch videos:', err));
  }
}

customElements.define('notice-board', Notice);
