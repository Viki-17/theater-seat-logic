import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";

export function Theater(props) {
  const model = useRef();
  const { nodes, materials } = useGLTF("src/assets/mytheater.glb");
  const { camera } = useThree();
  camera.position.z = 1.5;
  console.log(camera.position);
  //   console.log(camera.getWorldDirection());
  const randomSeatColor = [
    materials["Red cloth"],
    new THREE.MeshStandardMaterial({ name: "grey", color: 0x808080 }),
  ];

  const selectedSeatHandler = (e) => {
    if (e.object.parent.children[0].material.name === "grey") {
      //  Select
      e.object.parent.children[0].material = new THREE.MeshStandardMaterial({
        name: "green",
        color: 0x00ff00,
      });
      const geometry = new THREE.ConeGeometry(0.1, 0.1, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
      });
      const cone = new THREE.Mesh(geometry, material);
      cone.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2);
      cone.name = "cone";
      cone.position.y = 1.2;
      e.object.parent.add(cone);
    } else if (
      // DeSelect
      e.object.parent.children[0].material.name === "green" &&
      e.object.name !== "cone"
    ) {
      e.object.parent.children[0].material = new THREE.MeshStandardMaterial({
        name: "grey",
        color: 0x808080,
      });

      e.object.parent.remove(e.object.parent.getObjectByName("cone"));
    } else if (e.object.name === "cone") {
      const t1 = new gsap.timeline();
      const camPos = e.object.parent.localToWorld(new THREE.Vector3());
      //   model.current.traverse((item) => {
      //     if (item.name === "cone") {
      //       item.visible = false;
      //     }
      //   });
      t1.to(camera.position, {
        x: camPos.x,
        y: camPos.y + 0.2,
        z: camPos.z,
        onUpdate: () => {
          //   camera.rotation.set(-0.010000000000000009, -0.5873999999999999, 0.58);
          camera.lookAt(
            -0.382128835196221,
            -0.13527385671785375,
            8.35679292678833
          );
        },
        duration: 4,
      });
      // Cam(camPos.x, camPos.y, camPos.z);
    }
    if (e.object.parent.getObjectByName("Screen")?.name === "Screen") {
      const t1 = new gsap.timeline();
      model.current.traverse((item) => {
        if (item.name === "cone") {
          item.visible = true;
        }
      });

      t1.to(camera.position, {
        x: 0,
        y: 0,
        z: 1.5,
        onUpdate: () => {
          let t2 = new gsap.timeline();
          t2.to(camera.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
          });
        },
        duration: 2,
        ease: "power1.out",
      });
    }
  };

  return (
    <group
      {...props}
      ref={model}
      dispose={null}
      onClick={(e) => {
        e.stopPropagation();
        selectedSeatHandler(e);
      }}
    >
      <group name="Scene_1" position={[-0.73, -0.42, 0.58]} scale={0.18}>
        <group name="Cylinder" position={[1.91, 5.62, 0.02]}>
          <mesh
            name="Cylinder_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_1.geometry}
            material={materials.lights}
          />
          <mesh
            name="Cylinder_2"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_2.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cylinder_3"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_3.geometry}
            material={materials.Copper}
          />
        </group>
        <group
          name="Cylinder001"
          position={[4, 4.03, -11.11]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Cylinder001_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001_1.geometry}
            material={materials["black paint"]}
          />
          <mesh
            name="Cylinder001_2"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001_2.geometry}
            material={materials.lights}
          />
        </group>
        <group name="Cube003" position={[-2.21, -0.36, -1.46]}>
          <mesh
            name="Cube013_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube013_1.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube013_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube013_2.geometry}
            material={materials.lights}
          />
          <mesh
            name="Cube013_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube013_3.geometry}
            material={materials["black paint"]}
          />
          <mesh
            name="Cube013_4"
            castShadow
            receiveShadow
            geometry={nodes.Cube013_4.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="">
          <mesh
            name="Cube_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials["Red cloth"]}
          />
          <mesh
            name="Cube_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube_2.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube_3.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Plane" position={[4, -0.93, 0]}>
          <mesh
            name="Plane002"
            castShadow
            receiveShadow
            geometry={nodes.Plane002.geometry}
            material={materials.Material}
          />
          <mesh
            name="Plane002_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane002_1.geometry}
            material={materials.Copper}
          />
          <mesh
            name="Plane002_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane002_2.geometry}
            material={materials["black paint"]}
          />
          <mesh
            name="Screen"
            castShadow
            receiveShadow
            geometry={nodes.Plane002_3.geometry}
            material={materials["Material.002"]}
          />
          <mesh
            name="Plane002_4"
            castShadow
            receiveShadow
            geometry={nodes.Plane002_4.geometry}
            material={materials.floor}
          />
        </group>
        <group name="Cube001" position={[-2.16, 2.06, 0]}>
          <mesh
            name="Cube005_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube005_1.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube005_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube005_2.geometry}
            material={materials.lights}
          />
        </group>
        <group name="Cube004" position={[0, 0.59, -1.93]}>
          <mesh
            name="Cube_4"
            castShadow
            receiveShadow
            geometry={nodes.Cube_4.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_5"
            castShadow
            receiveShadow
            geometry={nodes.Cube_5.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_6"
            castShadow
            receiveShadow
            geometry={nodes.Cube_6.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube005" position={[0, 1.17, -3.77]}>
          <mesh
            name="Cube_7"
            castShadow
            receiveShadow
            geometry={nodes.Cube_7.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_8"
            castShadow
            receiveShadow
            geometry={nodes.Cube_8.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_9"
            castShadow
            receiveShadow
            geometry={nodes.Cube_9.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube006" position={[0, 1.73, -6.36]}>
          <mesh
            name="Cube_10"
            castShadow
            receiveShadow
            geometry={nodes.Cube_10.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_11"
            castShadow
            receiveShadow
            geometry={nodes.Cube_11.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_12"
            castShadow
            receiveShadow
            geometry={nodes.Cube_12.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube007" position={[0, 2.26, -8.27]}>
          <mesh
            name="Cube_16"
            castShadow
            receiveShadow
            geometry={nodes.Cube_16.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_17"
            castShadow
            receiveShadow
            geometry={nodes.Cube_17.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_18"
            castShadow
            receiveShadow
            geometry={nodes.Cube_18.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube008" position={[1.7, 0, 0]}>
          <mesh
            name="Cube_22"
            castShadow
            receiveShadow
            geometry={nodes.Cube_22.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_23"
            castShadow
            receiveShadow
            geometry={nodes.Cube_23.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_24"
            castShadow
            receiveShadow
            geometry={nodes.Cube_24.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube009" position={[1.7, 0.59, -1.93]}>
          <mesh
            name="Cube_13"
            castShadow
            receiveShadow
            geometry={nodes.Cube_13.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_14"
            castShadow
            receiveShadow
            geometry={nodes.Cube_14.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_15"
            castShadow
            receiveShadow
            geometry={nodes.Cube_15.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube010" position={[1.7, 1.17, -3.77]}>
          <mesh
            name="Cube_28"
            castShadow
            receiveShadow
            geometry={nodes.Cube_28.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_29"
            castShadow
            receiveShadow
            geometry={nodes.Cube_29.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_30"
            castShadow
            receiveShadow
            geometry={nodes.Cube_30.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube011" position={[1.7, 1.73, -6.36]}>
          <mesh
            name="Cube_31"
            castShadow
            receiveShadow
            geometry={nodes.Cube_31.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_32"
            castShadow
            receiveShadow
            geometry={nodes.Cube_32.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_33"
            castShadow
            receiveShadow
            geometry={nodes.Cube_33.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube012" position={[1.7, 2.26, -8.27]}>
          <mesh
            name="Cube_34"
            castShadow
            receiveShadow
            geometry={nodes.Cube_34.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_35"
            castShadow
            receiveShadow
            geometry={nodes.Cube_35.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_36"
            castShadow
            receiveShadow
            geometry={nodes.Cube_36.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube013" position={[3.32, 0, 0]}>
          <mesh
            name="Cube_19"
            castShadow
            receiveShadow
            geometry={nodes.Cube_19.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_20"
            castShadow
            receiveShadow
            geometry={nodes.Cube_20.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_21"
            castShadow
            receiveShadow
            geometry={nodes.Cube_21.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube014" position={[3.32, 0.59, -1.93]}>
          <mesh
            name="Cube_37"
            castShadow
            receiveShadow
            geometry={nodes.Cube_37.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_38"
            castShadow
            receiveShadow
            geometry={nodes.Cube_38.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_39"
            castShadow
            receiveShadow
            geometry={nodes.Cube_39.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube015" position={[3.32, 1.17, -3.77]}>
          <mesh
            name="Cube_40"
            castShadow
            receiveShadow
            geometry={nodes.Cube_40.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_41"
            castShadow
            receiveShadow
            geometry={nodes.Cube_41.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_42"
            castShadow
            receiveShadow
            geometry={nodes.Cube_42.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube016" position={[3.32, 1.73, -6.36]}>
          <mesh
            name="Cube_46"
            castShadow
            receiveShadow
            geometry={nodes.Cube_46.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_47"
            castShadow
            receiveShadow
            geometry={nodes.Cube_47.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_48"
            castShadow
            receiveShadow
            geometry={nodes.Cube_48.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube017" position={[3.32, 2.26, -8.27]}>
          <mesh
            name="Cube_25"
            castShadow
            receiveShadow
            geometry={nodes.Cube_25.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_26"
            castShadow
            receiveShadow
            geometry={nodes.Cube_26.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_27"
            castShadow
            receiveShadow
            geometry={nodes.Cube_27.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube018" position={[4.95, 0, 0]}>
          <mesh
            name="Cube_49"
            castShadow
            receiveShadow
            geometry={nodes.Cube_49.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_50"
            castShadow
            receiveShadow
            geometry={nodes.Cube_50.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_51"
            castShadow
            receiveShadow
            geometry={nodes.Cube_51.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube019" position={[4.95, 0.59, -1.93]}>
          <mesh
            name="Cube_52"
            castShadow
            receiveShadow
            geometry={nodes.Cube_52.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_53"
            castShadow
            receiveShadow
            geometry={nodes.Cube_53.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_54"
            castShadow
            receiveShadow
            geometry={nodes.Cube_54.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube020" position={[4.95, 1.17, -3.77]}>
          <mesh
            name="Cube_55"
            castShadow
            receiveShadow
            geometry={nodes.Cube_55.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_56"
            castShadow
            receiveShadow
            geometry={nodes.Cube_56.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_57"
            castShadow
            receiveShadow
            geometry={nodes.Cube_57.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube021" position={[4.95, 1.73, -6.36]}>
          <mesh
            name="Cube_43"
            castShadow
            receiveShadow
            geometry={nodes.Cube_43.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_44"
            castShadow
            receiveShadow
            geometry={nodes.Cube_44.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_45"
            castShadow
            receiveShadow
            geometry={nodes.Cube_45.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube022" position={[4.95, 2.26, -8.27]}>
          <mesh
            name="Cube_61"
            castShadow
            receiveShadow
            geometry={nodes.Cube_61.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_62"
            castShadow
            receiveShadow
            geometry={nodes.Cube_62.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_63"
            castShadow
            receiveShadow
            geometry={nodes.Cube_63.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube023" position={[6.58, 0, 0]}>
          <mesh
            name="Cube_64"
            castShadow
            receiveShadow
            geometry={nodes.Cube_64.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_65"
            castShadow
            receiveShadow
            geometry={nodes.Cube_65.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_66"
            castShadow
            receiveShadow
            geometry={nodes.Cube_66.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube024" position={[6.58, 0.59, -1.93]}>
          <mesh
            name="Cube_67"
            castShadow
            receiveShadow
            geometry={nodes.Cube_67.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_68"
            castShadow
            receiveShadow
            geometry={nodes.Cube_68.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_69"
            castShadow
            receiveShadow
            geometry={nodes.Cube_69.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube025" position={[6.58, 1.17, -3.77]}>
          <mesh
            name="Cube_58"
            castShadow
            receiveShadow
            geometry={nodes.Cube_58.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_59"
            castShadow
            receiveShadow
            geometry={nodes.Cube_59.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_60"
            castShadow
            receiveShadow
            geometry={nodes.Cube_60.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube026" position={[6.58, 1.73, -6.36]}>
          <mesh
            name="Cube_70"
            castShadow
            receiveShadow
            geometry={nodes.Cube_70.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_71"
            castShadow
            receiveShadow
            geometry={nodes.Cube_71.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_72"
            castShadow
            receiveShadow
            geometry={nodes.Cube_72.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube027" position={[6.58, 2.26, -8.27]}>
          <mesh
            name="Cube_73"
            castShadow
            receiveShadow
            geometry={nodes.Cube_73.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_74"
            castShadow
            receiveShadow
            geometry={nodes.Cube_74.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_75"
            castShadow
            receiveShadow
            geometry={nodes.Cube_75.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube028" position={[8.2, 0, 0]}>
          <mesh
            name="Cube_79"
            castShadow
            receiveShadow
            geometry={nodes.Cube_79.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_80"
            castShadow
            receiveShadow
            geometry={nodes.Cube_80.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_81"
            castShadow
            receiveShadow
            geometry={nodes.Cube_81.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube029" position={[8.2, 0.59, -1.93]}>
          <mesh
            name="Cube_76"
            castShadow
            receiveShadow
            geometry={nodes.Cube_76.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_77"
            castShadow
            receiveShadow
            geometry={nodes.Cube_77.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_78"
            castShadow
            receiveShadow
            geometry={nodes.Cube_78.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube030" position={[8.2, 1.17, -3.77]}>
          <mesh
            name="Cube_82"
            castShadow
            receiveShadow
            geometry={nodes.Cube_82.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_83"
            castShadow
            receiveShadow
            geometry={nodes.Cube_83.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_84"
            castShadow
            receiveShadow
            geometry={nodes.Cube_84.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube031" position={[8.2, 1.73, -6.36]}>
          <mesh
            name="Cube_85"
            castShadow
            receiveShadow
            geometry={nodes.Cube_85.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_86"
            castShadow
            receiveShadow
            geometry={nodes.Cube_86.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_87"
            castShadow
            receiveShadow
            geometry={nodes.Cube_87.geometry}
            material={materials.Copper}
          />
        </group>
        <group name="Cube032" position={[8.2, 2.26, -8.27]}>
          <mesh
            name="Cube_88"
            castShadow
            receiveShadow
            geometry={nodes.Cube_88.geometry}
            material={randomSeatColor[Math.floor(Math.random() * 2)]}
          />
          <mesh
            name="Cube_89"
            castShadow
            receiveShadow
            geometry={nodes.Cube_89.geometry}
            material={materials["black plastid"]}
          />
          <mesh
            name="Cube_90"
            castShadow
            receiveShadow
            geometry={nodes.Cube_90.geometry}
            material={materials.Copper}
          />
        </group>
        <mesh
          name="Cube002"
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={nodes.Cube002.material}
          position={[-2.16, -0.65, -0.22]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("src/assets/mytheater.glb");
