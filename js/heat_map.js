$.drawHeatMap = function(domToDraw, dataset, options = {}) {
  var _x = dataset.length;
  var _y = 0;
  var _minVal = dataset[0][0];
  var _maxVal = dataset[0][0];
  $.each(dataset, function(i, value) {
    if(_y < value.length) {
      _y = value.length;
    }
    $.each(value, function(j, cellData) {
      if(_minVal > cellData) {
        _minVal = cellData;
      }
      if(_maxVal < cellData) {
        _maxVal = cellData;
      }
    });
  });
  if(options.range != undefined && options.range.min != undefined && options.range.max != undefined) {
    if(_minVal > options.range.min) {
      _minVal = options.range.min;
    }
    if(_maxVal < options.range.max) {
      _maxVal = options.range.max;
    }
  }
  console.log('min:' + _minVal + ', max:' + _maxVal);
  var _i, _j;
  var _domWidth = domToDraw.width();
  var _domHeight = domToDraw.height();
  console.log(dataset);
  console.log('Width: ' + _domWidth);
  console.log('Height: ' + _domHeight);
  var _tables = '<table cellspacing="0" style="';
  _tables += 'width:' + _domWidth + 'px;height:' + _domHeight + 'px;"><tbody>';
  function findColor(length)
  {
    var i = (length * 255 / _maxVal);
    var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
    var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
    var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  for(_i = _x;_i >= 0;_i--) {
    if(options.title != undefined && options.title.show == true && _i == _x && options.title.position == true) {
      _tables += '<tr><td style="height:3.3%;text-align:center;"';
      _tables += ' colspan="' + (_y + 2) + '">' + options.title.text + '</td></tr>';
    }
    _tables += '<tr>';
    for(_j = 0;_j <= _y;_j++) {
      if(_i == 0 && _j == 0) {
        _tables += '<td style="width:3.3%;height:3.3%;"></td>';
      } else if(_i > 0 && _j > 0) {
        var title = '';
        _tables += '<td style="width:3.3%;height:3.3%;';
        if(dataset[_i - 1][_j - 1] > 0) {
          var color = findColor(dataset[_i - 1][_j - 1]);
          _tables += 'background-color:' + color + ';';
          if(options.showToolTip == true) {
            title = 'title="';
            if(options.showLabelOnToolTip == true) {
              title += options.labels.x[_j - 1] + ',' + options.labels.y[_i - 1] + ':';
            }
            title += dataset[_i - 1][_j - 1] + '"';
          }
        }
        _tables += '" ' + title + '>' + '</td>';
      } else if(_j == 0 && _i > 0) {
        _tables += '<td style="width:3.3%;height:3.3%;text-align:center;">';
        if(options.showLabels == true) {
          _tables += options.labels.y[_i - 1];
        }
        _tables += '</td>';
      } else if(_i == 0) {
        _tables += '<td style="width:3.3%;height:3.3%;text-align:center;">';
        if(options.showLabels == true) {
          _tables += options.labels.x[_j - 1];
        }
        _tables += '</td>';
      }
      if(options.showScale == true) {
        if(_i == _x && _j == _y) {
          _tables += '<td style="width:3.3%;" rowspan="' + (_x + 1) + '"></td>';
        }
      }
    }
    _tables += '</tr>';
    if(options.title != undefined && options.title.show == true && _i == 0 && options.title.position == false) {
      _tables += '<td style="height:3.3%;text-align:center;"';
      _tables += ' colspan="' + (_y + 2) + '">' + options.title.text + '</td>';
    }
  }
  _tables += '</tbody></table>';
  var _doms = $(_tables);
  domToDraw.html(_doms);
}
