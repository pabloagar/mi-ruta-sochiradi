import fs from 'node:fs';import assert from 'node:assert/strict';import {validateData} from '../dist/domain.js';
const data=JSON.parse(fs.readFileSync('dist/agenda.json','utf8'));assert.deepEqual(validateData(data),[]);assert.equal(data.meta.timezone,'America/Santiago');
const required=['index.html','app.js','domain.js','styles.css','manifest.webmanifest','sw.js','icon.svg','icon-192.png','icon-512.png','audit.html','programa-2026.pdf'];required.forEach(f=>assert.ok(fs.statSync('dist/'+f).size>0,f));
const coverage=JSON.parse(fs.readFileSync('data/coverage.json','utf8'));assert.ok(coverage.every(p=>p.mappedRows===p.rowCount));
console.log(`Datos válidos: ${data.activities.length} actividades, ${data.blocks.length} bloques y ${coverage.reduce((n,p)=>n+p.rowCount,0)} filas del PDF vinculadas. Assets PWA presentes.`);
