function banglaNumber(number) {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number
    .toString()
    .split('')
    .map(digit => (/\d/.test(digit) ? bengaliDigits[digit] : digit))
    .join('');
}

function banglaMonth(date) {
  const banglaMonths = [
        "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
        "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
    ];
  const currentMonthIndex = new Date(date).getMonth();
  return banglaMonths[currentMonthIndex];
};

function dateFormater(d){
  let date = new Date(d);
  return `${banglaNumber(date.getDate())} ${banglaMonth(d)}, ${banglaNumber(date.getFullYear())}`
}


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
                      <a href='/notice' class="notice-text text-dark">
                       ${notice.title}
                      </a>
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

class Holiday extends HTMLElement {
  constructor() {
    super();
    this.notices = [];
    this.showAll = false; 
  }

  async fetchNotices() {
    try {
      const res = await fetch('https://6797e6b9c2c861de0c6e6110.mockapi.io/api/v1/holidays');
      this.notices = await res.json();
      this.render();
    } catch (err) {
      console.error('Failed to fetch holidays:', err);
      this.innerHTML = '<p class="text-danger text-center">ডাটা লোড করতে ব্যর্থ হয়েছে!</p>';
    }
  }

  render() {
    const visibleNotices = this.showAll ? this.notices : this.notices.slice(0, 5); 

    this.innerHTML = `
    <div class='notice-board'>
      <h5 class="mb-2 py-2 text-center text-white prime-color rounded-top">নোটিশ বোর্ড</h5>
      <div class='px-2'>
        ${visibleNotices.length > 0 
          ? visibleNotices.map(notice => (`<div class='border-bottom d-flex align-items-center gap-2 p-2 mb-2'>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="height: 40px; width:40px;" color="#000000" fill="none">
                  <path d="M17 2V5M7 2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M13 3.5H11C7.22876 3.5 5.34315 3.5 4.17157 4.67157C3 5.84315 3 7.72876 3 11.5V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V11.5C21 7.72876 21 5.84315 19.8284 4.67157C18.6569 3.5 16.7712 3.5 13 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M3.5 8.5H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9 15.5C9 15.5 10.5 16 11 17.5C11 17.5 13.1765 13.5 16 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class='media-body'>
                <span class="" style="font-size: 18px;">${dateFormater(notice.startDate)} ${notice.endDate ? ` - ${dateFormater(notice.endDate)}` : ''}</span><br />
                <a href='#' target='_blank' class="notice-text text-dark ">${notice.title}</a>
              </div>
            </div>`)).join(' ')
          : "<p class='text-center text-muted'>কোনো নোটিশ নেই</p>"
        }
      </div>

      ${this.notices.length > 5 ? `
        <h6 class="mt-2 my-0 py-2 text-center rounded-bottom" style="background-color: #1ab33d">
          <a href="#" class="text-white toggle-btn"> ${this.showAll ? 'সংক্ষিপ্ত দেখুন' : 'আরো দেখুন'} <i class='bi bi-chevron-right'></i></a>
        </h6>
      ` : ''}
    </div>`;

    this.querySelector('.toggle-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showAll = !this.showAll;
      this.render(); 
    });
  }

  connectedCallback() {
    this.innerHTML = '<p class="text-center text-muted">লোড হচ্ছে...</p>';
    this.fetchNotices();
  }
}


customElements.define('notice-board', Notice);
customElements.define('holiday-board', Holiday);
