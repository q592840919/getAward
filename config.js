module.exports = {
  dateFomat: getFormatDate = (date, type) => {
    let o = {
      'year': date.getFullYear(),
      'month': (date.getMonth() + 1).toString().length === 1 ? 0 + (date.getMonth() + 1).toString() : date.getMonth() + 1,
      'day': date.getDate().toString().length === 1 ? 0 + date.getDate().toString() : date.getDate(),
      'hours': date.getHours(),
      'min': date.getMinutes().toString().length === 1 ? 0 + date.getMinutes().toString() : date.getMinutes(),
      'second': date.getSeconds().toString().length === 1 ? 0 + date.getSeconds().toString() : date.getSeconds()
    };
    switch (type){
      case 1:
        return `${o.year}${o.month}${o.day}`;
      default:
        return `${o.year}-${o.month}-${o.day} ${o.hours}:${o.min}:${o.second}`;
    }
  }
}
