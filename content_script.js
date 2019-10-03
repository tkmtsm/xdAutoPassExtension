const passwordKey = 'xdAutoBreaker_password';

const class_xdPasswordInput = '.passwordText-BF8-o';
const class_xdDoneButton = '.viewPrototype-4Mhw_';

chrome.runtime.onMessage.addListener(
  function(msg, senderm, sendResponse) {
    if (msg.xdAutoBreaker_password) {
      $.when(
        document.getElementsByClassName('passwordText-BF8-o')[0].value = msg.xdAutoBreaker_password
      ).done(()=>{
        $(class_xdDoneButton).click();
      });
      sendResponse(1);
    } else {
      alert('バグったよ');
      sendResponse('bag');
    }
  }
);
