// load scripts
!function(e,t,r){function n(){for(;d[0]&&"loaded"==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}for(var s,a,c,d=[],i=e.scripts[0],o="onreadystatechange",f="readyState";s=r.shift();)a=e.createElement(t),"async"in i?(a.async=!1,e.head.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write("<"+t+' src="'+s+'" defer></'+t+">"),a.src=s}(document,"script",[
  // lib
  "td/lib/functions.js",
  "td/lib/compatibility.js",
  // archetypes
  "td/archetypes/enemyArchetype.js",
  "td/archetypes/gameArchetype.js",
  "td/archetypes/gfxArchetype.js",
  "td/archetypes/levelArchetype.js",
  "td/archetypes/mapArchetype.js",
  "td/archetypes/projectyleArchetype.js",
  "td/archetypes/sfxArchetype.js",
  "td/archetypes/towerArchetype.js",
  "td/archetypes/waveArchetype.js",
  // classes
  "td/classes/enemy.js",
  "td/classes/game.js",
  "td/classes/gfx.js",
  "td/classes/level.js",
  "td/classes/map.js",
  "td/classes/player.js",
  "td/classes/projectyle.js",
  "td/classes/scene.js",
  "td/classes/sfx.js",
  "td/classes/tower.js",
  "td/classes/wave.js",
  // scenes
  "td/scenes/endgame.js",
  "td/scenes/ingame.js",
  "td/scenes/loading.js",
  "td/scenes/mainmenu.js",
  // core
  "td/towerdefense.js",
])