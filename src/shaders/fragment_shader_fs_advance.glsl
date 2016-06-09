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


bool is_onscreen(vec2 uv){
  return (uv.x < 1.) && (uv.x > 0.) && (uv.y < 1.) && (uv.y > 0.);
}

void main(void) {
  vec2 c = vec2(-0.25, 0.0) + (mouse.yx-0.5)*vec2(0.2,-0.55);
  vec2 tuning =  vec2(1.8) - (mouse.y-0.5)*0.3;
  vec2 complexSquaredPlusC; // One steps towards the Julia Attractor
  vec2 uv = (pixel - vec2(0.5))*tuning;
  complexSquaredPlusC.x = (uv.x * uv.x - uv.y * uv.y + c.x + 0.5);
  complexSquaredPlusC.y = (2. * uv.x * uv.y + c.y + 0.5);

  if(is_onscreen(complexSquaredPlusC)){
    vec4 old = texture2D(sampler_prev, complexSquaredPlusC);
    gl_FragColor = old + vec4( .004, .008, .012, 1.); // increment to white
  }else{
    // return border color
    gl_FragColor = vec4(0., 0., 0., 1.); // out is black
  }
  gl_FragColor.a = 1.;
}
