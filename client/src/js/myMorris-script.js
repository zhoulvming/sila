var Script = function () {

    //morris chart

    $(function () {
      // data stolen from http://howmanyleft.co.uk/vehicle/jaguar_'e'_type

      Morris.Donut({
        element: 'hero-donut',
        data: [
          {label: '家财险', value: 6 },
          {label: '意外险', value: 12 },
          {label: '旅游险', value: 42 },
          {label: '健康险', value: 9 },
          {label: '车险', value: 31 }
        ],
          colors: ['#41cac0', '#49e2d7', '#34a39b'],
        formatter: function (y) { return y + "%" }
      });


      $('.code-example').each(function (index, el) {
        eval($(el).text());
      });
    });

}();




