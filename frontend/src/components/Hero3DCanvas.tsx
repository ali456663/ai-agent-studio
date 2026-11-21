import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Hero3DCanvasProps {
  /** Valfritt: ladda egen 3D-modell exporterad från Blender (t.ex. "/models/ai-agent.glb") */
  blenderModelUrl?: string;
  /** Valfritt: bädda in en publicerad Spline 3D-scen ("https://my.spline.design/...") */
  splineUrl?: string;
}

export function Hero3DCanvas({ blenderModelUrl, splineUrl }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (splineUrl) return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x0d9488, 2.2, 20);
    rimLight.position.set(-4, -2, 3);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const coreGeo = new THREE.IcosahedronGeometry(1.35, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f4c81,
      roughness: 0.25,
      metalness: 0.55,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);

    const wireGeo = new THREE.IcosahedronGeometry(1.42, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);

    const ringGeo = new THREE.TorusGeometry(2.0, 0.035, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0f4c81,
      roughness: 0.2,
      metalness: 0.8
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;

    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.3 + Math.random() * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x0d9488,
      size: 0.06,
      transparent: true,
      opacity: 0.85
    });
    const particles = new THREE.Points(particleGeo, particleMat);

    rootGroup.add(coreMesh, wireMesh, ringMesh, particles);

    if (blenderModelUrl) {
      const loader = new GLTFLoader();
      loader.load(
        blenderModelUrl,
        (gltf) => {
          rootGroup.remove(coreMesh, wireMesh);
          gltf.scene.scale.setScalar(1.4);
          rootGroup.add(gltf.scene);
        },
        undefined,
        () => {
          // Behåll Three.js-fallback om modellen inte finns än
        }
      );
    }

    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.9;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    };
    container.addEventListener("pointermove", onPointerMove);

    const onResize = () => {
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(container);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!visible) return;
      coreMesh.rotation.y += 0.004;
      wireMesh.rotation.y -= 0.003;
      ringMesh.rotation.z += 0.006;
      particles.rotation.y += 0.0018;

      rootGroup.rotation.y += (targetX - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetY - rootGroup.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      io.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [blenderModelUrl, splineUrl]);

  if (splineUrl) {
    return (
      <div className="hero-3d-frame">
        <iframe
          src={splineUrl}
          title="Interaktiv 3D Spline AI-scen"
          className="spline-iframe"
          allow="fullscreen"
        />
      </div>
    );
  }

  return (
    <div className="hero-3d-bg" aria-hidden="true">
      <div ref={mountRef} className="hero-3d-canvas" />
    </div>
  );
}

export default Hero3DCanvas;
