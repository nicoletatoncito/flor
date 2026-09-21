window.addEventListener('DOMContentLoaded', function() {
  var doc = document, flower = doc.querySelector('.flower'), maxParts = 20, maxPetals = 6, partsFontStep = 25 / maxParts;
  
  createFlower();
  
  function createFlower() {
    var angle = 360 / maxPetals;
    for (var i = 0; i < maxPetals; i++) {
      var petal = createPetal(), currAngle = angle * i + 'deg', transform = 'transform: rotateY(' + currAngle + ') rotateX(-30deg) translateZ(9vmin)';
      petal.setAttribute('style', transform);
      flower.appendChild(petal);
    }
  }

  function createPetal() {
    var box = createBox(null, 0), petal = doc.createElement('div');
    petal.classList.add('petal');
    for (var i = 1; i <= maxParts; i++) { box = createBox(box, i); }
    petal.appendChild(box);
    return petal;
  }

  function createBox(box, pos) {
    var fontSize = partsFontStep * (maxParts - pos) + 'vmin', half = maxParts / 2, bright = '50';
    if (pos < half + 1) { fontSize = partsFontStep * pos + 'vmin'; } 
    else { bright = 10 + 40 / half * (maxParts - pos); }
    var baseHue = 320, hueVariation = 30, saturation = 70 + (20 * pos / maxParts), color = 'hsl(' + (baseHue + (hueVariation * pos / maxParts)) + ', ' + saturation + '%, ' + bright + '%)', newShape = doc.createElement('div');
    newShape.classList.add('shape');
    var newBox = doc.createElement('div');
    newBox.classList.add('box');
    newBox.setAttribute('style', 'color: ' + color + ';font-size: ' + fontSize);
    if (box) newBox.appendChild(box);
    newBox.appendChild(newShape);
    return newBox;
  }

  function drawGalaxy() {
    var canvas = document.getElementById('galaxy-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    var stars = [], numStars = 120;
    for (var i = 0; i < numStars; i++) {
      stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 + 0.5, dx: (Math.random() - 0.5) * 0.7, dy: (Math.random() - 0.5) * 0.7, alpha: Math.random() * 0.5 + 0.5 });
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,182,193,0.9)';
        ctx.shadowColor = '#ffb6d5';
        ctx.shadowBlur = 2;
        ctx.fill();
        ctx.restore();
        s.x += s.dx; s.y += s.dy;
        if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
  drawGalaxy();

  var mainContent = document.getElementById('main-content');
  if (mainContent) mainContent.style.display = '';

  var startBtn = document.getElementById('start-btn');
  var btnText = 'Presioname';
  startBtn.textContent = '';
  startBtn.disabled = true;
  let iBtn = 0;
  
  function typeBtn() {
    if (iBtn < btnText.length) {
      startBtn.textContent += btnText.charAt(iBtn);
      iBtn++;
      setTimeout(typeBtn, 90);
    } else {
      startBtn.disabled = false;
    }
  }
  typeBtn();
  
  // 1. Mensajes iniciales dedicatorios
  const initialMessages = [
    { text: 'Gino' },
    { text: 'Te quiero mucho' },
    { text: 'Gracias por todo' },
    { text: '¡Eres especial❤️!' }
  ];

  // 2. Tiempos exactos de sincronización con la canción Mac Miller - Congratulations
  const lyricsSync = [
    { time: 47.0, text: "The Sun don't shine when I'm alone" },
    { time: 50.0, text: "I lose my mind and I lose control" },
    { time: 54.0, text: "I see your eyes look through my soul" },
    { time: 58.0, text: "Don't be surprised, this is all I know" },
    { time: 61.0, text: "I felt the highs and they felt like you" },
    { time: 65.0, text: "See, a love like mine is too good to be true" },
    { time: 69.0, text: "And you too divine to just be mine" },
    { time: 73.0, text: "You remind me of the color blue" }
  ];

  var wrapper = document.querySelector('.wrapper');
  var msg = document.querySelector('.flower-message');
  var container = document.getElementById('start-btn-container');
  container.style.position = 'fixed';
  container.style.top = '50%';
  container.style.left = '50%';
  container.style.transform = 'translate(-50%,-50%)';
  container.style.zIndex = '100';

  startBtn.addEventListener('click', function() {
    var isMobile = window.innerWidth <= 600;
    container.style.display = 'none';
    wrapper.style.display = '';
    
    var music = document.getElementById('bg-music');
    if (music) {
      music.currentTime = 30; // Inicia la música en el segundo 30
      var playPromise = music.play();
      if (playPromise !== undefined) {
        playPromise.catch(function(error) {
          console.log('Error al reproducir la música: ', error);
        });
      }
    }

    setTimeout(function() {
      var galaxyCanvas = document.getElementById('galaxy-canvas');
      galaxyCanvas.style.display = '';
      galaxyCanvas.width = window.innerWidth;
      galaxyCanvas.height = window.innerHeight;
      var ctx = galaxyCanvas.getContext('2d');
      var numDots = isMobile ? 3 : 60;
      var dots = [];
      var dotsToAdd = 0;
      var minDotSize = isMobile ? 0.5 : 0.7;
      var maxDotSize = isMobile ? 1.1 : 1.7;

      var audio = document.getElementById('bg-music');
      var audioCtx, analyser, dataArray;
      if (window.AudioContext && audio) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var source = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      }

      function addDot() {
        if (dotsToAdd < numDots) {
          let angle = Math.random() * 2 * Math.PI;
          let radius = Math.random() * (galaxyCanvas.width / 2.2);
          let x = galaxyCanvas.width / 2 + Math.cos(angle) * radius;
          let y = galaxyCanvas.height / 2 + Math.sin(angle) * radius;
          let speed = 0.2 + Math.random() * 0.7;
          let dir = Math.random() * 2 * Math.PI;
          let dotSize = minDotSize + Math.random() * (maxDotSize - minDotSize);
          dots.push({ x, y, r: dotSize, dx: Math.cos(dir) * speed, dy: Math.sin(dir) * speed, alpha: 0.5 + Math.random() * 0.5 });
          dotsToAdd++;
          setTimeout(addDot, 10);
        }
      }
      addDot();

      function animateGalaxy() {
        ctx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
        let hue = 55;
        let speedFactor = 1;
        if (analyser && dataArray) {
          analyser.getByteFrequencyData(dataArray);
          let avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          speedFactor = 0.7 + (avg / 255) * 2.5;
        }
        for (let dot of dots) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
          ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${dot.alpha})`;
          ctx.shadowColor = `hsla(${hue},80%,70%,0.5)`;
          ctx.shadowBlur = 1;
          ctx.fill();
          dot.x += dot.dx * speedFactor;
          dot.y += dot.dy * speedFactor;
          if (dot.x < 0) dot.x = galaxyCanvas.width;
          if (dot.x > galaxyCanvas.width) dot.x = 0;
          if (dot.y < 0) dot.y = galaxyCanvas.height;
          if (dot.y > galaxyCanvas.height) dot.y = 0;
        }
        requestAnimationFrame(animateGalaxy);
      }
      
      setTimeout(function() { galaxyCanvas.style.opacity = '1'; }, 50);
      animateGalaxy();

      function animateHeart() {
        var heartCenterX = galaxyCanvas.width / 2;
        var heartCenterY = msg.getBoundingClientRect().bottom - galaxyCanvas.getBoundingClientRect().top + 80;
        var heartSize = Math.min(galaxyCanvas.width, galaxyCanvas.height) / 7;
        var heartPositions = [];
        for (let i = 0; i < dots.length; i++) {
          let t = Math.PI * 2 * (i / dots.length);
          let x = heartCenterX + heartSize * 16 * Math.pow(Math.sin(t), 3);
          let y = heartCenterY - heartSize * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          heartPositions.push({ x, y });
        }
        let steps = 14, step = 0;
        function moveDotsToHeart() {
          for (let i = 0; i < dots.length; i++) {
            let dot = dots[i];
            let target = heartPositions[i];
            dot.x += (target.x - dot.x) / (steps - step + 1);
            dot.y += (target.y - dot.y) / (steps - step + 1);
          }
          step++;
          if (step < steps) { requestAnimationFrame(moveDotsToHeart); }
        }
        moveDotsToHeart();
      }

      // Secuencia inicial del texto tipeado
      msg.style.display = '';
      msg.style.opacity = 1;
      let currentMsg = 0;

      function typeText(item, cb) {
        msg.textContent = '';
        let i = 0;
        function type() {
          if (i < item.text.length) {
            msg.textContent += item.text.charAt(i);
            i++;
            setTimeout(type, 90);
          } else if (cb) {
            setTimeout(cb, 1000);
          }
        }
        type();
      }

      function showNextInitial() {
        if (currentMsg < initialMessages.length) {
          typeText(initialMessages[currentMsg], function() {
            currentMsg++;
            showNextInitial();
          });
        } else {
          startLyricsSync();
          animateHeart();
        }
      }
      
      showNextInitial();

      // Sistema de letras sincronizadas con audio y repetición en bucle
      function startLyricsSync() {
        var music = document.getElementById('bg-music');
        var lastText = "";
        var loopTimeout = null;

        function checkTime() {
          var currentTime = music.currentTime;
          var currentLyric = null;

          for (var j = 0; j < lyricsSync.length; j++) {
            if (currentTime >= lyricsSync[j].time) {
              currentLyric = lyricsSync[j];
            }
          }

          if (currentLyric && currentLyric.text !== lastText) {
            lastText = currentLyric.text;
            msg.style.opacity = 0;
            
            setTimeout(function() {
              msg.textContent = currentLyric.text;
              msg.style.opacity = 1;
            }, 150);

            // Reinicio de secuencia al llegar al final ("color blue")
            if (currentLyric.text === "You remind me of the color blue") {
              if (loopTimeout) clearTimeout(loopTimeout);
              loopTimeout = setTimeout(function() {
                msg.style.opacity = 0;
                music.currentTime = 30;
                lastText = "";
                currentMsg = 0;
                setTimeout(showNextInitial, 500);
              }, 4500);
            }
          }
        }

        music.removeEventListener('timeupdate', checkTime);
        music.addEventListener('timeupdate', checkTime);
      }

    }, 2000);
  });
});
