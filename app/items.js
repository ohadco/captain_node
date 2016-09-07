// add an item using ajax POST request
function add_item() {
  // get the title from the input
  var item_title = $('#new_item_title').val();
  // clears the input field
  $('#new_item_title').val('');
  // send an ajax request to create the item
  $.ajax({
    type:'POST',
    url:'/items/create',
    data:'title=' + item_title,
    success: function(data) {
      if(data) {
        // adds the item to the start of the list with fadeIn effect
        $('#items').prepend(
            $(data).hide().fadeIn(500)
        );
        // [TODO] - add visual notification on page for the error instead of the alert
        // [TODO] - add reason for failure in the message for the user
      } else { alert("Sorry... you can't do that") }
    }
  });
};

// remove an item using ajax DELETE request
function remove_item(item_id){
  $.ajax({
    type:'DELETE',
    url:'/items',
    data:'item_id='+item_id,
    success:function(data) {
      if(data) {
        $('#item_' + item_id).remove();
        // [TODO] - add visual notification on page
      } else { alert("Sorry.. you can't do that") }
    }
 });
}

// functions to run after page loads:
$(document).ready(function() {
    // listener for clicking the button that adds item (using ajax)
    document.getElementById('add_item').addEventListener('click', add_item);
    // allow adding items on "Enter" - for quick inserting
    // triggers add_item click on enter (only when the user focuse on the title input field)
    // key_code(13) -> "Enter"
    $('#new_item_title').keypress(function(e){
      if(e.keyCode==13)
      $('#add_item').click();
    });
});
