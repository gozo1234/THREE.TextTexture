(function() {

	var alignValues = [
		'center',
		'left',
		'right',
	];
	var fontFamilyValues = [
		'Finger Paint',
		'Barrio',
		'Fredericka the Great',
		'Shadows Into Light',
		'Quicksand',
	];
	var fontStyleValues = [
		'normal',
		'italic',
	];
	var fontVariantValues = [
		'normal',
		'small-caps',
	];
	var fontWeightValues = [
		'normal',
		'bold',
	];
	Promise
		.all(fontFamilyValues.map(function(fontFamily) {
			return (new FontFaceObserver(fontFamily)).load();
		}))
		.catch(function() {})
		.then(function() {
			var renderer = new THREE.WebGLRenderer({antialias: true});
			renderer.setPixelRatio(devicePixelRatio);
			renderer.setClearColor(0x19984b);
			document.body.appendChild(renderer.domElement);
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(75, 1);
			camera.position.set(0, 0, 3);
			var texture = new THREE.TextTexture({
				align: alignValues[0],
				fillStyle: '#e59500',
				fontFamily: fontFamilyValues[0],
				fontSize: 32,
				fontStyle: fontStyleValues[0],
				fontVariant: fontVariantValues[0],
				fontWeight: fontWeightValues[0],
				strokeStyle: '#840032',
				strokeWidth: 1/10,
				text: [
					'Twinkle, twinkle, little star,',
					'How I wonder what you are!',
					'Up above the world so high,',
					'Like a diamond in the sky.',
				].join('\n'),
			});
			var material = new THREE.MeshBasicMaterial({
				map: texture,
				transparent: true,
			});
			var geometry = new THREE.PlaneGeometry(4, 4, 4);
			var mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);
			var updateMeshScale = function() {
				mesh.scale.set(1, material.map.image.height / material.map.image.width, 1);
			};
			var rotateMesh = (function() {
				var nextStep = function(step, value, minValue, maxValue) {
					return step * ((value < minValue || value > maxValue) ? -1 : 1);
				};
				var x = 1/800;
				var y = 1/600;
				var z = 1/400;
				return function() {
					mesh.rotation.x += (x = nextStep(x, mesh.rotation.x, -1/7, 1/3));
					mesh.rotation.y += (y = nextStep(y, mesh.rotation.y, -1/7, 1/3));
					mesh.rotation.z += (z = nextStep(z, mesh.rotation.z, -1/7, 1/3));
				};
			})();
			var renderScene = function() {
				rotateMesh();
				updateMeshScale();
				renderer.setSize(document.body.offsetWidth, document.body.offsetHeight);
				camera.aspect = renderer.domElement.width / renderer.domElement.height;
				camera.updateProjectionMatrix();
				renderer.render(scene, camera);
			};
			window.addEventListener('resize', renderScene, false);
			(function() {
				var run = function() {
					requestAnimationFrame(function() {
						setTimeout(run, 1000/60);
					});
					renderScene();
				};
				run();
			})();
			(function() {
				var gui = new dat.GUI();
				(function() {
					var guiFolder = gui.addFolder('texture');
					guiFolder.add(texture, 'fontStyle', fontStyleValues);
					guiFolder.add(texture, 'fontVariant', fontVariantValues);
					guiFolder.add(texture, 'fontWeight', fontWeightValues);
					guiFolder.add(texture, 'fontSize', 0, 128, 1);
					guiFolder.add(texture, 'fontFamily', fontFamilyValues);
					guiFolder.addColor(texture, 'fillStyle');
					guiFolder.add(texture, 'strokeWidth', 0, 1/4, 1/20);
					guiFolder.addColor(texture, 'strokeStyle');
					guiFolder.add(texture, 'align', alignValues);
					guiFolder.add(texture, 'lineGap', 0, 2, 1/20);
					guiFolder.add(texture, 'padding', 0, 1, 1/20);
					guiFolder.open();
				})();
				(function() {
					var guiFolder = gui.addFolder('material');
					guiFolder.add(material, 'transparent');
					guiFolder.open();
				})();
			})();
			(function() {
				var settings = QuickSettings.create(16, 16, ' ');
				settings.bindTextArea('text', texture['text'], texture);
			})();
		});

})();
