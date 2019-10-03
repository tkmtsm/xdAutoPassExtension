const passwordKey = 'xdAutoBreaker_password';

const id_firstStep = '#jsi-popup-firstStep';
const id_secondStep = '#jsi-popup-secondStep';
const id_passwordInput = '#jsi-popup-passwordInput';
const id_doneButton = '#jsi-popup-doneButton';
const id_resetButton = '#jsi-popup-resetButton';

let timeout_closeThisWindow = null;

// TODO: あとで実装するよ
// chrome.tabs.getSelected(tab => {
//   isXdPage = tab.url;
//   alert(tab.title);
// });

$(() => {
  // var isXdPage;

  //alert($(location).attr('hostname'));
  // const isXdPage = $(location).attr('hostname') === 'xd.adobe.com';
  // if (isXdPage) {
    $(id_doneButton).on('click', () => {
      $(id_firstStep).hide();
      $(id_secondStep).show();
      setPassword($(id_passwordInput).val());
      chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
        chrome.tabs.sendMessage(tab[0].id, {
          xdAutoBreaker_password: $(id_passwordInput).val()
        },
        function(msg) {
          console.log('SUCCESS! xd-preview passwoerd was broken.');
          // とりあえず5秒後に閉じる
          closeThisWindowAfterSec(5);
          $(id_resetButton).on('click', ()=>{
            clearTimeout(timeout_closeThisWindow);
          });
        });
      });
    });

    const xdAutoBreaker_password = localStorage.getItem(passwordKey);
    //パスワードがすでに登録されていたら
    if (xdAutoBreaker_password) {
      $.when(
        $(id_passwordInput).val(xdAutoBreaker_password),
        $(id_doneButton).trigger('click'),
      ).done(()=>{
        $(id_firstStep).hide();
      });
      $(id_resetButton).on('click', () => {
        $(id_firstStep).show();
        $(id_secondStep).hide();
      });
    } else {
      $(id_secondStep).hide();
    }
  // } else {
  //     alert('このページには対応していません');
  // }
});

function closeThisWindowAfterSec(sec_after) {
  timeout_closeThisWindow = setTimeout(()=>{
    window.close();
  },sec_after * 1000);
}

function setPassword(str_password) {
  localStorage.setItem(passwordKey, str_password);
}
