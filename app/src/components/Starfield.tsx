import { useEffect, useRef } from 'react';

const vsSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fsSource = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float rand(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453123);
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = mix(rand(i), rand(i + vec3(1.0, 0.0, 0.0)), f.x);
  float b = mix(rand(i + vec3(0.0, 1.0, 0.0)), rand(i + vec3(1.0, 1.0, 0.0)), f.x);
  float c = mix(rand(i + vec3(0.0, 0.0, 1.0)), rand(i + vec3(1.0, 0.0, 1.0)), f.x);
  float d = mix(rand(i + vec3(0.0, 1.0, 1.0)), rand(i + vec3(1.0, 1.0, 1.0)), f.x);

  float e = mix(a, b, f.y);
  float f_val = mix(c, d, f.y);

  return mix(e, f_val, f.z);
}

vec3 starField(vec3 rayDir, float speed, float spread, float dim) {
  vec3 col = vec3(0.0);
  vec2 mouseInfluence = vec2(0.0);

  if (u_mouse.x > 0.0) {
    vec2 m = u_mouse / u_resolution - 0.5;
    mouseInfluence = -m * spread * 0.5;
  }

  for (float i = 0.0; i < 4.0; i += 1.0) {
    float layer = i * 1.0;
    float z = fract(rayDir.z + speed + layer);
    float fade = smoothstep(0.0, 0.05, z) * smoothstep(1.0, 0.8, z);
    float size = spread * (0.015 + 0.01 * noise(vec3(layer)));
    vec3 starPos = vec3(rayDir.xy / rayDir.z + mouseInfluence * (1.0 + layer * 0.5), z);
    vec3 id = floor(starPos * 30.0);
    vec3 star = fract(starPos * 30.0) - 0.5;
    float r = length(star);
    float brightness = smoothstep(0.5, 0.0, r) * fade;
    float twinkle = noise(vec3(id * 0.1 + u_time * 0.5, id.yx * 0.1));
    float colorTemp = 0.5 + 0.5 * noise(vec3(id * 0.3));
    vec3 starColor = mix(vec3(1.0, 0.9, 0.8), vec3(0.7, 0.8, 1.0), colorTemp);
    col += starColor * brightness * twinkle * (0.5 + 0.5 * sin(u_time * 2.0 + id.x)) * (1.0 - dim);
  }

  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  vec3 rayDir = normalize(vec3(p * 0.8, 1.0));
  vec3 col = vec3(0.0);
  float speed = u_time * 0.05;

  col += starField(rayDir, speed, 1.5, 0.0);
  col += starField(rayDir, speed * 1.5, 0.8, 0.3);

  float vig = 1.0 - dot(uv - 0.5, uv - 0.5) * 1.5;
  col *= max(vig, 0.0);

  col = col / (1.0 + col * 0.5);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    if (!gl) return;

    function compileShader(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = canvas.height - e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let needsResize = true;
    let animationId = 0;

    const handleResize = () => {
      needsResize = true;
    };
    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause when not visible
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    function render(now: number) {
      if (needsResize) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas!.width = canvas!.clientWidth * dpr;
        canvas!.height = canvas!.clientHeight * dpr;
        gl!.viewport(0, 0, canvas!.width, canvas!.height);
        gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
        needsResize = false;
      }

      if (isVisible) {
        gl!.uniform1f(uTime, now * 0.001);
        gl!.uniform2f(
          uMouse,
          mouseX * (canvas!.width / canvas!.clientWidth),
          mouseY * (canvas!.height / canvas!.clientHeight)
        );
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      }

      animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
