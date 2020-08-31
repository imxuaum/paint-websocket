document.addEventListener('DOMContentLoaded', () => {
    const brush = {
        active: false,
        moving: false,
        pos: {
            x: 0,
            y: 0
        },
        prevPosition: null
    }

    const screen = document.querySelector('#screen')
    const context = screen.getContext('2d')

    screen.width = 700
    screen.height = 500

    const drawLine = (line) => {
        context.beginPath()
        context.moveTo(line.prevPosition.x, line.prevPosition.y)
        context.lineTo(line.pos.x, line.pos.y)
        context.stroke()
    }

    screen.onmousedown = (event) => {
        brush.active = true
    }
    screen.onmouseup = (event) => {
        brush.active = false
    }

    screen.onmousemove = (event) => {
        brush.pos.x = event.clientX
        brush.pos.y = event.clientY
        brush.moving = true
    }

    const cycle = () => {
        if(brush.active && brush.moving && brush.prevPosition) {
            drawLine({ pos: brush.pos, prevPosition: brush.prevPosition })
            brush.moving = false
        }

        brush.prevPosition = {... brush.pos}

        setTimeout(cycle, 100)
    }

    cycle()

})