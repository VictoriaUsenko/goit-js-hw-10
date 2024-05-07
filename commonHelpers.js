import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as y,i as u}from"./assets/vendor-77e16229.js";const e={datetimePickerEl:document.querySelector("#datetime-picker"),startBtnEl:document.querySelector("[data-start]"),stopBtnEl:document.querySelector("[data-stop]"),dayEl:document.querySelector("[data-days]"),hourEl:document.querySelector("[data-hours]"),minEl:document.querySelector("[data-minutes]"),secEl:document.querySelector("[data-seconds]")};let o=null,s=null;const l=t=>{e.datetimePickerEl.disabled=t,e.startBtnEl.disabled=t,e.stopBtnEl.disabled=!t},p=()=>{if(o===null)return;const t=o.getTime();s=setInterval(()=>k(t),1e3),l(!0)},S=()=>{clearInterval(s),m(),l(!1)},k=t=>{const r=t-Date.now();if(r<=0){clearInterval(s),m(),l(!1),u.info({title:"The timer has ended!",message:"The selected date has arrived",position:"topRight"});return}const{days:d,hours:c,minutes:i,seconds:a}=B(r);e.dayEl.textContent=n(d),e.hourEl.textContent=n(c),e.minEl.textContent=n(i),e.secEl.textContent=n(a)},B=t=>{const a=Math.floor(t/864e5),E=Math.floor(t%864e5/36e5),h=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:a,hours:E,minutes:h,seconds:f}},n=t=>t<10?"0"+t:t,m=()=>{[e.dayEl,e.hourEl,e.minEl,e.secEl].forEach(t=>t.textContent="00")};e.startBtnEl.disabled=!0;y(e.datetimePickerEl,{enableTime:!0,time_24hr:!0,minDate:"today",defaultDate:Date.now(),minuteIncrement:1,onClose(t){if(o=t[0],o<Date.now()){u.error({title:"Error!",message:"Please choose a date in the future",position:"topRight"}),e.startBtnEl.disabled=!0;return}e.startBtnEl.disabled=!1}});e.startBtnEl.addEventListener("click",p);e.stopBtnEl.addEventListener("click",S);
//# sourceMappingURL=commonHelpers.js.map