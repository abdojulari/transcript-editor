var deleteFile, sendFile;

sendFile = function(file, toSummernote) {
    var data;
    data = new FormData;
    data.append('page[image]', file);
  return $.ajax({
        data: data,
        type: 'POST',
        url: 'upload',
        cache: false,
        contentType: false,
        processData: false,
    success: function(data) {
            var img;
            img = document.createElement('IMG');
            img.src = data.url;
            console.log(data);
            img.setAttribute('id', "sn-image-" + data.upload_id);
            return toSummernote.summernote('insertNode', img);

    }
  });
};

deleteFile = function(file_id) {
  return $.ajax({
        type: 'DELETE',
        url: "delete_upload" + file_id,
        cache: false,
        contentType: false,
        processData: false

  });
};


$(document).ready(function() {
  $('#update-transcript').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    $.post('/admin/cms/transcripts/' + id + '/process_transcript', {}, function(data, textStatus, jqXHR) {
      $('#transcript-line-count').text(data.lines + ' lines in database');
    }, 'json');
  });

  return $('[data-provider="summernote"]').each(function() {
    return $(this).summernote({
      height: 300,
      styleWithSpan: false,
      toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontname', []],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'hr']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]

      ],
      callbacks: {
        onImageUpload: function(files) {
          return sendFile(files[0], $(this));
        },
        onMediaDelete: function(target, editor, editable) {
          var upload_id;
          upload_id = target[0].id.split('-').slice(-1)[0];
          console.log(upload_id);
          if (!!upload_id) {
            deleteFile(upload_id);

          }
          return target.remove();

        }
      }
    });
  });
});

