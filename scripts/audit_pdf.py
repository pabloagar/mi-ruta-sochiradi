from pathlib import Path
import json,re,unicodedata,collections
import pdfplumber
ROOT=Path(__file__).resolve().parents[1]
def norm(t):return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFKD',t.lower()).encode('ascii','ignore').decode())
d=json.loads((ROOT/'dist/agenda.json').read_text(encoding='utf-8'))
doc=pdfplumber.open(ROOT/'data/source/programa-2026.pdf')
report=[]; anomalies=[]
for i,page in enumerate(doc.pages):
    number=i+1; words=page.extract_words(); rows=[]
    times=[w for w in words if re.fullmatch(r'\d{2}:\d{2}[-–]\d{2}:\d{2}',w['text']) and w['x0']<120]
    times.sort(key=lambda w:w['top'])
    for ti,t in enumerate(times):
        end=times[ti+1]['top']-2 if ti+1<len(times) else min(page.height-40,t['top']+95)
        chars=[c for c in page.chars if c['x0']>115 and t['top']-3<=c['top']<end]
        text=' '.join(w['text'] for w in words if w['x0']>115 and t['top']-3<=w['top']<end)
        levels=sorted({int(c['text']) for c in chars if c['text'] in ['1','2','3'] and abs(c['size']-9)<.15})
        start,finish=re.split('[-–]',t['text'])
        matches=[a for a in d['activities'] if a['source']['page']==number and a['start']==start and a['end']==finish]
        row={'start':start,'end':finish,'text':text,'levels':levels,'bbox':[t['x0'],t['top'],page.width,end],'ids':[a['id'] for a in matches]}
        rows.append(row)
        for a in matches:
            problems=[]
            if norm(a['title']) not in norm(text):problems.append('title')
            if a['speaker'] and norm(a['speaker']) not in norm(text):problems.append('speaker')
            if a['levels']!=levels:problems.append('levels')
            if problems:anomalies.append({'page':number,'id':a['id'],'fields':problems,'title':a['title'],'speaker':a['speaker'],'levelsHtml':a['levels'],'levelsPdf':levels,'row':text})
    report.append({'page':number,'heading':' '.join(w['text'] for w in words[:18]),'rows':rows})
(ROOT/'data/pdf-row-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'data/field-anomalies.json').write_text(json.dumps(anomalies,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'timedRows':sum(len(p['rows']) for p in report),'pages':[{'page':p['page'],'rows':len(p['rows']),'unmapped':len([r for r in p['rows'] if not r['ids']]),'heading':p['heading']} for p in report],'anomalies':anomalies},ensure_ascii=True,indent=2))
