import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface HeroSceneProps {
  interactive?: boolean;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let frameId = 0;
    let isDisposed = false;

    // 1. Software WebGL Guard (Per Three.js skill instructions)
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Setup Scene, Camera, Renderer
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080808, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x221108, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xff7a00, 2.4);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0xff5a1f, 0x050505, 1.2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffc857, 3.0, 15);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const underGlow = new THREE.PointLight(0xff5a1f, 2.5, 10);
    underGlow.position.set(0, -2, 2);
    scene.add(underGlow);

    // Master Group for Mouse Parallax & Scroll reaction
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Track reusable disposables
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    // Helper to generate procedural canvas texture for laptop screen
    function createLaptopScreenTexture(): THREE.CanvasTexture {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 640;
      const ctx = canvas.getContext('2d')!;

      // Background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Top browser navbar
      ctx.fillStyle = '#141414';
      ctx.fillRect(0, 0, canvas.width, 54);

      // Window dots
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(30, 27, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(52, 27, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(74, 27, 7, 0, Math.PI * 2);
      ctx.fill();

      // Search bar pill
      ctx.fillStyle = '#202020';
      ctx.roundRect(110, 12, 400, 30, 6);
      ctx.fill();
      ctx.fillStyle = '#ff7a00';
      ctx.font = 'bold 15px system-ui';
      ctx.fillText('https://webx.dev/preview/live-experience', 125, 32);

      // Hero banner inside screen
      const heroGrad = ctx.createLinearGradient(0, 54, canvas.width, 320);
      heroGrad.addColorStop(0, '#1c0f08');
      heroGrad.addColorStop(1, '#0c0704');
      ctx.fillStyle = heroGrad;
      ctx.fillRect(0, 54, canvas.width, 260);

      // Content inside simulated website
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px system-ui';
      ctx.fillText('WEBX DIGITAL AGENCY', 60, 130);

      ctx.fillStyle = '#ff7a00';
      ctx.font = 'bold 24px system-ui';
      ctx.fillText('WE CREATE IMMERSIVE EXPERIENCES', 60, 175);

      ctx.fillStyle = '#a3a3a3';
      ctx.font = '18px system-ui';
      ctx.fillText('Websites for small businesses, shops, salons & fitness centres.', 60, 215);

      // Button on screen
      ctx.fillStyle = '#ff5a1f';
      ctx.roundRect(60, 240, 190, 44, 8);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px system-ui';
      ctx.fillText('EXPLORE SERVICES', 85, 268);

      // Service cards strip inside screen
      for (let i = 0; i < 3; i++) {
        const x = 60 + i * 300;
        ctx.fillStyle = '#161616';
        ctx.strokeStyle = '#2b2b2b';
        ctx.lineWidth = 2;
        ctx.roundRect(x, 340, 280, 260, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = i === 0 ? '#ff5a1f' : i === 1 ? '#ff7a00' : '#ffc857';
        ctx.fillRect(x + 20, 365, 36, 36);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px system-ui';
        ctx.fillText(i === 0 ? 'Static: ₹1,700' : i === 1 ? 'Dynamic: ₹2,100' : 'Custom Tailored', x + 20, 430);

        ctx.fillStyle = '#888888';
        ctx.font = '14px system-ui';
        ctx.fillText('Mobile-first, Vercel cloud,', x + 20, 460);
        ctx.fillText('instant WhatsApp lead routing.', x + 20, 485);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      textures.push(texture);
      return texture;
    }

    // Helper to generate smartphone screen texture
    function createPhoneScreenTexture(): THREE.CanvasTexture {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 800;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Status bar
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px system-ui';
      ctx.fillText('9:41', 30, 38);
      ctx.fillText('5G ●●●', 310, 38);

      // Brand header
      ctx.fillStyle = '#ff5a1f';
      ctx.font = 'bold 28px system-ui';
      ctx.fillText('WEBX', 30, 100);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px system-ui';
      ctx.fillText('Your Business.', 30, 150);
      ctx.fillStyle = '#ff7a00';
      ctx.fillText('Our Digital Vision.', 30, 190);

      // Mobile cards
      ctx.fillStyle = '#181818';
      ctx.strokeStyle = 'rgba(255, 90, 31, 0.4)';
      ctx.lineWidth = 2;
      ctx.roundRect(24, 230, 352, 170, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px system-ui';
      ctx.fillText('Static Web Package', 44, 275);
      ctx.fillStyle = '#ff5a1f';
      ctx.font = 'bold 28px system-ui';
      ctx.fillText('₹1,700', 44, 320);
      ctx.fillStyle = '#a3a3a3';
      ctx.font = '16px system-ui';
      ctx.fillText('Fast, responsive, WhatsApp ready', 44, 360);

      // Dynamic Card
      ctx.fillStyle = '#181818';
      ctx.strokeStyle = 'rgba(255, 122, 0, 0.4)';
      ctx.roundRect(24, 420, 352, 170, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px system-ui';
      ctx.fillText('Dynamic Web Package', 44, 465);
      ctx.fillStyle = '#ff7a00';
      ctx.font = 'bold 28px system-ui';
      ctx.fillText('₹2,100', 44, 510);
      ctx.fillStyle = '#a3a3a3';
      ctx.font = '16px system-ui';
      ctx.fillText('Interactive forms & custom logic', 44, 550);

      // Floating WhatsApp action button
      ctx.fillStyle = '#22c55e';
      ctx.roundRect(24, 620, 352, 60, 30);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px system-ui';
      ctx.fillText('💬 Chat on WhatsApp', 85, 658);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      textures.push(texture);
      return texture;
    }

    // Helper to generate floating code card texture
    function createCodePanelTexture(): THREE.CanvasTexture {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 320;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = 'rgba(15, 15, 15, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#252525';
      ctx.fillRect(0, 0, canvas.width, 36);

      ctx.fillStyle = '#ff5a1f';
      ctx.beginPath();
      ctx.arc(20, 18, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffc857';
      ctx.beginPath();
      ctx.arc(36, 18, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(52, 18, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#999999';
      ctx.font = '13px monospace';
      ctx.fillText('App.tsx — WEBX High Performance', 75, 23);

      const codeLines = [
        { text: 'import { createExperience } from "@webx/core";', color: '#ff7a00' },
        { text: '', color: '#fff' },
        { text: 'export const webxConfig = {', color: '#ffc857' },
        { text: '  staticPrice: 1700,', color: '#22c55e' },
        { text: '  dynamicPrice: 2100,', color: '#22c55e' },
        { text: '  responsive: true,', color: '#60a5fa' },
        { text: '  whatsappRouting: "instant",', color: '#f472b6' },
        { text: '  delivery: "48-72 hrs",', color: '#f472b6' },
        { text: '  craft: "Mehul Roy",', color: '#ff7a00' },
        { text: '};', color: '#ffc857' },
      ];

      ctx.font = '15px monospace';
      codeLines.forEach((line, idx) => {
        ctx.fillStyle = line.color;
        ctx.fillText(line.text, 24, 65 + idx * 24);
      });

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.push(texture);
      return texture;
    }

    // 4. Build 3–12 Part Procedural Models (THREE.Group)

    // A. HERO 3D LAPTOP
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0.1, -0.35, 0.6);
    laptopGroup.rotation.set(0.28, -0.4, 0.08);

    // Laptop Base Body
    const baseGeo = new THREE.BoxGeometry(2.5, 0.08, 1.7);
    geometries.push(baseGeo);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x222226,
      metalness: 0.92,
      roughness: 0.2,
    });
    materials.push(metalMat);
    const laptopBase = new THREE.Mesh(baseGeo, metalMat);
    laptopGroup.add(laptopBase);

    // Trackpad
    const trackpadGeo = new THREE.PlaneGeometry(0.75, 0.5);
    geometries.push(trackpadGeo);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x303035,
      metalness: 0.75,
      roughness: 0.3,
    });
    materials.push(trackpadMat);
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.position.set(0, 0.042, 0.45);
    laptopGroup.add(trackpad);

    // Keyboard Deck inset
    const kbGeo = new THREE.PlaneGeometry(2.1, 0.8);
    geometries.push(kbGeo);
    const kbMat = new THREE.MeshStandardMaterial({
      color: 0x121214,
      metalness: 0.6,
      roughness: 0.5,
    });
    materials.push(kbMat);
    const kbDeck = new THREE.Mesh(kbGeo, kbMat);
    kbDeck.rotation.x = -Math.PI / 2;
    kbDeck.position.set(0, 0.042, -0.22);
    laptopGroup.add(kbDeck);

    // Laptop Screen Lid (Hinged at the back, tilted upright facing camera)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.04, -0.85);
    lidGroup.rotation.x = 0.28; // Tilted upright facing viewer

    const lidBackGeo = new THREE.BoxGeometry(2.5, 1.6, 0.06);
    geometries.push(lidBackGeo);
    const lidBack = new THREE.Mesh(lidBackGeo, metalMat);
    lidBack.position.set(0, 0.8, -0.03);
    lidGroup.add(lidBack);

    // Screen display plane (Facing positive Z towards camera)
    const screenGeo = new THREE.PlaneGeometry(2.4, 1.5);
    geometries.push(screenGeo);
    const screenTex = createLaptopScreenTexture();
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTex,
    });
    materials.push(screenMat);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.8, 0.005);
    lidGroup.add(screenMesh);

    laptopGroup.add(lidGroup);
    masterGroup.add(laptopGroup);

    // B. FLOATING 3D SMARTPHONE (Facing towards camera)
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(2.0, 0.2, 1.1);
    phoneGroup.rotation.set(-0.15, -0.45, 0.12);

    const phoneBodyGeo = new THREE.BoxGeometry(0.85, 1.7, 0.06);
    geometries.push(phoneBodyGeo);
    const phoneChromeMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a30,
      metalness: 0.95,
      roughness: 0.15,
    });
    materials.push(phoneChromeMat);
    const phoneBody = new THREE.Mesh(phoneBodyGeo, phoneChromeMat);
    phoneGroup.add(phoneBody);

    const phoneScreenGeo = new THREE.PlaneGeometry(0.8, 1.62);
    geometries.push(phoneScreenGeo);
    const phoneScreenTex = createPhoneScreenTexture();
    const phoneScreenMat = new THREE.MeshBasicMaterial({
      map: phoneScreenTex,
    });
    materials.push(phoneScreenMat);
    const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreenMesh.position.set(0, 0, 0.032);
    phoneGroup.add(phoneScreenMesh);

    masterGroup.add(phoneGroup);

    // C. ROTATING METALLIC CHROME CUBES
    const chromeCubeGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    geometries.push(chromeCubeGeo);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.98,
      roughness: 0.1,
    });
    materials.push(chromeMat);

    const chromeCube = new THREE.Mesh(chromeCubeGeo, chromeMat);
    chromeCube.position.set(-2.2, 0.8, -0.2);
    masterGroup.add(chromeCube);

    const smallCube = new THREE.Mesh(chromeCubeGeo, chromeMat);
    smallCube.scale.set(0.45, 0.45, 0.45);
    smallCube.position.set(1.4, -1.2, 0.5);
    masterGroup.add(smallCube);

    // D. FLOATING 3D "X" LOGO SYMBOL (WEBX BRAND MARK)
    const xGroup = new THREE.Group();
    xGroup.position.set(-2.0, -0.6, 0.4);
    xGroup.rotation.set(0.2, 0.3, 0);

    const barGeo = new THREE.BoxGeometry(0.24, 1.1, 0.2);
    geometries.push(barGeo);
    const xMat = new THREE.MeshStandardMaterial({
      color: 0xff5a1f,
      emissive: 0x992200,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
    });
    materials.push(xMat);

    const bar1 = new THREE.Mesh(barGeo, xMat);
    bar1.rotation.z = Math.PI / 4;
    xGroup.add(bar1);

    const bar2 = new THREE.Mesh(barGeo, xMat);
    bar2.rotation.z = -Math.PI / 4;
    xGroup.add(bar2);

    const centerGlowGeo = new THREE.SphereGeometry(0.12, 16, 16);
    geometries.push(centerGlowGeo);
    const centerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffc857,
    });
    materials.push(centerGlowMat);
    const centerGlow = new THREE.Mesh(centerGlowGeo, centerGlowMat);
    xGroup.add(centerGlow);

    masterGroup.add(xGroup);

    // E. NESTED GLOWING ORANGE RINGS / TORUSES
    const ringGeo1 = new THREE.TorusGeometry(0.7, 0.035, 16, 64);
    geometries.push(ringGeo1);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xff7a00,
      emissive: 0xff5a1f,
      emissiveIntensity: 0.6,
      metalness: 0.7,
      roughness: 0.2,
    });
    materials.push(ringMat1);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.position.set(1.9, -0.6, -0.5);
    masterGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(0.45, 0.025, 16, 48);
    geometries.push(ringGeo2);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat1);
    ring2.position.set(1.9, -0.6, -0.5);
    masterGroup.add(ring2);

    // F. FLOATING CODE PANEL CARD
    const codePanelGeo = new THREE.PlaneGeometry(1.2, 0.75);
    geometries.push(codePanelGeo);
    const codeTex = createCodePanelTexture();
    const codePanelMat = new THREE.MeshBasicMaterial({
      map: codeTex,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });
    materials.push(codePanelMat);
    const codePanel = new THREE.Mesh(codePanelGeo, codePanelMat);
    codePanel.position.set(-1.6, 1.4, -0.4);
    codePanel.rotation.set(0.1, 0.25, -0.05);
    masterGroup.add(codePanel);

    // G. FLOATING GLASS & GEOMETRIC ORBS
    const glassSphereGeo = new THREE.SphereGeometry(0.35, 32, 32);
    geometries.push(glassSphereGeo);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: isSoftwareGl ? 0 : 0.85,
      opacity: isSoftwareGl ? 0.35 : 0.9,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      ior: 1.5,
    });
    materials.push(glassMat);
    const glassSphere = new THREE.Mesh(glassSphereGeo, glassMat);
    glassSphere.position.set(-0.8, -1.2, 0.9);
    masterGroup.add(glassSphere);

    // Floating Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(0.3, 0);
    geometries.push(icoGeo);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xff5a1f,
      metalness: 0.85,
      roughness: 0.15,
      wireframe: false,
    });
    materials.push(icoMat);
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(0.8, 1.4, -0.6);
    masterGroup.add(icoMesh);

    // H. FIERY DRIFTING EMBER PARTICLES
    const particleCount = isSoftwareGl ? 80 : 250;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    const c1 = new THREE.Color(0xff5a1f);
    const c2 = new THREE.Color(0xffc857);
    const c3 = new THREE.Color(0xff7a00);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const pick = Math.random();
      const col = pick < 0.4 ? c1 : pick < 0.8 ? c3 : c2;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      speeds[i] = 0.2 + Math.random() * 0.6;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometries.push(particleGeo);

    // Canvas particle circular sprite
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d')!;
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 122, 0, 0.8)');
    grad.addColorStop(0.8, 'rgba(255, 90, 31, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTex = new THREE.CanvasTexture(pCanvas);
    textures.push(pTex);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: pTex,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materials.push(particleMat);

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Interaction Listeners (Mouse Parallax & Scroll reaction)
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.x = normX;
      targetMouse.y = normY;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // 6. Animation Loop (Paced for Software WebGL per Three.js skill)
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (isDisposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (isDisposed) return;
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = now * 0.001;

      // Smooth mouse damping
      currentMouse.x = THREE.MathUtils.damp(currentMouse.x, targetMouse.x, 3.5, delta);
      currentMouse.y = THREE.MathUtils.damp(currentMouse.y, targetMouse.y, 3.5, delta);

      masterGroup.rotation.y = currentMouse.x * 0.25;
      masterGroup.rotation.x = -currentMouse.y * 0.18;

      // Continuous natural floating & rotations
      // Laptop subtle breathing
      laptopGroup.position.y = -0.15 + Math.sin(elapsed * 1.2) * 0.08;
      laptopGroup.rotation.y = -0.32 + Math.cos(elapsed * 0.9) * 0.05;

      // Phone floating
      phoneGroup.position.y = 0.4 + Math.cos(elapsed * 1.5) * 0.09;
      phoneGroup.rotation.y = -0.4 + Math.sin(elapsed * 1.1) * 0.08;
      phoneGroup.rotation.z = 0.15 + Math.cos(elapsed * 1.3) * 0.04;

      // Chrome Cube continuous tumbling
      chromeCube.rotation.x += delta * 0.6;
      chromeCube.rotation.y += delta * 0.8;
      chromeCube.position.y = 0.8 + Math.sin(elapsed * 1.8) * 0.07;

      smallCube.rotation.x -= delta * 0.5;
      smallCube.rotation.y += delta * 0.7;
      smallCube.position.y = -1.2 + Math.cos(elapsed * 1.4) * 0.06;

      // X Logo rotation & pulsation
      xGroup.rotation.y += delta * 0.5;
      xGroup.rotation.x = 0.2 + Math.sin(elapsed * 1.3) * 0.1;
      xGroup.position.y = -0.6 + Math.cos(elapsed * 1.6) * 0.08;

      // Glowing rings multi-axis spin
      ring1.rotation.x += delta * 0.8;
      ring1.rotation.y += delta * 0.5;
      ring2.rotation.x -= delta * 0.6;
      ring2.rotation.z += delta * 0.9;

      // Code panel gentle hover
      codePanel.position.y = 1.4 + Math.sin(elapsed * 1.1) * 0.06;
      codePanel.rotation.y = 0.25 + Math.cos(elapsed * 0.8) * 0.05;

      // Glass sphere and Icosahedron
      glassSphere.position.y = -1.2 + Math.sin(elapsed * 1.7) * 0.08;
      icoMesh.rotation.x += delta * 0.9;
      icoMesh.rotation.y += delta * 0.7;
      icoMesh.position.y = 1.4 + Math.cos(elapsed * 1.5) * 0.07;

      // Embers rising & swirling
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3 + 1] += speeds[i] * delta * 1.2;
        posArr[i * 3] += Math.sin(elapsed + i) * delta * 0.3;
        if (posArr[i * 3 + 1] > 3.5) {
          posArr[i * 3 + 1] = -3.5;
          posArr[i * 3] = (Math.random() - 0.5) * 10;
        }
      }
      posAttr.needsUpdate = true;

      // Render
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    // Start loop
    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    setIsLoaded(true);

    // 7. Resize handling
    const handleResize = () => {
      if (!container || isDisposed) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 700;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Cleanup on unmount
    return () => {
      isDisposed = true;
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        window.clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] lg:h-[700px] overflow-hidden select-none pointer-events-auto">
      {/* Three.js Canvas Mount */}
      <div
        ref={mountRef}
        data-testid="hero-3d-canvas"
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Atmospheric lighting gradient overlay on bottom and sides */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080808] to-transparent hidden md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080808] to-transparent hidden md:block" />

      {/* Loading state placeholder until first paint */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080808]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#FF5A1F] border-t-transparent animate-spin" />
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
              Initializing 3D Universe...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
