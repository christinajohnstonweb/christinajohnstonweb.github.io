/* 
YouTube Audio Embed 
--------------------

Author: Amit Agarwal
Web: http://www.labnol.org/?p=26740

edited by Anton Chinaev
*/

function onYouTubeIframeAPIReady(startTime)
{

  var o= function(e, t)
  {
    var a=e?"pause_button.png":"play_button.png";

    t.setAttribute("src","../../images/"+a)
  };

  var counter = 0;
  var bigE = document.querySelectorAll(".youtube-audio");

  bigE.forEach(function(e)
  {
    var t=document.createElement("img");

    t.setAttribute("id","youtube-icon-"+counter),
    t.style.cssText="cursor:pointer;cursor:hand;width:32px;",
    e.appendChild(t);

    var a=document.createElement("div");

    a.setAttribute("id","youtube-player-"+counter),
    e.appendChild(a);

    t.setAttribute("src","https://i.imgur.com/quyUPXN.png");

    e.onclick=function()
    {
      r.getPlayerState()===YT.PlayerState.PLAYING||r.getPlayerState()===YT.PlayerState.BUFFERING?(r.pauseVideo(),
      o(!1, t)):(r.playVideo(),
      o(!0, t))
    };

    var r= new YT.Player("youtube-player-"+counter,
    {

      height:"0",
      width:"0",
      videoId:e.dataset.video,
      start:"10",
      playerVars:
      {
        autoplay:e.dataset.autoplay,loop:e.dataset.loop
      },
      events:
      {
        onReady:function(e)
        {
          r.setPlaybackQuality("small"),
          o(r.getPlayerState()!==YT.PlayerState.CUED, t)
        },
          onStateChange:function(e)
        {
          e.data===YT.PlayerState.ENDED&&o(!1, t)
        }
      }
    })

    counter++;
  });
}




/* 
 YouTube Audio Embed 
 --------------------
 
 Author: Amit Agarwal
 Web: http://www.labnol.org/?p=26740 
*/

// function onYouTubeIframeAPIReady(){var e=document.getElementById("youtube-audio"),t=document.createElement("img");t.setAttribute("id","youtube-icon"),t.style.cssText="cursor:pointer;cursor:hand",e.appendChild(t);var a=document.createElement("div");a.setAttribute("id","youtube-player"),e.appendChild(a);var o=function(e){var a=e?"pause_button.png":"play_button.png";t.setAttribute("src","../../images/"+a)};e.onclick=function(){r.getPlayerState()===YT.PlayerState.PLAYING||r.getPlayerState()===YT.PlayerState.BUFFERING?(r.pauseVideo(),o(!1)):(r.playVideo(),o(!0))};var r=new YT.Player("youtube-player",{height:"0",width:"0",videoId:e.dataset.video,playerVars:{autoplay:e.dataset.autoplay,loop:e.dataset.loop},events:{onReady:function(e){r.setPlaybackQuality("small"),o(r.getPlayerState()!==YT.PlayerState.CUED)},onStateChange:function(e){e.data===YT.PlayerState.ENDED&&o(!1)}}})}