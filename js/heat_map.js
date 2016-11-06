$.drawHeatMap = function(domToDraw, dataset, options = {}) {
  var _x = dataset.length;
  var _y = 0;
  var _canvasDom = $('canvas')
  _canvasDom.attr('id', '')
  $.each(dataset, function(i, value) {
    if(_y < value.length) {
      _y = value.length;
    }
  });
  var _tables = '<table cellspacing="0" style="border:1px solid black;"><tbody>';
  var _i, _j;
  var _domWidth = domToDraw.width();
  var _domHeight = domToDraw.height();
  console.log(dataset);
  console.log('Width: ' + _domWidth);
  console.log('Height: ' + _domHeight);
  function findColor(length, maxLength)
  {
    var i = (length * 255 / maxLength);
    var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
    var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
    var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  for(_i = _x;_i >= 0;_i--) {
    _tables += '<tr>';
    for(_j = 0;_j <= _y;_j++) {
      if(_i == 0 && _j == 0) {
        _tables += '<td style="width:20px;height:20px;"></td>';
      } else if(_i > 0 && _j > 0) {
        var title = '';
        _tables += '<td style="width:20px;height:20px;';
        if(dataset[_i - 1][_j - 1] > 0) {
          var color = findColor(dataset[_i - 1][_j - 1], 9);
          _tables += 'background-color:' + color + ';';
          if(options.showToolTip == true) {
            title = 'title="' + dataset[_i - 1][_j - 1] + '"'
          }
        }
        _tables += '" ' + title + '>' + '</td>';
      } else if(_j == 0 && _i > 0) {
        _tables += '<td style="width:20px;height:20px;">';
        if(options.showLabels == true) {
          _tables += options.labels.y[_x - _i];
        }
        _tables += '</td>';
      } else if(_i == 0){
        _tables += '<td style="width:20px;height:20px;">';
        if(options.showLabels == true) {
          _tables += options.labels.x[_j - 1];
        }
        _tables += '</td>';
      }
    }
    _tables += '</tr>';
  }
  _tables += '</tbody></table>';
  var _doms = $(_tables);
  domToDraw.html(_doms);
  $(_tables).insertAfter(_canvasDom);
}
