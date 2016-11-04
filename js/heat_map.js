$.drawHeatMap = function(_domToDraw, dataset) {
  var _x = dataset.length;
  var _y = 0;
  $.each(dataset, function(i, value) {
    if(_y < value.length) {
      _y = value.length;
    }
  });
  var _tables = '<table border="1"><tbody>';
  var _i, _j;
  for(_i = _y;_i > 0;_i--) {
    _tables += '<tr>';
    for(_j = 1;_j <= _x;_j++) {
      _tables += '<td>(' + _i + ', ' + _j + ')</td>';
    }
    _tables += '</tr>';
  }
  _tables += '</tbody></table>';
  _domToDraw.html($(_tables));
}
