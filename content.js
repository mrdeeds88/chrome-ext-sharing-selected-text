document.addEventListener('mouseup', function () {
  var selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    var popover = document.createElement('div');
    popover.id = 'myPopover';

    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save text';
    saveButton.addEventListener('click', function () {
      chrome.storage.sync.get('savedTexts', function (data) {
        popover.remove();
        var savedTexts = data.savedTexts || [];
        var textData = {
          content: selectedText,
          url: window.location.href,
          time: new Date().toISOString()
        };
        savedTexts.push(textData);
        chrome.storage.sync.set({ savedTexts: savedTexts }, function() {
           // Add this line
        });
      });
    });

    var shareButton = document.createElement('button');
    shareButton.textContent = 'Share text';
    shareButton.addEventListener('click', function () {
      // Add your share text logic here
      console.log('Share text:', selectedText);
    });

    popover.appendChild(saveButton);
    popover.appendChild(shareButton);

    document.body.appendChild(popover);
    var range = window.getSelection().getRangeAt(0);
    var rect = range.getBoundingClientRect();
    popover.style.left = rect.right + 'px';
    popover.style.top = rect.bottom + window.scrollY - popover.offsetHeight + 'px';
  }
});

document.addEventListener('mousedown', function (event) {
  var popover = document.getElementById('myPopover');
  if (popover && !popover.contains(event.target)) {
    popover.remove();
  }
});