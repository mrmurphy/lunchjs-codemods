// Please don't try to run this, it's for eyes only!

import theForce from 'the-force'
import actions from 'the-dark-side'

var target = 'luke skywalker'
var me = 'vader'
var senses = theForce.sense()

senses.onIsClose(target, actions.kidnap(target))
senses.onIsFighting(target, actions.persuade(target))
senses.onIsTalkingBack(target, actions.cutOffHand(target))
senses.onIsWinning(target, actions.retreatAndThreaten(me))
senses.onIsDying(target, actions.sacrificeAForB(me, target))
senses.onIsLoving(target, actions.die(me))
