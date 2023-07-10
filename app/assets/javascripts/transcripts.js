$(document).ready(function(){
  $('input:radio').change(function() {
    toggleTranscriptUpload();
  });

  function toggleTranscriptUpload(){
    if ($("#transcript_transcript_type_manual").is(":checked")){
      $("#transcript_upload").show();
    } else {
      $("#transcript_upload").hide();
    }
  }
  toggleTranscriptUpload()

  $('.upload-image').on('change', function() {
    destroyImageCropObject();
    var input = this;
    var _URL = window.URL || window.webkitURL;
    var img;

    if (input.files && input.files[0]) {
      img = new Image();
      img.src = _URL.createObjectURL(input.files[0]);

      // Adds a preview of the uploaded image if its dimensions are equal or above 1000x450.
      window.setTimeout(function() {
        var width = img.width;
        var height = img.height;

        if (width >= 1000 && height >= 450) {
          var reader = new FileReader();

          reader.onload = function(e) {
            $('#cropbox').attr('src', e.target.result);
          };

          reader.readAsDataURL(input.files[0]);
          createImageCropObject();
        } else {
          $('.upload-image').val('');
          alert('Please make sure your image dimensions are at least 1000x450.');
        }
      }, 100 );
    }
  });

  $('.recrop-original').on('click', function() {
    destroyImageCropObject();
    $('.upload-image').val('');
    var url = $(this).data('original-url');
    $('#cropbox').attr('src', url);
    createImageCropObject();
  });

  function destroyImageCropObject() {
    jcropAPI = $('#cropbox').data('Jcrop');

    if (jcropAPI) {
      jcropAPI.destroy();
    }
  };

  function createImageCropObject() {
    window.setTimeout(function() {
      new ImageCrop
    }, 100 );
  };

  $('#select-all').click(function () {
    $('.check').prop('checked', $(this).prop('checked'));
  });

  $('#item-list-headings').on('click', '.update-multiple', function(e) {
    e.preventDefault();

    var $button = $(this);
    var checkedTranscripts = [];
    var confirmationText = 'Are you sure you want to delete these items? This action cannot be undone.';

    $.each($("input[name='transcript_ids[]']:checked"), function() {
      checkedTranscripts.push($(this).val());
    });

    if ($button.data('action') != 'delete' || ($button.data('action') == 'delete' && confirm(confirmationText))) {
      updateMultipleTranscripts($button, checkedTranscripts);
    }
  });

  function updateMultipleTranscripts($button, transcriptIds) {
    $.ajax({
      url:  $button.data('url'),
      type: 'PUT',
      data: {
        commit:          $button.data('action'),
        transcript_ids:  transcriptIds,
        collection_uid:  $button.data('collection-uid')
      },
      cache: false
    })
  }
});

var ImageCrop,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ImageCrop = (function() {
  function ImageCrop() {
    this.update = bind(this.update, this);
    var image = $('#cropbox');
    var oldWidth = parseInt(image[0].naturalWidth);
    var oldHeight = parseInt(image[0].naturalHeight);
    var newWidth = parseInt(image.width());
    var newHeight = parseInt(image.height());

    // When re-cropping the original image, sets the cropping selection on the current
    // cropping coordinations so the cropping can be easily re-adjusted.
    var cropX = Math.round((parseInt(image.data('crop-x')) / (oldWidth / newWidth))) || 0;
    var cropY = Math.round((parseInt(image.data('crop-y')) / (oldHeight / newHeight))) || 0;
    var cropW = Math.round(cropX + (parseInt(image.data('crop-w')) / (oldWidth / newWidth))) || (newWidth / 2);
    var cropH = Math.round(cropY + (parseInt(image.data('crop-h')) / (oldHeight / newHeight))) || (newHeight / 2);
    image.Jcrop({
      aspectRatio: 20 / 9,
      setSelect: [cropX, cropY, cropW, cropH],
      onSelect: this.update,
      onChange: this.update
    });
  }

  ImageCrop.prototype.update = function(coords) {
    // Ensuring the right coordinates are being set by calculating the differences
    // between the original image size and the currently scaled (responsive) one.
    var image = $('#cropbox');
    var oldWidth = parseInt(image[0].naturalWidth);
    var oldHeight = parseInt(image[0].naturalHeight);
    var newWidth = parseInt(image.width());
    var newHeight = parseInt(image.height());

    $('#transcript_crop_x').val(coords.x * (oldWidth / newWidth));
    $('#transcript_crop_y').val(coords.y * (oldHeight / newHeight));
    $('#transcript_crop_w').val(coords.w * (oldWidth / newWidth));
    $('#transcript_crop_h').val(coords.h * (oldHeight / newHeight));
  };
  return ImageCrop;
})();
