import Phaser from 'phaser'

class Game extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
       this.ball = this.add.circle(400, 250, 10, 0xe6cc00, 1)
       this.physics.add.existing(this.ball)
       this.ball.body.setBounce(1, 1)

       this.ball.body.setCollideWorldBounds(true, 1, 1)
       this.ball.body.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200))

       this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0x311465, 1)
       this.physics.add.existing(this.paddleLeft, true)

       this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0x00D8D8, 1)
       this.physics.add.existing(this.paddleRight, true)
       
       this.physics.add.collider(this.paddleLeft, this.ball)
       this.physics.add.collider(this.paddleRight, this.ball)

       this.cusrsors = this.input.keyboard.createCursorKeys()
    }
    update()
    {
        /** @type {Phaser.Physics.Arcade.StaticBody} */
       const body = this.paddleLeft.body

        if (this.cusrsors.up.isDown)
        {
           this.paddleLeft.y -= 10
           body.updateFromGameObject()
        }
        else if (this.cusrsors.down.isDown)
        {
            this.paddleLeft.y += 10
            body.updateFromGameObject()
        }
        const diff = this.ball.y = this.paddleRight.y
        if (Math.abs(diff) < 10)
        {
            return
        }
        if (diff < 0)
        {
            // ball is above paddle
            this.paddleRight.y -= 10
            this.paddleRight.body.updateFromGameObject()
        }
        else if (diff > 0)
        {
            // ball is below paddle
            this.paddleRight.y += 10
            this.paddleRight.body.updateFromGameObject()
        }
    }
}

export default Game