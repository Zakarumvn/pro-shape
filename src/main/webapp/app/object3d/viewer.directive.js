/**
 * Created by Katarzyna on 2017-12-19.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .directive('viewer', viewer);

    viewer.$inject = [];

    /* @ngInject */
    function viewer() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                'materialObj': '=',
                'width': '=',
                'height': '=',
                'fillcontainer': '='

            }
        };
        return directive;

        function link(scope, element, attrs) {
// The detector will show a warning if the current browser does not support WebGL.
            if (!Detector.webgl) {
                Detector.addGetWebGLMessage();
            }


// All of these variables will be needed later, just ignore them for now.
            var container;
            var camera, controls, scene, renderer;
            var lighting, ambient, keyLight, fillLight, backLight;
            var x;
            var y;
            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            init();
            animate();
            function init() {
                container = document.getElementById('webglContainer');
                x = (scope.fillcontainer) ? container.clientWidth : scope.width;
                y = scope.height;
                /* Camera */
                camera = new THREE.PerspectiveCamera(45, windowHalfX / windowHalfY, 1, 2000);
                camera.position.set(0, -50, 250);
                camera.updateProjectionMatrix();

                /* Scene */
                scene = new THREE.Scene();
                lighting = false;
                ambient = new THREE.AmbientLight(0xffffff, 1.0);
                scene.add(ambient);
                keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
                keyLight.position.set(-100, 0, 100);
                fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
                fillLight.position.set(100, 0, 100);
                backLight = new THREE.DirectionalLight(0xffffff, 1.0);
                backLight.position.set(100, 0, -100).normalize();

                angular.forEach(scope.materialObj, function (value, key) {
                    loadModelAndMaterials(value);
                });

                /* Renderer */
                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(x, y);
                camera.aspect = x / y;
                camera.updateProjectionMatrix();
                renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));
                element[0].appendChild(renderer.domElement);
                /* Controls */
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.25;
                controls.enableZoom = true;
                /* Events */
                window.addEventListener('resize', onWindowResize, false);
                window.addEventListener('keydown', onKeyboardEvent, false);
                window.addEventListener('mousemove', scope.onDocumentMouseMove, false);
            }

            function loadModelAndMaterials(data) {

                /* Model */
                var mtlLoader = new THREE.MTLLoader();
                THREE.ImageUtils.crossOrigin = '';
                mtlLoader.setCrossOrigin(true);
                if(data['baseUrl'] !== ''){
                    mtlLoader.setTexturePath(data['baseUrl']);
                }
                mtlLoader.load(data['mtlUrl'], function (materials) {
                    materials.preload();
                    var objLoader = new THREE.OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load(data['objUrl'], function (object) {
                        scene.add(object);
                    });
                });
            }

            function onWindowResize() {
                x = (scope.fillcontainer) ? element[0].clientWidth : scope.width;
                y = scope.height;
                camera.aspect = x / y;
                camera.updateProjectionMatrix();
                renderer.setSize(x, y);
            }

            function onKeyboardEvent(e) {
                if (e.code === 'KeyL') {
                    lighting = !lighting;
                    if (lighting) {
                        ambient.intensity = 0.25;
                        scene.add(keyLight);
                        scene.add(fillLight);
                        scene.add(backLight);
                    } else {
                        ambient.intensity = 1.0;
                        scene.remove(keyLight);
                        scene.remove(fillLight);
                        scene.remove(backLight);
                    }
                }
            }

            scope.onDocumentMouseMove = function (event) {
                console.log(event.pageX, event.pageY);
                mouseX = (event.clientX - windowHalfX) / 2;
                mouseY = (event.clientY - windowHalfY) / 2;
            };

            function animate() {

                requestAnimationFrame(animate);
                controls.update();
                render();
            }

            function render() {
                renderer.render(scene, camera);
            }


            /*link*/
        }

    }

})();

