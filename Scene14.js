class Scene14 extends Phaser.Scene {
    constructor() {
      super('failed');
    }

    preload () {

            this.load.image('bgxxx', 'assets/help.png')
            this.load.image('onmenu', 'assets/menuinicial.png')
            this.load.image('gamelost', 'assets/Zeus_no.png')
    }
  
    create () {
  
        this.add.image(400, 300, 'bgxxx')
        this.add.image(400, 300, 'gamelost')

        var onmenu = this.add.image(600, 400, 'onmenu')

        onmenu.setInteractive()

        onmenu.on('pointerdown', () => this.scene.start('inicio') );
      }
  }