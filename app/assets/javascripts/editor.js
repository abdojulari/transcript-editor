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
  return $('[data-provider="summernote"]').each(function() {
    return $(this).summernote({
      height: 300,
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

