// Web Audio API Synthesizer - 100% Client-side, zero external assets needed
class SoundEngine {
  private ctx: AudioContext | null = null
  private ambientGain: GainNode | null = null
  private ambientOsc1: OscillatorNode | null = null
  private ambientOsc2: OscillatorNode | null = null
  public isSoundEnabled: boolean = false
  public isAmbientPlaying: boolean = false

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
  }

  // Shutter / Mechanical camera click sound
  public playClick(pitch: number = 800) {
    if (!this.isSoundEnabled) return
    this.init()
    if (!this.ctx) return

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.045)
    } catch {
      // Audio not permitted or interrupted
    }
  }

  // Soft cinematic beep / focus lock sound
  public playFocusBeep() {
    if (!this.isSoundEnabled) return
    this.init()
    if (!this.ctx) return

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1440, this.ctx.currentTime)
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.09)
    } catch {
      // audio error
    }
  }

  // Warm cinematic ambient hum / tape warmth
  public toggleAmbient(enable?: boolean): boolean {
    this.init()
    if (!this.ctx) return false

    const targetState = enable !== undefined ? enable : !this.isAmbientPlaying

    if (!targetState) {
      if (this.ambientGain) {
        this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5)
        setTimeout(() => {
          this.ambientOsc1?.stop()
          this.ambientOsc2?.stop()
          this.ambientOsc1 = null
          this.ambientOsc2 = null
          this.isAmbientPlaying = false
        }, 600)
      }
      return false
    }

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      this.ambientGain = this.ctx.createGain()
      this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime)
      this.ambientGain.gain.exponentialRampToValueAtTime(0.025, this.ctx.currentTime + 1.5)

      // Dual harmonic low drone (55Hz A1 & 110Hz A2) for cinematic warmth
      this.ambientOsc1 = this.ctx.createOscillator()
      this.ambientOsc1.type = 'sine'
      this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime)

      this.ambientOsc2 = this.ctx.createOscillator()
      this.ambientOsc2.type = 'triangle'
      this.ambientOsc2.frequency.setValueAtTime(110.5, this.ctx.currentTime)

      // Low pass filter for soft analog warmth
      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(280, this.ctx.currentTime)

      this.ambientOsc1.connect(filter)
      this.ambientOsc2.connect(filter)
      filter.connect(this.ambientGain)
      this.ambientGain.connect(this.ctx.destination)

      this.ambientOsc1.start()
      this.ambientOsc2.start()
      this.isAmbientPlaying = true
      return true
    } catch {
      return false
    }
  }
}

export const sound = new SoundEngine()
