'use client';

import { useEffect, useRef, useCallback } from 'react';

// Sprite sheet configuration
// All frames are 82x66 pixels
const FRAME_WIDTH = 82;
const FRAME_HEIGHT = 66;

const SPRITES = {
    run: {
        src: '/horse animation/horse_run_cycle-removebg-preview.png',
        frames: 5,
        fps: 10,
    },
    idle: {
        src: '/horse animation/horse_idle_cycle-removebg-preview.png',
        frames: 7,
        fps: 6,
    },
    idleSmack: {
        src: '/horse animation/horse_idle_smack_cycle-removebg-preview.png',
        frames: 4,
        fps: 5,
    },
};

// How close the horse needs to be to the target to stop running (in pixels)
const STOP_DISTANCE = 30;
// Horse movement speed (pixels per frame at 60fps)
const MOVE_SPEED = 3.5;
// Display scale for the horse sprite
const SCALE = .9;

type AnimationState = 'run' | 'idle' | 'idleSmack';

export default function HorseCompanion() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef({
        // Horse position (moves freely across the screen)
        horseX: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
        horseY: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
        // Target position (mouse)
        targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
        targetY: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
        // Current animation
        animation: 'idle' as AnimationState,
        // Current frame index
        frameIndex: 0,
        // Frame timer
        frameTimer: 0,
        // Direction: 1 = facing right, -1 = facing left
        direction: -1,
        // Is the horse currently moving?
        isMoving: false,
        // Idle cycle counter (to alternate between idle and idleSmack)
        idleCycleCount: 0,
        // Time since mouse last moved
        mouseStopTimer: 0,
        // Whether mouse has ever moved (to avoid running to center on load)
        mouseHasMoved: false,
        // Images loaded
        imagesLoaded: false,
    });

    const imagesRef = useRef<Record<string, HTMLImageElement>>({});

    // Load sprite images
    useEffect(() => {
        const state = stateRef.current;
        let loadedCount = 0;
        const totalImages = Object.keys(SPRITES).length;

        Object.entries(SPRITES).forEach(([key, sprite]) => {
            const img = new window.Image();
            img.src = sprite.src;
            img.onload = () => {
                imagesRef.current[key] = img;
                loadedCount++;
                if (loadedCount === totalImages) {
                    state.imagesLoaded = true;
                }
            };
        });
    }, []);

    // Handle mouse movement
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const state = stateRef.current;
        state.targetX = e.clientX;
        state.targetY = e.clientY;
        state.mouseHasMoved = true;
        state.mouseStopTimer = 0;
    }, []);

    // Handle window resize
    const handleResize = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set initial canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const state = stateRef.current;
        state.horseX = window.innerWidth / 2;
        state.horseY = window.innerHeight / 2;
        state.targetX = window.innerWidth / 2;
        state.targetY = window.innerHeight / 2;

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        let animationId: number;
        let lastTime = 0;

        const gameLoop = (timestamp: number) => {
            const deltaTime = lastTime ? (timestamp - lastTime) / 1000 : 0.016;
            lastTime = timestamp;

            if (!state.imagesLoaded) {
                animationId = requestAnimationFrame(gameLoop);
                return;
            }

            // Update mouse stop timer
            state.mouseStopTimer += deltaTime;

            // Calculate 2D distance to target
            const dx = state.targetX - state.horseX;
            const dy = state.targetY - state.horseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Determine if horse should be moving
            if (state.mouseHasMoved && distance > STOP_DISTANCE) {
                state.isMoving = true;
                state.animation = 'run';
                // Update direction based on horizontal movement
                if (Math.abs(dx) > 2) {
                    state.direction = dx > 0 ? 1 : -1;
                }

                // Move horse toward target (normalize direction vector)
                const speed = MOVE_SPEED * 60 * deltaTime;
                if (distance < speed) {
                    state.horseX = state.targetX;
                    state.horseY = state.targetY;
                } else {
                    state.horseX += (dx / distance) * speed;
                    state.horseY += (dy / distance) * speed;
                }
            } else if (state.isMoving) {
                // Just stopped moving - transition to idle
                state.isMoving = false;
                state.frameIndex = 0;
                state.frameTimer = 0;
                state.idleCycleCount = 0;
                // Pick initial idle animation
                state.animation = 'idle';
            }

            // If idle, alternate between idle and idleSmack
            if (!state.isMoving && state.mouseHasMoved) {
                const currentSprite = SPRITES[state.animation];
                // When a full cycle completes, maybe switch animation
                if (state.frameIndex >= currentSprite.frames - 1) {
                    state.idleCycleCount++;
                    // Every 2-4 idle cycles, do a smack animation
                    if (state.animation === 'idle' && state.idleCycleCount >= 2 + Math.floor(Math.random() * 3)) {
                        state.animation = 'idleSmack';
                        state.frameIndex = 0;
                        state.frameTimer = 0;
                        state.idleCycleCount = 0;
                    } else if (state.animation === 'idleSmack') {
                        // After smack, go back to idle
                        state.animation = 'idle';
                        state.frameIndex = 0;
                        state.frameTimer = 0;
                        state.idleCycleCount = 0;
                    }
                }
            }

            // Update animation frame
            const currentSprite = SPRITES[state.animation];
            state.frameTimer += deltaTime;
            const frameDuration = 1 / currentSprite.fps;

            if (state.frameTimer >= frameDuration) {
                state.frameTimer -= frameDuration;
                state.frameIndex = (state.frameIndex + 1) % currentSprite.frames;
            }

            // === RENDER ===
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const img = imagesRef.current[state.animation];
            if (!img) {
                animationId = requestAnimationFrame(gameLoop);
                return;
            }

            const drawWidth = FRAME_WIDTH * SCALE;
            const drawHeight = FRAME_HEIGHT * SCALE;
            const drawX = state.horseX - drawWidth / 2;
            const drawY = state.horseY;

            ctx.save();

            // Flip horizontally based on direction
            // The default sprite faces LEFT, so flip when going right
            if (state.direction === 1) {
                ctx.translate(drawX + drawWidth, drawY);
                ctx.scale(-1, 1);
            } else {
                ctx.translate(drawX, drawY);
            }

            // Draw the current frame from the sprite sheet
            ctx.drawImage(
                img,
                state.frameIndex * FRAME_WIDTH, // source X
                0, // source Y
                FRAME_WIDTH, // source width
                FRAME_HEIGHT, // source height
                0, // dest X
                0, // dest Y
                drawWidth, // dest width
                drawHeight // dest height
            );

            ctx.restore();

            animationId = requestAnimationFrame(gameLoop);
        };

        animationId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [handleMouseMove, handleResize]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9999,
                imageRendering: 'pixelated',
            }}
        />
    );
}
