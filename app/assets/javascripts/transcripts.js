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
})

var ImageCrop,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$(function() {
  return new ImageCrop();
});

ImageCrop = (function() {
  function ImageCrop() {
    this.updatePreview = bind(this.updatePreview, this);
    this.update = bind(this.update, this);
    var height, width;
    width = parseInt($('#cropbox').width());
    height = parseInt($('#cropbox').height());
    $('#cropbox').Jcrop({
      aspectRatio: 1,
      setSelect: [0, 0, width, height],
      onSelect: this.update,
      onChange: this.update
    });
  }

  ImageCrop.prototype.update = function(coords) {
    $('#transcript_crop_x').val(coords.x);
    $('#transcript_crop_y').val(coords.y);
    $('#transcript_crop_w').val(coords.w);
    $('#transcript_crop_h').val(coords.h);
    return this.updatePreview(coords);
  };

  ImageCrop.prototype.updatePreview = function(coords) {
    var rx, ry;
    rx = 100 / coords.w;
    ry = 100 / coords.h;
    return $('#preview').css({
      width: Math.round(rx * $('#cropbox').width()) + 'px',
      height: Math.round(ry * $('#cropbox').height()) + 'px',
      marginLeft: '-' + Math.round(rx * coords.x) + 'px',
      marginTop: '-' + Math.round(ry * coords.y) + 'px'
    });
  };

  return ImageCrop;

})();
