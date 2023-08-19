# ciphered-video-streaming

- https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API/Transcoding_assets_for_MSE
- https://gpac.github.io/mp4box.js/test/filereader.html
- https://nickdesaulniers.github.io/mp4info/
- https://medium.com/@JackPu/how-js-get-video-codec-548a33cf7454

```
ffmpeg -i video.mp4 -movflags frag_keyframe+empty_moov+default_base_moof video_fragmented.mp4
```
