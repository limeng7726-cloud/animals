import { useRef, useCallback, useEffect } from 'react';

type SoundType = 'eat' | 'crash' | 'move' | 'click' | 'success';

export const useSound = (enabled: boolean = true) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
    }
    
    return () => {
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
        }
    }
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!enabled || !audioContextRef.current) return;
    
    // Resume context if suspended (browser policy requires user interaction first)
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().catch(() => {
            // Ignore if resume fails (e.g. no user interaction yet)
        });
    }

    const ctx = audioContextRef.current;
    
    // Simple synthesized sounds
    const now = ctx.currentTime;

    switch (type) {
      case 'eat': {
        // High pitched happy chirp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
        
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }
        
      case 'crash': {
        // Low pitched crash sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }

      case 'move': {
        // Very subtle click/tick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, now);
        
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
        
      case 'success': {
        // Victory fanfare
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
        frequencies.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            const startTime = now + i * 0.1;
            gain.gain.setValueAtTime(0.1, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
            
            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
        break;
      }
        
       case 'click': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }
    }
  }, [enabled]);

  return playSound;
};
