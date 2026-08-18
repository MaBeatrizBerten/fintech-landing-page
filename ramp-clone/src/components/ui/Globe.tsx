import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef } from "react";

export interface GlobeMarker {
  location: [number, number]; // [lat, lng]
  size: number;
  color?: [number, number, number];
  label: {
    flag: string;
    name: string;
    value: string;
    highlight?: boolean; // true = borda/texto em destaque (verde)
  };
}

interface GlobeProps {
  markers: GlobeMarker[];
}

// Raio "visual" que o cobe usa internamente pra posicionar os marcadores
// (mesma constante usada pelo código-fonte da lib)
const GLOBE_RADIUS = 0.8;

function projectMarker(location: [number, number], phi: number, theta: number) {
  const [lat, lng] = location;
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(latRad);

  const x = -cosLat * Math.sin(lngRad) * GLOBE_RADIUS;
  const y = Math.sin(latRad) * GLOBE_RADIUS;
  const z = cosLat * Math.cos(lngRad) * GLOBE_RADIUS;

  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  // mesma rotação (RotateX(theta) * RotateY(phi)) aplicada pelo cobe
  const c = cosPhi * x + sinPhi * z;
  const s = sinPhi * sinTheta * x + cosTheta * y - cosPhi * sinTheta * z;
  const zRot = -sinPhi * cosTheta * x + sinTheta * y + cosPhi * cosTheta * z;

  return {
    xPercent: ((c + 1) / 2) * 100,
    yPercent: ((-s + 1) / 2) * 100,
    visible: zRot >= 0, // true = de frente pra câmera
  };
}

export function Globe({ markers }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    const theta = -0.3;
    let animationFrameId: number;

    const options: COBEOptions = {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.83, 1, 0.27],
      glowColor: [0.1, 0.1, 0.1],
      markers: markers.map(({ location, size, color }) => ({
        location,
        size,
        color,
      })),
    };

    const globe = createGlobe(canvasRef.current, options);

    const animate = () => {
      phi += 0.003;
      globe.update({ phi });

      markers.forEach((marker, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        const { xPercent, yPercent, visible } = projectMarker(
          marker.location,
          phi,
          theta,
        );
        el.style.left = `${xPercent}%`;
        el.style.top = `${yPercent}%`;
        el.style.opacity = visible ? "1" : "0";
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
    };
  }, [markers]);

  return (
    <div className="w-full max-w-[500px] aspect-square relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: 500, height: 500, maxWidth: "100%", aspectRatio: 1 }}
        className="opacity-90 transition-opacity duration-500"
      />

      {markers.map((marker, i) => (
        <div
          key={marker.label.name}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 bg-[#1A1A1A]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-2xl flex items-center gap-2 pointer-events-none transition-opacity duration-500 ease-in-out border ${
            marker.label.highlight ? "border-[#D4FF46]/60" : "border-white/10"
          }`}
          style={{ opacity: 0 }}
        >
          <span className="text-base">{marker.label.flag}</span>
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
              {marker.label.name}
            </span>
            <span
              className={`font-mono ${
                marker.label.highlight ? "text-[#D4FF46]" : "text-white"
              }`}
            >
              {marker.label.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
