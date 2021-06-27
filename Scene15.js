class Scene15 extends Phaser.Scene {
    constructor() {
      super('won');
    }

    preload () {

            this.load.image('bgxxx', 'assets/help.png')
            this.load.image('credxx', 'assets/creditos.png')
            this.load.image('victory', 'assets/Zeus_SI.png')
    }
  
    create () {
  
        this.add.image(400, 300, 'bgxxx')
        this.add.image(400, 300, 'victory')

        var credx = this.add.image(600, 400, 'creditos')

        credx.setInteractive()

        credx.on('pointerdown', () => this.scene.start('creditos') );
        
      }
  }