document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get('savedTexts', function (data) {
    console.log('Data retrieved from storage:', data); // Add this line
    var savedTexts = data.savedTexts || [];
    var list = document.getElementById('savedTexts');
    savedTexts.forEach(function (textData, index) {
      console.log('Current textData:', textData); // Add this line
      var listItem = document.createElement('li');
      listItem.textContent = 'Content: ' + textData.content + ', URL: ' + textData.url + ', Time: ' + textData.time;

      var clearButton = document.createElement('button');
      clearButton.textContent = 'Clear';
      clearButton.addEventListener('click', function () {
        savedTexts.splice(index, 1);
        chrome.storage.sync.set({ savedTexts: savedTexts }, function () {
          listItem.remove();
        });
      });

      listItem.appendChild(clearButton);
      list.appendChild(listItem);
    });
  });
});