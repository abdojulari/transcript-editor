$(document).ready(function(){
  $('input:radio').change(function() {
    toggleTranscriptUpload();
  });

  function toggleTranscriptUpload(){
    if ($("#transcript_transcript_type_voicebase").is(":checked")){
      $("#transcript_upload").hide();
    } else {
      $("#transcript_upload").show();
    }
  }
  toggleTranscriptUpload()

  $('.recrop-original').on('click', function(){
    jcropAPI = $('#cropbox').data('Jcrop');
    if (jcropAPI) {
      jcropAPI.destroy();
    }
    var url = $(this).data('original-url');
    $('#cropbox').attr('src', url);

    window.setTimeout(function() {
      new ImageCrop
    }, 100 );
  })
})

var ImageCrop,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  jcropAPI = $('#cropbox').data('Jcrop');

ImageCrop = (function() {
  function ImageCrop() {
    this.update = bind(this.update, this);
    $('#cropbox').Jcrop({
      allowResize: false,
      setSelect: [0, 0, 2000, 900],
      onSelect: this.update,
      onChange: this.update
    });
  }

  ImageCrop.prototype.update = function(coords) {
    $('#transcript_crop_x').val(coords.x);
    $('#transcript_crop_y').val(coords.y);
    $('#transcript_crop_w').val(coords.w);
    $('#transcript_crop_h').val(coords.h);
    console.log(coords)
  };

  return ImageCrop;
})();

function readURL(input) {
  if (jcropAPI) {
    jcropAPI.destroy();
  }
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#cropbox').attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
  window.setTimeout(function() {
    new ImageCrop
  }, 100 );
}
