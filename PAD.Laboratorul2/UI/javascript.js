$(document).ready (function getAllSongs() {
    $( "#dialog" ).dialog({
        autoOpen: false,
        show: {
          effect: "blind",
          duration: 1000
        },
        hide: {
          effect: "explode",
          duration: 1000
        }
      });
    $.ajax({
        url: 'https://localhost:44318/api/songs',
        type: 'get',
        dataType: 'JSON',
        success: function(response){
            const songs = response;
        $('#songList').DataTable({
            "data": songs,
            "columns": [
                { "data": "artist" },
                { "data": "name" },
                { "data": "year" },
                {
                    "bSortable": false,
                    "width": "10%",
                    "data": "id",
                    "mRender": function(id) {
                        return '<a class="edit" title="Edit" data-toggle="tooltip" onclick="editSong(\'' + id + '\')"><i class="material-icons">&#xE254;</i></a>';
                    }
                },
                {
                    "bSortable": false,
                    "width": "10%",
                    "data": "id",
                    "mRender": function(id) {
                        return '<a class="delete" title="Delete" data-toggle="tooltip" onclick="deleteSong(\'' + id + '\')"><i class="material-icons">&#xE872;</i></a>';
                    }
                }
            ]
        });
        }
    });
});

function addDialog() {
    $( "#dialog" ).dialog({
        autoOpen: false,
        closeOnEscape: false,
        maxWidth:600,
        maxHeight: 500,
        width: 300,
        height: 300,
        modal: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
      });
   
      $( "#dialog" ).dialog( "open" );
}

function addSong(id){
    console.log("email: " + id);


    var artist = document.getElementById('artist').value;
    var song = document.getElementById('song').value;
    var year = document.getElementById('year').value;

    var json = '{ "artist": "' + artist + '" ,"name":"' + song + '" ,"year":"' + year + '"}';
    console.log(json);
    $.ajax({
        url: 'https://localhost:44318/api/songs',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        data: json,
        error: function (request, error) {
            alert(" Can't do because: " + error);
        },
        success: function (data, textStatus, request) {

            location.reload();
        }
    });
}

function editSong(id){
    console.log("email: " + id);
    $( "#dialog" ).dialog({
        autoOpen: false,
        closeOnEscape: false,
        maxWidth:600,
        maxHeight: 500,
        width: 200,
        height: 500,
        margin: "auto",
        modal: true,
        open: function(event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        }
        /*show: {
          effect: "blind",
          duration: 1000
        },
        hide: {
          effect: "explode",
          duration: 1000
        }*/
      });
   
      $( "#dialog" ).dialog( "open" );
    /*$.ajax({
        url: 'https://localhost:44318/api/songs' + email,
        type: 'delete',
        success: function (data) {
            location.reload();
            //$("#url" + url_id).remove();
        },
        error: function (data, response) {
            console.error('Error:', data);
        }
    });*/
}

function deleteSong(id){
    console.log("email: " + id);

    $.ajax({
        url: 'https://localhost:44318/api/songs/' + id,
        type: 'delete',
        success: function (data) {
            location.reload();
            //$("#url" + url_id).remove();
        },
        error: function (data, response) {
            console.error('Error:', data);
        }
    });
}

function closeDialog() {
    $('#dialog').dialog("close");
}