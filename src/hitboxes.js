function getHitboxFromCorners(c1, c2) {
    let hitbox = []
    for (let i = c1[0]; i <= c2[0]; i++)
        for (let j = c1[1]; j <= c2[1]; j++)
            hitbox.push([i, j])
    return hitbox
}

const HITBOX_RESISTOR = new ComponentHitbox([[-1,0],[0,0],[-1,1],[0,1],[-1,2],[0,2],[-1,3],[0,3]])
const HITBOX_BOBINA = new ComponentHitbox([[-1,0],[0,0],[-1,1],[0,1],[-1,2],[0,2]])
const HITBOX_BUTTON = new ComponentHitbox([[-3,0],[-2,0],[-1,0],[0,0],[-3,1],[-2,1],[-1,1],[0,1],[-3,2],[-2,2],[-1,2],[0,2],[-3,3],[-2,3],[-1,3],[0,3]])
const HITBOX_RELETERMICO = new ComponentHitbox([[-2,0],[-1,0],[0,0],[1,0],[-2,1],[-1,1],[0,1],[1,1],[-2,2],[-1,2],[0,2],[1,2],[-2,3],[-1,3],[0,3],[1,3]])
const HITBOX_FUENTE = new ComponentHitbox([[-2,0],[-1,0],[0,0],[1,0],[-2,1],[-1,1],[0,1],[1,1],[-2,2],[-1,2],[0,2],[1,2],[-2,3],[-1,3],[0,3],[1,3],[-2,4],[-1,4],[0,4],[1,4],[-2,5],[-1,5],[0,5],[1,5]])
const HITBOX_UPPER_SQUARE = new ComponentHitbox([[0,-1],[-1,-1],[0,-2],[-1,-2]])
const HITBOX_LOWER_SQUARE =  new ComponentHitbox([[-1,0],[0,0],[-1,1],[0,1]])
const HITBOX_ONE =  new ComponentHitbox([[0,0],[-1,1],[0,1]])
const HITBOX_ACTUADOR_LINEAR =  new ComponentHitbox(getHitboxFromCorners([0,0], [8, 3]))
const HITBOX_1200 =  new ComponentHitbox(getHitboxFromCorners([0,0], [32, 26]))