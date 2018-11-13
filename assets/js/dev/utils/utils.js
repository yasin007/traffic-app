var utils = {
  noData: function (params) {
    var temp = '';

    $(params.element).html('');

    temp += '<div class="no-data">';
    temp += '<img src="' + params.pic + '" />';
    temp += '<p>' + params.message + '</p>';
    temp += '</div>';

    $(params.element).html(temp);
  }
};
