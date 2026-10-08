import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('dist/agenda.json','utf8'));
const corrections=JSON.parse(fs.readFileSync('data/corrections.json','utf8'));
const fixes=[['e61','Alberto Alonso',20],['e321','Fernanda Sandoval',47],['e339','Heidi Wundderlich',47],['e356','Natalia Pincheira',47],['e141','Erick Marchant',21],['e147','Mauricio Farías',21],['e92','Juan Guevara, Líder de Diagnóstico por Imágenes de Philips Chile',28]];
const pair=data.activities.find(a=>a.source.page===47&&a.title.endsWith('Mónica González y Sofía Infante'));if(pair)fixes.push([pair.id,'Mónica González y Sofía Infante',47]);
for(const [id,speaker,page] of fixes){const a=data.activities.find(a=>a.id===id);if(a.speaker===speaker||id==='e92'&&a.speaker==='Juan Guevara')continue;if(a.source.page!==page||!a.title.endsWith(speaker))throw Error('La fuente no corresponde a la corrección '+id);const before={title:a.title,speaker:a.speaker};a.title=a.title.slice(0,-speaker.length).trim();a.speaker=speaker;if(id==='e92'){a.speaker='Juan Guevara';a.speakerAffiliation='Líder de Diagnóstico por Imágenes de Philips Chile';}corrections.push({id,page,before,after:{title:a.title,speaker:a.speaker},reason:'Se separa el participante del título tras revisión visual de la página '+page+' del PDF; se conserva el texto original.'});}
data.meta.version='2026-10-08-audit-2';
fs.writeFileSync('dist/agenda.json',JSON.stringify(data,null,2));fs.writeFileSync('data/corrections.json',JSON.stringify(corrections,null,2));
const summary='Revisión adicional 8 de octubre: se separaron ocho nombres de participantes que habían quedado pegados a títulos (páginas 20, 21, 28 y 47). Los IDs, horarios y textos originales se conservan. Salón 4: Asamblea y Ética el viernes (p. 37), Enfermería el sábado (p. 47).';
for(const file of ['docs/data-audit.md','dist/audit.html']){let text=fs.readFileSync(file,'utf8');if(!text.includes(summary)){text=file.endsWith('.html')?text.replace('</main>',`<p class="notice">${summary}</p></main>`):text+'\n\n## Revisión adicional de participantes\n\n'+summary+'\n';fs.writeFileSync(file,text);}}
console.log('Participantes separados del título; IDs y horarios conservados.');
