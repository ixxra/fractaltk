#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D sampler_prev;
uniform sampler2D sampler_prev_n;
uniform sampler2D sampler_blur;

varying vec2 pixel;
uniform vec2 pixelSize;
uniform vec4 rnd;
uniform vec2 mouse;
uniform float time;

void main(void) {
  // negative
  gl_FragColor = texture2D(sampler_prev, pixel);
  gl_FragColor.a = 1.;
}
