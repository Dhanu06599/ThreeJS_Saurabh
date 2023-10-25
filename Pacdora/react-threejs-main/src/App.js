import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./App.css";
import { TrackballControls } from "../node_modules/three/examples/jsm/controls/TrackballControls";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TWEEN } from "../node_modules/three/examples/jsm/libs/tween.module.min";
import InputGroup from 'react-bootstrap/InputGroup';
var scene;

var thicknessofBox = 0.1,
  lengthofBox = 3,
  breadthofBox = 2,
  depthofBox = 1;

var Unfold = false;

const App = () => {
  const mountRef = useRef(null);

  const [value, setValue] = useState("");

  const [length, setLength] = useState("");

  const [breadth, setBreadth] = useState("");

  const [depth, setDepth] = useState("");

  const [btnText, setbtnText] = useState("Unfold");

  function incrementThickness() {
    thicknessofBox = Math.round((thicknessofBox + 0.1) * 100) / 100;
    setValue(thicknessofBox);
    createCube();
  }

  function decreaseThickness() {
    if (thicknessofBox>0) {
      thicknessofBox = Math.round((thicknessofBox - 0.1) * 100) / 100;
    }
    setValue(thicknessofBox);
    createCube();
  }

  function increaseLength() {
    lengthofBox = Math.round((lengthofBox + 0.1) * 100) / 100;
    setLength(lengthofBox);
    createCube();
  }

  function decreaseLength() {
    if (lengthofBox>0) {
      lengthofBox = Math.round((lengthofBox - 0.1) * 100) / 100;
    }
    setLength(lengthofBox);
    createCube();
  }
  function increaseBreadth() {
    breadthofBox = Math.round((breadthofBox + 0.1) * 100) / 100;
    setBreadth(breadthofBox);
    createCube();
  }

  function decreaseBreadth() {
    if (breadthofBox>0) {
      breadthofBox = Math.round((breadthofBox - 0.1) * 100) / 100;
    }
    setBreadth(breadthofBox);
    createCube();
  }
  function increaseDepth() {
    depthofBox = Math.round((depthofBox + 0.1) * 100) / 100;
    setDepth(depthofBox);
    createCube();
  }

  function decreaseDepth() {
    if (depthofBox>0) {
      depthofBox = Math.round((depthofBox - 0.1) * 100) / 100;
    }
    setDepth(depthofBox);
    createCube();
  }

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    var camera = new THREE.PerspectiveCamera(75,(window.innerWidth * 0.8) / window.innerHeight,0.1,1000);
    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
console.log("rendering init");
    const control = new TrackballControls(camera, renderer.domElement);

    var animate = function () {
      requestAnimationFrame(animate);
      control.update();
      renderer.render(scene, camera);
      TWEEN.update()
    };

    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize, false);

    animate();
    return () => mountRef.current.removeChild(renderer.domElement);
  }

  function disposeAll() {
    // scene.traverse((object) => {
    //   if (object instanceof THREE.Mesh || object instanceof THREE.Group) {
    //     scene.remove(object);
        
    //   }
    // });
    scene.clear();
  }

  // function disposeAll(){
  //   scene.traverse((object) => {
  //     if (object instanceof THREE.Mesh){
  //       console.log("travserse");
  //       object.geometry.dispose();
  //       object.material.dispose();
  //       object.parent.remove(object);
  //     }else if(object instanceof THREE.Group){
  //       console.log("travserse123456");

  //       scene.remove(object);
  //     }
  //   });
  // }

  function foldUnfold() {
    Unfold = !Unfold;
    // createCube();
    foldCube();
    if (Unfold) {
      setbtnText("Fold");
    } else {
      setbtnText("Unfold");
    }
  }

  function creatept(v1, group) {
    const geometry = new THREE.SphereGeometry(0.1, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 ,visible:true});
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.copy(v1);
    group.add(sphere);
  }

function foldCube() {
  const boxGroup1 = scene.getObjectByName("backGroup", true);
  if (boxGroup1) {
    if (Unfold) {
      // boxGroup1.rotation.y = Math.PI / 2;
      var newPosRotate = { x: -Math.PI / 2 };
      new TWEEN.Tween(boxGroup1.rotation)
        .to(newPosRotate, 2000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start();
    } else {
      // boxGroup1.rotation.y = 0;
      var newPosRotate = { x: 0 };
      new TWEEN.Tween(boxGroup1.rotation)
        .to(newPosRotate, 2000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start();

    }
  }

  const boxGroup2 = scene.getObjectByName("rightSideGroup", true);
  if (boxGroup2) {
    if (Unfold) {
      // boxGroup1.rotation.y = Math.PI / 2;
      var newPosRotate = { z: -Math.PI / 2 };
      new TWEEN.Tween(boxGroup2.rotation)
        .to(newPosRotate, 2000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start();
    } else {
      // boxGroup1.rotation.y = 0;
      var newPosRotate = { z: 0 };
      new TWEEN.Tween(boxGroup2.rotation)
        .to(newPosRotate, 2000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start();

    }
  }

  const boxGroup3 = scene.getObjectByName("frontGroup", true);
  if (boxGroup3) {
    if (Unfold) {
      // boxGroup1.rotation.y = Math.PI / 2;
      var newPosRotate = { x: Math.PI /2 };
      new TWEEN.Tween(boxGroup3.rotation)
        .to(newPosRotate, 2000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start();
    } else {
      // boxGroup1.rotation.y = 0;
      var newPosRotate = {x: 0 };
      new TWEEN.Tween(boxGroup3.rotation)
        .to(newPosRotate, 2000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start();

    }
  }

  // const boxGroup4 = scene.getObjectByName("leftGroup", true);
  // if (boxGroup4) {
  //   if (Unfold) {
  //     // boxGroup1.rotation.y = Math.PI / 2;
  //     var newPosRotate = { z: Math.PI /2 };
  //     new TWEEN.Tween(boxGroup4.rotation)
  //       .to(newPosRotate, 2000)
  //       .easing(TWEEN.Easing.Sinusoidal.InOut)
  //       .start();
  //   } else {
  //     // boxGroup1.rotation.y = 0;
  //     var newPosRotate = {z: 0 };
  //     new TWEEN.Tween(boxGroup4.rotation)
  //       .to(newPosRotate, 2000)
  //       .easing(TWEEN.Easing.Sinusoidal.InOut)
  //       .start();

  //   }
  // }

  // const boxGroup6 = scene.getObjectByName("topGroup", true);
  // if (boxGroup6) {
  //   if (Unfold) {
  //     // boxGroup1.rotation.y = Math.PI / 2;
  //     var newPosRotate = { z: Math.PI /2 };
  //     new TWEEN.Tween(boxGroup6.rotation)
  //       .to(newPosRotate, 2000)
  //       .easing(TWEEN.Easing.Sinusoidal.InOut)
  //       .start();
  //   } else {
  //     // boxGroup1.rotation.y = 0;
  //     var newPosRotate = {z: 0 };
  //     new TWEEN.Tween(boxGroup6.rotation)
  //       .to(newPosRotate, 2000)
  //       .easing(TWEEN.Easing.Sinusoidal.InOut)
  //       .start();

  //   }
  // }

  const boxGroup7 = scene.getObjectByName("leftTopGroup", true);
  if (boxGroup7) {
    if (Unfold) {
      var newPosRotate = { z: Math.PI / 2 };
      new TWEEN.Tween(boxGroup7.rotation)
        .to(newPosRotate, 1000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start()
        .onComplete(function () {
          let top = scene.getObjectByName("topGroup", true);
          if (top) {
            var newPosRotate = { z: Math.PI / 2 };
            new TWEEN.Tween(top.rotation)
              .to(newPosRotate, 1000)
              .easing(TWEEN.Easing.Sinusoidal.InOut)
              .start();
          }
        });
    } else {
      var newPosRotate = { z: 0 };
      new TWEEN.Tween(boxGroup7.rotation)
        .to(newPosRotate, 1000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .start()
        .onComplete(function () {
          let top = scene.getObjectByName("topGroup", true);
          if (top) {
            var newPosRotate = { z: 0 };
            new TWEEN.Tween(top.rotation)
              .to(newPosRotate, 1000)
              .easing(TWEEN.Easing.Sinusoidal.InOut)
              .start();
          }
        });
    }
  }
}

  function createCube() {
    disposeAll();

    const comboGroup= new THREE.Group();
    comboGroup.position.set(-lengthofBox/2, -breadthofBox/2, lengthofBox/2);
    creatept(comboGroup.position.clone(),scene);

    //group1
    const group1 = new THREE.Group();
    group1.name = "backGroup";
    group1.position.set(-lengthofBox / 2, -breadthofBox/2, 0);
    creatept(group1.position.clone(), scene);

    const geometry1 = new THREE.BoxGeometry(lengthofBox,breadthofBox,thicknessofBox);
    const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const box1 = new THREE.Mesh(geometry1, material1);
    box1.name = "back";
    group1.attach(box1);
    scene.add(group1);

    //group2
    const group2 = new THREE.Group();
    group2.name = "rightSideGroup";
    group2.position.set(lengthofBox/2, -breadthofBox/2, 0)
    creatept(group2.position.clone(), scene);

    const box2 = new THREE.Mesh(geometry1.clone(), new THREE.MeshNormalMaterial());
    box2.rotateOnAxis(new THREE.Vector3(0,1,0), -Math.PI / 2);
    box2.position.set(lengthofBox / 2 ,0, lengthofBox/2);

    box2.name = "right";
    group2.attach(box2);
    scene.add(group2);

    //group3
    const group3=new THREE.Group();
    group3.name="frontGroup"
    group3.position.set(0, -breadthofBox/2 , lengthofBox);
    creatept(group3.position.clone(),scene);

    const box3=new THREE.Mesh(geometry1.clone(),new THREE.MeshBasicMaterial({color:0x00ff00}))
    box3.position.set(0,0,lengthofBox);
    box3.name="front";
    group3.attach(box3);
    scene.add(group3);

    //group4
    const group4=new THREE.Group();
    group4.name="bottomGroup"
    group4.position.set(0, -breadthofBox/2, lengthofBox/2);
    creatept(group4.position.clone(),scene);

    const geometry2 = new THREE.BoxGeometry(lengthofBox,lengthofBox,thicknessofBox)
    const box4=new THREE.Mesh(geometry2,new THREE.MeshBasicMaterial({color:0x0000ff}));
    box4.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2);
    box4.position.set( 0, -breadthofBox/2, lengthofBox/2);
    box4.name="bottom";
    group4.attach(box4);
    scene.add(group4)

    //group5
    const group5=new THREE.Group();
    group5.name="leftGroup";
    group5.position.set(-lengthofBox/2, -breadthofBox/2, lengthofBox/2);
    creatept(group5.position.clone(),scene);

    const box5=new THREE.Mesh(geometry1.clone(),new THREE.MeshBasicMaterial({color:0x0c0c0}))
    box5.rotateOnAxis(new THREE.Vector3(0,1,0),Math.PI/2);
    box5.position.set(-lengthofBox/2, 0 , lengthofBox/2);
    // box5.position.set(0,depthofBox,0);
    box5.name="left";

    // group5.add(box5);
    group5.attach(box5);
    comboGroup.attach(group5);
    // scene.add(group5);
    scene.add(comboGroup);

    //group6
    const group6=new THREE.Group();
    group6.name="topGroup";
    group6.position.set(-lengthofBox/2, breadthofBox/2, lengthofBox/2);
    creatept(group6.position.clone(),scene);

    const box6=new THREE.Mesh(geometry2.clone(),new THREE.MeshNormalMaterial());
    box6.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2);
    box6.position.set( 0, breadthofBox/2, lengthofBox/2);
    // box6.position.set( lengthofBox/2, 0, 0);
    box6.name="top";
    // group6.add(box6);
    group6.attach(box6);
    comboGroup.attach(group6);
    // scene.add(group6);
    comboGroup.name="leftTopGroup";
    scene.add(comboGroup);

  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className="containerRow">
        <div className="leftside col-3">
          <div><button type="button" className="btn btn-secondary"id="buttonStyle"onClick={createCube}>Cube</button></div>

          <div className="functionality">
            <div className="input-group" id="thickness">
              <label id="label">Thickness : </label>
              <span className="material-symbols-outlined"id="breadthMinus"type="button"onClick={decreaseThickness}>do_not_disturb_on</span>
              <input className="form-control no-padding add-color text-center height-25"id="thicknessWidth"step={0.1} value={value}placeholder="0.1"/>
              <span className="material-symbols-outlined"id="breadthPlus"type="button"onClick={incrementThickness}>add_circle</span>
            </div>

            <div className="input-group" id="length">
              <label id="label">Length : </label>
              <span className="material-symbols-outlined"id="breadthMinus"type="button"onClick={decreaseLength}>do_not_disturb_on</span>
              <input className="form-control no-padding add-color text-center "id="lengthWidth"step={0.1}value={length}placeholder="3"/>
              <span className="material-symbols-outlined"id="breadthPlus"type="button"onClick={increaseLength}>add_circle</span>
            </div>

            <div className="input-group " id="breadth">
              <label id="label">Breadth : </label>
              <span className="material-symbols-outlined"type="button"onClick={decreaseBreadth}>do_not_disturb_on</span>
              <input className="form-control no-padding add-color text-center"id="breadthWidth"step={0.1} value={breadth} placeholder="2"/>
              <span className="material-symbols-outlined"id="breadthPlus"type="button"onClick={increaseBreadth}>add_circle</span>
            </div>

            <div className="input-group" id="depth">
              <label id="label">Depth : </label>
              <span className="material-symbols-outlined"type="button"onClick={decreaseDepth}>do_not_disturb_on</span>
              <input className="form-control no-padding add-color text-center"id="depthWidth"step={0.1}value={depth}placeholder="1"/>
              <span className="material-symbols-outlined"id="breadthPlus"type="button"onClick={increaseDepth}>add_circle</span>
            </div>

            <InputGroup className="mb-3">
            <Button className="material-symbols-outlined add-color" variant="outline-secondary" id="button-addon1" onClick={incrementThickness}>add_circle</Button>
              <Form.Control aria-label="Example text with button addon" aria-describedby="basic-addon1" />
              <Button className="material-symbols-outlined" variant="outline-secondary" id="button-addon1" onClick={decreaseThickness}>do_not_disturb_on</Button>
            </InputGroup>

            <button id="unfold" onClick={foldUnfold}>{btnText}</button>
          </div>
        </div>
        <div className="rightside col-6" ref={mountRef}></div>
      </div>
    </>
  );
};
export default App;