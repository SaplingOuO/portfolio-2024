<script>
import * as THREE from 'three'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
var scene, mesh, camera, renderer, line;
export default {
    data() {
        return {
            value: 'Box',
            Data: [
                {
                    name: 'Box',
                    type: 'BoxGeometry',
                    ch: '方塊',
                    Controls: {
                        // value, max, min, step
                        width: { value: 15, max: 30, min: 1, step: 0.001 },
                        height: { value: 15, max: 30, min: 1, step: 0.001 },
                        depth: { value: 15, max: 30, min: 1, step: 0.001 },
                        widthSegments: { value: 1, max: 10, min: 1, step: 1 },
                        heightSegments: { value: 1, max: 10, min: 1, step: 1 },
                        depthSegments: { value: 1, max: 10, min: 1, step: 1 },
                    }
                },
                {
                    name: 'Capsule',
                    type: 'CapsuleGeometry',
                    ch: '膠囊',
                    Controls: {
                        radius: { value: 15, max: 30, min: 1, step: 0.001 },
                        length: { value: 15, max: 30, min: 1, step: 0.001 },
                        capSegments: { value: 10, max: 32, min: 1, step: 1 },
                        radialSegments: { value: 20, max: 64, min: 1, step: 1 },
                    }
                },
                {
                    name: 'Circle',
                    type: 'CircleGeometry',
                    ch: '圓',
                    Controls: {
                        radius: { value: 15, max: 30, min: 1, step: 0.001 },
                        segments: { value: 32, max: 128, min: 1, step: 1 },
                        thetaStart: { value: Math.PI * 2, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                        thetaLength: { value: Math.PI * 2, max: Math.PI * 2, min: 0, step: 0.00000000000001 }
                    }
                },
                {
                    name: 'Cone',
                    type: 'ConeGeometry',
                    ch: '圓錐',
                    Controls: {
                        radius: { value: 5, max: 30, min: 0, step: 0.01 },
                        height: { value: 10, max: 50, min: 1, step: 0.001 },
                        radialSegments: { value: 8, max: 64, min: 3, step: 1 },
                        heightSegments: { value: 1, max: 64, min: 1, step: 1 },
                        openEnded: { value: 0, max: 1, min: 0, step: 1 },
                        thetaStart: { value: 0, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                        thetaLength: { value: Math.PI * 2, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                    }
                },
                {
                    name: 'Cylinder',
                    type: 'CylinderGeometry',
                    ch: '圓柱',
                    Controls: {
                        radiusTop: { value: 5, max: 30, min: 0, step: 0.01 },
                        radiusBottom: { value: 5, max: 30, min: 0, step: 0.01 },
                        height: { value: 10, max: 50, min: 1, step: 0.001 },
                        radialSegments: { value: 8, max: 64, min: 3, step: 1 },
                        heightSegments: { value: 1, max: 64, min: 1, step: 1 },
                        openEnded: { value: 0, max: 1, min: 0, step: 1 },
                        thetaStart: { value: 0, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                        thetaLength: { value: Math.PI * 2, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                    }
                },
                {
                    name: 'Dodecahedron',
                    type: 'DodecahedronGeometry',
                    ch: '十二面體',
                    Controls: {
                        radius: { value: 10, max: 20, min: 1, step: 0.001 },
                        detail: { value: 1, max: 5, min: 0, step: 1 },
                    }
                },
                {
                    name: 'EdgesGeometry',
                    type: 'EdgesGeometry',
                    ch: '邊緣(未完成)',
                    Controls: {

                    }
                },
                {
                    name: 'Extrude',
                    type: 'ExtrudeGeometry',
                    ch: '拉伸',
                    Controls: {
                        shapeLength: { value: 8, max: 50, min: 1, step: 1 },
                        shapeWidth: { value: 12, max: 50, min: 1, step: 1 },
                        steps: { value: 2, max: 10, min: 1, step: 1 },
                        depth: { value: 16, max: 20, min: 1, step: 0.001 },
                        bevelThickness: { value: 1, max: 5, min: 1, step: 1 },
                        bevelSize: { value: 1, max: 4, min: 1, step: 1 },
                        bevelOffset: { value: 0, max: 4, min: -4, step: 1 },
                        bevelSegments: { value: 1, max: 5, min: 1, step: 1 },
                    }
                },
                {
                    name: 'Icosahedron',
                    type: 'IcosahedronGeometry',
                    ch: '二十面體',
                    Controls: {
                        radius: { value: 10, max: 20, min: 1, step: 0.001 },
                        detail: { value: 0, max: 5, min: 0, step: 1 },
                    }
                },
                {
                    name: 'Lathe',
                    type: 'LatheGeometry',
                    ch: '車床',
                    Controls: {
                        segments: { value: 12, max: 30, min: 1, step: 1 },
                        phiStart: { value: 0, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                        phiLength: { value: Math.PI * 2, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                    }
                },
                {
                    name: 'Octahedron',
                    type: 'OctahedronGeometry',
                    ch: '八面體',
                    Controls: {
                        radius: { value: 10, max: 20, min: 1, step: 0.001 },
                        detail: { value: 0, max: 5, min: 0, step: 1 },
                    }
                },
                {
                    name: 'Plane',
                    type: 'PlaneGeometry',
                    ch: '平面',
                    Controls: {
                        width: { value: 10, max: 30, min: 1, step: 0.001 },
                        height: { value: 10, max: 30, min: 1, step: 0.001 },
                        widthSegments: { value: 1, max: 30, min: 1, step: 1 },
                        heightSegments: { value: 1, max: 30, min: 1, step: 1 },
                    }
                },
                {
                    name: 'PolyhedronGeometry',
                    type: 'PolyhedronGeometry',
                    ch: '多面體(未完成)',
                    Controls: {

                    }
                },
                {
                    name: 'Ring',
                    type: 'RingGeometry',
                    ch: '環形',
                    Controls: {
                        innerRadius: { value: 5, max: 30, min: 1, step: 0.001 },
                        outerRadius: { value: 10, max: 30, min: 1, step: 0.001 },
                        thetaSegments: { value: 8, max: 30, min: 1, step: 1 },
                        phiSegments: { value: 8, max: 30, min: 1, step: 1 },
                        thetaStart: { value: 0, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                        thetaLength: { value: Math.PI * 2, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                    }
                },
                {
                    name: 'ShapeGeometry',
                    type: 'ShapeGeometry',
                    ch: '形狀(未完成)',
                    Controls: {

                    }
                },
                {
                    name: 'Sphere',
                    type: 'SphereGeometry',
                    ch: '球體',
                    Controls: {
                        radius: { value: 15, max: 30, min: 1, step: 0.001 },
                        widthSegments: { value: 32, max: 64, min: 3, step: 1 },
                        heightSegments: { value: 16, max: 32, min: 2, step: 1 },
                        phiStart: { value: 0, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                        phiLength: { value: Math.PI * 2, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                        thetaStart: { value: 0, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                        thetaLength: { value: Math.PI, max: Math.PI * 2, min: 0, step: 0.00000000000001 },
                    }
                },
                {
                    name: 'Tetrahedron',
                    type: 'TetrahedronGeometry',
                    ch: '四面體',
                    Controls: {
                        radius: { value: 10, max: 20, min: 1, step: 0.001 },
                        detail: { value: 0, max: 5, min: 0, step: 1 },
                    }
                },
                {
                    name: 'Torus',
                    type: 'TorusGeometry',
                    ch: '環面',
                    Controls: {
                        radius: { value: 10, max: 20, min: 1, step: 0.001 },
                        tube: { value: 3, max: 10, min: 0.1, step: 0.001 },
                        radialSegments: { value: 16, max: 30, min: 2, step: 1 },
                        tubularSegments: { value: 100, max: 200, min: 3, step: 1 },
                        arc: { value: Math.PI * 2, max: Math.PI * 2, min: 0.1, step: 0.00000000000001 },
                    }
                },
                {
                    name: 'TorusKnot',
                    type: 'TorusKnotGeometry',
                    ch: '環面結',
                    Controls: {
                        radius: { value: 10, max: 20, min: 1, step: 0.001 },
                        tube: { value: 3, max: 10, min: 0.1, step: 0.0001 },
                        tubularSegments: { value: 64, max: 300, min: 3, step: 1 },
                        radialSegments: { value: 8, max: 20, min: 3, step: 1 },
                        p: { value: 2, max: 20, min: 1, step: 1 },
                        q: { value: 3, max: 20, min: 1, step: 1 },
                    }
                },
                {
                    name: 'Tube',
                    type: 'TubeGeometry',
                    ch: '管(未完成)',
                    Controls: {
                        segments: { value: 20, max: 100, min: 1, step: 1 },
                        radius: { value: 2, max: 10, min: 1, step: 0.001 },
                        radialSegments: { value: 8, max: 20, min: 1, step: 1 },
                    }
                },
                {
                    name: 'WireframeGeometry',
                    type: 'WireframeGeometry',
                    ch: '線框(未完成)',
                    Controls: {

                    }
                },
            ],
            mesh: null,
        }
    },
    mounted() {
        // 創建場景、相機和渲染器
        this.initThree()

        // 創建模型
        this.createGeometry(this.value)
        
        // 控制物體方法
        // this.createDragControls()

        // 啟動渲染循環
        this.animate()
    },
    methods: {
        initThree() {
            // 創建場景
            scene = new THREE.Scene();

            // 創建相機
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 50;

            // 創建渲染器
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(400, 400);
            this.$refs.canvasContainer.appendChild(renderer.domElement);

            // 添加光源
            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(1, 1, 1).normalize();
            scene.add(light);
        },
        createGeometry(type){ 
            const data = this.Data.find(item => item.name === type);
            switch(type){
                case 'Box':
                    this.createBoxGeometry(data);
                    break;
                case 'Capsule':
                    this.createCapsuleGeometry(data);
                    break;
                case 'Circle':
                    this.createCircleGeometry(data);
                    break;
                case 'Cone':
                    this.createConeGeometry(data);
                    break;
                case 'Cylinder':
                    this.createCylinderGeometry(data);
                    break;
                case 'Dodecahedron':
                    this.createDodecahedronGeometry(data);
                    break;
                case 'EdgesGeometry':
                    this.createEdgesGeometry(data);
                    break;
                case 'Extrude':
                    this.createExtrudeGeometry(data);
                    break;
                case 'Icosahedron':
                    this.createIcosahedronGeometry(data);
                    break;
                case 'Lathe':
                    this.createLatheGeometry(data);
                    break;
                case 'Octahedron':
                    this.createOctahedronGeometry(data);
                    break;
                case 'Plane':
                    this.createPlaneGeometry(data);
                    break;
                case 'PolyhedronGeometry':
                    this.createPolyhedronGeometry(data);
                    break;
                case 'Ring':
                    this.createRingGeometry(data);
                    break;
                case 'ShapeGeometry':
                    this.createShapeGeometry(data);
                    break;
                case 'Sphere':
                    this.createSphereGeometry(data);
                    break;
                case 'Tetrahedron':
                    this.createTetrahedronGeometry(data);
                    break;
                case 'Torus':
                    this.createTorusGeometry(data);
                    break;
                case 'TorusKnot':
                    this.createTorusKnotGeometry(data);
                    break;
                case 'Tube':
                    this.createTubeGeometry(data);
                    break;
                case 'WireframeGeometry':
                    this.createWireframeGeometry(data);
                    break;
                default:
                    console.warn(`Unknown geometry type: ${type}`);
                    break;
            }

        },
        createBoxGeometry(data){
            const {width, height, depth, widthSegments, heightSegments, depthSegments}  = data.Controls;
            const geometry = new THREE.BoxGeometry(width.value, height.value, depth.value, widthSegments.value, heightSegments.value, depthSegments.value);

            this.createMeshAndWireframe(geometry);
        },
        createCapsuleGeometry(data) {
            const {radius, length, capSegments, radialSegments} = data.Controls;
            const geometry = new THREE.CapsuleGeometry( radius.value, length.value, capSegments.value, radialSegments.value ); 
            
            this.createMeshAndWireframe(geometry);
        },
        createCircleGeometry(data) {
            const {radius, segments, thetaStart, thetaLength} = data.Controls;
            const geometry = new THREE.CircleGeometry(radius.value, segments.value, thetaStart.value, thetaLength.value);

            this.createMeshAndWireframe(geometry);
        },
        createConeGeometry(data) {
            const {radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength} = data.Controls;
            let openEnded_case = null;
            switch(openEnded.value){
                case 0:
                    openEnded_case = false;
                    break;
                case 1:
                    openEnded_case = true;
                    break;
            }
            const geometry = new THREE.ConeGeometry( radius.value, height.value, radialSegments.value, heightSegments.value, openEnded_case, thetaStart.value, thetaLength.value );

            this.createMeshAndWireframe(geometry);
        },
        createCylinderGeometry(data) {
            const {radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength} = data.Controls;
            let openEnded_case = null;
            switch(openEnded.value){
                case 0:
                    openEnded_case = false;
                    break;
                case 1:
                    openEnded_case = true;
                    break;
            }
            const geometry = new THREE.CylinderGeometry( radiusTop.value, radiusBottom.value, height.value, radialSegments.value, heightSegments.value, openEnded_case, thetaStart.value, thetaLength.value );

            this.createMeshAndWireframe(geometry);
        },
        createDodecahedronGeometry(data) {
            const {radius, detail} = data.Controls;
            const geometry = new THREE.DodecahedronGeometry(radius.value, detail.value);

            this.createMeshAndWireframe(geometry);

        },
        createEdgesGeometry(data) {
            const {aaa} = data.Controls;
            console.log(aaa);

        },
        createExtrudeGeometry(data) {
            const {steps, depth, bevelThickness, bevelSize, bevelOffset, bevelSegments, shapeLength, shapeWidth} = data.Controls;

            const shape = new THREE.Shape();
            shape.moveTo( 0,0 );
            shape.lineTo( 0, shapeWidth.value );
            shape.lineTo( shapeLength.value, shapeWidth.value );
            shape.lineTo( shapeLength.value, 0 );
            shape.lineTo( 0, 0 );

            const extrudeSettings = {
                steps: steps.value,
                depth: depth.value,
                bevelEnabled: true,
                bevelThickness: bevelThickness.value,
                bevelSize: bevelSize.value,
                bevelOffset: bevelOffset.value,
                bevelSegments: bevelSegments.value
            };


            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            geometry.center();

            this.createMeshAndWireframe(geometry);

        },
        createIcosahedronGeometry(data) {
            const {radius, detail} = data.Controls;
            const geometry = new THREE.IcosahedronGeometry(radius.value, detail.value);

            this.createMeshAndWireframe(geometry);
        },
        createLatheGeometry(data) {
            const {segments, phiStart, phiLength} = data.Controls;
            const points = [];
            for ( let i = 0; i < 10; i ++ ) {
                points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
            }
            const geometry = new THREE.LatheGeometry( points, segments.value, phiStart.value, phiLength.value );
            this.createMeshAndWireframe(geometry);
        },
        createOctahedronGeometry(data) {
            const {radius, detail} = data.Controls;
            const geometry = new THREE.OctahedronGeometry(radius.value, detail.value);

            this.createMeshAndWireframe(geometry);
        },
        createPlaneGeometry(data) {
            const {width , height, widthSegments, heightSegments} = data.Controls;
            const geometry = new THREE.PlaneGeometry(width.value , height.value, widthSegments.value, heightSegments.value);

            this.createMeshAndWireframe(geometry);
        },
        createPolyhedronGeometry(data) {
            const {aaa} = data.Controls;
            console.log(aaa);

        },
        createRingGeometry(data) {
            const {innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength} = data.Controls;
            const geometry = new THREE.RingGeometry(innerRadius.value, outerRadius.value, thetaSegments.value, phiSegments.value, thetaStart.value, thetaLength.value);

            this.createMeshAndWireframe(geometry);
        },
        createShapeGeometry(data) {
            const {aaa} = data.Controls;
            console.log(aaa);

        },
        createSphereGeometry(data) {
            const {radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength} = data.Controls;
            const geometry = new THREE.SphereGeometry(radius.value, widthSegments.value, heightSegments.value, phiStart.value, phiLength.value, thetaStart.value, thetaLength.value);

            this.createMeshAndWireframe(geometry);

        },
        createTetrahedronGeometry(data) {
            const {radius, detail} = data.Controls;
            const geometry = new THREE.TetrahedronGeometry(radius.value, detail.value);

            this.createMeshAndWireframe(geometry);
        },
        createTorusGeometry(data) {
            const {radius, tube, radialSegments, tubularSegments, arc} = data.Controls;
            const geometry = new THREE.TorusGeometry(radius.value, tube.value, radialSegments.value, tubularSegments.value, arc.value);

            this.createMeshAndWireframe(geometry);
        },
        createTorusKnotGeometry(data) {
            const {radius, tube, tubularSegments, radialSegments, p, q} = data.Controls;
            const geometry = new THREE.TorusKnotGeometry(radius.value, tube.value, tubularSegments.value, radialSegments.value, p.value, q.value);

            this.createMeshAndWireframe(geometry);
        },
        createTubeGeometry(data) {
            const {aaa} = data.Controls;
            console.log(aaa);

        },
        createWireframeGeometry(data) {
            const {aaa} = data.Controls;
            console.log(aaa);

        },
        createDragControls(){

            // 創建 DragControls
            const objects = [mesh]; // 要拖動的物體
            const controls = new DragControls(objects, camera, renderer.domElement);
            let previousMousePosition = { x: 0, y: 0 };
            controls.addEventListener('dragstart', function (event) {
                previousMousePosition = { x: event.clientX, y: event.clientY };
            });
            // 當拖動過程中更新物體的旋轉
            controls.addEventListener('drag', function (event) {
                const deltaX = event.clientX - previousMousePosition.x;
                const deltaY = event.clientY - previousMousePosition.y;

                // 更新物體的旋轉，基於拖動的移動距離
                mesh.rotation.y += deltaX * 0.01; // 旋轉繞Y軸
                mesh.rotation.x += deltaY * 0.01; // 旋轉繞X軸
                line.rotation.y += deltaX * 0.01; // 旋轉繞Y軸
                line.rotation.x += deltaY * 0.01; // 旋轉繞X軸

                // 記錄新的鼠標位置
                previousMousePosition = { x: event.clientX, y: event.clientY };
            });

        },
        animate() {
            requestAnimationFrame(this.animate);

            // 使幾何體旋轉
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.005;
            
            line.rotation.x += 0.005;
            line.rotation.y += 0.005;

            // 渲染場景
            renderer.render(scene, camera);
        },
        createMeshAndWireframe(geometry){
            const material = new THREE.MeshBasicMaterial( { color: 0x66C2FF} );
            mesh = new THREE.Mesh( geometry, material );
            scene.add(mesh);
            const wireframe = new THREE.WireframeGeometry(geometry);
            line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0xffffff }));
            scene.add(line);
        },
        updateGeometry(type){
            scene.remove(mesh);
            scene.remove(line);
            const data = this.Data.find(item => item.name === type);
            switch(type){
                case 'Box':
                    this.createBoxGeometry(data);
                    break;
                case 'Capsule':
                    this.createCapsuleGeometry(data);
                    break;
                case 'Circle':
                    this.createCircleGeometry(data);
                    break;
                case 'Cone':
                    this.createConeGeometry(data);
                    break;
                case 'Cylinder':
                    this.createCylinderGeometry(data);
                    break;
                case 'Dodecahedron':
                    this.createDodecahedronGeometry(data);
                    break;
                case 'EdgesGeometry':
                    this.createEdgesGeometry(data);
                    break;
                case 'Extrude':
                    this.createExtrudeGeometry(data);
                    break;
                case 'Icosahedron':
                    this.createIcosahedronGeometry(data);
                    break;
                case 'Lathe':
                    this.createLatheGeometry(data);
                    break;
                case 'Octahedron':
                    this.createOctahedronGeometry(data);
                    break;
                case 'Plane':
                    this.createPlaneGeometry(data);
                    break;
                case 'PolyhedronGeometry':
                    this.createPolyhedronGeometry(data);
                    break;
                case 'Ring':
                    this.createRingGeometry(data);
                    break;
                case 'ShapeGeometry':
                    this.createShapeGeometry(data);
                    break;
                case 'Sphere':
                    this.createSphereGeometry(data);
                    break;
                case 'Tetrahedron':
                    this.createTetrahedronGeometry(data);
                    break;
                case 'Torus':
                    this.createTorusGeometry(data);
                    break;
                case 'TorusKnot':
                    this.createTorusKnotGeometry(data);
                    break;
                case 'Tube':
                    this.createTubeGeometry(data);
                    break;
                case 'WireframeGeometry':
                    this.createWireframeGeometry(data);
                    break;
                default:
                    console.warn(`Unknown geometry type: ${type}`);
                    break;
            }

        },
        test() {
            console.log(this.value);
            console.log(mesh)
        }
    },
}
</script>

<template>
    <div class="row g-0">
        <div class="col">
            <select class="form-select" v-model="value" @change="updateGeometry(value)" aria-label="Default select example">
                <option v-for="item in Data" :key="item.name" :value="item.name">{{ item.ch }}</option>
            </select>
            <div v-for="(control, key) in Data.find(item => item.name === value).Controls" :key="key"
                class="row p-2 d-flex justify-content-evenly align-items-center">
                <div class="col">{{ key }}</div>
                <input class="col m-2 text-center" :placeholder="key" v-model.number="control.value" @input="updateGeometry(value)">
                <input class="col-md form-range" type="range" :min="control.min" :max="control.max" :step="control.step" v-model.number="control.value" @input="updateGeometry(value)">
            </div>

            <button @click="test()">TEST</button>

        </div>
        <div class="col g-4 d-flex justify-content-evenly" ref="canvasContainer"></div>
    </div>
</template>

<style>
canvas {
    width: 100%;
    height: 100%;
}
</style>