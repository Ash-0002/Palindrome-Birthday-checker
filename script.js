function reverseStr(str) {
  let listOfChars = str.split("");
  let reverseListOfChars = listOfChars.reverse();
  let reverseStr = reverseListOfChars.join("");
  return reverseStr;
  //   return str.split("").reverse().join("");
}

function isPalindrome(str) {
  let reverse = reverseStr(str);
  return str === reverse;

  // if(str === reverse) return true;
  // else return false;
}

function convertDateToString(date) {
  let dateStr = {
    day: "",
    month: "",
    year: "",
  };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  let dateStr = convertDateToString(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  let listOfPalindromes = getAllDateFormats(date);

  let flag = false;

  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;

  // return (year % 400 === 0 || year % 4 === 0) ? true : (year % 100 === 0) && false;
}

//----------------------------------------------------

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

// ------------------------------

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date); // 01/01/2022 -> 02/01/2022

  while (1) {
    ctr++;
    //bolean value checks for palindrome also formats
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [ctr, nextDate];
}

function getPrevDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

  if (day === 0) {
    month--;
    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month == 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPrevPalindromeDate(date) {
  let ctr = 0;
  let prevDate = getPrevDate(date);

  while (1) {
    ctr++;
    let isPalindrome = checkPalindromeForAllDateFormats(prevDate);
    if (isPalindrome) {
      break;
    }
    prevDate = getPrevDate(prevDate);
  }
  return [ctr, prevDate];
}

let date = {
  day: 1,
  month: 1,
  year: 2020,
};

var bdayInput = document.querySelector("#bday-input");
var showBtn = document.querySelector("#show-btn");
var resultDiv = document.querySelector("#result");

function clickHandler(e) {
  var bdayString = bdayInput.value;

  if (bdayString !== "") {
    var listOfDate = bdayString.split("-");
    var yyyy = listOfDate[0];
    var mm = listOfDate[1];
    var dd = listOfDate[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };

    // var dateStr = convertDateToString(date);
    var list = checkPalindromeForAllDateFormats(date); // this is gonna give us a list of dates in all formats, 

    // var isPalindrome = false;

    // for (let i = 0; i < list.length; i++) {
    //   // here we are trying to loop through those each item and if it's true, change the flag
    //   if (list[i]) {
    //     isPalindrome = true;
    //     break;
    //   }
    // }

    if (!list) {
      const [ctr1, nextDate] = getNextPalindromeDate(date);
      const [ctr2, prevDate] = getPrevPalindromeDate(date);

      if (ctr1 > ctr2) {
        resultDiv.innerText = `The nearest palindrome date is ${prevDate.day}--${prevDate.month}--${prevDate.year}, you missed by ${ctr2} days.`;
      } else {
        resultDiv.innerHTML = `The nearest palindrome date is ${nextDate.day}--${nextDate.month}--${nextDate.year}, you missed by ${ctr1} days.`;
      }
    } else {
      resultDiv.innerHTML = "Yay! Your birthday is palindrome";
    }
  }
}

showBtn.addEventListener("click", clickHandler);
