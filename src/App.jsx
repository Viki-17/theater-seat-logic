import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model1 } from "./Model";
import { Theater } from "./Theater";

const Model = () => {
  const model = useGLTF("src/assets/theatre.gltf");
  console.log(model);

  const { actions } = useAnimations(model.animations, model.scene);

  console.log(actions);

  // actions["Animation_pSphere1"].play();
  // actions["Animation_pCube1"].play();

  return <primitive object={model.scene} />;
};
function App() {
  return (
    <Canvas>
      {/* <OrbitControls /> */}
      {/* <ambientLight /> */}
      <directionalLight />
      {/* <Model /> */}
      {/* <Model1 /> */}
      <Theater />
    </Canvas>
  );
}

export default App;
