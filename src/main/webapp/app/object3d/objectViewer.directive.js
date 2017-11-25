/**
 * Created by Katarzyna on 2017-11-07.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .directive('ngWebgl', ngWebgl);

    ngWebgl.$inject = [];

    /* @ngInject */
    function ngWebgl() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                'width': '=',
                'height': '=',
                'fillcontainer': '=',
                'scale': '=',
                'materialType': '=',
                'materialObj': '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
                var camera, controls, scene, renderer,
                    shadowMesh, icosahedron, spotLight, hemiLight,
                    mouseX = 0,
                    mouseY = 0,
                    contW = (scope.fillcontainer) ? element[0].clientWidth : scope.width,
                    contH = scope.height,
                    windowHalfX = contW / 2,
                    windowHalfY = contH / 2,
                    materials = {},
                    models = {},
                    manager = new THREE.LoadingManager(),
                    logger = new THREE.LoaderSupport.ConsoleLogger;

                manager.onProgress = function (item, loaded, total) {
                    console.log(item, loaded, total);
                };

                var onProgress = function (xhr) {
                    if (xhr.lengthComputable) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log(Math.round(percentComplete, 2) + '% downloaded');
                    }
                };


                var onError = function (xhr) {
                    console.log('Error: ' + xhr);
                };

                scope.init = function () {
                    THREE.ImageUtils.crossOrigin = '';

                    // Camera
                    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
                    camera.position.set(0, -50, 250);
                    //camera.posiion.z = 250;
                    camera.up = new THREE.Vector3(0, 1, 0);
                    camera.lookAt(new THREE.Vector3(0, 0, 100));
                    camera.updateProjectionMatrix();

                    // Controls
                    controls = new THREE.OrbitControls(camera);
                    controls.maxPolarAngle = Math.PI / 2;
                    controls.minDistance = 4;
                    controls.maxDistance = Infinity;

                    // Scene
                    scene = new THREE.Scene();
                    scene.background = new THREE.Color( 0x333333 );

                    // Axes helper
                    //axis = new THREE.\Helper( 100 );
                    //scene.add( axis );

                    // Ligthing
                    spotLight = new THREE.SpotLight(0xffffff);
                    spotLight.position.set(100, 1000, 100);

                    spotLight.castShadow = true;
                    spotLight.shadowDarkness = 0.5;
                    spotLight.shadowCameraVisible = true;

                    spotLight.shadowMapWidth = 24;
                    spotLight.shadowMapHeight = 24;

                    spotLight.shadowCameraNear = 500;
                    spotLight.shadowCameraFar = 4000;
                    spotLight.shadowCameraFov = 30;

                    scene.add(spotLight);

                    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
                    hemiLight.color.setHSL(0.6, 1, 0.6);
                    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
                    hemiLight.position.set(0, 500, 0);
                    scene.add(hemiLight);

                    // Models
                    var result;
                    angular.forEach(scope.materialObj, function (value, key) {
                        scope.loadModelAndMaterials(models, manager, value);
                    }, result);

                    // Grass
                    var grassTexture = THREE.ImageUtils.loadTexture('https://dl.dropboxusercontent.com/s/8eyr7d1ghxh511d/grass.png?raw=1');
                    grassTexture.wrapS = THREE.RepeatWrapping;
                    grassTexture.wrapT = THREE.RepeatWrapping;
                    grassTexture.repeat.x = 256;
                    grassTexture.repeat.y = 256;

                    var groundMaterial = new THREE.MeshBasicMaterial({
                        map: grassTexture
                    });

                    var groundGeometry = new THREE.PlaneBufferGeometry(400, 400);
                    var ground = new THREE.Mesh(groundGeometry, groundMaterial);
                    ground.position.y = -1.25;
                    ground.rotation.x = -Math.PI / 2; //-90 degrees around the xaxis
                    ground.doubleSided = true;
                    ground.receiveShadow = true;
                    // scene.add(ground);

                    // SKYDOME
                    var vertexShader = "varying vec3 vWorldPosition;void main() {vec4 worldPosition = modelMatrix * vec4(position, 1.0);vWorldPosition = worldPosition.xyz;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);}"
                    var fragmentShader = "uniform vec3 topColor;uniform vec3 bottomColor;uniform float offset;uniform float exponent;varying vec3 vWorldPosition;void main() {float h = normalize(vWorldPosition + offset).y;gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);}"
                    var uniforms = {
                        topColor: {
                            type: "c",
                            value: new THREE.Color(0x0077ff)
                        },
                        bottomColor: {
                            type: "c",
                            value: new THREE.Color(0xffffff)
                        },
                        offset: {
                            type: "f",
                            value: 33
                        },
                        exponent: {
                            type: "f",
                            value: 0.6
                        }
                    }
                    uniforms.topColor.value.copy(hemiLight.color);

                    scene.fog = new THREE.Fog(0xffffff, 1, 5000);
                    scene.fog.color.setHSL(0.6, 0, 1);
                    scene.fog.color.copy(uniforms.bottomColor.value);

                    var skyGeo = new THREE.SphereGeometry(4000, 32, 15);
                    var skyMat = new THREE.ShaderMaterial({
                        vertexShader: vertexShader,
                        fragmentShader: fragmentShader,
                        uniforms: uniforms,
                        side: THREE.BackSide
                    });

                    var sky = new THREE.Mesh(skyGeo, skyMat);
                    //scene.add(sky);

                    // Shadow
                    var canvas = document.createElement('canvas');
                    canvas.width = 128;
                    canvas.height = 128;

                    // Render a 2d gradient to use as shadow
                    var context = canvas.getContext('2d');
                    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

                    gradient.addColorStop(0.1, 'rgba(200,200,200,1)');
                    gradient.addColorStop(1, 'rgba(255,255,255,1)');

                    context.fillStyle = gradient;
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    var shadowTexture = new THREE.Texture(canvas);
                    shadowTexture.needsUpdate = true;

                    var shadowMaterial = new THREE.MeshBasicMaterial({
                        map: shadowTexture
                    });
                    var shadowGeo = new THREE.PlaneGeometry(300, 300, 1, 1);

                    // Apply the shadow texture to a plane
                    shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
                    shadowMesh.position.y = -250;
                    shadowMesh.rotation.x = -Math.PI / 2;
                    //scene.add(shadowMesh);


                    var faceIndices = ['a', 'b', 'c', 'd'];

                    var color, f, p, n, vertexIndex,
                        radius = 200,
                        geometry = new THREE.IcosahedronGeometry(radius, 1);

                    for (var i = 0; i < geometry.faces.length; i++) {
                        f = geometry.faces[i];
                        n = (f instanceof THREE.Face3) ? 3 : 4;
                        for (var j = 0; j < n; j++) {

                            vertexIndex = f[faceIndices[j]];

                            p = geometry.vertices[vertexIndex];

                            color = new THREE.Color(0xffffff);
                            color.setHSL(0.125 * vertexIndex / geometry.vertices.length, 1.0, 0.5);

                            f.vertexColors[j] = color;
                        }
                    }

                    materials.lambert = new THREE.MeshLambertMaterial({
                        color: 0xffffff,
                        shading: THREE.FlatShading,
                        vertexColors: THREE.VertexColors
                    });

                    materials.phong = new THREE.MeshPhongMaterial({
                        ambient: 0x030303,
                        color: 0xdddddd,
                        specular: 0x009900,
                        shininess: 30,
                        shading: THREE.FlatShading,
                        vertexColors: THREE.VertexColors
                    });

                    materials.wireframe = new THREE.MeshBasicMaterial({
                        color: 0x000000,
                        shading: THREE.FlatShading,
                        wireframe: true,
                        transparent: true
                    });

                    // Build and add the icosahedron to the scene
                    icosahedron = new THREE.Mesh(geometry, materials[scope.materialType]);
                    icosahedron.position.x = 0;
                    icosahedron.rotation.x = 0;
                    //scene.add(icosahedron);

                    if (scope.webglAvailable()) {
                        renderer = new THREE.WebGLRenderer({
                            antialias: true
                        });
                        renderer.setClearColor(0xffffff);
                        renderer.setSize(contW, contH);
                        renderer.gammaInput = true;
                        renderer.gammaOutput = true;
                        renderer.shadowMapEnabled = true;
                        renderer.shadowMapCullFace = THREE.CullFaceBack;
                    } else {
                        renderer = new THREE.CanvasRenderer({
                            antialias: true
                        });
                    }

                    /* var stats = new Stats();
                     element[0].appendChild(stats.domElement);*/

                    // element is provided by the angular directive
                    element[0].appendChild(renderer.domElement);

                    canvas.addEventListener('mousemove', scope.onDocumentMouseMove, false);

                    window.addEventListener('resize', scope.onWindowResize, false);
                };

                // -----------------------------------
                // Load Model and Materials
                // -----------------------------------
                scope.loadModelAndMaterials = function (storage, manager, data) {
                    THREE.ImageUtils.crossOrigin = '';
                    var mtlLoader = new THREE.MTLLoader;
                    mtlLoader.setCrossOrigin(true);


                    console.log('end');

                    console.log('begin');


                   // mtlLoader.setBaseUrl(data['baseUrl']);
                    //mtlLoader.setPath(data['baseUrl']);
                    mtlLoader.setTexturePath(data['baseUrl']);
                    mtlLoader.load(data['mtlUrl'], function( materials ) {

                        materials.preload();

                        var objLoader = new THREE.OBJLoader(manager);
                        var object = data['objUrl'];
                        objLoader.setMaterials( materials );
                        // objLoader.setPath(data['baseUrl']);
                        objLoader.load(data['objUrl'], function ( Object ) {
                        //var obj = new Uint8Array(data['objUrl']);

                        //objLoader.parse(data['objUrl'], function ( Object ) {

                            Object.position.x = data['position']['x'];
                            Object.position.y = data['position']['y'];
                            Object.position.z = data['position']['z'];

                            Object.castShadow = true;
                            Object.receiveShadow = true;
                            Object.scale.set(1, 1, 1);
                            Object.name = data['name'];

                            storage[data['name']] = Object;
                            scope.createMenu(Object);
                        }, manager.onProgress, manager.onError);

                    } );

                };

                // -----------------------------------
                // Create Menu
                // -----------------------------------
                scope.createMenu = function (object) {
                    $('#footer').append(
                        $('<button/>', {
                            text: object.name,
                            id: 'btn_' + object.name,
                            click: function () {
                                scope.removeAndLoad(object.name);
                            }
                        }));
                    if (!scope.defaultLoaded) {
                        scope.removeAndLoad(object.name);
                        scope.defaultLoaded = !scope.defaultLoaded;
                    }
                };

                // -----------------------------------
                // Remove and add models
                // -----------------------------------
                scope.removeAndLoad = function (name) {
                    if ('Boar' === name) {
                        scene.remove(models['Shark']);
                    } else {
                        scene.remove(models['Boar']);
                    }

                    scene.add(models[name]);
                };

                // -----------------------------------
                // Detect WebGL
                // -----------------------------------
                scope.webglAvailable = function () {
                    try {
                        var canvas = document.createElement('canvas');
                        return !!(window.WebGLRenderingContext && (
                        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
                    } catch (e) {
                        return false;
                    }
                };

                // -----------------------------------
                // Event listeners
                // -----------------------------------
                scope.onWindowResize = function () {
                    scope.resizeCanvas();
                };

                scope.onDocumentMouseMove = function (event) {
                    console.log(event.pageX, event.pageY);
                    mouseX = (event.clientX - windowHalfX) / 2;
                    mouseY = (event.clientY - windowHalfY) / 2;
                };

                // -----------------------------------
                // Updates
                // -----------------------------------
                scope.resizeCanvas = function () {
                    contW = (scope.fillcontainer) ? element[0].clientWidth : scope.width;
                    contH = scope.height;

                    windowHalfX = contW / 2;
                    windowHalfY = contH / 2;

                    camera.aspect = contW / contH;
                    camera.updateProjectionMatrix();

                    renderer.setSize(contW, contH);
                };

                scope.resizeObject = function () {
                    icosahedron.scale.set(scope.scale, scope.scale, scope.scale);
                    shadowMesh.scale.set(scope.scale, scope.scale, scope.scale);
                };

                scope.changeMaterial = function () {
                    icosahedron.material = materials[scope.materialType];
                };

                // -----------------------------------
                // Draw and Animate
                // -----------------------------------
                scope.animate = function () {
                    requestAnimationFrame(scope.animate);
                    scope.render();
                    //  stats.update();
                };

                scope.render = function () {
                    // camera.position.x += (mouseX - camera.position.x) * 0.05;
                    // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
                    // camera.lookAt(scene.position);
                    renderer.render(scene, camera);
                };

                // -----------------------------------
                // Watches
                // -----------------------------------
                scope.$watch('fillcontainer + width + height', function () {
                    scope.resizeCanvas();
                });

                scope.$watch('scale', function () {
                    scope.resizeObject();
                });

                scope.$watch('materialType', function () {
                    scope.changeMaterial();
                });

                // Begin
                scope.init();
                scope.animate();


        }

    }


})();

