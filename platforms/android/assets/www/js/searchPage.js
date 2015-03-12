$( document ).on( "pagecreate", "#searchPage", function() {
    $( "#searchAutocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ul = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "";
			var url = serviceURL + 'searchReport.php';
        $ul.html( "" );
        if ( value && value.length > 0 ) {
            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            $ul.listview( "refresh" );
            $.ajax({
                url: url,
                //dataType: "jsonp",
                crossDomain: true,
                data: {
                    query: $input.val()
                }
            })
            .then( function ( html/*response*/ ) {
               /* $.each( response, function ( i, val ) {
                    html += "<li>" + val + "</li>";
                });*/
                $ul.html( html );
                $ul.listview( "refresh" );
                $ul.trigger( "updatelayout");
            });
        }
    });
});
function clearSearchFilter(){
    $('input[data-type="search"]').val("");
    $('input[data-type="search"]').trigger("keyup");
}