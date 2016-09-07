// add an item using ajax POST request
function addItem() {
  // get the title from the input
  var itemTitle = $('#new_item_title').val();

  // clears the input field
  $('#new_item_title').val('');

  // send an ajax request to create the item
  $.ajax({
    type: 'POST',
    url: '/items/create',
    data: `title=${itemTitle}`,
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
function removeItem(itemId) {
  $.ajax({
    type:'DELETE',
    url:'/items',
    data:`itemId=${itemId}`,
    success:function(data) {
      if(data) {
        $(`#item_${itemId}`).remove();

        // [TODO] - add visual notification on page
      } else { alert("Sorry.. you can't do that") }
    }
 });
}
// remove all items
function removeAllItems() {
  $.ajax({
    type:'DELETE',
    url:'/items/remove_all',
    success:function(data) {
      if(data) {
        $('.item').remove();

        // [TODO] - add visual notification on page
      } else { alert("Sorry.. you can't do that") }
    }
 });
}
// functions to run after page loads:
$(document).ready(function() {
  // listener for clicking the button that adds item (using ajax)
  document.getElementById('add_item').addEventListener('click', addItem);
  document.getElementById('remove_all_items').addEventListener('click', removeAllItems);
  /**
  * allow adding items on "Enter" - for quick inserting
  * triggers add_item click on enter (only when the user focuse on the title input field)
  * key_code(13) -> "Enter"
  */
  $('#new_item_title').keypress(function(e) {
    if(e.keyCode==13)
      $('#add_item').click();
  });
});
