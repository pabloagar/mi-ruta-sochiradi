"""Import the supplied HTML without executing it; audit against supplied PDF text."""
from html.parser import HTMLParser
from pathlib import Path
import re, json, hashlib, unicodedata, collections
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
class Node:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []
    def text(self):
        return ''.join(x if isinstance(x,str) else x.text() for x in self.children)
    def find(self, cls):
        return [n for n in self.walk() if cls in n.attrs.get('class','').split()]
    def walk(self):
        for n in self.children:
            if isinstance(n,Node):
                yield n
                yield from n.walk()
class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.root=Node(); self.current=self.root
    def handle_starttag(self,tag,attrs):
        n=Node(tag,attrs,self.current); self.current.children.append(n)
        if tag not in ('meta','link','input','br','hr','img','source','wbr'): self.current=n
    def handle_endtag(self,tag):
        n=self.current
        while n.parent and n.tag!=tag: n=n.parent
        if n.parent: self.current=n.parent
    def handle_data(self,text): self.current.children.append(text)
def norm(s):
    return re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFKD',s.lower()).encode('ascii','ignore').decode())
def txt(n,cls):
    found=n.find(cls); return re.sub(r'\s+',' ',found[0].text()).strip() if found else ''
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()

base=ROOT/'data/source/base-original.html'; pdf=ROOT/'data/source/programa-2026.pdf'
p=Parser(); p.feed(base.read_text(encoding='utf-8-sig'))
pages=[x.extract_text() or '' for x in PdfReader(pdf).pages]
activities=[]; blocks=[]; rooms={}; sequence=0; issues=[]
for mi,m in enumerate(p.root.find('module')):
    day=m.attrs['data-day']; date='2026-10-'+re.search(r'\d+',day)[0].zfill(2)
    room=txt(m,'room'); room_id='r-'+hashlib.sha1(room.encode()).hexdigest()[:10]
    rooms[room_id]={'id':room_id,'name':room}
    block_id=m.attrs['id']; title=txt(m,'module-title')
    nodes=[n for n in m.walk() if set(n.attrs.get('class','').split()) & {'talk','aux'}]
    block_pages=sorted({int(re.search(r'p\.\s*(\d+)',txt(n,'source'))[1]) for n in nodes if txt(n,'source')})
    for n in nodes:
        sequence+=1
        aux='aux' in n.attrs.get('class','').split()
        time=txt(n,'aux-time') if aux else txt(n,'ttime')
        times=re.findall(r'\d{2}:\d{2}',time)
        title_a=n.text().replace(txt(n,'aux-time'),'').strip() if aux else n.attrs.get('data-title',txt(n,'tname'))
        title_a=re.sub(r'\s+',' ',title_a)
        source=txt(n,'source'); page=int(re.search(r'p\.\s*(\d+)',source)[1]) if source else block_pages[0] if block_pages else None
        level=[int(x) for x in re.findall(r'\bb([123])\b',' '.join(x.attrs.get('class','') for x in n.find('badge')))]
        speaker=txt(n,'speaker'); note=txt(n,'note')
        aid=n.attrs.get('data-id',f'aux-{sequence}')
        a={'id':aid,'legacyId':n.attrs.get('data-id'),'date':date,'day':day,'roomId':room_id,'blockId':block_id,'title':title_a,'speaker':speaker or None,'start':times[0] if len(times)>0 else None,'end':times[1] if len(times)>1 else None,'levels':level,'type':n.attrs.get('data-kind','activity'),'auxiliary':aux,'note':note or None,'source':{'page':page,'htmlId':n.attrs.get('id'),'document':'programa-2026.pdf','originalTitle':title_a,'originalSpeaker':speaker or None},'verification':'pending'}
        page_norm=norm(pages[page-1]) if page else ''
        matched=bool(norm(title_a) and norm(title_a) in page_norm)
        if not matched and page:
            # Differences in whitespace/punctuation are already normalized; no fuzzy corrections.
            issues.append({'id':aid,'page':page,'title':title_a,'issue':'title-not-exact-in-extracted-page'})
        a['verification']='text-matched' if matched else 'review-needed'
        activities.append(a)
    own=activities[-len(nodes):]
    blocks.append({'id':block_id,'date':date,'roomId':room_id,'title':title,'pages':block_pages,'start':min([a['start'] for a in own if a['start']],default=None),'end':max([a['end'] for a in own if a['end']],default=None)})
meta={'name':'Congreso Chileno de Radiología 2026','version':'2026-10-07-base-1','timezone':'America/Santiago','dates':sorted({a['date'] for a in activities}),'updated':'2026-10-07','auditStatus':'in-review','sourcePages':len(pages),'sourceHash':digest(pdf),'baseHash':digest(base),'origin':'HTML y PDF aportados por el usuario','officialUrl':'https://congresochilenoradiologia.cl/programa/'}
data={'meta':meta,'rooms':list(rooms.values()),'blocks':blocks,'activities':activities}
(ROOT/'dist/agenda.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'data/import-issues.json').write_text(json.dumps(issues,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'data/pdf-text.json').write_text(json.dumps(pages,ensure_ascii=False),encoding='utf-8')
counts=collections.Counter(a['source']['page'] for a in activities)
print(json.dumps({'activities':len(activities),'talks':sum(not a['auxiliary'] for a in activities),'blocks':len(blocks),'rooms':len(rooms),'pages':len(pages),'perPage':dict(counts),'issues':issues},ensure_ascii=True,indent=2))
