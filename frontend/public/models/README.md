# 3D-modeller (Blender & Spline)

## Blender (.glb / .gltf)
1. Exportera din 3D-modell från **Blender** via `File → Export → glTF 2.0 (.glb/.gltf)`.
2. Spara filen här som t.ex. `frontend/public/models/ai-agent.glb`.
3. Skicka prop `blenderModelUrl="/models/ai-agent.glb"` till `<Hero3DCanvas />` i `src/App.tsx` – komponenten laddar den automatiskt via Three.js `GLTFLoader`!

## Spline
1. Publicera din 3D-scen i **Spline** och kopiera Embed-URL:en (`https://my.spline.design/...`).
2. Skicka prop `splineUrl="https://my.spline.design/..."` till `<Hero3DCanvas />` i `src/App.tsx`.
