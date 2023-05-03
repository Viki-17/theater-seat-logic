import React, { useEffect, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
// import theatre from "./assets/theatre.gltf";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function Model1(props) {
  let model = useRef();
  const { nodes, materials } = useGLTF("src/assets/mytheater.glb");
  let { camera } = useThree();
  let [visible, setVisible] = useState(false);

  let grey = new THREE.MeshStandardMaterial({ color: 0x909090, name: "grey" });
  let green = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    name: "green",
  });
  const materialArray = [grey, materials["Red cloth"]];
  useEffect(() => {
    let roof = model.current.getObjectByName("Plane002_2");
    let roofLight = (model.current.getObjectByName("Cylinder").visible = false);
    roof.material.side = "front";
    model.current.traverse((val) => {
      if (val.name.slice(0, 5) === "Chair") {
        val.children[0].material = materialArray[Math.floor(Math.random() * 2)];
      }
    });
  }, []);

  return (
    <group
      {...props}
      ref={model}
      dispose={null}
      name="theatre"
      onDoubleClick={(e) => {
        if (e.object.parent.children[0].material.name === "green") {
        }
      }}
      onClick={(e) => {
        e.stopPropagation();

        if (
          !visible &&
          e.object.parent.children[0].material.name === "grey" &&
          e.object.name !== "eye"
        ) {
          e.object.parent.children[0].material = green;
          const material = new THREE.MeshStandardMaterial(
            { color: "orange" },
            { alphaTest: true }
          );

          const mesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.2, 0.4, 6),
            material
          );
          mesh.position.set(0, 1.5, 0);
          mesh.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2);
          mesh.name = "eye";
          e.object.parent.add(mesh);
        } else if (
          e.object.parent.children[0].material.name === "green" &&
          e.object.name !== "eye"
        ) {
          e.object.parent.children[0].material = grey;
          e.object.parent.remove(e.object.parent.getObjectByName("eye"));
        } else if (e.object.name === "eye") {
          let t1 = new gsap.timeline();
          let pos = e.object.parent.localToWorld(new THREE.Vector3());
          model.current.traverse((val) => {
            if (val.name === "eye") {
              val.visible = false;
            }
          });
          t1.to(camera.position, {
            x: pos.x,
            y: pos.y + 1.3,
            z: pos.z,
            onUpdate: () => {
              camera.lookAt(
                -0.382128835196221,
                -0.13527385671785375,
                8.35679292678833
              );
            },
            duration: 4,
          });
          setVisible(true);
        }
      }}
    >
      <group
        name="Cylinder001"
        position={[4, 4.03499842, -11.1141243]}
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
      <mesh
        name="Cube002"
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[-2.15570092, -0.64609063, -0.22160238]}
      />
      <group name="Cylinder" position={[1.91472137, 5.61606979, 0.01709573]}>
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
      <group name="Cube003" position={[-2.20570087, -0.36218262, -1.46240461]}>
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
      <group name="Chair 1">
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
      <group name="Cube001" position={[-2.15563226, 2.05871201, 0]}>
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
      <group name="Plane" position={[4, -0.93000007, 0]}>
        <mesh
          name="Plane002"
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={materials["black paint"]}
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
          name="Plane002_3"
          castShadow
          receiveShadow
          geometry={nodes.Plane002_3.geometry}
          material={materials["Material.002"]}
        >
          {visible && (
            <Html
              rotation={[Math.PI, 0, -Math.PI]}
              position={[0, 3, 5.1]}
              transform
            >
              <div
                className="confirmationModal"
                style={{
                  backgroundSize: "cover",
                  //   backgroundImage: `url("https://image.tmdb.org/t/p/original/${state.movies.backdrop_path}")`,
                  backgroundPosition: "center center",
                }}
              >
                <span className="btns">
                  <button
                    className="btn-yes"
                    onClick={(e) => {
                      e.stopPropagation();
                      model.current.traverse((val) => {
                        if (val.name === "eye") {
                          val.visible = true;
                        }
                      });
                      let t1 = new gsap.timeline();
                      t1.to(camera.position, {
                        x: 0,
                        y: 0,
                        z: 8,
                        onUpdate: () => {
                          let t2 = new gsap.timeline();
                          t2.to(camera.rotation, {
                            x: 0,
                            y: 0,
                            z: 0,
                            duration: 3,
                          });
                        },
                        duration: 4,
                      });
                      setTimeout(() => {
                        setVisible(false);
                      }, 500);
                    }}
                  >
                    Back To Seat Selection
                  </button>
                </span>
              </div>
            </Html>
          )}
        </mesh>
        <mesh
          name="Plane002_4"
          castShadow
          receiveShadow
          geometry={nodes.Plane002_4.geometry}
          material={materials.floor}
        />
      </group>
      <group name="Chair 2" position={[0, 0.59094685, -1.92671621]}>
        <mesh
          name="Cube_4"
          castShadow
          receiveShadow
          geometry={nodes.Cube_4.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 3" position={[0, 1.16552401, -3.77158356]}>
        <mesh
          name="Cube_7"
          castShadow
          receiveShadow
          geometry={nodes.Cube_7.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 4" position={[0, 1.73027921, -6.35963678]}>
        <mesh
          name="Cube_10"
          castShadow
          receiveShadow
          geometry={nodes.Cube_10.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 5" position={[0, 2.26065803, -8.26670933]}>
        <mesh
          name="Cube_13"
          castShadow
          receiveShadow
          geometry={nodes.Cube_13.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 6" position={[1.69721258, 0, 0]}>
        <mesh
          name="Cube_16"
          castShadow
          receiveShadow
          geometry={nodes.Cube_16.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 008" position={[1.69721258, 1.16552401, -3.77158356]}>
        <mesh
          name="Cube_19"
          castShadow
          receiveShadow
          geometry={nodes.Cube_19.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 7" position={[1.69721258, 0.59094685, -1.92671621]}>
        <mesh
          name="Cube_22"
          castShadow
          receiveShadow
          geometry={nodes.Cube_22.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 8" position={[1.69721258, 1.73027921, -6.35963678]}>
        <mesh
          name="Cube_25"
          castShadow
          receiveShadow
          geometry={nodes.Cube_25.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 9" position={[1.69721258, 2.26065803, -8.26670933]}>
        <mesh
          name="Cube_28"
          castShadow
          receiveShadow
          geometry={nodes.Cube_28.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 10" position={[3.32370806, 0.59094685, -1.92671621]}>
        <mesh
          name="Cube_31"
          castShadow
          receiveShadow
          geometry={nodes.Cube_31.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 11" position={[3.32370806, 0, 0]}>
        <mesh
          name="Cube_34"
          castShadow
          receiveShadow
          geometry={nodes.Cube_34.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 12" position={[3.32370806, 1.16552401, -3.77158356]}>
        <mesh
          name="Cube_37"
          castShadow
          receiveShadow
          geometry={nodes.Cube_37.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 13" position={[3.32370806, 1.73027921, -6.35963678]}>
        <mesh
          name="Cube_40"
          castShadow
          receiveShadow
          geometry={nodes.Cube_40.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 14" position={[4.95020342, 0, 0]}>
        <mesh
          name="Cube_43"
          castShadow
          receiveShadow
          geometry={nodes.Cube_43.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 15" position={[3.32370806, 2.26065803, -8.26670933]}>
        <mesh
          name="Cube_46"
          castShadow
          receiveShadow
          geometry={nodes.Cube_46.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 16" position={[4.95020342, 0.59094685, -1.92671621]}>
        <mesh
          name="Cube_49"
          castShadow
          receiveShadow
          geometry={nodes.Cube_49.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 17" position={[4.95020342, 1.16552401, -3.77158356]}>
        <mesh
          name="Cube_52"
          castShadow
          receiveShadow
          geometry={nodes.Cube_52.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 18" position={[4.95020342, 2.26065803, -8.26670933]}>
        <mesh
          name="Cube_55"
          castShadow
          receiveShadow
          geometry={nodes.Cube_55.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 19" position={[4.95020342, 1.73027921, -6.35963678]}>
        <mesh
          name="Cube_58"
          castShadow
          receiveShadow
          geometry={nodes.Cube_58.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 20" position={[6.57669878, 0, 0]}>
        <mesh
          name="Cube_61"
          castShadow
          receiveShadow
          geometry={nodes.Cube_61.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 21" position={[6.57669878, 0.59094685, -1.92671621]}>
        <mesh
          name="Cube_64"
          castShadow
          receiveShadow
          geometry={nodes.Cube_64.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 22" position={[6.57669878, 1.73027921, -6.35963678]}>
        <mesh
          name="Cube_67"
          castShadow
          receiveShadow
          geometry={nodes.Cube_67.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 23" position={[6.57669878, 1.16552401, -3.77158356]}>
        <mesh
          name="Cube_70"
          castShadow
          receiveShadow
          geometry={nodes.Cube_70.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 24" position={[6.57669878, 2.26065803, -8.26670933]}>
        <mesh
          name="Cube_73"
          castShadow
          receiveShadow
          geometry={nodes.Cube_73.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 25" position={[8.20319462, 0, 0]}>
        <mesh
          name="Cube_76"
          castShadow
          receiveShadow
          geometry={nodes.Cube_76.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 26" position={[8.20319462, 1.16552401, -3.77158356]}>
        <mesh
          name="Cube_79"
          castShadow
          receiveShadow
          geometry={nodes.Cube_79.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 27" position={[8.20319462, 0.59094685, -1.92671621]}>
        <mesh
          name="Cube_82"
          castShadow
          receiveShadow
          geometry={nodes.Cube_82.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 28" position={[8.20319462, 1.73027921, -6.35963678]}>
        <mesh
          name="Cube_85"
          castShadow
          receiveShadow
          geometry={nodes.Cube_85.geometry}
          material={materials["Red cloth"]}
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
      <group name="Chair 29" position={[8.20319462, 2.26065803, -8.26670933]}>
        <mesh
          name="Cube_88"
          castShadow
          receiveShadow
          geometry={nodes.Cube_88.geometry}
          material={materials["Red cloth"]}
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
    </group>
  );
}

useGLTF.preload("src/assets/mytheater.glb");
