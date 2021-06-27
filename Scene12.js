class Scene12 extends Phaser.Scene {
    constructor() {
      super('notimescreen2');
    }

    preload () {

        this.load.image('notime', 'assets/notime.png');
        this.load.image('startover2', 'assets/reiniciar.png');
      }
  
      create () {
  
        this.add.image(400, 300, 'notime')
  
        var startoverlvl2 = this.add.image(750, 550, 'startover2')
        startoverlvl2.setInteractive()
        startoverlvl2.on('pointerdown', () => this.scene.start('nivel2') );
      }
  }