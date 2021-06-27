class Scene13 extends Phaser.Scene {
    constructor() {
      super('noenergy');
    }

    preload () {

        this.load.image('noenergy', 'assets/noenergy.png');
        this.load.image('startover', 'assets/reiniciar.png');
    }
  
    create () {
  
        this.add.image(400, 300, 'noenergy')
  
        var restart = this.add.image(750, 550, 'startover')
        restart.setInteractive()
        restart.on('pointerdown', () => this.scene.start('nivel2') );
      }
  }