function addCommas(num) {
  const [strNum, strDec] = String(num).split('.');
  let subStrings = [];
  for (let i = strNum.length; i > 0; i -= 3){
    if (i / 3 < 1){
      subStrings.push(strNum.slice(0, i));
      break;
    }
    subStrings.push(strNum.slice(i-3, i));
  }
  return strDec ? subStrings.reverse().join(',') + '.' + strDec : subStrings.reverse().join(',');
}

export { addCommas }