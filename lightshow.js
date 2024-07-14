document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('lightCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const effects = [];
    const effectTypeSelect = document.getElementById('effectType');

    canvas.addEventListener('mousemove', function(e) {
        if (e.buttons === 1) {  // Effect is triggered only when mouse button is pressed
            createEffect(e.clientX, e.clientY, effectTypeSelect.value);
        }
    });

    function createEffect(x, y, type) {
        const hue = Math.random() * 360;
        effects.push({ x, y, type, hue, size: 0, maxSize: 50 });
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Creates a light fade effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        effects.forEach((effect, index) => {
            ctx.beginPath();
            const alpha = Math.sin((effect.size / effect.maxSize) * Math.PI); // Fading effect
            ctx.fillStyle = `hsla(${effect.hue}, 100%, 50%, ${alpha})`;
            ctx.shadowColor = `hsl(${effect.hue}, 100%, 50%)`;
            ctx.shadowBlur = 20;
            
            switch (effect.type) {
                case 'softGlow':
                    ctx.arc(effect.x, effect.y, effect.size, 0, Math.PI * 2);
                    ctx.shadowBlur = 40;
                    break;
                case 'sharpLines':
                    ctx.rect(effect.x - effect.size, effect.y - effect.size, effect.size * 2, effect.size * 2);
                    ctx.shadowBlur = 10;
                    break;
                case 'fadedSparkle':
                    ctx.arc(effect.x, effect.y, effect.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = `hsla(${effect.hue}, 100%, 75%, ${alpha / 2})`;
                    ctx.arc(effect.x, effect.y, effect.size / 2, 0, Math.PI * 2);
                    break;
            }
            ctx.fill();

            effect.size += 1;
            if (effect.size > effect.maxSize) {
                effects.splice(index, 1); // Remove the effect after it expands
            }
        });

        requestAnimationFrame(draw);
    }

    window.clearEffects = function() {
        effects.length = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    draw();
});
