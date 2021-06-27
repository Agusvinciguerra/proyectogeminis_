class Scene11 extends Phaser.Scene {
    constructor() {
      super('notimescreen1');
    }

    preload () {

        this.load.image('notime', 'assets/notime.png');
        this.load.image('startover', 'assets/reiniciar.png');
      }
  
      create () {
  
        this.add.image(400, 300, 'notime')
  
        var startoverlvl1 = this.add.image(750, 550, 'startover')
        startoverlvl1.setInteractive()
        startoverlvl1.on('pointerdown', () => this.scene.start('nivel1') );
      }
  }