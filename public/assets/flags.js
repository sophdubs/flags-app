$(document).ready(function(){


  $('.flag').on('click', function(){

    var flagInfo = $('.flag-info');
    console.log(flagInfo);
    flagInfo.text("This is the flag of " + this.id);


  });

  $('.box').on('click', function(){
    var color_x = this.id;
    filterFlags(color_x);
  });

  function filterFlags(color_x){
    var current_flags = $('.show');
    for (var i = 0; i < current_flags.length; i ++){
      if (!current_flags[i].classList.contains(color_x)){
        current_flags[i].classList.remove('show');
        current_flags[i].style.display = "none"
      };
    };
}

});
