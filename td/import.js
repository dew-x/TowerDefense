// load scripts
!function(e,t,r){function n(){for(;d[0]&&"loaded"==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}for(var s,a,c,d=[],i=e.scripts[0],o="onreadystatechange",f="readyState";s=r.shift();)a=e.createElement(t),"async"in i?(a.async=!1,e.head.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write("<"+t+' src="'+s+'" defer></'+t+">"),a.src=s}(document,"script",[
  // lib
  "td/lib/functions.js",
  // archetypes
  "td/archetypes/enemyArchetype.js",
  "td/archetypes/gfxArchetype.js",
  "td/archetypes/levelArchetype.js",
  "td/archetypes/mapArchetype.js",
  "td/archetypes/projectyleArchetype.js",
  "td/archetypes/sfxArchetype.js",
  "td/archetypes/towerArchetype.js",
  "td/archetypes/waveArchetype.js",
  // classes
  "td/classes/projectyle.js",
  // core
  "td/towerdefense.js",
])