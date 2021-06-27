class Scene10 extends Phaser.Scene {
    constructor() {
    super('nivel2');
    }

    create () {

        // Cámara

        camera2 = this.cameras.main; 
        
        this.cameras.main.setBounds(0, 0, 1800, 600)

        // Background

        this.add.image(900, 300, 'bg2')

        platform = this.physics.add.staticGroup();

        platform.create(182, 563, 'uno'); // Base 

        platform.create(800, 563, 'dos'); // Base
        
        platform.create(1080, 563, 'uno'); // Base 

        platform.create(1710, 563, 'uno'); // Base

        platform.create(210, 450, 'p2');

        platform.create(180, 220, 'dos');
        
        platform.create(600, 355, 'uno');

        platform.create(850, 465, 'p2');

        platform.create(950, 270, 'p2');

        platform.create(1400, 220, 'dos');

        platform.create(1705, 220, 'uno');

        platform.create(-10, 300, 'vertical'); // Borde izquierdo

        platform.create(1810, 300, 'vertical'); // Borde derecho

        platform.create(900, -10, 'horizontal'); // Borde arriba

        // World Bounds

        Wbounds = this.physics.add.staticGroup()

        Wbounds.create(900, 610, 'horizontal');

        // Player 

        player = this.physics.add.sprite(28, 500, 'still');

        player.setScale(0.7);

        this.physics.add.collider(player, platform); // Collider con plataformas

        this.physics.add.overlap(player, Wbounds, this.deathone, null, this); // Consecuencia colisión con el borde 

        // this.physics.add.collider(player, tween); 

        this.physics.add.collider(player, mplat);

        player.setCollideWorldBounds(false);
    
        if (cursors =! undefined){
            
            cursors = this.input.keyboard.createCursorKeys();
        }

        // Rayos 

        rayall = this.physics.add.group({

            key: 'rayoide',

            repeat: 9, 

            setXY: {x: 20, y: 20, stepX: 400, stepY: 30},
        });

        rayall.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.6, 1));
            });

        this.physics.add.collider(rayall, platforms);

        this.physics.add.overlap(player, rayall, this.recorayo, null, this);

        ray = this.add.image(16, 25, 'rayoide')

        ray.scrollFactorX = 0

        ray.scrollFactorY = 0

        rayoText = this.add.text(32, 16, ':', { fontSize: '30px', fill: '#000000' });

        rayoText.scrollFactorX = 0

        rayoText.scrollFactorY = 0

        rayoScore = 0;

        this.physics.add.collider(rayall, platform)

        // Golden apples 

        var j = Phaser.Math.Between(540, 1000)

        gapple = this.physics.add.group({

            key: 'gapple',

            setXY: {x: j, y: 520, stepX: 950, stepY: 30}
        });

        this.physics.add.collider(gapple, platform)

        this.physics.add.overlap(player, gapple, this.collectgapple, null, this, this.sound.play("g_apple"));

        // Idas

        idas = this.add.image(720, 70, 'idas')

        idastween = this.tweens.add({

            targets: idas,

            y: 140,

            paused: false,

            yoyo: true,

            repeat: -1
        })

        idas.scrollFactorX = 0

        idas.scrollFactorY = 0

        // Timer settings

        initialTime = 10

        timedEvent = this.time.addEvent({ delay: 1000, callback: this.timer, callbackScope: this, loop: true });

        timeText = this.add.text(120, 16, '', { fontSize: '30px', fill: '#000000' });

        timeText.scrollFactorX = 0

        timeText.scrollFactorY = 0

        clok = this.add.image(100, 27, 'cloc');

        clok.scrollFactorX = 0

        clok.scrollFactorY = 0

        // Red apples

        rapple = this.physics.add.group();
    
        /*rapple = this.physics.add.group({

            key: 'rapple',

            repeat: 3, 

            setXY: {x: 200, y: 20, stepX: 950, stepY: 60}
        });*/
        
        this.physics.add.collider(rapple, platform);

        this.physics.add.overlap(player, rapple, this.collectrapple, null, this);

        rap = this.add.image(200, 25, 'rapple'); 

        rap.scrollFactorX = 0

        rap.scrollFactorY = 0
        
        initialenergy = 100; 

        energyText = this.add.text(225, 16, ':100', { fontSize: '30px', fill: '#000000' }); 

        energyText.scrollFactorX = 0

        energyText.scrollFactorY = 0

        //Music

        this.music = this.sound.add('nivel2');
            musicConfig={
                mute: false,
                volume: 0.4,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0,
        }
        

        this.music.play(musicConfig);

        // Inicialización 

        gameOver = false;

        this.jumps = 0;

        // Flechas 

        arrows = this.physics.add.group({

            key: 'arrow',

            repeat: 10, 

            setXY: {x: 20, y: 20, stepX: 300, stepY: 30},
        });

        this.physics.add.collider(rayall, platforms);

        this.physics.add.overlap(player, arrows, this.arrowhit, null, this);

        // Ending  

        door = this.physics.add.staticGroup();

        door.create(1750, 480, 'door').setScale(1.3);

        this.physics.add.overlap(player, door, this.gamewon, null, this);
    }

    update () {

        camera2.centerOn(player.x, player.y);

        if (gameOver) {      

            return

        }
        
        
        if (cursors.left.isDown) {

            player.setVelocityX(-160);

            player.anims.play('left', true);
        }

        else if (cursors.right.isDown) {

            player.setVelocityX(160);

            player.anims.play('right', true);
        }

        else {

            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {

            player.setVelocityY(-330);

            this.sound.play("jump");

        }

    }

    recorayo(player, rayo) {

        rayo.disableBody(true, true);
    
        this.sound.play("rayo");
    
        rayoScore += 1;
    
        rayoText.setText(':' + rayoScore);

        /*if (rayall.countActive(true) == 3) {

            var x = (player.x < 900) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    
            rapple = rapple.create(x, 100, 'rapple');
    
            rapple.setCollideWorldBounds(false);
    
            rapple.allowGravity = true;

            var x = (player.x < 900) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    
            gapple = gapple.create(x, 100, 'rapple');
    
            gapple.setCollideWorldBounds(false);
    
            gapple.allowGravity = true;
        }*/
    }

    deathone(player, Wbounds) {

        gameOver = true;
        
        player.anims.play('death', true);

        player.setTint(0xFAB0AB);

        this.physics.pause();

        energyText.setText(': 0') 

        this.scene.start('noenergy')

        this.music.stop(musicConfig);

        this.music = this.sound.add('derrota');
            musicConfig={
                mute: false,
                volume: 0.4,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0,
        }
        

        this.music.play(musicConfig);
    }

    timer() {

        if (! gameOver) {    

            initialTime = initialTime - 1; 

            arrows.create(Phaser.Math.Between(100, 1500), 0, "arrow");

            timeText.setText(':' + initialTime);

        }

        if (initialTime == 0) {

            timedEvent.paused = true;

            this.scene.start('notimescreen2')

            this.music.stop(musicConfig);

            this.music = this.sound.add('derrota');
            musicConfig={
                mute: false,
                volume: 0.4,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0,
        }
        

        this.music.play(musicConfig);
    
        }
    }

    collectgapple(player, gapple) {

        gapple.disableBody(true, true);

        initialTime += 20

        timeText.setText(':' + initialTime)

        this.sound.play("g_apple");
    }

    collectrapple(player, rapple) {

        rapple.disableBody(true, true);

        this.sound.play("r_apple");

        initialenergy += 20

        energyText.setText(':' + initialenergy);

    }

    arrowhit(player, arrows) {

        //idas.anims.play('madidas', true);

        arrows.disableBody(true, true);

        this.sound.play("flecha");

        initialenergy -= 30,

        player.anims.play('hit', true);
        
        energyText.setText(':' + initialenergy);

        if (initialenergy == 40 ) {

            var x = (player.x < 900) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    
            rapple = rapple.create(x, 100, 'rapple');
    
            rapple.setCollideWorldBounds(false);
    
            rapple.allowGravity = true;

            this.sound.play("r_apple");
        }

        if (initialenergy <= 0 ) {

            energyText.setText(': 0') 
            
            gameOver = true;

            player.anims.play('death', true);

            player.setTint(0xFAB0AB);

            this.physics.pause();

            this.scene.start('noenergy')

            this.music.stop(musicConfig);

            this.music = this.sound.add('derrota');
            musicConfig={
                mute: false,
                volume: 0.4,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0,
                }
        

            this.music.play(musicConfig);
        }
    }

    gamewon() {

        if (rayoScore <= 2) {

            this.scene.start('failed');

            this.music.stop(musicConfig);

            this.music = this.sound.add('zeus');
            musicConfig={
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0,
        }
        
        this.music.play(musicConfig);
        }

        if (rayoScore >= 3) {

            this.scene.start('won')

            this.music.stop(musicConfig);

            this.music = this.sound.add('castor');
            musicConfig={
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0,
        }
        this.music.play(musicConfig);
        }
    }
}
