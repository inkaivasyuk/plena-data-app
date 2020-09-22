/* global document */

window.addEventListener('load', function () {
  var inputString = '';

  document.getElementById('go-button').onclick = function (e) {
    e.preventDefault();
    clearDiv();
    getInput();
  }

  function clearDiv() {
    document.getElementById('result').innerHTML = '';
  }

  function getInput() {
    inputString = document.getElementById('word-input').value;
    var letter = getFirstNonRepeatLetter(inputString);

    if (!letter.length) {
      var text = document.createTextNode('Please enter a word, OR a word with at least one non-repeating letter.');
    } else {
      var text = document.createTextNode(`Your first non-repeating letter is: ${letter}.`);
    }

    var div = document.getElementById('result');
    var para = document.createElement('p');
    para.appendChild(text);
    div.appendChild(para);

    promptToSort();
  };

  function getFirstNonRepeatLetter(str) {
    var result = '';
    var freq = {};

    if (!str.length || str.length === 1) {
      return str;
    }

    var s = str.toLowerCase();

    for (var i = 0; i < s.length; i++) {
      if (!freq[s[i]]) {
        freq[s[i]] = 1;
      } else {
        freq[s[i]]++;
      }
    }

    for (var i = 0; i < s.length; i++) {
      if (freq[s[i]] === 1) {
        return s[i];
      }
    }

    return result;
  }

  function promptToSort() {
    var div = document.getElementById('result');
    var sortPara = document.createElement('p');
    sortPara.innerHTML = 'Click, "Sort" to sort the word in order of number of occurrences.';
    var btn = document.createElement('button');
    btn.id = 'sort-button';
    btn.innerHTML = 'Sort';
    div.appendChild(sortPara);
    div.appendChild(btn);

    document.getElementById('sort-button').onclick = function (e) {
      var sortedWord = sortByNumOfOccurences(inputString);

      if (!sortedWord.length) {
        var text = document.createTextNode('Please enter a word, OR a word with repeating letters.');
      } else {
        var text = document.createTextNode(`Your word sorted by number of occurences is: ${sortedWord}.`);
      }

      var div = document.getElementById('result');
      var para = document.createElement('p');
      para.appendChild(text);
      div.appendChild(para);

    }
  }

  function sortByNumOfOccurences(str) {
    var reorderedString = '';
    var letterFreq = {};

    if (!str.length || str.length === 1) {
      return str;
    }

    for (var i = 0; i < str.length; i++) {
      var char = str[i].toLowerCase();

      if (letterFreq[char]) {
        letterFreq[char]++;
      } else {
        letterFreq[char] = 1;
      }
    }

    let count = 1;
    let strLength = str.length;
    let idx = 0;

    while (strLength !== 0) {
      let value = letterFreq[str[idx].toLowerCase()];
      if (value === count) {
        reorderedString += '' + str[idx];
        strLength--;
      }

      if (idx !== str.length - 1) {
        idx++;
      } else {
        idx = 0;
        count++;
      }
    }

    return reorderedString;
  }
});

