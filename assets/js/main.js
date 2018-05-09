$( document ).ready(function() {
  // Set global ID to localStorage
  var id = 0;
  
  // Check if local storage is empty
  if ( localStorage.length > 0 ) {
    updateFromLocal();
  } else {
    setDefault();
  }

  // Check off specific Todos by clicking
  $("ul").on("click", "li", function() {
    $(this).toggleClass("completed");
  });

  // Click on X to delete Todo item
  $("ul").on("click", "span", function( e ) {
    $(this).parent().fadeOut(500, function() {
      $(this).remove();

      // Delete item from localStorage
      localStorage.removeItem( $(this).attr( "value" ) );
      });
    e.stopPropagation();
  });

  // Add new element to list
  $("input[type='text']").keypress(function( e ) {
    // After press Enter add element to list
    if ( e.which === 13 ) {
      $("ul").append("<li value='" + id +
        "'><span><i class='fa fa-trash'></i></span> " +
        $(this).val() + "</li>");

      // Update localStorage and ID
      localStorage.setItem( id, $(this).val() );
      id++;

      // Clear input field
      $(this).val("");
    }
  });

  // Toggle input field on Plus button
  $("h1 span").click(function() {
    $("input").fadeToggle( 500 );
  });

  // Update ID and ToDo list from localStorage
  function updateFromLocal() {
    // Find max ID in localStorage keys
    for ( var i = 0; i < localStorage.length; i++ ) {
      if ( parseInt(localStorage.key( i )) > id ) {
        id = localStorage.key( i );
      }
    }
    // Set next ID as a key
    id++;

    // Update ToDo list from localStorage
    for ( var i = 0; i < localStorage.length; i ++ ) {
      var addKey = localStorage.key( i );
      var value = localStorage[addKey];
      $("ul").append("<li value='" + addKey +
        "'><span><i class='fa fa-trash'></i></span> " + value + "</li>");
    }
  }

  // Set default elements if localStorage is empty
  function setDefault() {
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> Shopping</li>");
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> Clean up</li>");
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> Cook</li>");
  }
});