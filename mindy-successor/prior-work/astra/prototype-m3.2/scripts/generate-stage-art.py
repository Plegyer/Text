"""Original vector blockouts. Replaceable scene assets, not final character art."""
from pathlib import Path
P=Path('assets')
head='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#293441"/><stop offset="1" stop-color="#ddaa77"/></linearGradient><radialGradient id="light"><stop stop-color="#ffd398" stop-opacity=".45"/><stop offset="1" stop-color="#ffd398" stop-opacity="0"/></radialGradient><linearGradient id="wood" x2="1" y2="1"><stop stop-color="#795447"/><stop offset="1" stop-color="#352c31"/></linearGradient></defs><rect width="1200" height="675" fill="url(#sky)"/>'''
def hero(x=760,y=330,tool=False):
 return f'''<g transform="translate({x} {y})"><ellipse cx="15" cy="263" rx="88" ry="17" fill="#1a2227" opacity=".4"/><path d="M-19 145L-35 246H-8L19 165 32 246H58L49 145" fill="#283e48"/><path d="M-38 253h37v-17h-35M28 253h41l-12-17H30" fill="#272932"/><path d="M-29 60Q-42 92-30 166H52L39 63" fill="#759b8c"/><path d="M-30 133h82v15h-82" fill="#bb8658"/><path d="M-15 25Q-13-23 27-12Q60 0 44 40L44 71-23 65Z" fill="#47363b"/><ellipse cx="16" cy="26" rx="25" ry="33" fill="#e6b78f"/><path d="M-10 23L-13 0Q30-33 49 15L34 11 22 1Z" fill="#4c3438"/><path d="M-16 64L-43 112-5 129M39 64L64 112 14 135" fill="none" stroke="#deb18d" stroke-width="14" stroke-linecap="round"/><circle cx="24" cy="28" r="2.5" fill="#35313a"/>'''+('''<g><animateTransform attributeName="transform" type="translate" values="-12 0;12 0;-12 0" dur="1.5s" repeatCount="indefinite"/><path d="M-95 129L78 126 85 142-84 147Z" fill="#bac5bf"/><rect x="-99" y="123" width="22" height="25" rx="5" fill="#6b3c30"/></g>''' if tool else '')+'</g>'
def forest():
 out='<path d="M0 315Q180 190 360 330T730 290T1200 250V675H0Z" fill="#4c6d62"/><path d="M0 420Q220 260 470 400T1200 340V675H0Z" fill="#354d48"/><path d="M410 675L570 350 650 350 860 675" fill="#a28863"/>'
 for x,y,r in [(60,170,135),(250,130,120),(1030,150,150),(1140,100,140)]:out+=f'<path d="M{x-18} {y+70}L{x-28} 610H{x+25}L{x+12} {y+70}" fill="#3d3537"/><circle cx="{x}" cy="{y}" r="{r}" fill="#24443e"/><circle cx="{x+38}" cy="{y-20}" r="{r-25}" fill="#3c5e4d"/>'
 return out
for name in ['town','tavern','lumber','forest','school','room','outside','goblin','sparring','flirt']:
 s=head
 if name=='town':
  s+='<circle cx="865" cy="135" r="65" fill="#efc285"/><path d="M0 310L130 170 260 290 400 120 640 290 900 160 1200 300V675H0Z" fill="#616875"/><path d="M0 440L350 400 600 360 880 430 1200 380V675H0Z" fill="#474454"/>'
  for x,y,w,h in [(10,290,220,235),(220,350,190,200),(810,270,230,275),(1015,355,195,220),(435,160,180,220)]:
   s+=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#ac8b76"/><path d="M{x-15} {y}L{x+w/2} {y-85} {x+w+15} {y}Z" fill="#4a485e"/>'
   for wx in range(x+30,x+w-20,55):s+=f'<rect x="{wx}" y="{y+37}" width="24" height="42" rx="10" fill="#f6ce91"/>'
  s+='<path d="M270 675L520 405H674L950 675" fill="#ba9873"/><path d="M280 675L538 405M940 675L656 405" stroke="#d6b38b" stroke-width="8"/><g fill="#806c60" opacity=".65"><path d="M320 590H879v5H320M400 530H817v4H400M455 480H757v3H455"/></g>'+hero(720,330)
 elif name in ['lumber','forest','goblin','sparring','flirt']:
  s+=forest()
  if name=='lumber':s+='<path d="M345 470h455v35H345Z" fill="#bd9264"/><path d="M380 505l-30 120M755 505l30 120" stroke="#60453b" stroke-width="22"/><path d="M215 560h260v60H215Z" fill="#886448"/><ellipse cx="215" cy="590" rx="28" ry="30" fill="#c39f6e"/>'+hero(650,260,True)
  else:s+=hero(790,330)
  if name in ['goblin','sparring','flirt']:
   s+='<g transform="translate(370 390)"><path d="M-24 97L-40 204H-5L12 136 35 204H63L45 94" fill="#4c454c"/><path d="M-27 38h70l15 93h-99Z" fill="#a07f59"/><ellipse cx="10" cy="8" rx="34" ry="36" fill="#94a16c"/><path d="M-16-6L-55-16-20 21M32-6L77-16 42 20" fill="#94a16c"/><path d="M-19-17Q17-66 44-13" fill="#b38f57"/><circle cx="22" cy="9" r="3" fill="#33383a"/></g>'
  if name=='sparring':s+='<path d="M450 510L700 370M690 510L450 400" stroke="#cfb084" stroke-width="12"/>'
  if name=='flirt':s+='<path d="M535 336C495 298 551 274 560 310C575 274 619 300 586 326L560 347Z" fill="#d89b98" opacity=".85"/>'
 elif name=='outside':
  s+='<rect width="1200" height="675" fill="#273445"/><circle cx="860" cy="100" r="45" fill="#d4d3b5"/><path d="M0 430Q500 220 1200 410V675H0" fill="#35434a"/><path d="M210 160h500l130 110H120Z" fill="#4c4548"/><path d="M230 270v350M730 270v350" stroke="#6d5b4e" stroke-width="25"/><rect x="250" y="530" width="380" height="70" rx="22" fill="#658085"/>'
 else:
  s+='<rect width="1200" height="675" fill="#453740"/><rect x="65" y="48" width="1070" height="485" fill="url(#wood)"/><path d="M65 530h1070L1200 675H0Z" fill="#44383b"/><path d="M90 100H1110M300 48V530M850 48V530" stroke="#352e36" stroke-width="19"/><rect x="435" y="90" width="310" height="260" rx="130" fill="#cfa376"/><path d="M590 90v260M435 235h310" stroke="#493943" stroke-width="14"/><ellipse cx="590" cy="330" rx="500" ry="300" fill="url(#light)"/>'
  if name=='tavern':s+='<rect x="160" y="450" width="890" height="70" rx="10" fill="#ba885b"/><path d="M200 520v140M1010 520v140" stroke="#664738" stroke-width="25"/><g fill="#e0b076"><rect x="270" y="395" width="48" height="55" rx="8"/><rect x="925" y="395" width="48" height="55" rx="8"/></g>'+hero(735,270)
  elif name=='school':s+='<rect x="130" y="160" width="235" height="180" fill="#273f3c"/><path d="M170 280L235 185 307 280ZM205 250h90" fill="none" stroke="#d4ca9b" stroke-width="4"/><rect x="370" y="445" width="530" height="40" fill="#b08966"/><path d="M475 445v-80l30-35 30 35v80" fill="#8bb9b0" opacity=".85"/>'+hero(785,285)
  elif name=='room':s+='<path d="M170 470h550v140H170Z" fill="#785b66"/><path d="M210 420h460v155H210Z" fill="#a7b4a0"/><rect x="215" y="420" width="120" height="80" rx="24" fill="#e5d9c1"/><rect x="885" y="420" width="125" height="150" fill="#986d4e"/><path d="M946 420v-90" stroke="#dac393" stroke-width="8"/><path d="M900 355L920 290h55l25 65Z" fill="#edbd75"/>'
 s+='<rect x="0" y="645" width="1200" height="30" fill="#151a25" opacity=".25"/></svg>'
 (P/f'stage-{name}.svg').write_text(s)
