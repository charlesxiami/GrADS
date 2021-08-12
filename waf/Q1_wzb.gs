'reinit'
'sdfopen f:\data\ncep\dswrf.ntat.mon.mean.nc'  
'sdfopen f:\data\ncep\ulwrf.ntat.mon.mean.nc'  
'sdfopen f:\data\ncep\uswrf.ntat.mon.mean.nc'  
'sdfopen f:\data\ncep\nswrs.sfc.mon.mean.nc'     
'sdfopen f:\data\ncep\nlwrs.sfc.mon.mean.nc'     
'sdfopen f:\data\ncep\shtfl.sfc.mon.mean.nc'     
'sdfopen f:\data\ncep\prate.sfc.mon.mean.nc'     

'set x 1 192'
'set y 1 94'
'set z 1'
'set t 1 822'
'define q=dswrf.1-ulwrf.2-uswrf.3+nswrs.4+nlwrs.5+shtfl.6+prate.7*2510600.832'

n=0
while(n<68)
'set x 1 192'
'set y 1 94'
'set z 1'
'set t 1'
'define qs'n'=ave(q,t='6+n*12',t='8+n*12')'
n=n+1
endwhile

'set gxout fwrite'
'set fwrite f:\apo_warm\data\Q1_summer_ncep_1948_2015.bin'
n=0
while(n<68)
'set x 1 192'
'set y 1 94'
'set z 1'
'set t 1'
'd qs'n''
n=n+1
endwhile
'disable fwrite'
