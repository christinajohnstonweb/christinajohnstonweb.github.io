$(function(){
    $(".audio-src").mediaelementplayer({
        alwaysShowControls: false,
        features: ['playpause'],
        clickToPlayPause: true,
        audioVolume: 'horizontal',
        audioWidth: 34,
        audioHeight: 34,
        pauseOtherPlayers: true,

    // When using jQuery's `mediaelementplayer`, an `instance` argument
    // is available in the `success` callback
        success: function(mediaElement, originalNode, instance) {
            // do things
        }
    });
});